import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currUser } = useSelector((state) => state.user);
  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full w-24 h-24 object-cover self-center cursor-pointer my-3"
          src="https://lh3.googleusercontent.com/a-/ALV-UjWtkR6qW8gKIQo6hr5n1EnC7vqk5fAmO0WSeyh_w0SPUCIDIxcgcM2erVzIQdxN_8FAblKHpPi75Kr6I6gMh_1yDl7VIE8H_e4rzu8DthR6YHHHX9H6JyU_ly-8NK8OmbJcnbeWJk7GviIbpeXBYd-l9blw015W6lMZ_afUY7jjQo8QkpNU2pKJHinJMUsSkeiyAAyiXDAZd5qH3YbIrZOuy9xj-pAylSou1Mq8WemZByjs9senWcQ_88KSU_9v_i2aPOLxH4MOCP990dGvBqpApUOoiSmM98N24MAnzB7SBWFZBbmW-gF8MUVYdeKEoXMTZLu6i2s46YHg0R5_qBUxlmsJfqEBWulFWm52xB0EVrJnltzw40iRA8F5cNrgZ6MbWW9aq7Me1YuUeoudFyXe2JSTpbMQDjcFjfT51trXNwc-NObRZlvKhvELnaE0WcI1JV0GQ9HJt4Wh5n-oEwrivqeV_pUy1RHQpxyQnJlxmEWPht5EfADywDQOtfPvPkVxqZPTHDlpXpNhGipQfPa1YTg9ii4yBEpXPGOyebnmuh9ac9SXq2bYxB2qHLHOjhqRMJ8HWjUuH06nmM7gXeqfwdb-qU2y9qQ5GNV20GBToBKvCiTHOklpjhr1hUJK29fzTgZ7DK1LQviCTtyo4tG9JFeSLu0c-Pe8S0qbCHKDyaFSFTwQcFIT33J3Z4fAaIrrjiQqE-D3Troxv2zieT6CedLflZYX3BdVerfdgZ1fbx42MAmcxVKFz7-12X4M1bPKx4bFoWF5PcjI372FpdI_YfETifi6nA7-i_nf_DJQfOqsgpeDGUBX9VsaWI5RF_-Z998VB1cjtcun67EL2e4sEkMDLxC7frI02t1s25CE0tX17mPAXvVp--ITP-IHJ4ENz6wR4vZ947Q1yElDqwTdvOo-5jj14yN6sbIbB2Pu8uNJ1Aw7jb8PpnyZ-QerXPSo_Eh_p8OszKaDtXlhke0PLw=s96-c"
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3 "
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 "
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white rounded-lg p-2 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer"> Delete account</span>
        <span className="text-red-500 cursor-pointer"> sign out</span>
      </div>
    </div>
  );
};

export default Profile;
