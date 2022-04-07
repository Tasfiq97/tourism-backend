const express = require('express')
const app = express()
const cors=require("cors")
const port = 5000;
const ObjectId=require("mongodb").ObjectId;

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tourDB:8JXLzXyBvsqDjhua@cluster0.qbrq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(cors());
 app.use(express.json())


 async function run() {
    try {
        await client.connect();
        const database = client.db("tourDb");
    const tourCollection = database.collection("tours");
    const bookingCollection=database.collection("bookings")
      
  //  get method 
    app.get("/tours",async (req,res)=>{
    const result =await tourCollection.find({}).toArray();
    res.json(result);
    })

    app.post("/booking",async(req,res)=>{
      const result=await bookingCollection.insertOne(req.body);
      // console.log(result);
      res.json(result) 
    })


    // get by id method 

    app.get("/tours/:id",async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result= await tourCollection.findOne(query);
      res.json(result);

    })


    // get booking 
    app.get("/allbook",async(req,res)=>{
      const result= await bookingCollection.find({}).toArray();
      res.json(result);
    })

    // delete bookings 
    app.delete("/delete/:id",async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result= await bookingCollection.deleteOne(query);
      console.log(result);
      res.json(result);
    
    })

//  post new tours 
app.post("/tours",async(req,res)=>{
  const query=req.body;
   const result=await tourCollection.insertOne(query);
   res.send(result);
})

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
