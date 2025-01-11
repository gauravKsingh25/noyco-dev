export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg flex max-w-4xl mx-auto overflow-hidden">
        
        <div className="hidden md:flex flex-1 items-center justify-center bg-purple-100">
          <img
            src="/work.svg" 
            alt="Contact Illustration"
            className="w-full h-auto"
          />
        </div>

       
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
          <p className="text-center text-gray-600 mb-6">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>

          <form className="space-y-4">
            
            <div>
              <label className="block text-gray-600 mb-2 font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2 font-medium">Company Name</label>
              <input
                type="text"
                placeholder="Enter your company name"
                className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

           
            <div>
              <label className="block text-gray-600 mb-2 font-medium">Message</label>
              <textarea
                placeholder="Enter your message"
                rows="4"
                className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            
            <div>
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
