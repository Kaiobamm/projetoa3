const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db/conn')
const User = require('./User');
const sequelize = require('../db/conn');
const Carrinho = require('./Carrinho')

const Produtos = db.define('produtos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DOUBLE
    },
    img: {
        type: DataTypes.STRING
    },
})

Produtos.belongsTo(User);
User.hasMany(Produtos);
Produtos.hasMany(Carrinho)

module.exports = Produtos;