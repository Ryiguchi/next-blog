import mongoose from 'mongoose';
import 'dotenv/config';
import Message from '../../models/message.model';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({
        status: 'failed',
        message: 'Invalid input.',
      });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.ipifet7.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

    try {
      await mongoose.connect(connectionString);

      const newDoc = await Message.create(newMessage);

      mongoose.disconnect();

      res.status(201).json({
        status: 'success',
        message: newDoc,
      });
      //
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'Error saving your message.',
      });
      return;
    }
  }
}

export default handler;
