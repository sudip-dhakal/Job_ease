const { Job } = require("../models/job.model");

// Post a new job
const postJob = async (req, res) => {
    try {
        const { title, description, companyId, location, requirements, salary, position, jobType, experience } = req.body;
        const userId = req.id;

        // Check if all required fields are provided
        if (!title || !description || !companyId || !location || !requirements || !jobType || !experience || !salary || !position) {
            return res.status(400).json({
                error: "All fields are required",
                success: false
            });
        }

        // Create a new job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Convert string to array
            salary: Number(salary),
            location,
            position,
            company: companyId,
            created_by: userId, // user who posted the job
            jobType,
            experienceLevel: experience
        });

        // Send success response
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error, please try again later",
            success: false
        });
    }
};

// Get all jobs, optionally with keyword filtering
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        // Search query for keyword matching in multiple fields
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } },
                { position: { $regex: keyword, $options: 'i' } }
            ]
        };

        // Fetch matching jobs from the database
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1 });

        if (!jobs.length) {
            return res.status(404).json({
                error: "No jobs found",
                success: false
            });
        }

        // Send response with jobs
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error, please try again later",
            success: false
        });
    }
};

// Get a specific job by ID
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by ID
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                error: "No job found",
                success: false
            });
        }

        // Send response with job details
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error, please try again later",
            success: false
        });
    }
};

// Get jobs posted by an admin
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        // Find jobs created by the admin
        const jobs = await Job.find({ created_by: adminId });

        if (!jobs.length) {
            return res.status(404).json({
                error: "No jobs found",
                success: false
            });
        }

        // Send response with admin's jobs
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Server error, please try again later",
            success: false
        });
    }
};

// Exporting the controller functions
module.exports = {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
};
