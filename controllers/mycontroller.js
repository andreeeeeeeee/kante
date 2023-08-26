const { sequelize, Sequelize } = require('../config/database')
const { Op } = Sequelize;
const empregadosModel = require('../models/empregados')(sequelize, Sequelize)

exports.showForm = (req, res) => {
  res.render("myform", { layout: false });
}

exports.save = (req, res) => {
  const empregadoSetData = {
    nome: req.body.nome,
    salarioBruto: req.body.salarioBruto,
    departamento: req.body.departamento
  };

  empregadosModel.create(empregadoSetData).then(data => {
    console.log('Data saved');
    res.redirect('/')
  }).catch(err => {
    console.log("Error" + err)
  })

}

exports.showResult = (req, res) => {
  empregadosModel.findAll(
    {
      order: [['id', 'ASC']]

    }).then(results => {

      res.render("myresult", { resultado: results });

    }).catch(err => {
      console.log("Error" + err)
      res.status(500).send({ message: "Error" + err.message })
    })
}

exports.menorSalario = (req, res) => {
  empregadosModel.findOne({
    order: [['salarioBruto', 'ASC']]
  }).then(results => {

    res.render("myresult", { resultado: [results] });

  }).catch(err => {
    console.log("Error" + err)
    res.status(500).send({ message: "Error" + err.message })
  })
}

exports.maiorSalario = (req, res) => {
  empregadosModel.findOne({
    order: [['salarioBruto', 'DESC']]
  }).then(results => {
    res.render("myresult", { resultado: [results] });

  }).catch(err => {
    console.log("Error" + err)
    res.status(500).send({ message: "Error" + err.message })
  })
}

exports.qtdAdm = (req, res) => {
  empregadosModel.count({
    where: {
      departamento: 1
    },
    order: [['id', 'ASC']]
  }).then(count => {
    empregadosModel.findAll({
      where: {
        departamento: 1
      },
      order: [['id', 'ASC']]
    }).then(results => {

      res.render("myresult", { count: count, resultado: results });

    }).catch(err => {
      console.log("Error" + err)
      res.status(500).send({ message: "Error" + err.message })
    })
  })
}



exports.search = (req, res) => {
  const query = `%${req.body.nome}%`;
  empregadosModel.findAll({
    where: {
      nome: { [Op.like]: query },
    },
    order: [['id', 'ASC']]
  }).then(results => {

    res.render("myresult", { resultado: results });

  }).catch(err => {
    console.log("Error" + err)
    res.status(500).send({ message: "Error" + err.message })
  })
}

exports.dept = (req, res) => {
  empregadosModel.findAll(
    {
      where: {
        departamento: req.body.departamento
      },
      order: [['id', 'ASC']]
    }).then(results => {

      res.render("myresult", { resultado: results });

    }).catch(err => {
      console.log("Error" + err)
      res.status(500).send({ message: "Error" + err.message })
    })
}