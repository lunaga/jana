// Importamos las dependencias
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicializamos Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());  // Permite recibir JSON en las solicitudes
app.use(cors());  // Permite solicitudes desde cualquier origen (por ahora)

// Ruta para manejar los envíos del formulario
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    // Configuración del transporte de correo (aquí es donde ponemos nuestra cuenta de correo)
    const transporter = nodemailer.createTransport({
        service: "gmail",  // Usando Gmail (puedes cambiarlo si usas otro servicio)
        auth: {
            user: "rastamoon25@gmail.com",  // Aquí va tu correo (debe ser Gmail)
            pass: "lunanova25",  // Aquí va tu contraseña o una contraseña de aplicación si tienes 2FA habilitado
        },
    });

    const mailOptions = {
        from: email,  // El correo del usuario que completó el formulario
        to: "rastamoon25o@gmail.com",  // Tu correo (donde quieres recibir el mensaje)
        subject: `Nuevo mensaje de contacto de ${name}`,  // El asunto del correo
        text: message,  // El cuerpo del mensaje que envió el usuario
    };

    try {
        await transporter.sendMail(mailOptions);  // Enviamos el correo
        res.status(200).json({ message: "Correo enviado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al enviar el correo." });
    }
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});