const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');

const PORT = 3000;

function getStockQuote(callBack) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_a0a325f1f3204db4ad99a33ec36ea3ee', { json: true }, (err, res, body) => {
        try {
            if (res.statusCode === 200) {
                // console.log(body);
                callBack(body)
            }
        } catch (err) {
            console.log(err)
        }
    })
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    getStockQuote(function (doneStockQuote) {
        res.render('home', {
            stock: doneStockQuote,
            option: 'options!!'
        });
    });
})

app.get('/about.html', (req, res) => {
    res.render('about');
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Connected to server, port: ' + PORT));