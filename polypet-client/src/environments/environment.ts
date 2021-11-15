// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const CATALOG_HOST = "https://catalog-dot-si5-cloud-i.oa.r.appspot.com/"
const PRODUCT_CREATOR_HOST = "https://product-creator-dot-si5-cloud-i.oa.r.appspot.com/"
const COMMAND_HOST = "https://????????/"


export const environment = {
  production: true,
  catalog_url:{
    CATALOG_GET_ALL_PRODUCT:CATALOG_HOST+"catalog/get-all-products",
    CATALOG_GET_PRODUCT_DETAIL:CATALOG_HOST+"catalog/get-detailed-product",
    CATALOG_GET_LAST_PRODUCT:CATALOG_HOST+"catalog/get-latest-products",
  },
  product_creator_url:{
    ADD_PRODUCT:PRODUCT_CREATOR_HOST+"product-request/add-new-product",
  },
  command_url:{
    COMMAND_GET_ALL_COMMAND_ID:COMMAND_HOST+"client-command",
    COMMAND_GET_COMMAND_STATUS:COMMAND_HOST+"get-command-status",
    COMMAND_GET_DELIVERY_INFO:COMMAND_HOST+"delivery-information",
    COMMAND_SET_DELIVERY_DATE:COMMAND_HOST+"set-delivery-date",
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
