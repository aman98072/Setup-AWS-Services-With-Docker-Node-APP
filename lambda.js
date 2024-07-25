const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const sharp = require('sharp');

/*
Scheduled Database Cleanup
A Lambda function runs every night to delete old records from a DynamoDB table using a CloudWatch Events rule.
*/
exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const resizedKey = `resized-${key}`;
    
    try {
        // Get the image from S3
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const s3Object = await S3.getObject(params).promise();

        // Resize the image using sharp
        const resizedImage = await sharp(s3Object.Body)
            .resize(200, 200)
            .toBuffer();

        // Upload the resized image back to S3
        const uploadParams = {
            Bucket: bucket,
            Key: resizedKey,
            Body: resizedImage,
            ContentType: 'image/jpeg',
        };
        await S3.putObject(uploadParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Image resized successfully!'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('An error occurred while resizing the image'),
        };
    }
};
