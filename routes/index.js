const routes = require('express').Router();

const {
  response
} = require('express');

const Shopify = require('../config/Shopify');

const shopifyConfig = Shopify.config;

const Customer = require('../actions/customer');

routes.get('/', async (req, res) => {

  res.status(200).json({
    message: "https://planet54.com"
  });

});

// Get Customer
routes.get('/customers/:id', async (req, res) => {
  const id = req.params.id;
  const currentUser = new Customer(id);

  const profile = async () => {
    const user = await currentUser.all();
    res.status(200).send(user);
  }

  profile();

});

routes.use((req, res) => {
  return res.status(404).send({
    message: 'Sorry can\'t find that!'
  });
});

module.exports = routes;
