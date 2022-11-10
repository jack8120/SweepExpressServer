const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

const propertySchema = new Schema({
address: {
        houseName:    {type: String},  
        houseNumber:  {type: Number},
        street:       {type: String},     
        city:         {type: String},       
        postCode:     {type: String},   
         },   
appliance:    {type: String},  
brush:        {type: String},      
guard:        {type: String},      
history:      {type: String},    
notes:        {type: String},   

}, 
{
    timestamps: true,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;