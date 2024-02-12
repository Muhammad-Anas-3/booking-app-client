import { useLocation } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Navbar from "../../components/Navbar";
import locationSvg from "../../assets/svgIcons/location.svg";
import { useEffect, useState } from "react";
import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import Loading from "../../components/Loading";
import RoomCard from "../../components/RoomCard";
import closesvg from "../../assets/svgIcons/close.svg";
import greaterthan from "../../assets/svgIcons/greaterthan.svg";
import lessthan from "../../assets/svgIcons/lessthansvg.svg";
import { SkeletonLoading } from "../../components/FeaturedHotels";
import axios from "axios";

const images = [img1, img2, img3];

const SingleHotel = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [roomLoading, setRoomLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setRoomLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/v1/hotel/hotelrooms/${hotelid}`
      );
      setRoomLoading(false);
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const openModal = (imageSrc) => {
    setModalOpen(true);
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const hotelid = location.pathname.split("/").pop();

  const hotelUrl = `http://localhost:3000/api/v1/hotel/find/${hotelid}`;
  const { data, loading } = useFetch(hotelUrl);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/v1/hotel/hotelrooms/${hotelid}`
        );
        setRoomLoading(false);
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, [hotelid]);

  return loading ? (
    <Loading />
  ) : (
    <div className="hotel_container mx-auto">
      <Navbar />
      <div className="w-[80%] mx-auto h-[100vh] relative">
        <div className="details text-2xl w-[90%]  font-medium mt-3">
          <h2 className="text-3xl">{data.name}</h2>
          <div className="locatoin flex gap-2 text-[16px] items-center">
            <img src={locationSvg} alt="location" />
            {data.address}
          </div>
          <span className="hotelDistance text-[16px]">
            Excellent location – {data.distance}
          </span>
          <div className="title my-3">{data.title}</div>
          <div className="desc sm:w-96 text-[14px] ">{data.desc}</div>
        </div>
        <div className=" flex flex-col justify-center my-2">
          <h2 className="text-xl mt-2 mb-1">Hotel Images:</h2>
          <div className="flex items-center flex-wrap object-contain">
            {images.map((image, index) => (
              <img
                key={index}
                className="sm:w-60  h-62 mr-2 cursor-pointer rounded"
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => openModal(image)}
              />
            ))}
          </div>
          {modalOpen && (
            <div className="fixed bg-[#181212] top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-70">
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
        </div>
        <div className="rooms my-4 w-fit">
          <h2 className="text-xl font-bold">
            Rooms in Hotel For Stay at Night.
          </h2>
          <h3 className="totalrooms">
            Total rooms in this Hotel:{" "}
            <span className="font-bold">{rooms.length}</span>
          </h3>
          {roomLoading ? (
            <div className="flex gap-4 md:flex-row flex-col my-5">
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          ) : rooms.length < 1 ? (
            <h2 className="text-[18px] font-bold my-3">
              This hotel is already booked please explore another options
            </h2>
          ) : (
            <div className="rooms flex flex-wrap justify-start gap-3">
              {rooms.map((room) => (
                <div key={room._id}>
                  <RoomCard
                    room={room}
                    hotelid={hotelid}
                    handleUpdate={handleUpdate}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
