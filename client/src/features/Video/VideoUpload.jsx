import styles from './VideoUpload.module.css'

import { Button, Modal } from 'rsuite'
import { useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { MdOutlineErrorOutline } from 'react-icons/md'
import privateAxios from '../../app/api/privateAxios'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const VideoUpload = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFilesModifyEnabled, setIsFilesModifyEnabled] = useState(true)
  const [files, setFiles] = useState([])

  const params = useParams()
  const queryClient = useQueryClient()

  const { mutate: updateDB } = useMutation({
    mutationKey: [`${params.id}-videos`],
    mutationFn: async ({ fileName, fileType }) => {
      console.log('mutate called')
      return await privateAxios.post(`/video`, {
        tripId: params.id,
        fileName,
        fileType,
      })
    },
    onSuccess: () => {
      // need troubleshoot
      console.log('Am I even called')
      queryClient.invalidateQueries(`${params.id}-photos`)
    },
    // onSuccess: () => {
    //   console.log('onSuccessCall')
    // },
  })

  const handleRemoveItem = (fileName) => {
    if (!isFilesModifyEnabled) return
    setIsFilesModifyEnabled(false)
    setFiles((files) => files.filter((file) => file.file.name !== fileName))
    setIsFilesModifyEnabled(true)
  }

  const handleUpload = async () => {
    if (!isFilesModifyEnabled) return
    setIsFilesModifyEnabled(false)

    const allowedFiles = files.filter(
      ({ file }) => file.type.split('/')[0] === 'video'
    )
    const sendFileInfo = allowedFiles.map((file) => ({
      id: file.id,
      name: file.file.name,
      type: file.file.type,
    }))

    try {
      const { data: urls } = await privateAxios.get('/video/url', {
        params: {
          fileInfo: sendFileInfo,
          tripId: params.id,
        },
      })

      console.log(urls)

      const res = await Promise.allSettled(
        urls.map(async (url) => {
          if (url.status === 'rejected')
            return Promise.reject(new Error('Upload error'))
          return await axios.put(url.url, files[url.id].file, {
            headers: {
              'Content-Type': files[url.id].file.type,
            },
          })
        })
      )

      res.forEach(({ status }, idx) => {
        if (status === 'rejected') {
          // need to change something
          return
        }
        const idIdx = urls[idx].id
        updateDB({
          fileName: files[idIdx].file.name,
          fileType: files[idIdx].file.type,
        })
      })
    } catch (err) {
      console.error(err)
    }

    setIsFilesModifyEnabled(true)
  }

  const handleClear = () => {
    if (!isFilesModifyEnabled) return
    setIsFilesModifyEnabled(false)
    setFiles([])
    setIsFilesModifyEnabled(true)
  }

  const handleKeepOnlyVideo = () => {
    if (!isFilesModifyEnabled) return
    setIsFilesModifyEnabled(false)
    setFiles((files) =>
      files.filter(({ file }) => file.type.split('/')[0] === 'video')
    )
    setIsFilesModifyEnabled(true)
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={() => setIsOpen(true)}>
        <span className={styles.plus}>+</span>
      </button>
      <Modal size='md' open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.fileLabel} htmlFor='input-file'>
                Browse files
              </label>
              <input
                id='input-file'
                className={styles.inputFile}
                type='file'
                onChange={(e) =>
                  setFiles(
                    Array.from(e.target.files).map((file, idx) => ({
                      id: idx,
                      file,
                    }))
                  )
                }
                multiple
                disabled={!isFilesModifyEnabled}
              />
            </div>
            {files.length !== 0 && (
              <div className={styles.fileList}>
                {files.map((file) => (
                  <div
                    key={`${file.file.name}-${file.id}`}
                    className={styles.fileItem}
                  >
                    <p className={styles.fileName}>{file.file.name}</p>
                    <div className={styles.rightSide}>
                      {!file.file.type.includes('video') && (
                        <div className={styles.notAllowedContainer}>
                          <span>Only video file type allowed</span>
                          <MdOutlineErrorOutline className={styles.errorIcon} />
                        </div>
                      )}
                      <span className={styles.fileSize}>
                        {Math.ceil(file.file.size / 1024)} KB
                      </span>
                      <TiDeleteOutline
                        className={styles.removeIcon}
                        onClick={() => handleRemoveItem(file.file.name)}
                      />
                      {/* <span className={styles.removeIcon}>X</span> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {files.length !== 0 && (
              <div className={styles.footerSection}>
                <Button
                  appearance='primary'
                  onClick={handleUpload}
                  disabled={!isFilesModifyEnabled}
                >
                  Upload
                </Button>
                <div className={styles.rightSideButtons}>
                  <Button
                    appearance='ghost'
                    onClick={handleClear}
                    disabled={!isFilesModifyEnabled}
                  >
                    Clear
                  </Button>
                  <Button
                    appearance='ghost'
                    onClick={handleKeepOnlyVideo}
                    disabled={!isFilesModifyEnabled}
                  >
                    Keep only video files
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default VideoUpload
