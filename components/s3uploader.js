import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import S3 from "aws-sdk/clients/s3"

import { set } from "lodash"
import React, { useState } from "react"

function S3FileUpload(props) {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  // AWS S3 configuration
  var s3 = new S3({
    accessKeyId: "004eb60c4d22ef70000000008",
    secretAccessKey: "K0049/lM3vx1OHu+JmlvNqZ2VGQ5BmQ",
    endpoint: "https://s3.us-west-004.backblazeb2.com/",
    // s3ForcePathStyle: true, // needed with minio?
    signatureVersion: "v4",
  })

  const uploadFile = () => {
    if (!file) {
      alert("Please select a file.")
      return
    }
    // Specify the parameters for the upload
    const params = {
      Bucket: "zoopcoop-images",
      Key: file.name,
      Body: file,
      ContentType: "application/octet-stream", // Ensure proper content type for file uploads
    }

    // Create a ManagedUpload object
    const upload = s3.upload(params)

    // Track progress using the managed upload's on() method
    upload.on("httpUploadProgress", function (progressData) {
      const currentProgress = Math.round((progressData.loaded / progressData.total) * 100)
      setProgress(currentProgress)
    })

    // Execute the upload
    upload.send(function (err, data) {
      if (err) {
        console.error("Error uploading file:", err)
        alert("File upload failed. Please try again.")
      } else {
        console.log("File uploaded successfully:", data.Location)
        alert("File uploaded successfully!")
      }
    })
  }

  /////////////////
  const uploadFilemultipart = async () => {
    if (!file) {
      alert("Please select a file.")
      return
    }
    // Specify the parameters for the upload
    const params = {
      Bucket: "zoopcoop-images",
      Key: file.name, // Ensure proper content type for file uploads
    }

    try {
      // Initiate the multipart upload
      const uploadData = await s3.createMultipartUpload(params).promise()
      const uploadId = uploadData.UploadId

      // Calculate the part size (e.g., 5MB)
      const partSize = 5 * 1024 * 1024 // 5MB

      // Calculate the total number of parts
      const totalParts = Math.ceil(file.size / partSize)

      const uploadedParts = []
      // Upload each part
      for (let i = 0; i < totalParts; i++) {
        const start = i * partSize
        const end = Math.min(start + partSize, file.size)
        const partParams = {
          ...params,
          UploadId: uploadId,
          PartNumber: i + 1,
          Body: file.slice(start, end),
        }

        const data = await s3.uploadPart(partParams).promise()
        console.log(data)
        uploadedParts.push({ PartNumber: i + 1, ETag: data.ETag })
        // Update progress
        setProgress(((i + 1) / totalParts) * 100)
      }

      console.log(uploadedParts)
      // Complete the multipart upload
      await s3
        .completeMultipartUpload({
          ...params,
          UploadId: uploadId,
          MultipartUpload: {
            Parts: uploadedParts.map(({ ETag }, i) => ({
              ETag,
              PartNumber: i + 1,
            })),
          },
        })
        .promise()

      alert("File uploaded successfully!")
      setFile(null)
      setProgress(0)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("File upload failed. Please try again.")
      setFile(null)
      setProgress(0)
    }
  }

  //////////////////

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFilemultipart}>Upload</button>
      <CircularProgress value={progress} color="orange.400" />
    </div>
  )
}

export default S3FileUpload
