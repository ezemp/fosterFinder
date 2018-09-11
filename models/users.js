module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      // allowNull: false
      defaultValue: "test"
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
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    homeType: {
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
