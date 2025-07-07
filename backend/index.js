// index.js (Backend for MongoDB Atlas)
const express = require('express');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');
require('dotenv').config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail", // or any email service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail/SMTP email
    pass: process.env.EMAIL_PASS  // Your app-specific password or SMTP key
  },
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {
    origin: 'https://kbazaar-lake.vercel.app/', // Frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// MongoDB Atlas URI from .env file
const uri = process.env.MONGO_URI;
// const uri = "mongodb://localhost:27017/shopping"
let db;

async function connectToDb() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        db = client.db("kbazaar");
        console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}
connectToDb();

// Get All Products
app.get('/api/getproducts', async (req, res) => {
    try {
        const items = await db.collection('products').find().toArray();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Product by ID
app.get('/api/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await db.collection('products').findOne({ id: productId });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ username });
        if (!user || user.password !== password) return res.status(401).json({ message: "Invalid credentials" });

        const { password: _, ...userData } = user;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register
app.post('/api/register', async (req, res) => {
    const { username, password, firstName, lastName, email, gender } = req.body;
    if (!username || !password || !email || !gender) return res.status(400).json({ message: "All fields are required." });

    try {
        const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });
        if (existingUser) return res.status(409).json({ message: "Username or email already exists." });

        const lastUser = await db.collection('users').find().sort({ id: -1 }).limit(1).toArray();
        const newId = lastUser.length > 0 ? lastUser[0].id + 1 : 1;
        const profileImage = gender === "female" ? "woman.png" : "man.png";

        const newUser = {
            id: newId,
            username,
            password,
            email,
            firstName,
            lastName,
            gender,
            image: profileImage,
            createdAt: new Date()
        };

        await db.collection('users').insertOne(newUser);
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// Save Order
app.post('/api/orders', async (req, res) => {
    try {
        const order = req.body;
        order.createdAt = new Date();
        await db.collection('orders').insertOne(order);
        res.status(201).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
});

// Get Orders by User ID
app.get('/api/orders', async (req, res) => {
  let userId = req.query.userId;
  try {
    if (!userId) return res.status(400).json({ success: false, message: "User ID required" });
     userId = parseInt(userId);
    const orders = await db.collection('orders').find({ userId }).toArray();
    res.json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});


// Save contact form message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const contactMessage = {
      name,
      email,
      message,
      createdAt: new Date()
    };

    await db.collection('contacts').insertOne(contactMessage);
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

app.post("/api/forgot-password/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiration to user
    await db.collection("users").updateOne(
      { email },
      { $set: { resetOtp: otp, otpExpiresAt: new Date(Date.now() + 10 * 60000) } } // expires in 10 min
    );

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "KBazaar Password Reset OTP",
      text: `Dear Customer,\nYour OTP for resetting your KBazaar password is: ${otp}\nValid for 10 minutes.\nDo not share this with anyone.\nThank you.    \n\nTeam KBazaar.`,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

app.post("/api/forgot-password/reset", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword)
    return res.status(400).json({ success: false, message: "All fields required" });

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user || user.resetOtp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (new Date() > new Date(user.otpExpiresAt))
      return res.status(400).json({ success: false, message: "OTP expired" });

    // Update password and remove OTP
    await db.collection("users").updateOne(
      { email },
      {
        $set: { password: newPassword },
        $unset: { resetOtp: "", otpExpiresAt: "" }
      }
    );

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Failed to reset password" });
  }
});

// Get all distinct categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await db.collection("products").distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});
app.get("/api/products/category/:categoryName", async (req, res) => {
  const category = decodeURIComponent(req.params.categoryName);
  const products = await db.collection("products").find({ category }).toArray();
  res.json(products);
});




app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
