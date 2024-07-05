module.exports = (models) => {
  models.User.hasMany(models.Transaction, { foreignKey: 'user_id' });
  models.Ticket.hasMany(models.Transaction, { foreignKey: 'ticket_id' });
  models.Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
  models.Transaction.belongsTo(models.Ticket, { foreignKey: 'ticket_id' });
};
