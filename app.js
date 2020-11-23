const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))

function getStockQuote(callBack, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_a0a325f1f3204db4ad99a33ec36ea3ee', { json: true }, (err, res, body) => {
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

app.get('/', (req, res, error) => {
    try {
        res.render('home')
    } catch (error) {
        console.log(error)
    }
})

app.get('/about', (req, res, error) => {
    try {
        res.render('about')
    } catch (error) {
        console.log(error)
    }
})

app.post('/', (req, res) => {
    getStockQuote(function (doneStockQuote) {
        res.render('stockInfo', {
            stock: doneStockQuote,
            option: 'options!!'
        });
    }, req.body.stockTicker);
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Connected to server, port: ' + PORT));