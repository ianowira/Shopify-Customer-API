const routes = require('express').Router();

require('express');

const Customer = require('../actions/customer');
const CacheService = require('../config/CacheService');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

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
    res.status(200).send({
      profile: user[0],
      orders: user[1],
      gift_cards: user[2]
    });
  }

  const key = `getUSER_${id}`;

  if (process.env.NODE_ENV === 'production') {
    cache.get(key, () => profile());
  } else {
    profile();
  }

});

routes.use((req, res) => {
  return res.status(404).send({
    message: 'Sorry can\'t find that!'
  });
});

module.exports = routes;
