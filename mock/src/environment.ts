const CATALOG_HOST = 'https://catalog-dot-si5-cloud-i.oa.r.appspot.com/';
const SHIPPING_HOST = 'https://shipping-dot-si5-cloud-i.oa.r.appspot.com/';
const MOCK_HOST = 'https://mock-dot-si5-cloud-i.oa.r.appspot.com/';
const ORDER_HOST = 'https://order-dot-si5-cloud-i.oa.r.appspot.com/';
const SHOPPING_CART_HOST = 'https://shopping-cart-dot-si5-cloud-i.oa.r.appspot.com/';
export const environment = {
  catalog: { URL_GET_DETAILED_PRODUCT_CATALOG: CATALOG_HOST+ "get-detailed-product"},
  mock: { URL_TRANSACTION_MOCK: MOCK_HOST + "transaction"},
  shipping: { URL_PAIEMENT_CONFIRMATION_SHIPPING: SHIPPING_HOST + "paiement-confirmation" },
  shopping_cart: { URL_SHOPPING_CART_SHOPPING_CART: SHOPPING_CART_HOST + "shopping-cart"},
  order: { URL_VALIDATION_ORDER: ORDER_HOST + "order/validation"},

};
