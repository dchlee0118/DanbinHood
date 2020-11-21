const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        stock: 'stock!!',
        option: 'options!!'
    });
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Connected to server, port: ' + PORT));