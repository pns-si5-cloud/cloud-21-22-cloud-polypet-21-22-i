var sleep = require("./utils").sleep
var arrayNotEmpty = require("./utils").arrayNotEmpty
var retryRequest = require("./utils").retryRequest
var doRequest = require("./utils").doRequest

async function main(){
    var name = "productTest";
    var price = 200;
    var category = "chien";
    var description = "test";
    var partner_id = "id";
    var ingredient = "poulet";
    var dimension = "1cm²";

    var name2 = "productTest2";
    var price2 = 300;
    var category2 = "chat";
    var description2 = "test2";
    var partner_id2 = "id2";
    var ingredient2 = "boeuf";
    var dimension2 = "2cm²";

    response = await doRequest({ url: "http://product-creator:3004/product-request/add-new-product", form:{name:name, price:price, category:category, description:description, partner_id:partner_id, ingredient:ingredient, dimension:dimension}, method: "POST"});
    console.log(response);

    //response = await doRequest({ url: "http://product-creator:3004/product-request/add-new-product-request", form:{name:name2, price:price2, category:category2, description:description2, partner_id:partner_id2, ingredient:ingredient2, dimension:dimension2}});
    //var id = response.body;
}

main();