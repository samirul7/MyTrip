const config = require('config')
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// console.log(config.get('accessKey'))
// console.log(config.get('secretAccessKey'))

const bucket = 'sami-mytrip-bucket'

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: config.get('accessKey'),
    secretAccessKey: config.get('secretAccessKey'),
  },
})

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })
  const url = await getSignedUrl(s3Client, command)
  return url
}

async function putObjectUrl(key, contentType, id) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  })

  const url = await getSignedUrl(s3Client, command)
  return { url, id }
}

async function deleteObjectUrl(key) {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const url = await getSignedUrl(s3Client, command)
  console.log(url)
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
module.exports.deleteObjectUrl = deleteObjectUrl
