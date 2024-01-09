import mongoose, { Document, Model } from 'mongoose';

export interface MoneyRecordBoardDocument extends Document {
  price: String;
  id: string;
}

const MoneyRecordBoardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  priceCash: {
    type: Number,
    required: [true, 'Price is required!'],
    maxlength: [30, 'Price cannot be more than 30 characters'],
  },
  priceATM: {
    type: Number,
    required: [true, 'Price is required!'],
    maxlength: [30, 'Price cannot be more than 30 characters'],
  },
  priceSellOnline: {
    type: Number,
    required: [true, 'Price is required!'],
    maxlength: [30, 'Price cannot be more than 30 characters'],
  },
  price: {
    priceType: {
      type: String,
      required: [true, 'Price is required!'],
      maxlength: [10, 'Price cannot be more than 10 characters'],
    },
    date: {
      required: [true, 'Date is required!'],
      type: Date,
    },
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  note: {
    type: String,
    required: true,
    default: '',
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createUser: {
    type: String,
    required: [true, 'CreateUser is required!'],
    maxlength: [30, 'CreateUser cannot be more than 30 characters'],
  },
});

const MoneyRecordBoard: Model<MoneyRecordBoardDocument | any> =
  mongoose.models.moneyRecordBoards ||
  mongoose.model<MoneyRecordBoardDocument>(
    'moneyRecordBoards',
    MoneyRecordBoardSchema
  );

export default MoneyRecordBoard;
