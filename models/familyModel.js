const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        unique: false
    }
})

const familySchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    members: [childSchema],
    dateCalled: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;