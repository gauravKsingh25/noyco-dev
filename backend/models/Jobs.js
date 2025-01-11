import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', JobSchema);

export default Job;
