const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();
const app=express()
const connection=require("./config/dbconnect")

const port =process.env.PORT || 3000


app.use(express.json())
app.use("/api/contacts",require("./routes/contactroute"))
app.use("/api/users",require("./routes/userroute"))
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})