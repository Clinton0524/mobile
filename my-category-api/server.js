const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Replace with your actual MongoDB connection string
const MONGO_URI = "mongodb+srv://Clinton:Spider123456%40@cluster0.yongs1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define schemas & models for each category type
const categorySchema = new mongoose.Schema({ name: String, image: String });
const snackSchema = new mongoose.Schema({ name: String, image: String });
const beautySchema = new mongoose.Schema({ name: String, image: String });
const householdSchema = new mongoose.Schema({ name: String, image: String });
const shopstoreSchema = new mongoose.Schema({ name: String, image: String });
const featuredFavSchema = new mongoose.Schema({ name: String, image: String });

const Category = mongoose.model("Category", categorySchema);
const Snack = mongoose.model("Snack", snackSchema);
const Beauty = mongoose.model("Beauty", beautySchema);
const Household = mongoose.model("Household", householdSchema);
const Shopstore = mongoose.model("Shopstore", shopstoreSchema);
const FeaturedFav = mongoose.model("FeaturedFav", featuredFavSchema);

// API endpoints to get data from MongoDB
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

app.get("/snacks", async (req, res) => {
  try {
    const snacks = await Snack.find();
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching snacks" });
  }
});

app.get("/beauty", async (req, res) => {
  try {
    const beauty = await Beauty.find();
    res.json(beauty);
  } catch (error) {
    res.status(500).json({ error: "Error fetching beauty products" });
  }
});

app.get("/household", async (req, res) => {
  try {
    const household = await Household.find();
    res.json(household);
  } catch (error) {
    res.status(500).json({ error: "Error fetching household items" });
  }
});

app.get("/shopstore", async (req, res) => {
  try {
    const shopstore = await Shopstore.find();
    res.json(shopstore);
  } catch (error) {
    res.status(500).json({ error: "Error fetching shop store items" });
  }
});

app.get("/featuredfav", async (req, res) => {
  try {
    const featuredFav = await FeaturedFav.find();
    res.json(featuredFav);
  } catch (error) {
    res.status(500).json({ error: "Error fetching featured favorites" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));