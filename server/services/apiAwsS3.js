const config = require('config')
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// console.log(config.get('accessKey'))
// console.log(config.get('secretAccessKey'))

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: config.get('accessKey'),
    secretAccessKey: config.get('secretAccessKey'),
  },
})

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: 'sami-mytrip-bucket',
    Key: key,
  })
  const url = await getSignedUrl(s3Client, command)
  return url
}

async function putObjectUrl(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: 'sami-mytrip-bucket',
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3Client, command)
  return url
}

// async function init() {
//   try {
//     const url = await getObjectUrl('temp_1.jpg')
//     console.log(url)
//   } catch (error) {
//     console.log('Something went wrong here.', error)
//   }
// }

// init()

module.exports.getObjectUrl = getObjectUrl
module.exports.putObjectUrl = putObjectUrl
