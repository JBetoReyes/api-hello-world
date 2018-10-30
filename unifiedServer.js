// Dependencies
const url = require('url');
const router = require('./routes');
const { StringDecoder } = require('string_decoder');

module.exports = async function(req, res) {
    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const queryStringObj = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;
    const choosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : router.notFound;
    const buffer = '';
    const payload = await getPayload(req, buffer);

    const data = {
        method,
        headers,
        payload,
        path: trimmedPath,
        query: queryStringObj,
    };

    choosenHandler(data, (status, payload) => {
        status = typeof status === 'number' ? status : 200;
        payload = typeof payload === 'object' ? payload : {};
        payloadStringify = JSON.stringify(payload);

        res.setHeader("Content-Type", "application/json");
        res.writeHead(status);
        res.end(JSON.stringify(payload));

        console.log('Returning this response: ', status, payloadStringify);
    })

};

const getPayload = function getData(req, buffer) {
    return new Promise((resolve, reject) => {
        const decoder = new StringDecoder('utf-8');
        req.on('data', (data) => {
            buffer +=  decoder.write(data);
        });

        req.on('end', () => {
            buffer += decoder.end();
            if (req.headers['content-type'] === 'application/json') buffer = JSON.parse(buffer);
            resolve(buffer);
        });
    });
};