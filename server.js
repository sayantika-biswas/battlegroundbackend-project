const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB();

const bgcarouselRoutes = require("./routes/bgcarouselRoutes");
const storeLinksRoutes = require("./routes/storeLinksRoutes");
const footerLinksRoutes = require("./routes/footerLinksRoutes");
const navbarRoutes = require("./routes/navbarRoutes");
const socialLinksRoutes = require("./routes/socialLinksRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bgcarousel", bgcarouselRoutes);
app.use("/api/store-links", storeLinksRoutes);
app.use("/api/footer-links", footerLinksRoutes);
app.use("/api/navbar", navbarRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
