const express = require("express")
const app = express();
var cors = require('cors');

app.use(cors());

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

const router = require("./routes/user.routes");


app.use("/api/v1/users", router)

module.exports = app