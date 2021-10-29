var sleep = require("./utils").sleep
var arrayNotEmpty = require("./utils").arrayNotEmpty
var retryRequest = require("./utils").retryRequest
var doRequest = require("./utils").doRequest

async function main(){
    var product = {name:"productTest",price:200,category:"chien",description:"test description",partnerID:"partnerIDTest", ingredient:"poulet",dimension:"1cm/1cm/1cm"};
    var product2 = {name:"productTest2",price:200,category:"chat",description:"test description 2 ",partnerID:"partnerIDTest2", ingredient:"boeuf",dimension:"1cm/1cm/1cm"};

    //response = await doRequest({ url: "http://catalog:3003/catalog/add-product", form:{product:product},method: "POST" });
    //response = await doRequest({ url: "http://catalog:3003/catalog/add-product", form:{product:product2},method: "POST" });

    //console.log(response.body);

    response = await doRequest({ url: "http://catalog:3003/catalog/get-all-products", method: "GET" });
    var product = JSON.parse(response.body);
    console.log(product);
    var product1ID = product[0].productID;
    console.log(product1ID);

    response = await doRequest({ url: "http://catalog:3003/catalog/get-latest-products", method: "GET" });
    console.log("latest")
    console.log(JSON.parse(response.body));

    response = await doRequest({ url: "http://catalog:3003/catalog/get-detailed-product",qs:{productID:product1ID}, method: "GET" });
    console.log("detailed")
    console.log(JSON.parse(response.body));

    response = await doRequest({ url: "http://catalog:3003/catalog/verify-product",qs:{productID:product1ID}, method: "GET" });
    console.log("verify")
    console.log(JSON.parse(response.body));
}

main();