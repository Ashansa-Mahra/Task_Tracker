const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Task = sequelize.define('Tasks', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'inprogress', 'completed'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Task;
