import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import img1 from "./../assets/img-1.jpg";

// Skeleton Loading Component
export const SkeletonLoading = () => (
  <div className="sm:w-[290px] w-[220px] mx-auto overflow-hidden bg-gray-200 shadow-xl rounded-md animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 mb-4"></div>
      <div className="h-4 bg-gray-300 mb-4"></div>
      <div className="h-4 bg-gray-300 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 w-1/2 bg-gray-300"></div>
        <div className="h-10 w-1/4 bg-gray-300"></div>
      </div>
    </div>
  </div>
);

const FeaturedHotels = () => {
  const navigate = useNavigate();

  const { data, loading } = useFetch(
    "https://booking-app-backend-khaki.vercel.app/api/v1/hotel?limit=3&featured=true"
  );

  const handleClick = (hotelId) => {
    navigate(`/hotellist/singlehotel/${hotelId}`);
  };

  const skeletonArray = Array.from({ length: data.length || 3 });

  return (
    <>
      {loading && data.length ? (
        <>
          {skeletonArray.map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </>
      ) : (
        <>
          {data.length > 0
            ? data.map((hotel) => (
                <div
                  key={hotel._id}
                  className="w-[290px] mx-auto overflow-hidden bg-white shadow-xl rounded-md"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={img1}
                    alt="image-1"
                  />
                  <div className="sm:p-4 p-1">
                    <h2 className="text-[18px] text-gray-800 font-semibold mb-2">
                      {hotel.name}
                    </h2>
                    <p className="text-gray-600 sm:mb-4 mb-1">{hotel.desc}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-semibold">
                        ${hotel.cheapestPrice}{" "}
                      </p>
                      <button
                        onClick={() => handleClick(hotel._id)}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </>
      )}
    </>
  );
};

export default FeaturedHotels;
