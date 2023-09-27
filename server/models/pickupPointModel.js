import { model, Schema } from 'mongoose';

const pickupPointSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a pickupPoint name'],
  },
  location: {
    type: String,
    required: [true, 'Please add location'],
  },
});

export default model('pickupPointModel', pickupPointSchema);
