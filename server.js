import express from 'express';

const app = express();

app.get("/", (request, response) => {
    response.setHeader(200, {'Content-Type': 'application/json'});
})

app.listen(8081, () => {
    console.log(`The server is listening on the port ${8081}`)
})
