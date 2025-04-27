const express = require('express') //import Express
const app = express() //to create app
const signupRoute = require("./routes/user-routes");
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

//setting up route for API
// app.get("/api", (req, res) => {
//     res.json({"users": ["user1", "user2"]})
// }
// )

app.use(bodyParser.json());
app.use('/api', signupRoute);

app.listen(5000, () => {console.log("Server started on port 5000")})