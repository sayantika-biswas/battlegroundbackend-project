const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const deleteFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    await s3.send(command);
    console.log("✅ Deleted from S3:", key);
  } catch (err) {
    console.error("❌ S3 Delete Error:", err);
    throw err;
  }
};

const uploadToS3 = async (file) => {
  try {
    const fileName = `carousel/${Date.now()}_${path.basename(file.originalname)}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    });

    await s3.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error("❌ S3 Upload Error:", err.message, err.stack);
    throw err;
  }
};

module.exports = { upload, uploadToS3, deleteFromS3 };
