const express=require('express');
const Quotes = require('../models/Quote');
const router=express.Router();

router.get('/allquotes',async(req,res)=>{
    try{
        let allQuotes= await Quotes.find({});
        res.status(200).json(allQuotes);
    }
    catch(e){
        res.status(400).json({msg:"something went wrong ..."});
    }
});

router.post('/addquotes',async(req,res)=>{
    try{
        let{author,text}=req.body;
        let newQuotes=await Quotes.create({author,text});
        console.log(newQuotes,"new Quotes....");
        res.status(201).json({msg:"new quote created successfully....."})
    }   
    catch(e){
        res.status(400).json({msg:"something went wrong while creating..."});
    }
});


router.get('/quotes/:id',async(req,res)=>{
    let quote= await Quotes.findById(req.params.id);
    res.status(200).json(quote);
});


router.delete('/quotes/:id', async (req, res) => {
    try {
      const deletedQuote = await Quotes.findByIdAndDelete(req.params.id);
  
      if (deletedQuote) {
        res.status(200).json({ message: 'Quote deleted successfully' });
      } else {
        res.status(404).json({ error: 'Quote not found' });
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;
  
    try {
      const existingQuote = await Quotes.findById(id);
  
      if (!existingQuote) {
        return res.status(404).json({ error: 'Quote not found' });
      }
  
      existingQuote.author = author;
      existingQuote.text = text;
  
      const updatedQuote = await existingQuote.save();
  
      res.status(200).json(updatedQuote);
      // res.redirect('/allquotes');
    } catch (error) {
      console.error('Error updating quote:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      // req.redirect('/allquotes');
    }
  });




module.exports=router;
