const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'anayamartinezjuan96@gmail.com', 
    pass: 'ssszbngxzuxmahxp' 
  }
});

app.post('/send-email', (req, res) => {
  const { name, phone, email } = req.body;

  const mailOptions = {
    from: 'anayamartinezjuan96@gmail.com',
    to: email,
    subject: 'NEON',
    html: `
   <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: #fff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin: 20px auto;
          max-width: 600px;
        }
        .title {
          color: #007BFF;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .message {
          font-size: 18px;
          margin-bottom: 10px;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">¡Bienvenido a NEON!</div>
        <div class="message">Estimado ${name},</div>
        <div class="message">Te damos la bienvenida a NEON. Estamos emocionados de tenerte como parte de nuestra comunidad.</div>
        <div class="message">Tu número de teléfono registrado es: ${phone}.</div>
        <div class="message">Esperamos que disfrutes de tu experiencia en NEON y que aproveches al máximo nuestros servicios.</div>
        <div class="message">Gracias por unirte a nosotros.</div>
      </div>
    </body>
    </html>
    `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    } else {
      console.log('Correo enviado');
      res.json({ success: true, message: 'Correo enviado exitosamente' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

