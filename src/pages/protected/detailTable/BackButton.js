import { Link } from "react-router-dom";

const BackButton = ({ provinsiTableRef }) => {
  const handleBackClick = () => {
    if (provinsiTableRef.current) {
      provinsiTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleBackClick}
    >
      Back
    </button>
  );
};

export default BackButton;
