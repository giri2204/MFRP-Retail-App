import * as express from 'express';

import ProductCtrl from './controllers/product';
import UserCtrl from './controllers/user';


function setRoutes(app) {
  const router = express.Router();
  const productCtrl = new ProductCtrl();
  const userCtrl = new UserCtrl();
  

  // products
  router.route('/products').get(productCtrl.getAll);
  router.route('/products/count').get(productCtrl.count);
  router.route('/product').post(productCtrl.insert);
  router.route('/product/:id').get(productCtrl.get);
  router.route('/product/:id').put(productCtrl.update);
  router.route('/product/:id').delete(productCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  
  
  // Apply the routes to our appliproduction with the prefix /api
  app.use('/api', router);

}

export default setRoutes;
