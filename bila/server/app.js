const express = require("express");
const routers = require("./routes/index");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");


app.use(cors({
  origin: true
}));
app.use(express.json());
app.use(routers);

const port = 5000;
app.get("/", (req, res) => {
    res.status(200).json("HELLO WORLD");
  });

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
});