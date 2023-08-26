const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appRoutes = require("./routes/approutes")

const { sequelize, Sequelize } = require('./config/database')
const empregadosModel = require('./models/empregados')(sequelize, Sequelize)

// handlebars configuration
const handlebars = require("express-handlebars")
const handlebars_mod = require("handlebars")

const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")

const hbs = handlebars.create({
  defaultLayout: false,
  handlebars: allowInsecurePrototypeAccess(handlebars_mod),

  helpers: {
    depart: (value) => {
      switch (value) {
        case 1:
          return "Administrativo";
        case 2:
          return "Designer";
        case 3:
          return "Contábil";
        case 4:
          return "Fábrica";
      }
    },

    liquido: (value) => {
      let liquido = value;

      let inss = 99;
      if (value > 7507.49) {
        inss += 511.08 + 124.28 + 112.61;
      } else if (value >= 3856.95) {
        inss += (value - 3856.95) * 0.14 + 124.28 + 112.61;
      } else if (value >= 2571.3) {
        inss += (value - 2571.3) * 0.12 + 112.61;
      } else if (value >= 1320.01) {
        inss += (value - 1320.01) * 0.09;
      }
      liquido -= inss;
      
      let irf = 0;
      if (liquido >= 4664.69) {
        irf = liquido * 0.27 - 884.96; 
      } else if (liquido >= 3751.06) {
        irf = liquido * 0.225 - 651.73;
      } else if (liquido >= 2826.66) {
        irf = liquido * 0.15 - 370.4;
      } else if (liquido >= 2112.01) {
        irf = liquido * 0.075 - 158.4;
      }
      liquido -= irf;

      return liquido.toFixed(2);
    }
  }
})

app.engine('handlebars', hbs.engine);

app.set('views', path.join("./views"))
app.set('view engine', 'handlebars')

app.use('/users', (req, res, next) => {
  console.log('will run before users route');
  next();
});

app.use(appRoutes)

app.listen(3000, () => {
  console.log('app is running');
});
