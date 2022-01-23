const express = require('express');
const candidates = require('./routes/candidates');
const app = express();
require('./startups/db')();
app.use(express.json());
app.use('/api/candidates', candidates);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port no: ${PORT}`);
})



