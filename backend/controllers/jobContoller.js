import Job from "../models/Jobs.js"; 

/**
 * @desc   
 * @route  
 * @access  
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

/**
 * @desc    
 * @route   
 * @access  
 */
export const createJob = async (req, res) => {
  const { title, company, location, description } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
