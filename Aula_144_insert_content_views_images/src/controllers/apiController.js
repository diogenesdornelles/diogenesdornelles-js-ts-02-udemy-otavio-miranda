const fs = require('fs');

// API function to register new user
exports.apiSendAdvice = (req, res) => {
  if (fs.existsSync('./src/models/db/advice.json')) {
  fs.readFile('./src/models/db/advice.json', (err, data) => {
    if (err) throw err;
    let advice = JSON.parse(data);
    res.status(200).json(advice)
  });  
  } 
}

// API function to error login
exports.apiSendAdviceLogin = (req, res) => {
  if (fs.existsSync('./src/models/db/adviceLogin.json')) {
  fs.readFile('./src/models/db/adviceLogin.json', (err, data) => {
    if (err) throw err;
    let advice = JSON.parse(data);
    res.status(200).json(advice)
  });  
}
}
