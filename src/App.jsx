import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import NotFound from "./components/Error/NotFound";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setUsers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader className = " mt-[50px]"/>;
  if (error) return <NotFound/>;

  return (
    <div className="text-center bg-black text-white w-screen h-full">
      <h1 className=" text-[55px] font-bold">Star Wars User Directory</h1>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={handleSearch}
        className=" w-[50%] h-[30px] text-center mt-3 text-black"
      />
      <div className=" flex flex-wrap justify-center mt-20">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="w-[250px] p-[20px] m-5 rounded-lg shadow-md hover:scale-[1.1] duration-200"
            style={{ backgroundColor: user.hair_color || '#111' }}
          >
            <img
              src={`https://picsum.photos/200/300?random=${index}`}
              alt="User"
            />
            <h2 className=" text-2xl font-bold pt-6">{user.name}</h2>
            <p className=" text-xl">Hair Color: {user.hair_color}</p>
            <p className=" text-xl">Skin Color: {user.skin_color}</p>
            <p className=" text-xl">Gender: {user.gender}</p>
            <p className=" text-xl">Vehicles Count: {user.vehicles.length}</p>
          </div>
        ))}
      </div>
      <div className=" py-5">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className=" mr-2 p-2 bg-[#f4780c] hover:bg-blue-500 border rounded-md "
        >
        Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mr-2 p-2 bg-[#f4780c] border hover:bg-blue-500 rounded-md "
        >
        Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
