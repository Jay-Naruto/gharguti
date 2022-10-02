const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
require('dotenv').config();

const Cards =require("./schema/productSchema.js")
// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

// app
const app = express();

// db connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.bd5hnz0.mongodb.net/vyaapaar?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};
connectDB();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.get("/api/display-all",(req,res)=>{
  Cards.find((err,data)=>{
      if(err)
      {
          res.status(500).send(err.message)
      }
      else{
          res.status(200).send(data)
      }
  })
})

app.post("/api/display/new",(req,res)=>{
  const dbCard=req.body;
  Cards.create(dbCard,(err,data)=>{
      if(err)
      {
          res.status(500).send(err.message)
      }
      else{
          res.status(201).send(data)
      }
  })
})

app.put('/api/ratings-add', (req, res) => {
  console.log(req.body.rate)
  const id = req.body.data._id

  let  query ;
  
 
if ( req.body.rate === 1)
{
   query = { $set: {one: 1 + req.body.data.one } }


}
else if(req.body.rate === 2)
{
  query = { $set: {two: 1 + req.body.data.two } }
}
else if(req.body.rate === 3)
{
  query = { $set: {three: 1 + req.body.data.three} }
}
else if(req.body.rate === 4)
{
  query = { $set: {four: 1 + req.body.data.four } }
}
else if(req.body.rate === 5)
{
  query = { $set: {five: 1 + req.body.data.five } }
}
  Cards.findByIdAndUpdate(id, query, {new: true, useFindAndModify: false})
  .then()
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
