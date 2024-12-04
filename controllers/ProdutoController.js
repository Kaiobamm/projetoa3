const Carrinho = require('../models/carrinho')
const Produtos = require('../models/Produtos')
const User = require('../models/User')
const { Op } = require('sequelize')

class ProdutoController{
    static async showProdutos(req, res){

        const userId = req.session.userid

        let search = ''
        if(req.query.search){
            search = req.query.search
        }
       
        const produtos = await Produtos.findAll({raw: true,  where:{
            nome: { [Op.like]: `%${search}%`}
        }})

      res.render('produtos/home', {produtos, userId})
    }

    static async dashboard(req,res){
    //   const userId = req.session.userid;

    //   const user = await User.findOne({where: {id:userId}, 
    //       include: Produto, plain: true })

    //      const Produto = user.Produto.map((resultado)=>{return resultado.dataValues})
    //       //console.log(produtos)
      
    //       if(!user){
    //       res.redirect('/login')
    //       }

    //       let emptyProduto = false;

    //       if(produtos.length === 0){
    //           emptyProdutos = true;
    //       }
    //   res.render('produtos/dashboard',{produtos, emptyProdutos})

    const produtos = await Produtos.findAll({raw: true})
    res.render('produtos/dashboard', {produtos} )

  }
  
  static createProduto(req,res){
      res.render('produtos/create')
  }

  static async createProdutoSave(req,res){
      const produto = {
          nome: req.body.nome,
          preco: req.body.preco,
          img: req.body.img
      }

      await Produtos.create(produto);
      req.flash('message', 'Produto criado com sucesso!')
      req.session.save(()=>{
          res.redirect('/products/dashboard')
      })
  }

  static async removeProduto(req, res){
      const id = req.body.id;
     // const UserId = req.session.userid;

      //await Produtos.destroy({where: {id:id, UserId: UserId}})
      await Produtos.destroy({where: {id:id}})

      req.flash('message', 'Produto removido com sucesso!')
      req.session.save(()=>{
          res.redirect('/products/dashboard')
      })
  }

      static async updateProduto(req,res){
          const id = req.params.id;
          const produto = await Produtos.findOne({where: {id:id}, raw: true});
          res.render('produtos/edit', {produto})
      }

      static async updateProdutoSave(req,res){
          const id = req.body.id;

          const produto = {
              nome: req.body.nome,
              preco: req.body.preco
              
          }
          

          await Produtos.update(produto, {where: {id:id}})

          req.flash('message', 'Produto atualizado com sucesso!')
          
          req.session.save(()=>{
              res.redirect('/products/dashboard')
          })
          
      }

      static async cart(req, res){

        const produtos = await Produtos.findAll({raw: true})

        res.render('produtos/cart', {produtos})
      }

      static async cartSave(req, res){

        const produto = {
            nome: req.body.nome,
            preco: req.body.preco,
            img: req.body.img,
            UserId: req.body.UserId,
        }

        console.log('AQUII', produto)

        // req.flash('message', 'Compra finalizada com sucesso')

        await Carrinho.create(produto)
        res.redirect('/products/cart')

      }

      static async destroy(req, res){
        const id = req.body.id;
        const UserId = req.session.userid;

        console.log('AQUIIII', id)
        console.log('AQUIIII 2',  UserId)

        await Carrinho.destroy({where: {id:id, UserId: UserId}})

        req.session.save(()=>{
            res.redirect('/products/cart')
        })
      }

}























// const resultadoCreate = await Produtos.create({
//     nome: 'mouse',
//     preco: 10,
//     descricao: 'Um mouse USB LINDAO'
// })
// console.log(resultadoCreate)

// const produtos = await Produtos.findAll();
// console.log(produtos);

// const produto = await Produtos.findByPk(1);
// produto.nome = "Mouse Top";
 
// const resultadoSave = await produto.save();
// console.log(resultadoSave);

// Produto.destroy({ where: { id: 1 }});
 
module.exports = ProdutoController