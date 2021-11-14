const CATALOG_HOST = "https://catalog-dot-si5-cloud-i.oa.r.appspot.com/"
const PRODUCT_CREATOR_HOST = "https://product-creator-dot-si5-cloud-i.oa.r.appspot.com/"

export const environment = {
  production: true,
  catalog_url:{
    CATALOG_GET_ALL_PRODUCT:CATALOG_HOST+"catalog/get-all-products",
    CATALOG_GET_PRODUCT_DETAIL:CATALOG_HOST+"catalog/get-detailed-product",
    CATALOG_GET_LAST_PRODUCT:CATALOG_HOST+"catalog/get-latest-products",
  },
  product_creator_url:{
    ADD_PRODUCT:PRODUCT_CREATOR_HOST+"product-request/add-new-product",
  }
};
