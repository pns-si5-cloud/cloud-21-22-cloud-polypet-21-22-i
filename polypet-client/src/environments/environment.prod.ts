const CATALOG_HOST = "https://catalog-dot-si5-cloud-i.oa.r.appspot.com/"
export const environment = {
  production: true,
  catalog_url:{
    CATALOG_GET_ALL_PRODUCT:CATALOG_HOST+"catalog/get-all-products",
    CATALOG_GET_PRODUCT_DETAIL:CATALOG_HOST+"catalog/get-detailed-product",
    CATALOG_GET_LAST_PRODUCT:CATALOG_HOST+"catalog/get-latest-products",
  }
};
