import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
});

// const Message = mongoose.model('Message', messageSchema);

export default mongoose.models.Message ||
  mongoose.model('Message', messageSchema);
