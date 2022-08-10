"use strict";
const User = require("./user");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List.belongsTo(models.User, { foreignKey: "userId" });
      List.hasMany(models.Todo);
    }
  }

  List.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Il campo non può essere vuoto" },
          len: { args: [6, 255], msg: "Lunghezza tra 6 e 255" },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "List",
      tableName: "lists",
      underscored: true,
    }
  );
  return List;
};
