import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Accordion, Button, Uploader } from 'rsuite'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import privateAxios from '../../app/api/privateAxios'

const UploadPhoto = () => {
  const [fileList, setFileList] = useState([])
  const [uploadedFileList, setUploadedFileList] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()

  const { id: tripId } = useParams()

  const { mutate } = useMutation({
    mutationKey: [`${tripId}-photos`],
    mutationFn: async ({ fileName, fileType }) => {
      console.log('mutate called')
      const data = await privateAxios.post(`/photo`, {
        tripId,
        fileName,
        fileType,
      })
      console.log('before invalidate')
      queryClient.invalidateQueries(`${tripId}-photos`)
      console.log('after invalidate ')
      return data
    },
    // need to troubleshoot
    // onSuccess: async () => {
    //   console.log('Calling invalidate ....')
    //   queryClient.invalidateQueries(`${tripId}-photos`)
    // },
    onError: (err) => {
      console.log('Error in onError', err)
    },
  })

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
      const res = await privateAxios.get(`/photo/url`, {
        params: {
          tripId,
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
        // update the database
        const res = await mutate({ fileName, fileType })
        console.log(res)

        setFileList((fileLists) =>
          fileLists.filter((f) => f.fileKey !== file.fileKey)
        )
        setUploadedFileList((files) => [
          ...files,
          { ...file, status: 'finished' },
        ])
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
