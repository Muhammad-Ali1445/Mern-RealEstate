import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Skyline</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currUser ? (
              <img
              src="https://lh3.googleusercontent.com/a-/ALV-UjWtkR6qW8gKIQo6hr5n1EnC7vqk5fAmO0WSeyh_w0SPUCIDIxcgcM2erVzIQdxN_8FAblKHpPi75Kr6I6gMh_1yDl7VIE8H_e4rzu8DthR6YHHHX9H6JyU_ly-8NK8OmbJcnbeWJk7GviIbpeXBYd-l9blw015W6lMZ_afUY7jjQo8QkpNU2pKJHinJMUsSkeiyAAyiXDAZd5qH3YbIrZOuy9xj-pAylSou1Mq8WemZByjs9senWcQ_88KSU_9v_i2aPOLxH4MOCP990dGvBqpApUOoiSmM98N24MAnzB7SBWFZBbmW-gF8MUVYdeKEoXMTZLu6i2s46YHg0R5_qBUxlmsJfqEBWulFWm52xB0EVrJnltzw40iRA8F5cNrgZ6MbWW9aq7Me1YuUeoudFyXe2JSTpbMQDjcFjfT51trXNwc-NObRZlvKhvELnaE0WcI1JV0GQ9HJt4Wh5n-oEwrivqeV_pUy1RHQpxyQnJlxmEWPht5EfADywDQOtfPvPkVxqZPTHDlpXpNhGipQfPa1YTg9ii4yBEpXPGOyebnmuh9ac9SXq2bYxB2qHLHOjhqRMJ8HWjUuH06nmM7gXeqfwdb-qU2y9qQ5GNV20GBToBKvCiTHOklpjhr1hUJK29fzTgZ7DK1LQviCTtyo4tG9JFeSLu0c-Pe8S0qbCHKDyaFSFTwQcFIT33J3Z4fAaIrrjiQqE-D3Troxv2zieT6CedLflZYX3BdVerfdgZ1fbx42MAmcxVKFz7-12X4M1bPKx4bFoWF5PcjI372FpdI_YfETifi6nA7-i_nf_DJQfOqsgpeDGUBX9VsaWI5RF_-Z998VB1cjtcun67EL2e4sEkMDLxC7frI02t1s25CE0tX17mPAXvVp--ITP-IHJ4ENz6wR4vZ947Q1yElDqwTdvOo-5jj14yN6sbIbB2Pu8uNJ1Aw7jb8PpnyZ-QerXPSo_Eh_p8OszKaDtXlhke0PLw=s96-c"
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
