const {google} = require('googleapis');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const outh2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'   
)
outh2Client.setCredentials({
    refresh_token:process.env.REFRESH_TOKEN
})
const drive = google.drive({
    version:'v3',
    auth:outh2Client
})
module.exports.uploadFile =async (req,res)=>{
    const filename = req.file.filename;
    const filePath = path.join(__dirname,`./uploads/${filename}`);
    try {
        const response = await drive.files.create({
            requestBody:{
                name:filename,
                mimeType:'application/pdf'
            },
            media:{
                mimeType:'application/pdf',
                body:fs.createReadStream(filePath)
            }
        })
        const result = geturl(response.data.id)
        result.then((response)=>{
            res.send(response.data.webViewLink)
        })
        removeTmp(filePath);
    } catch (error) {
        console.log(error);
    }
}
async function geturl(id){
    try {
        const fileid = id
        await drive.permissions.create({
            fileId:fileid,
            requestBody:{
                role:'reader',
                type:'anyone',
            }
        })
        const url = await drive.files.get({
            fileId:fileid,
            fields:'webViewLink, webContentLink',
        })
        return url
    } catch (error) {
        console.log(error);
    }
} 
const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };