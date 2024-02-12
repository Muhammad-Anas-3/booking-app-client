/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Footer from "../../components/Footer";
import HotelCard from "../../components/HotelCard";
import Navbar from "../../components/Navbar";
import useFetch from "../../Hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

// card animation
const HotelCardSkeleton = () => (
  <div className="w-[90%] p-4 bg-gray-200 rounded shadow-md my-4 animate-pulse">
    <div className="w-full h-48 bg-gray-300 mb-4 rounded"></div>
    <div className="flex flex-col gap-2">
      <div className="w-2/3 h-4 bg-gray-300"></div>
      <div className="w-full h-4 bg-gray-300"></div>
      <div className="w-1/2 h-4 bg-gray-300"></div>
    </div>
  </div>
);

const NoHotelMessage = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <p className="text-3xl">No hotels found.Please search again</p>
  </div>
);

const Hotel = () => {
  const { search, dispatch } = useContext(SearchContext);
  const [searchDestination, setSearchDestination] = useState(search);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // Construct the apiUrl when dependencies change
  const minPriceParam = minPrice ? `&min=${minPrice}` : "";
  const maxPriceParam = maxPrice ? `&max=${maxPrice}` : "";

  const apiUrl = `https://booking-app-backend-khaki.vercel.app/api/v1/hotel?city=${search}${minPriceParam}${maxPriceParam}`;

  const { data, loading } = useFetch(apiUrl);

  // for loading skeleton
  const cardskeleton = Array.from({ length: data.length || 3 });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_STATE",
      payload: {
        search: searchDestination.toLowerCase(),
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between lg:flex-row">
        <form
          className="box1 lg:w-[30%] flex justify-center items-center p-4"
          onSubmit={handleSearch}
        >
          <div className="searchContainer scroll lg:fixed lg:top-20 lg:left-10% flex flex-col justify-between contain p-4 bg-gray-300 rounded ">
            <h2 className="text-xl">Search</h2>
            <div className="input_container">
              <p>Destination:</p>
              <input
                type="text"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="p-1 rounded"
              />
            </div>
            <hr />
            <div className="options my-2">
              <p>Options:</p>
              <div className="container flex justify-between gap-10 my-2">
                <p>min price per night</p>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-[60px] rounded p-1"
                />
              </div>
              <div className="container flex justify-between gap-10 my-2">
                <p>min price per night</p>
                <input
                  type="number"
                  placeholder="max"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-[60px] rounded p-1"
                />
              </div>
            </div>
            <hr />
            <div className="btn flex justify-center my-2">
              <button className="w-full bg-[#605DEC] px-2 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400">
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="box2 lg:w-[70%] flex flex-col items-center justify-center min-h-[500px] ">
          {loading ? (
            <>
              {cardskeleton.map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </>
          ) : data && data.length > 0 ? (
            data.map((hotel) => <HotelCard hotel={hotel} key={hotel._id} />)
          ) : (
            <NoHotelMessage />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
