import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// API key security: Use lazy initialization for SDKs that require keys
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Sample data routes (until DB is ready)
  app.get("/api/menu", (req, res) => {
    res.json([
      // Chicken Starters
      {
        id: "cs1",
        category: "Chicken Starters",
        name: "Guntur Chilli Chicken",
        description: "Classic spicy dry chicken tossed with Guntur red chillies and curry leaves.",
        price: 320,
        imageUrl: "/images/guntur_chilli_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "cs2",
        category: "Chicken Starters",
        name: "Chicken 65",
        description: "Deep fried spicy chicken chunks with South Indian tempering.",
        price: 300,
        imageUrl: "/images/chicken_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "cs3",
        category: "Chicken Starters",
        name: "Chicken Lollipop",
        description: "Crispy fried chicken wings shaped like lollipops, served with spicy Schezwan sauce.",
        price: 260,
        imageUrl: "/images/chicken_lollipop.png",
        isVeg: false,
        isAvailable: true
      },
      // Seafood Starters
      {
        id: "sf1",
        category: "Seafood Starters",
        name: "Fish 65",
        description: "Spicy and crispy fish chunks, a coastal favorite.",
        price: 230,
        imageUrl: "/images/fish_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf2",
        category: "Seafood Starters",
        name: "Chilly Fish",
        description: "Crispy fish fillets tossed with bell peppers and green chillies in a spicy Chinese sauce.",
        price: 240,
        imageUrl: "/images/chilly_fish.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf3",
        category: "Seafood Starters",
        name: "Apollo Fish",
        description: "Authentic Hyderabadi spicy fish fry with curry leaves and green chillies.",
        price: 250,
        imageUrl: "/images/apollo_fish.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf4",
        category: "Seafood Starters",
        name: "Crispy Fish",
        description: "Golden fried crispy fish fillets served with hot dipping sauce.",
        price: 250,
        imageUrl: "/images/fish_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf5",
        category: "Seafood Starters",
        name: "Lemon Fish",
        description: "Tender fish chunks tossed in a refreshing and tangy lemon-garlic sauce.",
        price: 250,
        imageUrl: "/images/fish_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf6",
        category: "Seafood Starters",
        name: "Pepper Fish",
        description: "Stir-fried fish cubes seasoned heavily with freshly crushed black pepper and spices.",
        price: 250,
        imageUrl: "/images/fish_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf7",
        category: "Seafood Starters",
        name: "Fish Finger",
        description: "Crumb-coated crispy deep-fried fish fingers, served with tartar sauce.",
        price: 260,
        imageUrl: "/images/fish_finger.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf8",
        category: "Seafood Starters",
        name: "Apollo Prawn",
        description: "Spicy and tangy prawns tossed with chillies, yogurt, and curry leaves.",
        price: 290,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf9",
        category: "Seafood Starters",
        name: "Prawn Manchurian",
        description: "Juicy prawns coated in batter, fried and tossed in a tangy Manchurian sauce.",
        price: 280,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf10",
        category: "Seafood Starters",
        name: "Schezwan Prawn",
        description: "Prawns stir-fried in a fiery hot Schezwan pepper sauce.",
        price: 280,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf11",
        category: "Seafood Starters",
        name: "Prawn 555",
        description: "Chef's special spicy prawns tossed with cashew nuts and green chillies.",
        price: 300,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf12",
        category: "Seafood Starters",
        name: "Dry Pepper Prawn",
        description: "Dry-fried prawns seasoned with aromatic ground black pepper and curry leaves.",
        price: 300,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf13",
        category: "Seafood Starters",
        name: "Golden Prawn",
        description: "Batter-fried prawns cooked to a crispy golden perfection.",
        price: 300,
        imageUrl: "/images/golden_prawn.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf14",
        category: "Seafood Starters",
        name: "Prawn 65",
        description: "Spicy, deep-fried prawns marinated in classic South Indian spices.",
        price: 300,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf15",
        category: "Seafood Starters",
        name: "Prawn Salt & Pepper",
        description: "Crispy stir-fried prawns seasoned with sea salt, white pepper, and spring onions.",
        price: 300,
        imageUrl: "/images/spicy_prawns.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "sf16",
        category: "Seafood Starters",
        name: "Saute Prawn",
        description: "Prawns gently sautéed with butter, garlic, and light spices.",
        price: 300,
        imageUrl: "/images/saute_prawn.jpg",
        isVeg: false,
        isAvailable: true
      },
      // Tandoori - Veg
      {
        id: "tv1",
        category: "Tandoori (Veg)",
        name: "Paneer Tikka",
        description: "Fresh cottage cheese cubes marinated in yogurt and spices, grilled to perfection.",
        price: 200,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "tv2",
        category: "Tandoori (Veg)",
        name: "Kaju Paneer Tikka",
        description: "Rich paneer cubes marinated in cashew paste and cream, grilled in a tandoor.",
        price: 240,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      // Tandoori - Non-Veg
      {
        id: "tn1",
        category: "Tandoori (Non-Veg)",
        name: "Tandoori Half",
        description: "Classic tandoori chicken marinated in yogurt and spices, grilled half size.",
        price: 260,
        imageUrl: "/images/tandoori_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "tn2",
        category: "Tandoori (Non-Veg)",
        name: "Tandoori Full",
        description: "Classic tandoori chicken marinated in yogurt and spices, grilled full size.",
        price: 450,
        imageUrl: "/images/tandoori_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "tn3",
        category: "Tandoori (Non-Veg)",
        name: "Tandoori Quarter",
        description: "Classic tandoori chicken marinated in yogurt and spices, grilled quarter size.",
        price: 200,
        imageUrl: "/images/tandoori_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "tn4",
        category: "Tandoori (Non-Veg)",
        name: "Reshmi Kabab",
        description: "Silky smooth boneless chicken kababs marinated in cream and cashew paste.",
        price: 230,
        imageUrl: "/images/tandoori_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "tn5",
        category: "Tandoori (Non-Veg)",
        name: "Chicken Tikka",
        description: "Succulent chicken chunks marinated in spices and yogurt, grilled on skewers.",
        price: 250,
        imageUrl: "/images/tandoori_chicken.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "tn6",
        category: "Tandoori (Non-Veg)",
        name: "Fish Tikka",
        description: "Tender fish pieces marinated in tandoori spices and grilled in clay oven.",
        price: 270,
        imageUrl: "/images/fish_65.jpg",
        isVeg: false,
        isAvailable: true
      },
      // Biryanis - Veg
      {
        id: "vb1",
        category: "Veg Biryanis",
        name: "Baby Corn Biryani",
        description: "Fragrant basmati rice slow-cooked with tender baby corn and aromatic spices.",
        price: 170,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb2",
        category: "Veg Biryanis",
        name: "Veg Biryani",
        description: "Fragrant basmati rice cooked with mixed vegetables.",
        price: 170,
        imageUrl: "/images/andhra_meals_thali.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb3",
        category: "Veg Biryanis",
        name: "Gongura Veg Biryani",
        description: "Basmati rice cooked with mixed vegetables and tangy sorrel leaves (gongura).",
        price: 180,
        imageUrl: "/images/andhra_meals_thali.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb4",
        category: "Veg Biryanis",
        name: "Mushroom Biryani",
        description: "Aromatic rice cooked with fresh mushrooms.",
        price: 180,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb5",
        category: "Veg Biryanis",
        name: "Paneer Biryani",
        description: "Fragrant rice cooked with spiced paneer cubes.",
        price: 180,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb6",
        category: "Veg Biryanis",
        name: "Cashewnut Biryani",
        description: "Rich and aromatic rice cooked with golden-fried cashew nuts.",
        price: 200,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      {
        id: "vb7",
        category: "Veg Biryanis",
        name: "Gongura Paneer Biryani",
        description: "Tangy gongura flavored vegetable biryani with fresh paneer.",
        price: 210,
        imageUrl: "/images/paneer_tikka.png",
        isVeg: true,
        isAvailable: true
      },
      // Biryanis - Non-Veg
      {
        id: "nb1",
        category: "Non-Veg Biryanis",
        name: "Single Dum Biryani",
        description: "Single-serving portion of our classic Hyderabadi chicken dum biryani.",
        price: 140,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb2",
        category: "Non-Veg Biryanis",
        name: "Plain Biryani",
        description: "Fragrant, flavored biryani rice served without meat pieces.",
        price: 160,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb3",
        category: "Non-Veg Biryanis",
        name: "Chicken Dum Biryani",
        description: "Classic Hyderabadi slow-cooked chicken biryani with boiled egg.",
        price: 220,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb4",
        category: "Non-Veg Biryanis",
        name: "Egg Biryani",
        description: "Spiced biryani rice served with hard-boiled eggs.",
        price: 190,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb5",
        category: "Non-Veg Biryanis",
        name: "Chilly Egg Biryani",
        description: "Spicy biryani rice tossed with hot chilly egg dry-fry.",
        price: 220,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb6",
        category: "Non-Veg Biryanis",
        name: "Chicken Fry Biryani",
        description: "Flavored biryani rice served with crispy spiced chicken fry pieces.",
        price: 230,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb7",
        category: "Non-Veg Biryanis",
        name: "Spl Chicken Biryani B/L",
        description: "Special boneless chicken biryani made with succulent fried chicken pieces.",
        price: 230,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb8",
        category: "Non-Veg Biryanis",
        name: "Chicken Tikka Biryani",
        description: "Aromatic biryani rice served with smoky, clay-oven grilled chicken tikka.",
        price: 240,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb9",
        category: "Non-Veg Biryanis",
        name: "Gongura Chicken Biryani",
        description: "Tangy and spicy biryani cooked with marinated chicken and sorrel leaves (gongura).",
        price: 240,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb10",
        category: "Non-Veg Biryanis",
        name: "Gongura Spl Chicken Biryani",
        description: "Special version of our tangy gongura chicken biryani with selected boneless cuts.",
        price: 240,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb11",
        category: "Non-Veg Biryanis",
        name: "Ulavacharu Chicken Biryani",
        description: "Unique biryani flavored with traditional horse gram soup (ulavacharu).",
        price: 240,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb12",
        category: "Non-Veg Biryanis",
        name: "Guntur Spl Chicken Biryani",
        description: "Fiery chicken biryani prepared with authentic Guntur red chilli paste.",
        price: 250,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb13",
        category: "Non-Veg Biryanis",
        name: "Mughalai Chicken Biryani",
        description: "Rich and royal chicken biryani layered with egg-rich Mughlai sauce.",
        price: 250,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb14",
        category: "Non-Veg Biryanis",
        name: "Chicken Lollipop Biryani",
        description: "Biryani rice served with crispy, deep-fried chicken lollipops.",
        price: 260,
        imageUrl: "/images/chicken_lollipop.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb15",
        category: "Non-Veg Biryanis",
        name: "Chicken Wings Biryani",
        description: "Aromatic biryani rice served with spicy fried chicken wings.",
        price: 260,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb16",
        category: "Non-Veg Biryanis",
        name: "Supreme Chicken Biryani",
        description: "Chef's premium chicken biryani selection with chef's secret spices.",
        price: 260,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb17",
        category: "Non-Veg Biryanis",
        name: "Palnadu Chicken Biryani",
        description: "Authentic Palnadu-style chicken biryani cooked with fresh spices and milk.",
        price: 270,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb18",
        category: "Non-Veg Biryanis",
        name: "Natu Kodi Chicken Biryani",
        description: "Rustic and spicy country chicken biryani.",
        price: 250,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb19",
        category: "Non-Veg Biryanis",
        name: "Mutton Fry Biryani",
        description: "Fragrant biryani rice served with tender, pan-fried mutton pieces.",
        price: 300,
        imageUrl: "/images/gongura_mutton_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb20",
        category: "Non-Veg Biryanis",
        name: "Prawn Biryani",
        description: "Aromatic basmati rice cooked with spiced prawns.",
        price: 300,
        imageUrl: "/images/prawn_biryani.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb21",
        category: "Non-Veg Biryanis",
        name: "Gongura Prawn Biryani",
        description: "Tangy and spicy prawn biryani flavored with sorrel leaves.",
        price: 320,
        imageUrl: "/images/prawn_biryani.jpg",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb22",
        category: "Non-Veg Biryanis",
        name: "Gongura Mutton Biryani",
        description: "Tangy gongura flavored mutton biryani slow-cooked to perfection.",
        price: 330,
        imageUrl: "/images/gongura_mutton_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb23",
        category: "Non-Veg Biryanis",
        name: "Fish Biryani",
        description: "Aromatic rice served with seasoned fish fillets.",
        price: 300,
        imageUrl: "/images/apollo_fish.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb24",
        category: "Non-Veg Biryanis",
        name: "Bhimavaram Mixed Biryani",
        description: "Coastal Andhra style mixed biryani with chicken, mutton, and prawns.",
        price: 320,
        imageUrl: "/images/gongura_mutton_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb25",
        category: "Non-Veg Biryanis",
        name: "Lahore Chicken Biryani",
        description: "Spicy chicken biryani prepared in Lahori style spices.",
        price: 280,
        imageUrl: "/images/chicken_dum_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      {
        id: "nb26",
        category: "Non-Veg Biryanis",
        name: "Spl Mutton Biryani",
        description: "Special mutton biryani with aromatic basmati rice and double spiced meat.",
        price: 300,
        imageUrl: "/images/gongura_mutton_biryani.png",
        isVeg: false,
        isAvailable: true
      },
      // Andhra Meals
      {
        id: "am1",
        category: "Andhra Meals",
        name: "Traditional Andhra Bhojanam",
        description: "A complete meal on a banana leaf with authentic sides.",
        price: 280,
        imageUrl: "/images/andhra_meals_thali.png",
        isVeg: true,
        isAvailable: true
      }
    ]);
  });

  app.get("/api/specials", (req, res) => {
    res.json({
      id: "spec1",
      name: "Gongura Mutton Biryani",
      description: "Our signature dish: Succulent mutton pieces slow-cooked in a tangy sorrel leaves gravy, served with aromatic basmati rice.",
      price: 330,
      imageUrl: "/images/gongura_mutton_biryani.png",
      isAvailable: true
    });
  });

  app.get("/api/reviews", (req, res) => {
    res.json([
      {
        id: "r1",
        name: "Rahul Sharma",
        rating: 5,
        comment: "Best Gongura Biryani in Hyderabad! The spice levels are authentic.",
        date: "2026-05-20"
      },
      {
        id: "r2",
        name: "Anjali P.",
        rating: 4,
        comment: "Loved the Andhra meals. Reminded me of home.",
        date: "2026-06-01"
      }
    ]);
  });

  app.get("/api/config", (req, res) => {
    res.json({
      phone: "09030023124",
      whatsapp: "919030023124",
      email: "hello@gunturgongoora.com",
      address: "Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081",
      openingHours: {
        "Monday - Sunday": "11:30 AM - 11:30 PM"
      }
    });
  });

  // Fallback for Leads/Orders/Feedback
  app.post("/api/leads", (req, res) => {
    console.log("Lead received:", req.body);
    res.status(201).json({ success: true });
  });

  app.post("/api/orders", (req, res) => {
    console.log("Order received:", req.body);
    res.status(201).json({ success: true, orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
  });

  app.post("/api/feedback", (req, res) => {
    console.log("Feedback received:", req.body);
    res.status(201).json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
