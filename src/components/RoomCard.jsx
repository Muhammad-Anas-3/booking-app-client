/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import img1 from "./../assets/room_img1.jpg";
import img2 from "./../assets/room_img2.jpg";
import img3 from "./../assets/room_img3.jpg";
import closesvg from "./../assets/svgIcons/close.svg";
import greaterthan from "./../assets/svgIcons/greaterthan.svg";
import lessthan from "./../assets/svgIcons/lessthansvg.svg";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoomCard = ({ room, hotelid, handleUpdate }) => {
  const images = [img1, img2, img3];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedNights, setSelectedNights] = useState(0);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  const { user } = useContext(AuthContext);

  const handleBook = async () => {
    if (!user) {
      navigate("/register");
    }
    if (selectedNights === 0) {
      return alert("Please select the number of nights to book this room.");
    }
    try {
      await axios.put(
        `https://booking-app-backend-khaki.vercel.app/api/v1/room/updateroom/${hotelid}/${room._id}`,
        { isBooked: true, selectedNights: selectedNights }
      );
      setAlert(true);
      setMessage("Thanks for booking with us!");
      handleUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container my-5 bg-gray-100 rounded p-2  sm:w-[32rem] sm:mx-auto">
        <div className="images flex justify-start flex-wrap items-center gap-2 rounded ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={room.title}
              className="sm:w-[130px] sm:h-[130px] rounded object-fill"
              onClick={() => openModal(image)}
            />
          ))}
        </div>
        <div className="title text-2xl">{room.title}</div>
        <div className="description">
          <span className="font-bold">Description:</span> {room.desc}
        </div>
        <div className="description">
          Max People:
          <span className="font-bold"> {room.maxPeople}</span>
        </div>
        <div className="roomnumber text-xl font-semibold">
          <span className="text-xl font-normal">Room Number:</span>{" "}
          {room.roomNumber}
        </div>
        <div className="totalnights">
          <h3 className="totalNights flex justify-start gap-2 items-center">
            <span>Total Nights to stay in this Room:</span>{" "}
            <input
              disabled={room.isBooked}
              min={1}
              onChange={(e) => setSelectedNights(e.target.value)}
              type="Number"
              className="bg-gray-200 rounded font-bold p-1 sm:w-40 w-16"
              placeholder="Total Nights"
            />
          </h3>
          <div className="price">
            <h2 className="">Price per Night ${room.price}.</h2>
          </div>
          <div className="totalcost">
            <h2 className="text-[18px] font-bold">
              Total Cost: ${selectedNights * room.price}
            </h2>
          </div>
          <div className="button">
            {room.isBooked ? (
              <h2 className="text-[18px] my-2 p-2 font-bold text-black bg-gray-400">{`This room is already booked for ${room.selectedNights} nights.`}</h2>
            ) : (
              <button
                onClick={handleBook}
                className="bg-[#605DEC] my-3 px-2 py-2 rounded text-white hover:bg-[#3937af] transition ease-in-out duration-400"
              >
                Book This Room Now!
              </button>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-70 bg-[#221e1e]">
          <div className="relative">
            <span
              className="flex justify-center absolute top-[50%] left-2 text-3xl font-bold cursor-pointer rounded-full bg-black p-1 "
              onClick={prevImage}
            >
              <img src={lessthan} alt="less" />
            </span>
            <span
              className="flex justify-center absolute top-2 right-2 text-3xl font-bold cursor-pointer rounded-full bg-black p-1 "
              onClick={closeModal}
            >
              <img src={closesvg} alt="close" />
            </span>
            <span
              className="flex justify-center absolute top-[50%] right-2 text-3xl font-bold cursor-pointer rounded-full bg-black p-1 "
              onClick={nextImage}
            >
              <img src={greaterthan} alt="greater" />
            </span>
            <img
              className="max-w-full max-h-full rounded"
              src={selectedImage}
              alt="Modal Image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomCard;
