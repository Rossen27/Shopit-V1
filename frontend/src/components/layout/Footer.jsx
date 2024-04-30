import footerLogo from "../../assets/images/shopit_logo.png";

const Footer = () => {
  return (
    // <footer className="footer footer-center p-4 bg-white text-base-content">
    //   <div>
    //     <p className="text-gray-500">Copyright © 2024 - All right reserved by Rossen</p>
    //   </div>
    // </footer>
    <footer className="footer footer-center bg-white text-base-content fixed bottom-0 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <img
              src={footerLogo}
              alt="Footer Logo"
              className="h-8 cursor-pointer text-gray-800"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024 - All right reserved by RossenHua.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
