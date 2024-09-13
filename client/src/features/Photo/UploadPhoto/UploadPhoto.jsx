import { Accordion, Button, Uploader } from 'rsuite'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../services/apiTrip'

const UploadPhoto = () => {
  const [fileList, setFileList] = useState([])
  const [uploadedFileList, setUploadedFileList] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const { id: tripId } = useParams()

  const updateDatabase = async (fileName, fileType) => {
    try {
      const res = await axios.post(`${API_URL}/photo`, {
        tripId,
        fileName,
        fileType,
      })
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (files) => {
    setFileList((fileList) => {
      const fileNames = fileList.map((file) => file.blobFile.name)
      const uploadedFileNames = uploadedFileList.map(
        (file) => file.blobFile.name
      )
      const newFiles = files.filter(
        (file) =>
          fileNames.includes(file.blobFile.name) === false &&
          uploadedFileNames.includes(file.blobFile.name) === false
      )
      return fileList.concat(newFiles)
    })
  }

  const handleUpload = async (file) => {
    const fileType = file.blobFile.type
    const fileName = `${file.fileKey}.${fileType.split('/')[1]}` // filename with extension
    try {
      const res = await axios.get(`${API_URL}/photo/url`, {
        params: {
          fileName,
          fileType,
        },
      })
      const { url: uploadUrl } = res.data
      const awsRes = await axios.put(uploadUrl, file.blobFile, {
        headers: {
          'Content-Type': file.blobFile.type,
        },
      })
      if (awsRes.status === 200) {
        setFileList((fileLists) =>
          fileLists.filter((f) => f.fileKey !== file.fileKey)
        )
        setUploadedFileList((files) => [
          ...files,
          { ...file, status: 'finished' },
        ])

        // update the database
        updateDatabase(fileName, fileType)
      }
      // console.log(fileList)
      // console.log(uploadedFileList)
    } catch (error) {
      console.log('Something went wrong.', error)
    }
  }

  const handleManualUpload = async () => {
    setIsUploading(true)
    await Promise.all(
      fileList.map(async (file) => {
        if (file.status !== 'finished') {
          await handleUpload(file)
        }
      })
    )
    setIsUploading(false)
  }

  return (
    <Accordion>
      <Accordion.Panel header='Upload Photos'>
        <Uploader
          action=''
          fileList={fileList}
          autoUpload={false}
          onChange={handleChange}
          multiple
          disabled={isUploading}
        >
          <Button>Select files...</Button>
        </Uploader>
        <hr />
        <Button disabled={!fileList.length} onClick={handleManualUpload}>
          Start Upload
        </Button>
      </Accordion.Panel>
    </Accordion>
  )
}
export default UploadPhoto
