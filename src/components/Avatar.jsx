import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    var username = user.details.userName;
  }
  const firstLetter = username.split("")[0].toUpperCase();

  return (
    <div className="flex items-center w-10 h-10 justify-center rounded-full bg-blue-500 text-white cursor-pointer">
      <span className="">{firstLetter}</span>
    </div>
  );
};

export default Avatar;
