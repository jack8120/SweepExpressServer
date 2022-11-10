// required
const serverless = require("serverless-http");

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//environment variables
require('dotenv').config();

//server
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//database connection
const uri = process.env.URI;
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//import routers
//const customerRouter = require('./routes/customers');
//apply routes
//app.use('/customers', customerRouter);

// Create Schema
const Schema = mongoose.Schema;

const customerSchema = new Schema({


    firstName  : String,
    lastName   : String,
    phone      : String,
    email      : String,  
    houseName  : String,
    houseNumber: Number,
    street     : String,
    city       : String,
    postCode   : String,
    appliance  : String,
    brush      : String,
    guard      : String,
    history    : String,
    notes      : String,

}, 
{
    timestamps: true,
});

const customerModel = mongoose.model('Customer', customerSchema);

const newCustomer = new customerModel({
  
        firstName  : "Jack",
        lastName   : "Torn",
        houseName  : "",
        houseNumber: 8,
        street     : "Davidson Road",
        city       : "Norwich",
        postCode   : "NR7 0XW",
        phone      : "09968078759",
        email      : "jack@stuff.bomb",
        appliance  : "w/b stove",
        brush      : "6inch",
        guard      : "yes",
        history    : "15/06/2021 2 x sweep £120",
        notes      : "stuff and things",
    
})

//newCustomer.save();

// Create - extend this url to capture all form fields
app.post('/.netlify/functions/api/customers/create',async(req,res)=>{

    console.log(req.body)



  

        const newCustomer = new customerModel(req.body);

    newCustomer.save();

    res.send(newCustomer);
    

});

// Read all

app.get('/.netlify/functions/api/customers/read',async (req,res)=>{
    const allData = await customerModel.find();

    res.send(allData);
});

// Read

app.get('/.netlify/functions/api/customers/read/:id',async (req,res)=>{

    const _id = req.params.id;

    const reqData = await customerModel.findById(_id);

    res.send(reqData);

});

// Update

app.put('/.netlify/functions/api/customers/update/:id', async (req,res)=>{
    //get the id
    const _id = req.params.id;
  
      const reqData = await customerModel.findByIdAndUpdate(_id);
  
      reqData.body = req.body;
  
      reqData.save();
  
      console.log(reqData)
      console.log(req.body)
  
  })

// Delete

app.delete('/.netlify/functions/api/customers/delete/:id', async (req,res)=>{

    const _id = req.params.id;
  
    const reqData = await customerModel.findByIdAndDelete(_id);
  
      reqData.name = "badassbeasty";
  
      reqData.save();
  
      console.log(reqData)
  })
  
  

//start the server
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

//new netlify way to start the server
const handler = serverless(app);

// we use this so the handler can use async (that mongoose uses)
module.exports.handler = async (event, context) => {
    //you can do any code here
    const result = await handler(event, context);
    // and here
    return result;
};
