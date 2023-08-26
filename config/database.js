const Sequelize = require('sequelize')

sequelize = new Sequelize ('kanté','root','',{
    host: 'localhost',
    dialect:'mysql'
} )

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}