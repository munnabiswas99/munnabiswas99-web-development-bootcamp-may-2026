const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// async function run() {
//     try{

//     }
//     finally{

//     }
// }

// run.catch(console.dir);

app.get('/', (req, res) => {
    res.send("Expense Tracker server is working")
})

app.listen(port, () => {
  console.log(`Expense Tracker is listening on port ${port}`);
});
