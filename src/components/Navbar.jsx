import { useContext, useEffect, useState } from "react";
import logo from "./../assets/svgIcons/logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";
import menusvg from "./../assets/svgIcons/menu.svg";
import closesvg from "./../assets/svgIcons/close2.svg";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 640) {
        setModalOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIconClick = () => {
    if (modalOpen) {
      setModalOpen(false);
      console.log("close");
    } else {
      setModalOpen(true);
      console.log("open");
    }
  };

  return (
    <>
      <div className="navbar_container flex justify-between items-center sm:w-[100%] h-16 font-sans shadow-md sticky top-0 bg-white z-50">
        <Link to="/" className="logo ml-5">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          <ul className="flex items-center gap-10 mr-7 text-[#605DEC] text-[17px] font-medium ">
            {user ? (
              <Avatar />
            ) : (
              <>
                <li className="cursor-pointer hidden md:block">
                  <Link
                    to="/login"
                    className="bg-[#605DEC] px-2 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400"
                  >
                    Log in
                  </Link>
                </li>
                <li className="cursor-pointer hidden md:block">
                  <Link
                    to="/register"
                    className="bg-[#605DEC] px-2 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400"
                  >
                    Sign up
                  </Link>
                </li>
                <li
                  onClick={handleIconClick}
                  className="cursor-pointer md:hidden z-50"
                >
                  <img src={modalOpen ? closesvg : menusvg} alt="Menu" />
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="absolute top-[62px] w-full p-4 rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ease-in-out bg-[#303441] text-white">
            <ul className="flex flex-col items-center gap-4">
              <li className="cursor-pointer">
                <Link to="/login">Log in</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/register">Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
