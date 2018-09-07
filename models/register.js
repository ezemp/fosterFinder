module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[6]
      }
    }, 
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    home_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    children: {
       type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
