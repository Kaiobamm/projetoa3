const express = require('express')
const router = express.Router()
const ProdutoController = require('../controllers/ProdutoController')
const checkAuth = require('../helpers/auth').checkAuth


router.post('/destroy', ProdutoController.destroy)
router.post('/cart', ProdutoController.cartSave)
router.get('/cart', ProdutoController.cart)
router.get('/add', checkAuth, ProdutoController.createProduto)
router.post('/add', checkAuth, ProdutoController.createProdutoSave)
router.get('/edit/:id', checkAuth, ProdutoController.updateProduto)
router.post('/edit', checkAuth, ProdutoController.updateProdutoSave)
router.get('/dashboard', ProdutoController.dashboard)
router.post('/remove', checkAuth, ProdutoController.removeProduto)
router.get('/', ProdutoController.showProdutos)


module.exports = router