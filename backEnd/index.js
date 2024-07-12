const server = require('./src/app');
const { conn } = require('./src/index');
require('dotenv').config();

const PORT = process.env.PORT || 3001; // Si process.env.PORT no está definido, usa 3001 como valor predeterminado

conn.sync({ alter: true }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server is listening at port ${PORT}`);
	});
});
