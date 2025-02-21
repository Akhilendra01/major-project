const express=require('express');
const morgan=require('morgan');
const db=require('./db');

const app=express();

app.use(express.json());
app.use(morgan('dev'));

const router=require('./router');
app.use(router);

app.listen(8080, ()=>{
    console.log('Listening on port 8080')
});