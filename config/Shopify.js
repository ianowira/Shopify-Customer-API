
module.exports = {
  config: {
    shop: process.env.SHOPIFY_SHOP,
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_PASSWORD,
    baseURL: `https://${process.env.SHOPIFY_SHOP}/admin/api/${process.env.SHOPIFY_API_VERSION}`
  }
}
