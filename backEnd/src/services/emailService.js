// src/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'Outlook365',
	auth: {
		user: process.env.OUTLOOK_USER,
		pass: process.env.OUTLOOK_PASSWORD,
	},
});

const sendEmail = (recipientEmail, subject, htmlContent) => {
	const mailOptions = {
		from: process.env.OUTLOOK_USER,
		to: recipientEmail,
		subject: subject,
		html: htmlContent,
	};

	return transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = (recipientEmail, ticketNumber, paymentMethod) => {
	const subject = '¡Confirmación de pago Sorteo PS5!';
	const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center;">
                    <h1 style="color: #ff3d00;">¡Gracias por participar en el sorteo del PlayStation 5 Slim Digital!</h1>
                </div>
                <p style="color: #333333;">Recibimos correctamente tu notificación de pago.</p>
                <p style="color: #333333;">A continuación, encontrarás los detalles de tu participación:</p>
                <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Método de Pago:</strong> ${paymentMethod}</p>
                    <p><strong>Número de Boleta:</strong> ${ticketNumber}</p>
                </div>
                <p style="color: #333333; text-align: center;">¡Buena suerte!</p>
                <p style="color: #333333; text-align: center;">Juan Carlos Gómez</p>
            </div>
        </div>
    `;
	return sendEmail(recipientEmail, subject, htmlContent);
};

const sendCancellationEmail = (recipientEmail, ticketNumber) => {
	const subject = '¡Cancelación de boleta Sorteo PS5!';
	const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center;">
                    <h1 style="color: #ff3d00;">¡Boleta Cancelada!</h1>
                </div>
                <p style="color: #333333;">Lamentamos informarte que tu boleta ha sido cancelada.</p>
                <p style="color: #333333;">Detalles del boleto cancelado:</p>
                <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Número de Boleta:</strong> ${ticketNumber}</p>
                </div>
                <p style="color: #333333; text-align: center;">Esperamos que participes en futuras promociones.</p>
                <p style="color: #333333; text-align: center;">Juan Carlos Gómez</p>
            </div>
        </div>
    `;
	return sendEmail(recipientEmail, subject, htmlContent);
};

const sendChangeEmail = (recipientEmail, oldTicketNumber, newTicketNumber) => {
	const mailOptions = {
		from: process.env.OUTLOOK_USER,
		to: recipientEmail,
		subject: 'Cambio de boleta Sorteo PS5',
		html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center;">
            <h1 style="color: #ff3d00;">¡Cambio de boleta Sorteo PlayStation 5 Slim Digital!</h1>
          </div>
          <p style="color: #333333;">Tu solicitud de cambio de boleta ha sido procesada exitosamente.</p>
          <p style="color: #333333;">A continuación, encontrarás los detalles de tu cambio:</p>
          <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Boleta Anterior:</strong> ${oldTicketNumber}</p>
            <p><strong>Boleta Nueva:</strong> ${newTicketNumber}</p>
          </div>
          <p style="color: #333333; text-align: center;">¡Buena suerte!</p>
          <p style="color: #333333; text-align: center;">Juan Carlos Gómez</p>
        </div>
      </div>
    `,
	};

	return transporter.sendMail(mailOptions);
};

module.exports = {
	sendConfirmationEmail,
	sendCancellationEmail,
	sendChangeEmail,
};
