
const Footer = () => {
  return (
    <div className="bg-red-200 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-2xl font-bold">
            Dono<span className="text-red-500">rix</span>
          </h2>
          <p className="mt-4 text-sm">
            Donate blood, share the love and make the change for humanity, be
            the hero.
          </p>
          <div className="flex mt-4 space-x-4">
            <a
              href="#"
              className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-100"
            >
              {/* <FaFacebook /> */}
            </a>
            <a
              href="#"
              className="bg-white p-2 rounded-full text-sky-500 hover:bg-sky-100"
            >
              {/* <FaTwitter /> */}
            </a>
            <a
              href="#"
              className="bg-white p-2 rounded-full text-pink-600 hover:bg-pink-100"
            >
              {/* <FaInstagram /> */}
            </a>
          </div>
        </div>
        <div>
          {" "}
          <h4 className="font-semibold mb-2">About Us</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Items</a>
            </li>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">Latest News</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>
        <div>
          {" "}
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Prototype</a>
            </li>
            <li>
              <a href="#">Plan & Pricing</a>
            </li>
            <li>
              <a href="#">Customer</a>
            </li>
            <li>
              <a href="#">Integration</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Help Desk</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Become a Partner</a>
            </li>
            <li>
              <a href="#">Developers</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="text-sm">
            <li>524 Chottogram, Bangladesh</li>
            <li>+880 11111111</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="border-t border-gray-300 mt-10 pt-4 text-sm flex flex-col md:flex-row justify-between items-center text-gray-600">
          <p>@2023 Tanjid ahammed Tasin. All Rights Reserved</p>
          <p>Powered by Donorix</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
