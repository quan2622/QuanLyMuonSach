const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// Kết nối
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET, // Click 'View API Keys' above to copy your API secret
// })

cloudinary.config({ 
  cloud_name: 'dchv5jtrl', 
  api_key: '596437523493551', 
  api_secret: 'd7f0BWnR7XBbi23kw5R-SOykr6c' // Click 'View API Keys' above to copy your API secret
});

module.exports.upload = (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      })
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }
  async function upload(req) {
    let result = await streamUpload(req)
    console.log(result.url)
    req.body[req.file.fieldname] = result.url
    next()
  }
  upload(req)
}
