const { User, UserDetail, Product, Category } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const changeIdr = require("../helper/changeIDR")
const errors = require("../helper/errors")

class Controller {
  static homePage(req, res) {
    const { name, categoryName } = req.query;
    const { id } = req.params
    let options;
    if (name || categoryName) {
      if (name) {
        options = {
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        };
      } else if (categoryName) {
        options = {
          include: {
            model: Category,
            where: {
              name: {
                [Op.iLike]: `%${categoryName}%`,
              },
            },
          },
        };
      }
    }

    let dataProduct;
    Product.findAll(options)
      .then((data) => {
        dataProduct = data;
        return Category.findAll();
      })
      .then((dataCategory) => {
        res.render("homePage", { dataCategory, dataProduct, id });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static formRegister(req, res) {
    res.render("formRegister");
  }

  static postRegister(req, res) {
    const { name, dateOfBirth, email, password, role } = req.body;
    UserDetail.create({ name, dateOfBirth, email, password, role })
      .then((data) => {
        return User.create({ email, password, role, UserDetailId: data.id });
      })
      .then((data) => {
        res.redirect("/login");
      })
      .catch((err) => {
          let messageErr = errors(err)
        res.send(messageErr)
      });
  }

  static formLogin(req, res) {
    const { error } = req.query;
    console.log(req.query);
    
    res.render("formLogin", { error });
  }

  static postLogin(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            
            req.session.userId = user.id;

            return res.redirect(`/${user.id}`);
          } else {
            const error = "Invalid email/password";
            return res.redirect(`/login?error=${error}`);
          }
        } else {
          const error = "Invalid email/password";
          return res.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => {
          console.log(err);
        res.send(err);
      });
  }

  static getCheckout(req, res) {
        res.render("checkout");
  }

  static productDetails(req, res) {
    let { id } = req.params;
    Product.findByPk(id)
      .then((data) => {
        res.render("productDetails", { data, changeIdr });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static userProfile(req, res) {
      let {id} = req.params
      UserDetail.findOne({id})
      .then(data => {
          console.log(data);
          res.render("userProfile", {data});
      })
      .catch(err => {
          res.send(err)
      })
  }

  static deleteAccount(req, res) {
      let {id} = req.params
      UserDetail.destroy({
          where: {
              id: id
          }
      })
      .then(data => {
          res.redirect("/login")
      })
      .catch(err => {
          res.send(err)
      })
  }

  static editProfile(req, res) {
      let { id } = req.params
      UserDetail.findOne({id})
      .then(data => {
          res.render("formEdit", {data})
      })
      .catch(err => {
          console.log(err);
          res.send(err)
      })
  }

  static postProfile(req, res) {
    let { id } = req.params
    let {name, password, email, dateOfBirth, role} = req.body
    UserDetail.update({name, password, email, dateOfBirth, role}, {
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect(`/${id}`)
    })
    .catch(err => {
        console.log(err);
        res.send(err)
    })
}

}
module.exports = Controller;
