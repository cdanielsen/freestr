'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pile = sequelize.define('Pile', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    items: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pile;
};