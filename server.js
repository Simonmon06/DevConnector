const express = require('express');
const connectDB = require('./config/db');
const { body } = require('express-validator');
const path = require('path');

//Connect Database
connectDB();

const app = express();
// app.get('/', (req, res) => res.send('API Running'));

//Init Middleware
app.use(express.json({
    extended:false
}))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static asserts in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT || 8888; // run on local port 8888;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
