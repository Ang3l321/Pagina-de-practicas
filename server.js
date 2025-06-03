const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta para recibir los datos del formulario
app.post('/reserva', (req, res) => {
  const nuevaReserva = req.body;

  const filePath = path.join(__dirname, 'reservas.json');

  // Leer el archivo actual (si existe)
  fs.readFile(filePath, 'utf8', (err, data) => {
    let reservas = [];
    if (!err && data) {
      reservas = JSON.parse(data);
    }

    // Agregar la nueva reserva
    reservas.push(nuevaReserva);

    // Guardar en el archivo
    fs.writeFile(filePath, JSON.stringify(reservas, null, 2), err => {
      if (err) {
        return res.status(500).send('Error guardando la reserva');
      }
      res.status(200).send('¡Reserva guardada con éxito!');
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
