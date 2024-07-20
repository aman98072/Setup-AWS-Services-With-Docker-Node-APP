const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION
});

// Create SQS service object
const sqs = new AWS.SQS();

// Function to send a message to the SQS queue
const sendMessage = async (queueUrl, messageBody) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    console.log("Message sent successfully:", data.MessageId);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

// Function to receive messages from the SQS queue
const receiveMessages = async (queueUrl) => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
  };

  try {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      console.log("Messages received:", data.Messages);
    } else {
      console.log("No messages available.");
    }
  } catch (err) {
    console.error("Error receiving messages:", err);
  }
};

// Example usage
const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/851725647143/testQueue';

(async () => {
  await sendMessage(queueUrl, "Hello, SQS!");
//   await receiveMessages(queueUrl);
})();
