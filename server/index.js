
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "./Models/UserModel.js";

import taskModel from "./Models/TaskManagement.js";
import * as ENV from "./config.js";

//Middleware

const corsOptions = {

  origin: ENV.CLIENT_URL, //client URL local

  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  credentials: true, // Enable credentials (cookies, authorization headers, etc.)

};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());


//admin123456   dbconnection

//const connectString = "mongodb://admin1:admin123456@ac-f6vrkok-shard-00-00.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-01.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-02.ozhegpq.mongodb.net:27017/?ssl=true&replicaSet=atlas-gdmm07-shard-0&authSource=admin&appName=studAppCluter";

//const connectString = `mongodb://${ENV.DB_USER}:${ENV.DB_PASSWORD}@ac-f6vrkok-shard-00-00.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-01.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-02.ozhegpq.mongodb.net:27017/samrtDailyLive?ssl=true&replicaSet=atlas-gdmm07-shard-0&authSource=admin&appName=studAppCluter`;
//const connectString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}:27017,${process.env.DB_CLUSTER}:27017,${process.env.DB_CLUSTER}:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-gdmm07-shard-0&authSource=admin&appName=studAppCluter`;
const connectString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-f6vrkok-shard-00-00.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-01.ozhegpq.mongodb.net:27017,ac-f6vrkok-shard-00-02.ozhegpq.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-gdmm07-shard-0&authSource=admin&appName=studAppCluter`;

mongoose.connect(connectString);

//Register user
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ user, msg: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Registration error." });
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Authentication failed." });

    res.status(200).json({ user, message: "Login successful." });
  } catch (err) {
    res.status(500).json({ error: "Login error." });                 
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
});
  
//addtaks 
app.post("/addTask",async(req,res)=>{

    try {
         const { userId, title, description,status,priority,category,dueDate} = req.body;

         const task = new taskModel({

        userId, 
        title, 
        description,
        status,
        priority,
        category,
        dueDate,
         });

             await task.save();
    res.status(201).send({ task, msg: "Event added successfully." });
        
    } catch (error) {
          res.status(500).json({ error: "Adding event failed" });
    }
});


//task get
app.get("/task",async(req,res)=>{

    try {

        const tasks = await taskModel.find();
        res.json(tasks);

        
    } catch (error) {
        res.status(500).json({ error: "Get event failed" });
    }

});


// GET API - getUsers
app.get("/getUsers", async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ name: 1 });
    const usersCount = await userModel.countDocuments({});
    res.send({ users: users, count: usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET API - for retrieving a single user
app.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    // Find the user by _id
    const user = await userModel.findById(id);
    res.send({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//update task 
app.put("/updateTask/:id", async (req, res) => {
  try {
    const id = req.params.id;


    const { title, description, status, priority, category, dueDate } = req.body;

    const task = await taskModel.findOne({ _id: id });
    
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }


    task.title = title ;
    task.description = description ;
    task.status = status;
    task.priority = priority;
    task.category = category;
    task.dueDate = dueDate;

   
    await task.save();

    res.send({ task: task, msg: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Update failed" });
  }
});


//  Delete User
app.delete("/deleteUser/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

// Delete Task 
app.delete("/deleteTask/:id", async (req, res) => {
  const id = req.params.id; 
  try {

    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task" });
  }
});

//updeate the state complete or not
app.patch("/completeTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
   
    const task = await taskModel.findByIdAndUpdate(
      id, 
      { status: "Completed" }, 
      { new: true } 
    );

    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: "error in update" });
  }
});

const port = ENV.PORT || 3001;
app.listen(port,()=>{
    console.log(`You are connected at port: ${port}`);
})

