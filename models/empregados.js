const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var empregados = sequelize.define('empregados',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING
      },
      salarioBruto: {
        type: DataTypes.DOUBLE(8, 2)
      },
      departamento: {
        type: DataTypes.INTEGER
      }
    },
    { timestamps: false }
  )

  // empregados.sync( { force: true } )

  return empregados
}
