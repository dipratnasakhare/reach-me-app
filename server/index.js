
const express = require("express")
const { connect } = require("./config/db")
const cors = require("cors");


const { UserAuthRoutes } = require("./Routes/userAuthentication.routes");
const { postrouter } = require("./Routes/Post.Routes");


require('dotenv').config();

// Routes here 
const app = express()

app.use(cors())
app.use(express.json());

app.use("/post", postrouter)
app.use("/user",UserAuthRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to server of Reach me")
})


app.listen(process.env.MONGOOSE_PORT_SERVER, async ()=> {
  try{
      await connect
      console.log("Connected to db")
      console.log({msg:`Your server is running at ${process.env.MONGOOSE_PORT_SERVER} port`})
  }catch(err){
      console.log("Connection failed to db")
      console.log(err)
  }
})