var sleep = require("./utils").sleep
var arrayNotEmpty = require("./utils").arrayNotEmpty
var retryRequest = require("./utils").retryRequest
var doRequest = require("./utils").doRequest

async function main(){
    var product = {name:"productTest",price:200,category:"chien",description:"test description",partnerID:"partnerIDTest", ingredient:"poulet",dimension:"1cm/1cm/1cm"};

    response = await doRequest({ url: "http://catalog:3003/catalog/add-product", form:{product:product},method: "POST" });
    console.log(response.body);
}

main();