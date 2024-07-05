module.exports = (models) => {
	models.User.hasMany(models.Transaction, { foreignKey: 'user_id' });
	models.Ticket.hasMany(models.Transaction, { foreignKey: 'ticket_id' });
	models.Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
	models.Transaction.belongsTo(models.Ticket, { foreignKey: 'ticket_id' });
};

// Relaciones Definidas

// 	1.	User.hasMany(Transaction, { foreignKey: 'user_id' }):
// 	•	Esto establece una relación uno a muchos entre el modelo User y el modelo Transaction. Indica que un usuario puede tener muchas transacciones.
// 	•	La clave foránea user_id en la tabla Transactions hace referencia a la columna id en la tabla Users.
// 	2.	Ticket.hasMany(Transaction, { foreignKey: 'ticket_id' }):
// 	•	Esto establece una relación uno a muchos entre el modelo Ticket y el modelo Transaction. Indica que un boleto puede estar asociado con muchas transacciones.
// 	•	La clave foránea ticket_id en la tabla Transactions hace referencia a la columna id en la tabla Tickets.
// 	3.	Transaction.belongsTo(User, { foreignKey: 'user_id' }):
// 	•	Esto establece una relación de muchos a uno entre el modelo Transaction y el modelo User. Indica que una transacción pertenece a un usuario específico.
// 	•	La clave foránea user_id en la tabla Transactions hace referencia a la columna id en la tabla Users.
// 	4.	Transaction.belongsTo(Ticket, { foreignKey: 'ticket_id' }):
// 	•	Esto establece una relación de muchos a uno entre el modelo Transaction y el modelo Ticket. Indica que una transacción pertenece a un boleto específico.
// 	•	La clave foránea ticket_id en la tabla Transactions hace referencia a la columna id en la tabla Tickets.
