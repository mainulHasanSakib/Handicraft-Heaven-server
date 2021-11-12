const express= require('express');
const { MongoClient } = require('mongodb');

const cors=require('cors');
require('dotenv').config();
const app= express();


const port =process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('running')
});



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sm9ey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {


        try {
    await client.connect();
    const database = client.db('handiCrafts');
   const productsCollection = database.collection('products');
//get api
app.get('/products', async(req, res)=>{
    const cursor = productsCollection.find({});
    const products =await cursor.toArray();
    res.send(products);
})

   //post api
   app.post('/products', async(req, res) => {
    const product =req.body;

    console.log("hitted", product)

    const result =await productsCollection.insertOne(product);

   console.log(result)
   res.json(result);
   })


      
    }
    finally {
        // await client.close();
      } 
}
run().catch(console.dir);
// client.connect(err => {
 
  
//   client.close();
// });









app.listen(port, ()=>{
    console.log(`running server on port ${port}` )
})













//user 7vl2x0vtyMBHBraa