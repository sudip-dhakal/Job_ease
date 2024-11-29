const multer = require("multer");

const storage = multer.memoryStorage();
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB limit for each file

// Define file filter for `profilePic` only
const profilePicFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPEG and PNG files are allowed for profile picture"),
      false
    );
  }
};

// Define file filter for both `profilePic` and `resume` in `updateProfile`
const updateProfileFilter = (req, file, cb) => {
  if (
    file.fieldname === "profilePic" &&
    (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
  ) {
    cb(null, true);
  } else if (
    file.fieldname === "resume" &&
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and PDF files are allowed"), false);
  }
};

// Single file upload (profile picture) for registration
const singleUpload = multer({
  storage,
  limits,
  fileFilter: profilePicFilter,
}).single("profilePic");

// Multiple file upload (profilePic and resume) for profile update
const multiUpload = multer({
  storage,
  limits,
  fileFilter: updateProfileFilter,
}).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

module.exports = {
  singleUpload,
  multiUpload,
};
