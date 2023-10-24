const uploader = require('../../utilities/multipleUploader');

const attachmentUpload = (req, res, next) => {
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/png', 'image/jpg'],
    1000000,
    2,
    'Only jpg, jpeg or png format allowed!'
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = attachmentUpload;
