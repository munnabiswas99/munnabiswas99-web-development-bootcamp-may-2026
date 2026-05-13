const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const verifyToken = require("./middlewares/verifyToken");

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create Database
    const db = client.db("ExpenseTrackerDB");
    const userCollection = db.collection("users");
    const transactionCollection = db.collection("transactions");

    // Users related API's

    // Get User API
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // POST user
    app.post("/users", async (req, res) => {
      const user = req.body;
      user.createdAt = new Date();
      const email = user.email;
      const userExist = await userCollection.findOne({ email });

      if (userExist) {
        return res.send({ message: "user already exist" });
      }

      const result = await userCollection.insertOne(user);
      console.log(result);
      res.send(result);
    });

    // Transaction Related API

    // Get Transaction Data
    app.get("/transactions", verifyToken, async (req, res) => {
      const email = req.decoded.email;

      const result = await transactionCollection
        .find({ userEmail: email })
        .toArray();

      res.send(result);
    });

    // Post Transaction Data
    app.post("/transactions", verifyToken, async (req, res) => {
      try {
        const transaction = req.body;

        transaction.userEmail = req.decoded.email;

        transaction.createdAt = new Date();

        const result = await transactionCollection.insertOne(transaction);

        res.send(result);
      } catch (error) {
        res.status(500).send({
          message: "Failed to add transaction",
        });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Expense Tracker server is working");
});

app.listen(port, () => {
  console.log(`Expense Tracker is listening on port ${port}`);
});
