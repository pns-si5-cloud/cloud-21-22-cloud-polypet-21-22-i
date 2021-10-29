var request = require('request');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function arrayNotEmpty(arr){
    return arr.length>0
}
async function retryRequest(req,condition,retryNB=50){
    var response;
    var first = true;
    var tryNb = 0;
    while(first||!condition(body)){
        first=false
        tryNb++
        await sleep(1000)
        response = await doRequest(req);
        body = JSON.parse(response.body)
        if(tryNb>retryNB && !condition(body)){
            throw new Error("too long for do request")
        }
    }
    return response;

}

function doRequest(req) {
    return new Promise(function(resolve, reject) {
        request(req, function(error, res, body) {
            resolve({ error, res, body });
        });
    });
}

module.exports = {sleep,arrayNotEmpty,retryRequest,doRequest}
