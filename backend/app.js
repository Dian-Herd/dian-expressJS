require("./config/mongoose")
const express = require("express");
const app = express();
const productRouter = require("./app/routes");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/v1", productRouter);

app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'page ' + req.originalUrl + ' Not Found'
    })
})

app.listen(3000, () => console.log("http://localhost:3000"));