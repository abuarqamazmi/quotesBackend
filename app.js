const express=require("express");
const app=express();
const mongoose = require('mongoose');
const seedDB = require("./seed");
const quotesRoutes=require("./apis/quotesRoutes");
const cors=require("cors");
const dotenv=require('dotenv').config();

mongoose.connect(process.env.ATLAS_URL)
.then(function(){
    console.log("DB connected");
})
.catch(function(err){
    console.log("Error :" ,err);
})


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin:["https://quotes-frontend-five.vercel.app/"],
}));
// seedDB();
app.use(quotesRoutes);

app.get('/',(req,res)=>{
    // res.send("welcome page..");
    res.status(200).json({msg:"msg from root"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is working....${process.env.PORT}`);
});