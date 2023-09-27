import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import classRoutes from './routes/classRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import pickupPointRoutes from './routes/pickupPointRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userAuthRoutes from './routes/auth/userAuthRoutes.js';
import cartRoutes from './routes/cartRoutes.js'

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));
//app.use( express.static( 'public' ));

app.use('/',classRoutes);
app.use('/',categoryRoutes);
app.use('/',pickupPointRoutes);
app.use('/', productRoutes);
app.use('/', userAuthRoutes);
app.use('/',cartRoutes);


const mongoURI = 'mongodb+srv://LindaNyonje:' + encodeURIComponent('E5gD0Nj78YDMOqrY')+
'@cluster0.t01zdqc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURI)
        .then(()=>console.log('connected to mongo db'))
        .catch(()=>console.log(err.message));
app.listen(PORT, () =>{
    console.log('Server listening on port: '+ PORT)
});

//GET, POST

//C - create - storing data in the database eg creating a new category, electronis :post
//R - read - retrieving data from the database : GET
//U - update - editing data in the database, change to electronics : POST
//D - delete - deleting from the database : POST



