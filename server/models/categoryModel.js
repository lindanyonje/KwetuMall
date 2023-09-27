import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
  },
});

export default model('categoryModel', categorySchema);
