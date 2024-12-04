const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db/conn')
const User = require('./User');
const sequelize = require('../db/conn');
const Produtos = require('./Produtos');

const Carrinho = db.define('Carrinho', {
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

Carrinho.belongsTo(User);
User.hasOne(Carrinho);


module.exports = Carrinho;