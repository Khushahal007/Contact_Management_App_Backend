const express=require("express");
const dotenv=require("dotenv").config();
const connectDb=require("./Config/dbConnection");
const errorHandle = require("./Middleware/errorHandler");


connectDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json())
app.use('/api/contacts', require("./Routes/ContactRoutes"));
app.use('/api/users', require("./Routes/UserRoutes"));
app.use(errorHandle)
app.listen(port,()=>{
    console.log("Server is running on ${port}");
});