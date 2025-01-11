export default function NewsletterForm() {
    return (
      <section className="bg-purple-500 text-white py-40 px-4 sm:px-8 rounded-md shadow-md">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold">Subscribe to Our Newsletter</h2>
          <p className="text-sm my-4">
            JOIN OUR MAILING LIST FOR THE LATEST PRODUCT NEWS, TIPS, AND GUIDES.
          </p>
          <form action="#" method="POST" className="flex flex-col space-y-4">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12c0 1.656-.672 3.156-1.758 4.242M12 16h0c-1.73 0-3.141-1.01-3.758-2.758M9.212 9.818l.788-.788C10.32 8.004 11.15 7.654 12 7.654s1.68.35 1.997.997l.788.788M15.172 12c0-.828-.336-1.664-.914-2.172M16.486 16.486A5.978 5.978 0 0012 18.242"
                  />
                </svg>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ex. yourname@mycompany.com"
                required
                className="w-full px-10 py-3 bg-purple-400 rounded-md text-sm text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-purple-500 font-semibold py-3 rounded-md shadow-md hover:bg-purple-100"
            >
              SIGN ME UP
            </button>
          </form>
        </div>
      </section>
    );
  }
  