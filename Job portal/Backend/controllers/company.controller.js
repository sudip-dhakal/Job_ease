const Company = require("../models/company.model");
const cloudinary = require("../utilities/cloudinary");
const getDataUri = require("../utilities/datauri");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ error: "Company name is required", success: false });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ error: "Company already exists", success: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "Company created successfully",
        company,
      });
  } catch (err) {
    console.error(err);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user Id
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ error: "No companies found", success: false });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (err) {
    console.error(err);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ error: "No companies found", success: false });
    } else {
      return res
        .status(200)
        .json({
          success: true,
          message: "Company fetched successfully",
          company,
        });
    }
  } catch (error) {
    console.error(err);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    console.log(name, description, website, location);
    const file = req.file;

    // Find the company by ID
    let company = await Company.findById(req.params.id);

    // Check if the company exists
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Check if the logged-in user is the owner of the company
    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        message: "You are not authorized to update this company",
        success: false,
      });
    }

    let logo;

    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        if (cloudResponse && cloudResponse.secure_url) {
          logo = cloudResponse.secure_url;
        } else {
          return res.status(500).json({
            message: "File upload failed",
            success: false,
          });
        }
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({
          message: "File upload failed",
          success: false,
        });
      }
    }

    // Prepare data for updating
    const updateData = { name, description, website, location };
    if (logo) {
      updateData.logo = logo;
    }

    // Update the company
    company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
      company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerCompany,
  updateCompany,
  getCompany,
  getCompanyById,
};
