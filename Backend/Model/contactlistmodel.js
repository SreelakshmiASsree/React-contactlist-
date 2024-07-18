const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    salutation: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true 
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("contact", contactSchema);