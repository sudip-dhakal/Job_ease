const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utilities/datauri");
const cloudinary = require("../utilities/cloudinary");

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role = "user" } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
        success: false,
      });
    }

    // Handle file upload if a file was uploaded
    let profilePicUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePicUrl = cloudResponse.secure_url; // Get the URL from Cloudinary response
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePic: profilePicUrl || "No profile picture provided",
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);

    if (!email || !password || !role) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email, role });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        error: "Invalid password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        error: "Invalid role for the user",
        success: false,
      });
    }

    //If the email, password, and role are correct, a JWT  is generated using the user's _id as part of the payload:

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // creating simplified version of the user object to avoid sending sensitive information (like the password) back in the response:
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Logged in successfully",
        success: true,
        user: user,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Logout failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const profilePic = req.files?.profilePic?.[0];
    const resumeFile = req.files?.resume?.[0];

    let profilePicResponse, resumeResponse;

    const getDataUri = (file) => {
      return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    };

    // Profile picture upload
    if (profilePic) {
      const profilePicUri = getDataUri(profilePic);
      profilePicResponse = await cloudinary.uploader.upload(profilePicUri, {
        folder: "profile_pics",
      });
      user.profile.profilePic = profilePicResponse.secure_url;
    }

    // Resume upload with .pdf extension in public_id
    if (resumeFile) {
      const resumeUri = getDataUri(resumeFile);
      resumeResponse = await cloudinary.uploader.upload(resumeUri, {
        folder: "resumes",
        resource_type: "image",
        format: "png",
      });

      // Constructing the download URL with .pdf extension
      const downloadUrl = resumeResponse.secure_url.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );

      user.profile.resume = downloadUrl;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    // Updating user details
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = {
  register,
  updateProfile,
  login,
  logout,
};
