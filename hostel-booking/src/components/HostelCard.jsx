import { useNavigate } from 'react-router-dom';

function HostelCard({ id, name, location, rating, discount, image, price }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hostel/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white text-black rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>

        

        {discount && (
          <p className="text-red-500 font-semibold mt-2">{discount}</p>
        )}
      </div>
    </div>
  );
}

export default HostelCard;
