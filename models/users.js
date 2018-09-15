module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    homeType:{
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    children: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shelters:{
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  
  return User;
};
