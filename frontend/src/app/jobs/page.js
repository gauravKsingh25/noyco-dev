'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  if (loading) {
    return <div className="text-center mt-10">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/jobs/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <p className="text-xs text-gray-500 mt-auto">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
