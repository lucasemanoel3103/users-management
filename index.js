const express = require("express")
const router = require("./routes/routes")
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",router);


app.listen(PORT,() => {
    console.log("Servidor rodando")
});
