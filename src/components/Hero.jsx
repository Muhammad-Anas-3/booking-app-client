/* eslint-disable react/prop-types */
import map from "./../assets/map.jpg";
import bgimage from "./../assets/bg-color.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";

const Hero = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_STATE",
      payload: { search: searchInput.toLowerCase() },
    });
    if (searchInput) {
      navigate("/hotellist");
    }
  };

  return (
    <div className="h-70 mt-[3px]">
      <div
        className="heroTextGradient h-[500px] flex justify-evenly items-center flex-col"
        style={{ backgroundImage: `url(${map})` }}
      >
        <div
          className="hero_text text-[30px] sm:text-[50px] font-bold bg-clip-text text-transparent w-[200px] sm:w-[400px]"
          style={{
            backgroundImage: `url(${bgimage})`,
            WebkitBackgroundClip: "text",
          }}
        >
          <div className="text-center mt-20">It’s more than just a trip</div>
        </div>
        <form className="search flex items-center justify-center mb-20 w-[80%]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search By City"
            className="px-2 py-1 text-xl w-[80%] outline-none border border-[1px solid gray]"
          />
          <button
            onClick={handleClick}
            className="bg-[#605DEC] px-3 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
