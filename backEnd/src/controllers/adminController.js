require('dotenv').config();
// Importamos los modelos de la base de datos
const { Admin } = require('../index');
// Importamos bcrypt para el hashing de las contraseñas
const bcrypt = require('bcryptjs');
// Importamos jsonwebtoken para la autenticación
const jwt = require('jsonwebtoken');
// Importamos nodemailer para el envío de correos electrónicos
const nodemailer = require('nodemailer');
// Importamos la función Op de sequelize para realizar consultas
const { Op } = require('sequelize');
const {
	generateVerificationToken,
} = require('../helpers/helperGenerateVerificacionCode');

const registerUser = async (req, res) => {
	try {
		// Extraemos los campos necesarios del cuerpo de la petición
		const { email, password } = req.body;

		// Comprobamos si ya existe algún usuario
		const anyUser = await Admin.findOne();
		if (anyUser) {
			return res.status(400).json({
				message: 'Ya existe un usuario registrado.',
			});
		}
		// Buscamos un usuario existente con el mismo correo electrónico
		const existingUser = await Admin.findOne({ where: { email } });

		// Si existe un usuario con ese correo, enviamos una respuesta con un código de estado 400
		if (existingUser) {
			return res.status(400).json({
				message: 'El correo electrónico ya está registrado.',
			});
		}

		// Generamos un 'salt' para el hashing de la contraseña
		const salt = await bcrypt.genSalt(10);

		// Creamos un hash de la contraseña utilizando el salt
		const hashedPassword = await bcrypt.hash(password, salt);

		// Creamos un nuevo usuario en la base de datos con los datos proporcionados y la contraseña hasheada
		const newUser = await Admin.create({
			email,
			password: hashedPassword,
		});

		// Respondemos con los datos del nuevo usuario
		res.json(newUser);
	} catch (error) {
		// En caso de cualquier error, lo imprimimos en la consola
		console.error(error);
		// Y enviamos una respuesta con un código de estado 500 y un mensaje de error
		res.status(500).json({
			message: 'Ha ocurrido un error al registrar el usuario.',
		});
	}
};

const loginUser = async (req, res) => {
	try {
		// Extraemos los campos necesarios del cuerpo de la petición
		const { email, password } = req.body;

		// Buscamos un usuario existente con el mismo correo electrónico
		const existingUser = await Admin.findOne({ where: { email } });
		// Si no existe un usuario con ese correo, enviamos una respuesta con un código de estado 400
		if (!existingUser) {
			return res.status(400).json({
				message: 'El correo electrónico no está registrado.',
			});
		}
		// Se utiliza el método compare de bcrypt para comparar la contraseña ingresada por el usuario (password)
		// con la contraseña almacenada en la base de datos para el usuario existente (existingUser.password).
		// Este método devuelve una promesa que se resuelve en un booleano que indica si las contraseñas coinciden.
		const isMatch = await bcrypt.compare(password, existingUser.password);

		// Aquí se verifica si el usuario existe y si las contraseñas coinciden. Si ambas condiciones se cumplen,
		// entonces el usuario ha ingresado correctamente sus credenciales y puede iniciar sesión.
		if (existingUser && isMatch) {
			// Se genera un token de JWT. El primer argumento de jwt.sign es el payload del token, que contiene la
			// información que queremos incluir en el token. En este caso, se incluye el id del usuario, su correo
			// electrónico y un valor que indica si el usuario es administrador o no. El segundo argumento es la
			// clave secreta para firmar el token, que se toma de las variables de entorno. El tercer argumento
			// es un objeto de opciones para el token. Aquí se establece que el token expira en un día.
			const token = jwt.sign(
				{
					id: existingUser.id,
					email: existingUser.email,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '1d' },
			);
			// res.cookie se utiliza para enviar una cookie al cliente junto con la respuesta HTTP.
			// En este caso, se esta enviando una cookie llamada 'token'.
			res.cookie(
				// El primer argumento es el nombre de la cookie. En este caso, 'token'.
				'token',

				// El segundo argumento es el valor de la cookie. En este caso, estamos pasando el token que hemos firmado previamente.
				token,

				// El tercer argumento es un objeto de opciones que nos permite configurar cómo se maneja la cookie.
				{
					// La opción 'httpOnly' es una medida de seguridad que evita que la cookie sea accedida o manipulada mediante JavaScript en el lado del cliente. Esto puede ayudar a prevenir ciertos ataques de cross-site scripting (XSS).
					httpOnly: true,

					// La opción 'secure' asegura que la cookie solo se envíe si la solicitud se realiza a través de una conexión segura (HTTPS). Esto protege la cookie de ser interceptada durante su transmisión por conexiones no seguras.
					secure: true,

					// La opción 'sameSite' define cómo se debe manejar la cookie cuando se hacen solicitudes a sitios diferentes al que creó la cookie. Si se configura como 'strict', la cookie sólo se enviará en solicitudes que se originen desde el mismo sitio que la cookie.
					sameSite: 'strict',
				},
			);

			// Se envía una respuesta al cliente con un mensaje de éxito y el token de JWT. El cliente deberá
			// incluir este token en las solicitudes subsiguientes para autenticarse.
			return res.json({
				message: 'Inicio de sesión exitoso.',
			});
		}

		// Si las contraseñas no coinciden, enviamos una respuesta con un código de estado 400
		if (!isMatch) {
			return res.status(400).json({
				message: 'La contraseña no es correcta.',
			});
		}
		// Respondemos con los datos del usuario
		res.json({
			existingUser,
			message: 'Inicio de sesión exitoso.',
		});
	} catch (error) {
		// En caso de cualquier error, lo imprimimos en la consola
		console.error(error);
		// Y enviamos una respuesta con un código de estado 500 y un mensaje de error
		res.status(500).json({
			message: 'Ha ocurrido un error al iniciar sesión.',
		});
	}
};

const logoutUser = async (req, res) => {
	try {
		// Borrar la cookie del token
		res.clearCookie('token');
		res.json({
			message: 'Cierre de sesión exitoso.',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Ha ocurrido un error al cerrar sesión.',
		});
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const admin = await Admin.findOne({ where: { email } });
		if (!admin) {
			return res.status(400).json({
				message:
					'No existe una cuenta asociada a ese correo electrónico.',
			});
		}

		// Generar token de reseteo de contraseña
		const verificationCode = generateVerificationToken();

		// Guardar el token en la base de datos
		await admin.update({
			resetPasswordToken: verificationCode,
			resetPasswordExpires: Date.now() + 3600000,
		});

		// Crear el transportador de nodemailer
		const transporter = nodemailer.createTransport({
			service: 'Outlook',
			auth: {
				user: process.env.OUTLOOK_USER,
				pass: process.env.OUTLOOK_PASSWORD,
			},
		});

		// Crear el mensaje de correo electrónico
		const mailOptions = {
			from: `Portfolio <${process.env.OUTLOOK_USER}>`,
			to: admin.email,
			subject: 'Restablecer contraseña',
			html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablecimiento de Contraseña</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    a {
      color: #1a73e8;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background-color: #1a73e8;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 4px;
      text-align: center;
      margin: 10px 0;
      text-decoration: none;
    }
    @media screen and (max-width: 640px) {
      .container {
        margin: 20px 10px;
      }
    }
  </style>
</head>
<body>
<div class="container">
    <a href="#" style="font-size:1.6em; font-weight:500; color: #202124;">My Portfolio</a>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 16px;" />
    <p style="font-size:1.1em; color: #202124;">Hola ${admin.email},</p>
    <p style="color: #5f6368;">Para restablecer la contraseña de tu cuenta, haz clic en el siguiente enlace o pégalo en tu navegador:</p>
    <a href="${process.env.VITE_BASE_URL}/reset-password/${verificationCode}" target="_blank" class="button">Restablecer Contraseña</a>
    <p style="color: #5f6368;">Este enlace expirará en 24 horas.</p>
    <p style="color: #5f6368;">Si por algun motivo no puedes dar clic en el boton, ingresa a este link</p>
    <a href="${process.env.VITE_BASE_URL}/reset-password/${verificationCode}" target="_blank">Aquí</a>
    <p style="color: #5f6368;">Si no solicitaste restablecer la contraseña, ignora este correo electrónico y tu contraseña permanecerá sin cambios.</p>
    <p style="font-size:0.9em; color: #5f6368;">Saludos,<br />Portfolio</p>
    <hr style="border:none;border-top:1px solid #eee;margin-top: 24px;" />
    <div style="padding:8px 0;color:#5f6368;font-size:0.8em;line-height:1.2;">
      <p>My Portfolio</p>
      <p>Redes sociales</p>
    </div>
</div>
</body>
</html>
`,
		};

		// Enviar el correo electrónico
		await transporter.sendMail(mailOptions);
		res.json({
			message:
				'Se ha enviado un correo electrónico a la dirección proporcionada con más instrucciones.',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al restablecer la contraseña. forgot',
		});
	}
};

const resetPassword = async (req, res) => {
	try {
		const { verificationCode, password } = req.body;

		if (!verificationCode || !password) {
			return res.status(400).json({
				message:
					'Token de restablecimiento de contraseña no válido o expirado.',
			});
		}
		// Buscar usuario con el token de reseteo de contraseña
		const user = await Admin.findOne({
			where: {
				resetPasswordToken: verificationCode,
				resetPasswordExpires: { [Op.gt]: Date.now() },
			},
		});
		if (!user) {
			return res.status(400).json({
				message:
					'Token de restablecimiento de contraseña no válido o expirado.',
			});
		}
		// Generar un 'salt' para el hashing de la contraseña
		const salt = await bcrypt.genSalt(10);
		// Crear un hash de la contraseña utilizando el salt
		const hashedPassword = await bcrypt.hash(password, salt);
		// Actualizar la contraseña del usuario
		await user.update({
			password: hashedPassword,
			resetPasswordToken: null,
			resetPasswordExpires: null,
		});
		res.json({
			message: 'Se ha restablecido la contraseña correctamente.',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				'Ha ocurrido un error al restablecer la contraseña. resetPassword',
		});
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
};
