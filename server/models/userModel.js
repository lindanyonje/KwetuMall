import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter firstName'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter lastName'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
  },
  shippingDetails: [
    {
      country: {
        type: String,
        required: [true, 'Please enter email'],
      },
      aptNo: {
        type: String,
        required: [true, 'Please enter Apt no'],
      },
      address: {
        type: String,
        required: [true, 'Please enter address'],
      },
      zipcode: {
        type: String,
        required: [true, 'Please enter zipcode'],
      },
    },
  ],

  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  password: {
    type: String,
  },
  cart: {
    type: [Object],
  },
  wishlist: {
    type: [String],
  },
});

export default model('userModel', userSchema);
