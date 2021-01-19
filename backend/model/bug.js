import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model('Bug', schema);
