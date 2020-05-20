import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  Productname: String,
  Productdesc: String,
  Price: Number,
  Brand: String,
  Barcode: Number,
  Image: Object
});

const Product = mongoose.model('Product', productSchema);

export default Product;
