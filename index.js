const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { use } = require('express/lib/router');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.h9thk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    await client.connect();
    const productCollection = client.db('bikersdb').collection('product');
    app.get('/product', async(req,res)=>{
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
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
