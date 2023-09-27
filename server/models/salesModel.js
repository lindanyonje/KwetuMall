import {model,Schema} from 'mongoose';

const salesSchema = new Schema({
    productId:{
        type: String,
        required: [true, 'Please add a product Id']
    },
    userId:{
        type: String,
        required: [true, 'Please add a user Id']
    },
    
    quantity: {
        type: Number,
        required: [true, 'Please provide quantity']
    },
    buyingPrice: {
        type: Number,
        required: [true, 'Please provide buying price']
    },
    sellingPrice: {
        type: Number,
        required: [true, 'Please provide selling price']
    },
    
});

export default model('salesModel',salesSchema);

