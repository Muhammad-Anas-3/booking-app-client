/* eslint-disable react/prop-types */
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import FeaturedHotels from "../../components/FeaturedHotels";
import Footer from "../../components/Footer";
import useFetch from "../../Hooks/useFetch";

const Home = () => {
  const { data } = useFetch("http://localhost:3000/api/v1/hotel");

  // to extract only unique city name for example if we have two or more hotels with same city name it will give him one city name that it.
  const uniqueCitiesName = [...new Set(data.map((item) => item.city))];

  // in the following 2 lines i want to convert first letter of the city into capital
  const cityName = uniqueCitiesName.map(
    (city) => city.split("")[0].toUpperCase() + city.slice(1)
  );

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="body w-[70%] mx-auto">
        <div className="citiesName h-[30%] my-2">
          {uniqueCitiesName.length > 0 && (
            <div className="text-blue-600 text-[18px] text-center">
              Currently we have hotels in the following cities.{" "}
              <h3 className="text-blue-600 font-bold">{cityName.join(", ")}</h3>
            </div>
          )}
        </div>
        <div className="font-bold text-[18px] text-center text-gray-600 my-5">
          Find your next Hotel with these amazing deals
        </div>
        <div className="cards w-[100%] mx-auto flex flex-wrap gap-6">
          <FeaturedHotels />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
