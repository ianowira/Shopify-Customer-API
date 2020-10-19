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

  currentUser.profile(id).then(data => console.log(data));

  currentUser.giftCards(id).then(data => {
    let gift_cards = data.gift_cards.filter(giftCard => giftCard.customer_id === id)
    console.log(gift_cards);
  });

  res.status(200).json({
    res: req.params
  });
});

routes.use((req, res) => {
  return res.status(404).send({
    message: 'Sorry can\'t find that!'
  });
});

module.exports = routes;
