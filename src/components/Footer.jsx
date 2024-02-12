import logo from "./../assets/svgIcons/logo.svg";
const Footer = () => {
  return (
    <>
      <div className="flex sm:mt-40 mt-20 flex-col sm:flex-row items-center sm:items-start justify-around flex-wrap gap-y-2">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="text-gray-600">
          <h3 className="font-bold text-[18px]">About</h3>
          <ul>
            <li>About Tripma</li>
            <li>How it works</li>
            <li>career</li>
          </ul>
        </div>
        <div className="text-gray-600">
          <h3 className="font-bold text-[18px]">Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <hr className="my-y" />
      <p className="sm:text-end text-center text-gray-600 my-2">
        &copy; 2020 Tripma incorporated
      </p>
    </>
  );
};

export default Footer;
