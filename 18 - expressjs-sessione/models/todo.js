"use strict";
const { Model } = require("sequelize");

const List = require("../models/list");
module.exports = (sequelize, DataTypes) => {
  //
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.List, { foreignKey: "listId" });
    }
  }
  Todo.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      todo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "todos",
      underscored: true,
    }
  );
  return Todo;
};
