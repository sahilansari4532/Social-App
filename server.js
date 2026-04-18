const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://sahil:sahil4532@ac-rigavwd-shard-00-00.fgbrdp1.mongodb.net:27017,ac-rigavwd-shard-00-01.fgbrdp1.mongodb.net:27017,ac-rigavwd-shard-00-02.fgbrdp1.mongodb.net:27017/?ssl=true&replicaSet=atlas-f89wxz-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);