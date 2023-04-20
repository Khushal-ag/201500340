const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

const base_url = 'http://localhost:3000';

function getdata() {
    axios.post(`${base_url}/register`, { 'companyName': 'Afford' }).then((res) => {
        console.log(res.data)
        axios.post(`${base_url}/auth`, res.data).then((res) => {
            axios.get(`${base_url}/trains`, { headers: { Authorization: `Bearer ${res.data.access_token}` } }).then((res) => {
                console.log(res.data)
            }).catch((err) => { console.log(err); })
        })
    }).catch((err) => {
        console.log(err);
    })
}

getdata()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});