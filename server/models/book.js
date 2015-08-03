module.exports = function(sequelize, DataTypes) {

var Book = sequelize.define('Book',
  {
    name: DataTypes.STRING
  },{
    classMethods: {
      associate: function(models) {
        Book.hasMany(models.Paragraph);
      }
    }
  });

  return Book;

};
