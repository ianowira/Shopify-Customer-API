// eslint-disable-next-line no-unused-vars
const async = require('express-async-await');
// eslint-disable-next-line no-redeclare
const fetch = require('node-fetch');
const base64 = require('base-64');
const ShopifyConfig = require('../config/Shopify').config;

function Customer(id) {
  this.id = id;

  this.profile = async function getCustomerAsync(id) {
    const response = await fetch(
      `${ShopifyConfig.baseURL}/customers/${id}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64.encode(`${ShopifyConfig.apiKey}:${ShopifyConfig.password}`)}`,
      },
    });

    let data = await response.json()
    return data;
  }

  this.giftCards = async function giftCardsAsync(id) {
    const response = await fetch(
      `${ShopifyConfig.baseURL}/gift_cards.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64.encode(`${ShopifyConfig.apiKey}:${ShopifyConfig.password}`)}`,
      },
    });

    let data = await response.json()
    return data.gift_cards.filter(giftCard => {

      return giftCard.customer_id === parseInt(id);
    });
  }

  this.all = async function getAll() {
    const response = await Promise.all([this.profile(this.id), this.giftCards(this.id)]);
    return await response;
  }
}

module.exports = Customer;
