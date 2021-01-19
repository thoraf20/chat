import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  image: { type: String, required: true }
});

export default mongoose.model('User', schema);
