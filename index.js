const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const FileStore = require('session-file-store')(session);
const User = require('./models/User');
const conn = require('./db/conn');
const produtosRoutes = require('./routes/produtosRoutes');
const ProdutoController = require('./controllers/ProdutoController');
const authRoutes = require('./routes/authRoutes')
const Carrinho = require('./models/Carrinho');
const { FORCE } = require('sequelize/lib/index-hints');

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.urlencoded({
    extended: true,
}));

app.use(session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }
    ),
    cookie:{
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
    }
}))

app.use(flash());
app.use(express.static('public'))

app.use( (req,res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next();
})

app.use('/products', produtosRoutes)
app.use('/', authRoutes)
app.get('/', ProdutoController.showProdutos)

conn.sync()
.then(()=>{
    app.listen(3000)
}).catch((e)=>{
    console.log(e)
})

