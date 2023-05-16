const router = require('express').Router();
const fs = require('fs');
let Family = require('../models/familyModel.js');


router.route('/').get((req, res)=> {
    Family.find()
        .then(families => res.json(families))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/:id').get((req, res)=> {
    Family.findOne({id: req.params.id})
        .then(family => res.json(family))
        .catch(err => res.status(400).json("Error: "+err));
});
router.route('/:id').delete((req, res) => {
    Family.deleteOne({id: req.params.id})
        .then(()=> res.json("Family deleted!"))
        .catch(err => res.status(400).json("Error: "+err));
})
// router.route('/search/:query').get((req, res) => {
//     Family.find({$text: {$search: req.params.query}})
//         .then(families => res.json(families))
//         .catch(err => res.status(400).json("Error: "+err));
// })
router.route('/update/:id').post((req, res) => {
    Family.findOne({id: req.params.id})
        .then(family => {
            family.id = req.body.id;
            family.lastName = req.body.lastName;
            family.members = [...req.body.members];
            family.save()
                .then(() => res.json("Family updated!"))
                .catch(err => res.status(400).json("Error: "+err));
        })
        .catch(err => res.status(400).json("Error: "+err));
})

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const lastName = req.body.lastName;
    const members = [...req.body.members];

    const newFam = new Family({id, lastName, members});

    newFam.save()
        .then(() => res.json("Family added!"))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/call/:id').post((req, res) => {
    Family.findOne({id: req.params.id})
        .then(family => {
            family.dateCalled = new Date().toDateString() 
            family.save()
                .then(() => res.json("Ride called!"))
                .catch(err => res.status(400).json("Error: "+err));
        })
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/uncall/:id').post((req, res) => {
    Family.findOne({id: req.params.id})
        .then(family => {
            family.dateCalled = "";
            family.save()
                .then(() => res.json("Oops! Uncalled successfully!"))
                .catch(err => res.status(400).json("Error: "+err));
        })
        .catch(err => res.status(400).json("Error: "+err));
});

const auth = {
    user: process.env.API_USER,
    pass: process.env.API_PASS
}

router.route('/login').post((req, res)=> {
    if (req.body.user == auth.user && req.body.pass == auth.pass) {
        res.json({auth: "authorized"})
    } else {
        res.json({auth: "incorrect"})
    }
});



module.exports = router;