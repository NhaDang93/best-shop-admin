import mongoose, { Document, Model } from 'mongoose';

export interface TypePriceDocument extends Document {
  price: String;
  id: string;
}

const TypePriceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    maxlength: [30, 'Price cannot be more than 30 characters'],
  },
  priceType: {
    type: String,
    required: [true, 'Price is required!'],
    maxlength: [10, 'Price cannot be more than 10 characters'],
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date: {
    required: true,
    type: Date,
  },
  idUser: {
    required: true,
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

const TypePrice: Model<TypePriceDocument | any> =
  mongoose.models.TypePrice ||
  mongoose.model<TypePriceDocument>('TypePrice', TypePriceSchema);

export default TypePrice;
