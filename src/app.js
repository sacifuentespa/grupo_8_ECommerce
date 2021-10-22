const express = require('express');
const path = require("path")
const app = express();
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, './public')));

//home
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

//login
app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

//register
app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

//productPage
app.get('/product', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/product.html'));
});

//cart
app.get('/cart', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './views/cart.html'));
});

app.listen(port, ()=>{
    console.log('Servidor funcionando');
});