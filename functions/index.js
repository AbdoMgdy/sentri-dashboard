const admin = require("firebase-admin");
const functions = require("firebase-functions");
const os = require("os");
const path = require("path");

admin.initializeApp();

// https://firebase.google.com/docs/functions/gcp-storage-events
exports.onFileChange = functions.storage.object().onFinalize(object => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const fileName = path.basename(filePath);

  if (!contentType.startsWith("image/")) {
    return console.log("This is not an image.");
  }
  if (fileName.startsWith("rename-")) {
    return console.log("Already a renamed.");
  }

  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  return bucket
    .file(filePath)
    .download({
      destination: tempFilePath
    })
    .then(function() {
      return bucket.upload(tempFilePath, {
        destination: "rename-" + path.basename(filePath),
        metadata: {
          contentType: contentType
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});
exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("fb-cloud-functions-demo.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});
