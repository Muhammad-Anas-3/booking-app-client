import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <ScaleLoader
        color="#454ad7"
        height={40}
        radius={1}
        speedMultiplier={1.5}
        width={4}
      />
    </div>
  );
};

export default Loading;
