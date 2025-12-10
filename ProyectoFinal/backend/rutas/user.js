// node y express
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const path = require('path');
const fs = require('fs');
//recibir peticione y generrar respuestas POST
const app = express();

app.post('imagen/single', uploads.single('imagenPerfil'), (req, res) => {
    console.log(req.file);
    res.send("Termina")

});


app.listen(5000, () => {
    console.log('Servidor escuchado en puesto 5000')
});

module.exports = router;