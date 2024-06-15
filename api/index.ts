const express = require('express');
const routes = require('./presentation/express');
require('dotenv').config();

function createServer () {
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());
    app.use('/', routes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

    return app;
}


createServer();