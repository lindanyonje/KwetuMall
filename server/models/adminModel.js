import { model, Schema } from 'mongoose';

const adminSchema = new Schema({
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
  phoneNumber: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  password: {
    type: [String],
  },
});

export default model('adminModel', adminSchema);
