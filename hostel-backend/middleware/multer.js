const multer = require("multer");
const ImageKit = require("imagekit");
const { Readable } = require("stream");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

// helper to upload buffer to ImageKit
upload.uploadToImageKit = async (file) => {
  return imagekit.upload({
    file: file.buffer.toString("base64"),
    fileName: Date.now() + "-" + file.originalname,
    folder: "/profiles",
  });
};

module.exports = upload;
