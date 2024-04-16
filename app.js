const express = require('express');
const app = express();
const port = 3000;
const CryptoJS = require('crypto-js');

app.use(express.json()); // Para JSON
app.post('/client', (req, res) => {
  const headers = req.headers;
  const permit = "felipeherc.github.io";
  const referer = headers.referer;

  console.log("Referer:", referer);

  const token = req.body.token;

  if (!token) {
    console.log("Token não fornecido");
    return res.status(401).json({
      message: 'Operação não pode ser concluída'
    });
  }

  var hora = new Date();
  var hora_servidor = hora.getHours()-3;
  var minuto_servidor = hora.getMinutes();
  var segundo_servidor = hora.getSeconds();

  const time = `${hora_servidor}:${minuto_servidor}:${segundo_servidor}`

  if (!referer || !referer.includes(permit)) {
    console.log(`Teste Robo: Bloqueado ${time}`);
    return res.status(401).json(body);
  }

  const requestData = req.body;

  var diferenca_segundos = ((hora_servidor - requestData.h) * 3600) + ((minuto_servidor - requestData.m) * 60) + (segundo_servidor - requestData.s);

  if (diferenca_segundos > 30) {
    console.log(`Teste Robo: Expirou ${time}`);
    return res.status(401).json({
      message: 'Operação não pode ser concluída'
    });
  }

  const generatedToken = CryptoJS.SHA256(requestData.h+requestData.m+requestData.s).toString(CryptoJS.enc.Hex);

  console.log(generatedToken);

  if (token !== generatedToken) {
    console.log(`Teste Robo: Token inválido ${time}`);
    return res.status(401).json({
      message: 'Operação não pode ser concluída'
    });
  }

  console.log(`Teste Robo: Aprovado ${time}`);
  return res.status(200).json(body);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
