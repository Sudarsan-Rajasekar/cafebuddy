
import express from "express";



const app = express();
const PORT = 3000;


// serve front end 
app.use(express.static("public"))


const MENU_AND_FAQ_TEXT = `
☕ CAFÉ BUDDY MENU (DESCRIPTIONS ONLY)

HOT COFFEE

Espresso  
A strong, concentrated coffee with bold flavor.

Americano  
Espresso diluted with hot water for a smooth taste.

Cappuccino  
Equal parts espresso, steamed milk, and milk foam.

Latte  
Espresso with more steamed milk and light foam.

Flat White  
Smooth espresso with velvety microfoam.

Mocha  
Espresso combined with chocolate syrup and steamed milk.

ICED COFFEE

Iced Americano  
Chilled espresso with cold water and ice.

Iced Latte  
Espresso with cold milk served over ice.

Iced Mocha  
Cold coffee with chocolate flavor.

Cold Brew  
Slow-brewed coffee that is smooth and less acidic.

MILK & CUSTOMIZATIONS

Milk Options  
Regular milk, oat milk, almond milk, and soy milk are available.

Sweeteners  
White sugar, brown sugar, and stevia available on request.

NON-COFFEE DRINKS

Hot Chocolate  
Rich cocoa drink made with milk.

Masala Chai  
Traditional Indian spiced tea.

Green Tea  
Light and refreshing green tea.

BAKERY & SNACKS

Croissants  
Buttery flaky pastry, plain or chocolate-filled.

Muffins  
Soft baked muffins available in blueberry and chocolate flavors.

Cookies  
Freshly baked chocolate chip cookies.

ADD-ONS

Extra espresso shot  
Flavored syrups such as vanilla, caramel, and hazelnut  
Whipped cream

FREQUENTLY ASKED QUESTIONS

Which coffee is the strongest?  
Espresso and double espresso are the strongest options.

Which coffee is least bitter?  
Latte, flat white, and cold brew are generally the least bitter.

Do you have dairy-free options?  
Yes, oat milk, almond milk, and soy milk are available.

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


app.listen(PORT, () => {
  console.log(`✅ Café Buddy running at http://localhost:${PORT}`);
});
 
