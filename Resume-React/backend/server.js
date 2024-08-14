require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const authRoutes=require("./routes/auth");
const ProductRouter=require("./routes/ProductRouter");
const app = express();
const cors=require('cors');



// middleware
// app.use(express.json());


const PORT = process.env.PORT || 3000;
const db=process.env.DBURI;

app.use(bodyParser.json());
app.use(cors());


// app.post('/login', (req, res) => {
//     // Example logic
//     const email = req.body.email;
//     const password = req.body.password;
    
//     if (email === 'email' && password === 'password') {
//         res.send('Login successful');
//     } else {
//         res.send('Login failed');
//     }
// });

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
})
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Failed to connect to MongoDB",err);

})
app.use(authRoutes);
app.use('/products',ProductRouter);

