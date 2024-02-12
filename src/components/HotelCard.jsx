/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import img1 from "./../assets/img-1.jpg";

const HotelCard = ({ hotel }) => {
  // function to convert first letter into uppercase
  const firstLettertoUpperCase = (string) => {
    return string.split("")[0].toUpperCase() + string.slice(1);
  };

  return (
    <div className="md:w-[90%] sm:w-[50%] w-[70%] bg-white flex items-center shadow-xl flex-col md:flex-row overflow-hidden rounded-md m-4 md:p-2 p-1">
      <img
        src={img1}
        alt="image"
        className="md:w-[200px] md:h-[190px] contain rounded-md object-contain"
      />
      <div className="details w-full">
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            {hotel.rating && (
              <span className="bg-[#605DEC] p-2 rounded text-white">
                {hotel.rating}
              </span>
            )}
          </div>
          <p className="text-gray-500 mb-2">{hotel.desc}</p>
          <p className="text-gray-600 mb-2">
            <b>Address:</b> {hotel.address}, <b>City:</b>{" "}
            {firstLettertoUpperCase(hotel.city)}
          </p>
        </div>
        <div className="flex w-full justify-between items-center p-4 ">
          <div>
            <span className="text-xl font-semibold">
              <span className="text-xl font-normal">Starting from </span>$
              {hotel.cheapestPrice}
              /night
            </span>
          </div>
        </div>
        <div className="btn flex justify-end">
          <Link
            to={`singlehotel/${hotel._id}`}
            className="bg-[#605DEC] px-2 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400"
          >
            See availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
