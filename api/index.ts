require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    const { name = 'World' } = req.query
    return res.json({
      message: `Hello ${name}!`,
    })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;