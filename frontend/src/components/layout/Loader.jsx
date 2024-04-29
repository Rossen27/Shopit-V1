import spinner from "../../assets/svg/spinner.svg";

export default function Loader() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div className="">
        <img src={spinner} alt="Loading..." className="h-25" />
        {/* <div className="text-lg text-gray-300">Loading ...</div> */}
      </div>
    </div>
  );
}
