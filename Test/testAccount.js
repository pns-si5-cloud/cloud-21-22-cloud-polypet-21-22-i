var sleep = require("./utils").sleep
var arrayNotEmpty = require("./utils").arrayNotEmpty
var retryRequest = require("./utils").retryRequest
var doRequest = require("./utils").doRequest

async function main(){
    var name = "Dupont";
    var surname = "Tintin";
    var address = "address";
    var mail = "duponttintin@gmail.com";
    var password = "uncaractèrespécial";
    var username = "TintinDupont";

    response = await doRequest({ url: "http://account:3005/account/new-customer", form:{name:name, surname:surname, address:address, mail:mail, username:username, password:password}, method: "POST"});
    console.log(response.body);

    response = await doRequest({ url: "http://account:3005/account/new-partner", form:{name:name, username:username, password:password}, method: "POST"});
    console.log(response.body);

    response = await doRequest({ url: "http://account:3005/account/new-employee", form:{name:name, surname:surname, username:username, password:password}, method: "POST"});
    console.log(response.body);
}

main();