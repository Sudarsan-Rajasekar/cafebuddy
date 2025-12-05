import https from "https";
import fs from "fs";
// const express = require("express");

import express from "express";
import {ElevenLabsClient} from "elevenlabs";


const app = express();
const PORT = 3000;

const AGENT_ID = "agent_5201kbhzkrtrehe98cpj3xypje8b";
const ELEVENLABS_API_KEY = "sk_5ddc9e71449506bcfac552655495209b70e47b573e7f505f"

const elevenlabs = new ElevenLabsClient(
    {
        apiKey: "sk_5ddc9e71449506bcfac552655495209b70e47b573e7f505f"
    }
)

// serve front end 
app.use(express.static("public"))

app.get("/token", async (req, res) => {
  try {
    const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY
      }
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("ElevenLabs error:", text);
      return res.status(500).json({ error: text });
    }

    const data = JSON.parse(text);

    res.json({
      signedUrl: data.signed_url
    });

  } catch (err) {
    console.error("❌ Failed to generate signed URL:", err.message);
    res.status(500).json({ error: err.message });
  }
});


app.get("/getMenu", async (req, res) => {
    return res.json("# ☕ Café Buddy – Menu & Pricing (Knowledge Base) ## ☕ HOT COFFEE ### Espresso * Single Shot – ₹120 * Double Shot – ₹170 Strong, concentrated coffee with bold flavor. ### Americano * Small – ₹140 * Large – ₹170 Espresso diluted with hot water for a smooth taste. ### Cappuccino * Small – ₹180 * Large – ₹210 Equal parts espresso, steamed milk, and milk foam. ### Latte * Small – ₹190 * Large – ₹220 Espresso with more steamed milk and light foam. ### Flat White * Small – ₹200 * Large – ₹230 Smooth espresso with velvety microfoam. ### Mocha * Small – ₹210 * Large – ₹240 Espresso with chocolate syrup and steamed milk. --- ## ❄️ ICED COFFEE ### Iced Americano * Regular – ₹170 Chilled espresso with cold water and ice. ### Iced Latte * Regular – ₹210 Espresso with cold milk and ice. ### Iced Mocha * Regular – ₹240 Cold coffee with chocolate flavor. ### Cold Brew * Regular – ₹220 Slow-brewed coffee, smooth and less acidic. --- ## 🥛 MILK & CUSTOMIZATIONS ### Milk Options * Regular Milk – Included * Oat Milk – +₹40 * Almond Milk – +₹50 * Soy Milk – +₹40 ### Sweeteners (On Request) * White Sugar * Brown Sugar * Stevia --- ## 🌱 NON-COFFEE DRINKS ### Hot Chocolate * Small – ₹180 * Large – ₹210 ### Masala Chai * Regular – ₹100 ### Green Tea * Regular – ₹120 --- ## 🥐 BAKERY & SNACKS ### Croissant * Butter Croissant – ₹120 * Chocolate Croissant – ₹150 ### Muffins * Blueberry Muffin – ₹140 * Chocolate Muffin – ₹150 ### Cookies * Chocolate Chip Cookie – ₹90 --- ## ⭐ ADD-ONS * Extra Espresso Shot – +₹50 * Flavored Syrups (Vanilla / Caramel / Hazelnut) – +₹40 * Whipped Cream – +₹30 --- ## 🧑‍🍳 ALLERGEN & DIETARY INFORMATION * Dairy-free options available using plant-based milk * Vegan-friendly drinks available upon request * Nuts may be present in almond milk and bakery items --- ## ❓ FREQUENTLY ASKED QUESTIONS ### Q: Which coffee is the strongest? Espresso and Double Shot Espresso are the strongest options. ### Q: Which coffee is least bitter? Latte, Flat White, and Cold Brew are less bitter. ### Q: Do you have sugar-free options? Yes, Stevia is available on request. ### Q: Do you offer dairy-free coffee? Yes, oat milk, almond milk, and soy milk are available. ### Q: Do you serve decaf coffee? Decaf is available for selected drinks upon request. --- ## 🕒 STORE INFORMATION * Opening Hours: 8:00 AM – 10:00 PM * Payment Methods: Cash, UPI, Credit/Debit Cards * Free Wi-Fi available for customers --- ## ✅ Notes for AI Assistant (Café Buddy) * Prices are in Indian Rupees (₹) * Sizes: Small / Large / Regular * Customizations available for most drinks")
})


// app.listen(PORT, () => {
//   console.log(`✅ Café Buddy running at http://localhost:${PORT}`);
// });

https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
).listen(3000, () => {
  console.log("HTTPS server running on https://192.168.10.101:3000");
});