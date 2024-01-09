import mongoose from 'mongoose';

// const { MONGODB_URI } = process.env

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log(`MongoDB readyState: ${mongoose.connection.readyState}`);
    return;
  }

  try {
    await mongoose.connect(
      'mongodb+srv://dangquocnha:7LXCXbLZx1Dp9IkP@cluster0.zfhvzsi.mongodb.net/bestShop?retryWrites=true&w=majority',
      { autoCreate: true, appName: '' }
    );

    console.log(`MongoDB Connected: ${mongoose.connection.readyState}`);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
