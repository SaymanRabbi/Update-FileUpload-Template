const express = require('express');
const { uploadFile } = require('./uploadDrive');
const { upload } = require('./uploadFile');
const app = express();
app.post('/file-upload',upload.single('doc'),uploadFile,(req,res)=>{
  res.send('hello world')
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(5000,()=>{
    console.log('Server is running on port 5000 hello');
})