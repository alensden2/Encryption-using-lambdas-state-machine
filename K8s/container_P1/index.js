const express = require("express");
const { checkIfFileExists } = require("./middleware.js");
const { communicate } = require("./communicate.js");
const fs = require('fs');

const app = express();
app.use(express.json());

app.post("/calculate", checkIfFileExists, communicate);
app.post("/store-file", (req,res) => {
const { file, data } = req.body;
const dir = '../persistant-volume/'
fs.writeFile(dir+file, data, (err) => {
  if(err){
    const response = { 'file' : file, 'error' : 'Error while storing the file to the storage.' }
    return res.send(response)
  }
  const response = {
    'file':file,
    'message': 'Success.'
  }
  return res.send(response)
})
})

app.listen(6000, () => {
  console.log("container_P1 running @ 6000");
});