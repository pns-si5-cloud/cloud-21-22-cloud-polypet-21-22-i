// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const CATALOG_HOST = "https://auth-gateway-khl577n.wl.gateway.dev/"
const PRODUCT_CREATOR_HOST = "https://auth-gateway-khl577n.wl.gateway.dev/"
const COMMAND_HOST = "https://auth-gateway-khl577n.wl.gateway.dev/"
const MOCK_HOST = "https://mock-dot-si5-cloud-i.oa.r.appspot.com/"
const SHOPPING_CART_HOST = "https://auth-gateway-khl577n.wl.gateway.dev/"
const ORDER_HOST = 'https://auth-gateway-khl577n.wl.gateway.dev/';


export const environment = {
  production: true,
  catalog_url:{
    CATALOG_GET_ALL_PRODUCT:CATALOG_HOST+"catalog/get-all-products",
    CATALOG_GET_PRODUCT_DETAIL:CATALOG_HOST+"catalog/get-detailed-product",
    CATALOG_GET_LAST_PRODUCT:CATALOG_HOST+"catalog/get-latest-products",
  },
  order: {
    PROCEED_TO_PAYMENT: ORDER_HOST + "order/proceed-to-payment"
  },
  product_creator_url:{
    ADD_PRODUCT:PRODUCT_CREATOR_HOST+"product-request/add-new-product",
    ADD_PRODUCT_REQUEST:PRODUCT_CREATOR_HOST+"product-request/add-new-product-request",
    GET_DETAILED_PRODUCT_REQUEST:PRODUCT_CREATOR_HOST+"product-request/get-detailed-product-request",
    GET_ALL_REQUEST:PRODUCT_CREATOR_HOST+"product-request/all-product-requests",
    VALIDATE_REQUEST:PRODUCT_CREATOR_HOST+"product-request/validate-request",
    DELETE_REQUEST:PRODUCT_CREATOR_HOST+"product-request/delete-product-request"
  },
  command_url:{
    COMMAND_GET_ALL_COMMAND_ID:COMMAND_HOST+"client-command",
    COMMAND_GET_COMMAND_STATUS:COMMAND_HOST+"get-command-status",
    COMMAND_GET_DELIVERY_INFO:COMMAND_HOST+"delivery-information",
    COMMAND_SET_DELIVERY_DATE:COMMAND_HOST+"set-delivery-date",
    PAIEMENT_CONFIRMATION_SHIPPING: COMMAND_HOST + "paiement-confirmation"
  },
  mock:{
    BANK_ADD_CARD:MOCK_HOST+"add-card",
    BANK_BALANCE:MOCK_HOST+"balance",
    BANK_ADD_AMOUNT:MOCK_HOST+"add-amount",
    BANK_TRANSACTION_MOCK: MOCK_HOST + "transaction"
  },
  shopping_cart_url:{
    SHOPPING_CART_GET_BY_CART_ID:SHOPPING_CART_HOST+"shopping-cart",
    SHOPPING_CART_GET_BY_CLIENT_ID:SHOPPING_CART_HOST+"shopping-cart/cart",
    SHOPPING_CART_VALIDATE_CART:SHOPPING_CART_HOST+"shopping-cart/validate",
    SHOPPING_CART_ADD_PRODUCT:SHOPPING_CART_HOST+"shopping-cart/product",
  },
  firebase: {
    apiKey: "AIzaSyDUsoMwYzky1XLp-nBRQ6g2vBdKIb4aikE",
    authDomain: "si5-cloud-i.firebaseapp.com",
    projectId: "si5-cloud-i",
    storageBucket: "si5-cloud-i.appspot.com",
    messagingSenderId: "44599086275",
    appId: "1:44599086275:web:ff7f527b2065796c7be676",
    measurementId: "G-FSM2GT44X5"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
