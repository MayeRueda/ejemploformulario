const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Permitir todas las solicitudes CORS
app.use(cors());
app.use(express.static(__dirname));

// Configurar una ruta para manejar las solicitudes POST
app.post('/datos', (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // Convertir el cuerpo de la solicitud a un objeto JSON
    const data = JSON.parse(body);

    // Leer los datos existentes del archivo JSON
    fs.readFile('datos.json', 'utf8', (err, fileData) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
        return;
      }
      const jsonData = JSON.parse(fileData || '[]');

      // Verificar si el correo ya existe en los datos existentes
      const existingEmail = jsonData.find(item => item.correo === data.correo);
      if (existingEmail) {
        res.send('Correo ya existente');
        return;
      }

      // Guardar los datos en el archivo JSON
      jsonData.push(data);

      fs.writeFile('datos.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error(err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        res.send('Solicitud POST exitosa');
      });
    });
  });
});


// Iniciar el servidor en el puerto 4000
app.listen(4000, () => {
    console.log('Servidor local iniciado en el puerto 4000');
  });