const express = require('express');
const app = express();
const axios = require('axios');

const port = 3000;
app.get('/numbers', async (req, res) => {
    const data = []
    for (let url of req.query.url) {
        await axios.get(url)
            .then(response => {
                data.push(...response.data.numbers)
            })
            .catch(error => {
                console.log(error)
            })
    }
    data.sort((a, b) => a - b)
    const unique = [...new Set(data)]
    res.send({"numbers": unique })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
