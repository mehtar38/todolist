const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ToDoList")
mongoose.connection.on("Connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err)=> {
    console.log(`MongoDB Connection error: ${err}`)
})

module.exports = mongoose;