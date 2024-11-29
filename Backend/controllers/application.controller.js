const { Application } = require("../models/application.model")
const { Job } = require("../models/job.model");

const applyJob= async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;
            if(!jobId){
                return res.status(400).json({error: "Job ID is required"
                    ,success:false
                });
            }

            //check if user has already applied for the job

            const existingApplication = await Application.findOne({job:jobId, applicant: userId});

            if(existingApplication){
                return res.status(400).json({error: "You have already applied for this job"
                   ,success:false
                });
            }

            
        // check if the job exists

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({error: "No job found with the given ID"
                ,success:false
            });
        }

        //create a newApplication
        const newApplication = await Application.create({
            job:jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job Applied Successfully",
            success:true,
            application: newApplication 
        });


}
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to apply for the job"});

    }
}

const getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const applications = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path:"job",
            options:{sort:{createdAt: -1}},
            populate:{path:"company",            options:{sort:{createdAt: -1}},
        },
        });
        if(!applications)
            {
                return res.status(404).json({
                    error: "No applications found",
                    success:false
                })
            }

            return res.status(200).json({
                success:true,
                message:"Applied Jobs fetched successfully",
                applications
            });



    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Failed to get applied jobs"});
    }
}

// for the admin to see the Applicants of the job he posted
const getApplicants = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant',
                select: 'fullName email' // select fields you want to include from the applicant
            }
        });
        
        if(!job){
            return res.status(404).json({error: "No job found with the given ID"
                ,success:false
            });
        }

        return res.status(200).json({
            job,
            success:true,
            message:"Applicants fetched successfully",
        })


    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error: "Failed to get applicants of the job"});
    }
}


const updateStatus = async (req,res)=>{
    try{
        const {status} = req.body;
        const applicationId= req.params.id;
        if(!status){
            return res.status(400).json({error: "Status is required"
                ,success:false
            });
        }
        //search for the application
        const application = await Application.findByIdAndUpdate(applicationId,{status},{new:true});

        if(!application){
            return res.status(404).json({error: "No application found with the given ID"
                ,success:false
            });
        }

        //update the application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Application status updated successfully",
            success:true,
            application
            
        })
    }

    catch(error)
    {
        console.error(error);
        res.status(500).json({error: "Failed to update application status"});
    }
}

module.exports = {
    updateStatus,    getApplicants, getAppliedJobs,applyJob
}