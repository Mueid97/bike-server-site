const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9thk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const productCollection = client.db('bikersdb').collection('product');
    const myItemCollection = client.db('bikersdb').collection('items');
    
    app.get('/product', async(req,res)=>{
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
    });

    app.get('/product/:id', async(req,res)=>{
        const id= req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productCollection.findOne(query);
        res.send(product);
    });

    app.post('/product', async(req,res)=>{
        const newProduct = req.body;
        const result =await productCollection.insertOne(newProduct);
        res.send(result);
    });

    //delete
    app.delete('/product/:id', async(req,res)=>{
        const id =req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await productCollection.deleteOne(query);
        res.send(result);
    });

    app.post('/items', async(req,res)=>{
        const item = req.body;
        const result = myItemCollection.insertOne(item);
        res.send(result);
    })

  }finally{

  }

}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('server is running');
});

app.listen(port, ()=>{
    console.log('Port is listening',port);
})
