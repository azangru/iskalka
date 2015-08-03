module.exports = function(sequelize, DataTypes) {

var Paragraph = sequelize.define('Paragraph',
  {
    left: DataTypes.TEXT,
    right: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Paragraph.belongsTo(models.Book, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Paragraph;

};
