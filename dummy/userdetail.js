'use strict';


const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
   get formatDate() {
     return this.dateOfBirth.toISOString().split("T")[0];
   }

    static associate(models) {
      UserDetail.hasOne(models.User, {foreignKey: "UserDetailId"});
    }
  }
  UserDetail.init({
    name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name is required!",
          },
        },
      },
    dateOfBirth: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Date is required!",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required!",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Role is required!",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};