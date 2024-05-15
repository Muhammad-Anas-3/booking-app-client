import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Avatar = () => {
  const { user, dispatch } = useContext(AuthContext);
  if (user) {
    var username = user.details.userName;
  }
  const firstLetter = username.split("")[0].toUpperCase();
  const [avatarModal, setAvatarModal] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div onClick={() => setAvatarModal(prev => !prev)} className="flex items-center w-10 h-10 justify-center rounded-full bg-blue-500 text-white cursor-pointer relative">
        <span>{firstLetter}</span>
      </div>
      {avatarModal && (
        <div className="w-20 flex justify-center items-center p-2 h-20 border-2 border-black bg-gray-300 rounded absolute top-16 right-10">
          <button onClick={handleLogout}>Log out</button>
        </div>
      )
      }
    </>
  );
};

export default Avatar;
