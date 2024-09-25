require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/users");
const areaRoutes = require("./routes/areas");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/areas", areaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Sincronizar modelos
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});
