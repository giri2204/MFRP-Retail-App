import Product from '../models/product';
import BaseCtrl from './base';

class ProductCtrl extends BaseCtrl {
  model = Product;
}

export default ProductCtrl;
