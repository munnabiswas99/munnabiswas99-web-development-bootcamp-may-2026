const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // Get User Transactions Data
    app.get("/transactions", verifyToken, async (req, res) => {
      const email = req.decoded.email;
      const result = await transactionCollection.find({ userEmail: email }).toArray();
      res.send(result);
    });

    // Get a specific transaction by id
    app.get("/transactions/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await transactionCollection.findOne(query);

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

    // Update a transaction
    // Update Transaction
app.patch("/transactions/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.decoded.email;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid transaction id",
      });
    }

    const updatedData = req.body;

    // Remove unwanted fields
    delete updatedData._id;
    delete updatedData.userEmail;

    const query = {
      _id: new ObjectId(id),
      userEmail: email,
    };

    const updateDoc = {
      $set: {
        ...updatedData,
      },
    };

    const result = await transactionCollection.updateOne(
      query,
      updateDoc
    );

    res.send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Failed to update transaction",
    });
  }
});

    // Delete Transaction
    app.delete("/transactions/:id", verifyToken, async(req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)};

      const result = await transactionCollection.deleteOne(query);
      res.send(result);
    })

    // Dash Board data
    app.get("/dashboard-data", verifyToken, async (req, res) => {
      try {
        const email = req.decoded.email;

        // Get Transactions
        const transactions = await transactionCollection
          .find({ userEmail: email })
          .toArray();

        // Summary Calculation
        const totalIncome = transactions
          .filter((item) => item.type === "income")
          .reduce((sum, item) => sum + Number(item.amount), 0);

        const totalExpense = transactions
          .filter((item) => item.type === "expense")
          .reduce((sum, item) => sum + Number(item.amount), 0);

        const totalSavings = transactions
          .filter((item) => item.type === "savings")
          .reduce((sum, item) => sum + Number(item.amount), 0);

        const totalInvestment = transactions
          .filter((item) => item.type === "investment")
          .reduce((sum, item) => sum + Number(item.amount), 0);

        // Recent Income
        const recentIncome = transactions
          .filter((item) => item.type === "income")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // Recent Expense
        const recentExpense = transactions
          .filter((item) => item.type === "expense")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // Response Send
        res.send({
          summary: {
            totalIncome,
            totalExpense,
            totalSavings,
            totalInvestment,
          },

          recentIncome,

          recentExpense,
        });
      } catch (error) {
        console.log(error);

        res.status(500).send({
          message: "Failed to load dashboard data",
        });
      }
    });

// Get Monthly Income and Expense
    app.get("/income-expense", verifyToken, async (req, res) => {
      try {
        const email = req.decoded.email;

        const transactions = await transactionCollection
          .find({ userEmail: email })
          .toArray();

        // Build last 5 months info
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const now = new Date();
        const last5Months = [];

        for (let i = 4; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          last5Months.push({
            name: monthNames[d.getMonth()],
            month: d.getMonth() + 1,  // 1-12
            year: d.getFullYear(),
          });
        }

        // Filter & summarize
        const summary = last5Months.map(({ name, month, year }) => {
          const monthTransactions = transactions.filter((t) => {
            const [tYear, tMonth] = t.date.split("-").map(Number);
            return tYear === year && tMonth === month;
          });

        const income = monthTransactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + Number(t.amount), 0); // 👈 Number()

        const expense = monthTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + Number(t.amount), 0); // 👈 Number()
            return { name, income, expense };
          });

        res.send(summary);

      } catch (error) {
        console.error("income-expense error:", error);
        res.status(500).json({ message: "Internal server error" });
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
