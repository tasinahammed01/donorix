const ContactUs = () => {
  return (
    <section className="py-20 px-6 text-gray-200 bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Contact us</h2>
        <p className="text-gray-400 mt-2">
          We'd love to talk about how we can help you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-gray-800 shadow-xl rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Fill in the form
          </h3>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-700 bg-gray-900 rounded-md px-4 py-3 outline-none text-gray-200 placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border border-gray-700 bg-gray-900 rounded-md px-4 py-3 outline-none text-gray-200 placeholder-gray-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-700 bg-gray-900 rounded-md px-4 py-3 outline-none text-gray-200 placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-700 bg-gray-900 rounded-md px-4 py-3 outline-none text-gray-200 placeholder-gray-500"
            />
            <textarea
              placeholder="Details"
              className="w-full border border-gray-700 bg-gray-900 rounded-md px-4 py-3 outline-none text-gray-200 placeholder-gray-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-semibold"
            >
              Send inquiry
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">
            We'll get back to you in 1-2 business days.
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-10">
          {/* Knowledgebase */}
          <div>
            <h4 className="font-semibold text-lg text-white">Knowledgebase</h4>
            <p className="text-sm text-gray-400">
              We’re here to help with any questions or code.
            </p>
            <a
              href="#"
              className="text-red-500 mt-1 inline-block text-sm font-medium"
            >
              Contact support →
            </a>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="font-semibold text-lg text-white">FAQ</h4>
            <p className="text-sm text-gray-400">
              Search our FAQ for answers to anything you might ask.
            </p>
            <a
              href="#"
              className="text-red-500 mt-1 inline-block text-sm font-medium"
            >
              Visit FAQ →
            </a>
          </div>

          {/* Developer APIs */}
          <div>
            <h4 className="font-semibold text-lg text-white">Developer APIs</h4>
            <p className="text-sm text-gray-400">
              Check out our development quickstart guide.
            </p>
            <a
              href="#"
              className="text-red-500 mt-1 inline-block text-sm font-medium"
            >
              Contact sales →
            </a>
          </div>

          {/* Email Contact */}
          <div>
            <h4 className="font-semibold text-lg text-white">
              Contact us by email
            </h4>
            <p className="text-sm text-gray-400">
              If you wish to write us an email instead please use
            </p>
            <p className="text-sm font-medium text-gray-200 mt-1">
              example@site.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
