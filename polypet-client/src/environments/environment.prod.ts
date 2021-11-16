const CATALOG_HOST = "https://catalog-dot-si5-cloud-i.oa.r.appspot.com/"
const PRODUCT_CREATOR_HOST = "https://product-creator-dot-si5-cloud-i.oa.r.appspot.com/"
const COMMAND_HOST = "https://shipping-dot-si5-cloud-i.oa.r.appspot.com/"

export const environment = {
  production: true,
  catalog_url:{
    CATALOG_GET_ALL_PRODUCT:CATALOG_HOST+"catalog/get-all-products",
    CATALOG_GET_PRODUCT_DETAIL:CATALOG_HOST+"catalog/get-detailed-product",
    CATALOG_GET_LAST_PRODUCT:CATALOG_HOST+"catalog/get-latest-products",
  },
  product_creator_url:{
    ADD_PRODUCT:PRODUCT_CREATOR_HOST+"product-request/add-new-product",
    ADD_PRODUCT_REQUEST:PRODUCT_CREATOR_HOST+"product-request/add-new-product-request",
    GET_DETAILED_PRODUCT_REQUEST:PRODUCT_CREATOR_HOST+"product-request/get-detailed-product-request",
    GET_ALL_REQUEST:PRODUCT_CREATOR_HOST+"product-request/all-product-requests",
    VALIDATE_REQUEST:PRODUCT_CREATOR_HOST+"product-request/validate-request"
  },
  command_url:{
    COMMAND_GET_ALL_COMMAND_ID:COMMAND_HOST+"client-command",
    COMMAND_GET_COMMAND_STATUS:COMMAND_HOST+"get-command-status",
    COMMAND_GET_DELIVERY_INFO:COMMAND_HOST+"delivery-information",
    COMMAND_SET_DELIVERY_DATE:COMMAND_HOST+"set-delivery-date",
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
