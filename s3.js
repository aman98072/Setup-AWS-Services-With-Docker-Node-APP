const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION
});

// Create S3 service object
const s3 = new AWS.S3();

// Function to create a new S3 bucket
const createBucket = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: process.env.AWS_REGION
    }
  };

  try {
    const data = await s3.createBucket(params).promise();
    console.log(`Bucket created successfully. Location: ${data.Location}`);
  } catch (err) {
    console.error("Error creating bucket:", err);
  }
};

// Function to list all S3 buckets
const listBuckets = async () => {
  try {
    const data = await s3.listBuckets().promise();
    console.log("Bucket List:", data.Buckets);
  } catch (err) {
    console.error("Error listing buckets:", err);
  }
};

// Function to upload a file to an S3 bucket
const uploadFile = async (bucketName, filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};

// Example usage
const bucketName = 'mycicdbucket07';
const filePath = path.join(__dirname, 'README.md');
console.log('filePath :', filePath);

(async () => {
//   await createBucket(bucketName);
  await listBuckets();
  await uploadFile(bucketName, filePath);
})();
