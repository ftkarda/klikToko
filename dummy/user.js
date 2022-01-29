'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcryptjs')
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.UserDetail, {foreignKey: "UserDetailId"})
      User.belongsToMany(models.Product, {through: models.Transaction})

    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    UserDetailId: DataTypes.INTEGER 
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash  
      }
    },
    modelName: 'User',
  });
  return User;
};