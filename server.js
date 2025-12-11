
import express from "express";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;



const app = express();
const PORT = 3000;
 


const db_url = 'postgresql://neondb_owner:npg_ktBNxc0rQKj6@ep-dark-cake-a4fc8mmi-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

// Postgres connection
const pool = new Pool({
  connectionString: db_url, 
  ssl: { rejectUnauthorized: false }
});

// serve front end 
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))



const MENU_AND_FAQ_TEXT = `
☕ CAFÉ BUDDY MENU (DESCRIPTIONS ONLY)

HOT COFFEE

Espresso (Single)  
A single shot of strong, concentrated coffee with bold flavor.

Espresso (Double)  
A double shot of espresso with strong and intense taste.

Americano (Small)  
Espresso diluted with hot water for a smooth taste.

Americano (Large)  
A larger serving of americano with a smooth finish.

Cappuccino (Small)  
Equal parts espresso, steamed milk, and milk foam.

Cappuccino (Large)  
A larger cappuccino with balanced espresso and foam.

Latte (Small)  
Espresso with steamed milk and light foam.

Latte (Large)  
A larger latte with extra steamed milk.

Flat White (Small)  
Smooth espresso with velvety microfoam.

Flat White (Large)  
A larger flat white with rich microfoam texture.

Mocha (Small)  
Espresso combined with chocolate syrup and steamed milk.

Mocha (Large)  
A larger mocha with rich chocolate flavor.

ICED COFFEE

Iced Americano  
Chilled espresso mixed with cold water and ice.

Iced Latte  
Espresso with cold milk served over ice.

Iced Mocha  
Cold coffee blended with chocolate flavor.

Cold Brew  
Slow-brewed coffee that is smooth and less acidic.

NON-COFFEE DRINKS

Hot Chocolate (Small)  
Rich cocoa drink made with milk.

Hot Chocolate (Large)  
A larger serving of creamy hot chocolate.

Masala Chai  
Traditional Indian spiced tea.

Green Tea  
Light and refreshing green tea.

BAKERY & SNACKS

Butter Croissant  
Classic buttery and flaky croissant.

Chocolate Croissant  
Croissant filled with rich chocolate.

Blueberry Muffin  
Soft baked muffin with blueberry flavor.

Chocolate Muffin  
Soft baked muffin with chocolate flavor.

Chocolate Chip Cookie  
Freshly baked cookie loaded with chocolate chips.

ADD-ONS

Extra Espresso Shot  
Adds an extra shot of espresso to your drink.

Flavored Syrup  
Available flavors include vanilla, caramel, and hazelnut.

Whipped Cream  
Creamy topping added on request.

Oat Milk  
Plant-based milk option.

Soy Milk  
Plant-based soy milk option.

Almond Milk  
Nut-based almond milk option.

FREQUENTLY ASKED QUESTIONS

Which coffee is the strongest?  
Espresso (Single) and Espresso (Double) are the strongest options.

Which coffee is least bitter?  
Latte (Small), Flat White (Small), and Cold Brew are generally less bitter.

Do you have dairy-free options?  
Yes, Oat Milk, Soy Milk, and Almond Milk are available.

Do you have sugar-free options?  
Yes, stevia is available upon request.

Do you offer decaf coffee?  
Decaf is available for selected drinks upon request.

STORE INFORMATION

Opening hours are from 8:00 AM to 10:00 PM.  
Multiple payment methods are accepted including UPI, cash, and cards.  
Free Wi-Fi is available for customers.
`;


const PRICE_MAP = {
  // HOT COFFEE
  "Espresso (Single)": 120,
  "Espresso (Double)": 170,
  "Americano (Small)": 140,
  "Americano (Large)": 170,
  "Cappuccino (Small)": 180,
  "Cappuccino (Large)": 210,
  "Latte (Small)": 190,
  "Latte (Large)": 220,
  "Flat White (Small)": 200,
  "Flat White (Large)": 230,
  "Mocha (Small)": 210,
  "Mocha (Large)": 240,

  // ICED COFFEE
  "Iced Americano": 170,
  "Iced Latte": 210,
  "Iced Mocha": 240,
  "Cold Brew": 220,

  // NON-COFFEE
  "Hot Chocolate (Small)": 180,
  "Hot Chocolate (Large)": 210,
  "Masala Chai": 100,
  "Green Tea": 120,

  // BAKERY
  "Butter Croissant": 120,
  "Chocolate Croissant": 150,
  "Blueberry Muffin": 140,
  "Chocolate Muffin": 150,
  "Chocolate Chip Cookie": 90,

  // ADD-ONS
  "Extra Espresso Shot": 50,
  "Flavored Syrup": 40,
  "Whipped Cream": 30,
  "Oat Milk": 40,
  "Soy Milk": 40,
  "Almond Milk": 50
};


app.get("/getMenu", async (req, res) => {
    return res.json(MENU_AND_FAQ_TEXT)
})


app.get("/getPrice/:item", async (req, res) => {
  const {item} =   req.params;
  console.log("selectedItem",item)
  const price = PRICE_MAP[item];
  console.log("selectedItem",item)
  if(!price){
    return res.status(404).json({error : `Item ${item} not found`});
  }else{
    return res.json({item:item,price:price});
  }
})

app.post("/webhook/order", async(req,res)=>{
  try{
    console.log("Incoming order:", req.body);
    const{item, price} = req.body

    if (!item || !price) {
      return res.status(400).json({ error: "Missing item or price" });
    }

    await pool.query(
          `INSERT INTO CaffeBuddyOrders (item_name, price) VALUES ($1, $2)`,
          [item, price]
        );

    return res.json({ success: true, message: "Order saved" ,data:req.body});
    
  }catch(err){
    console.error("Order save failed:", err.message);
    return res.status(500).json({ error: "Failed to save order" });
  }
})

app.listen(PORT, () => {
  console.log(`✅ Café Buddy running at http://localhost:${PORT}`);
});
 
