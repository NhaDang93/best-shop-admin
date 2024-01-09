import mongoose from 'mongoose';

// const { MONGODB_URI } = process.env

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log(`MongoDB readyState: ${mongoose.connection.readyState}`);
    return;
  }

  try {
    await mongoose.connect(
      'mongodb+srv://dangquocnhaiy93:7BMg9hjbcnWSiGWS@cluster0.pwbuvvr.mongodb.net/admin-best-shop?retryWrites=true&w=majority',
      { autoCreate: true, appName: '' }
    );

    console.log(`MongoDB Connected: ${mongoose.connection.readyState}`);
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
