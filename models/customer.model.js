const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : String,
    phone: String,
    email: String, 
}, 
{
    timestamps: true,
});

const customerModel = mongoose.model('Customer', customerSchema);

const newCustomer = new customerModel({
    name : "Jack Torn", 
    phone: "0980982022",         
    email: "jak@techEd.com",   
})

newCustomer.save();




module.exports = Customer;