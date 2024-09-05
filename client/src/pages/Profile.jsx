import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

// firebase storage
// allow read;
// allow write: if
// request.resource.size<2*1024*1024 &&
// request.resource.contentType.matches('image/.*')

const Profile = () => {
  const fileRef = useRef(null);
  const { currUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(filePerc);
  console.log(file);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(progress);
      },
      (error) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full w-24 h-24 object-cover self-center cursor-pointer my-3"
          src={formData.avatar || "https://lh3.googleusercontent.com/a-/ALV-UjWtkR6qW8gKIQo6hr5n1EnC7vqk5fAmO0WSeyh_w0SPUCIDIxcgcM2erVzIQdxN_8FAblKHpPi75Kr6I6gMh_1yDl7VIE8H_e4rzu8DthR6YHHHX9H6JyU_ly-8NK8OmbJcnbeWJk7GviIbpeXBYd-l9blw015W6lMZ_afUY7jjQo8QkpNU2pKJHinJMUsSkeiyAAyiXDAZd5qH3YbIrZOuy9xj-pAylSou1Mq8WemZByjs9senWcQ_88KSU_9v_i2aPOLxH4MOCP990dGvBqpApUOoiSmM98N24MAnzB7SBWFZBbmW-gF8MUVYdeKEoXMTZLu6i2s46YHg0R5_qBUxlmsJfqEBWulFWm52xB0EVrJnltzw40iRA8F5cNrgZ6MbWW9aq7Me1YuUeoudFyXe2JSTpbMQDjcFjfT51trXNwc-NObRZlvKhvELnaE0WcI1JV0GQ9HJt4Wh5n-oEwrivqeV_pUy1RHQpxyQnJlxmEWPht5EfADywDQOtfPvPkVxqZPTHDlpXpNhGipQfPa1YTg9ii4yBEpXPGOyebnmuh9ac9SXq2bYxB2qHLHOjhqRMJ8HWjUuH06nmM7gXeqfwdb-qU2y9qQ5GNV20GBToBKvCiTHOklpjhr1hUJK29fzTgZ7DK1LQviCTtyo4tG9JFeSLu0c-Pe8S0qbCHKDyaFSFTwQcFIT33J3Z4fAaIrrjiQqE-D3Troxv2zieT6CedLflZYX3BdVerfdgZ1fbx42MAmcxVKFz7-12X4M1bPKx4bFoWF5PcjI372FpdI_YfETifi6nA7-i_nf_DJQfOqsgpeDGUBX9VsaWI5RF_-Z998VB1cjtcun67EL2e4sEkMDLxC7frI02t1s25CE0tX17mPAXvVp--ITP-IHJ4ENz6wR4vZ947Q1yElDqwTdvOo-5jj14yN6sbIbB2Pu8uNJ1Aw7jb8PpnyZ-QerXPSo_Eh_p8OszKaDtXlhke0PLw=s96-c"}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadErr ? (
            <span className="text-red-700"> Image Uploadng Error (image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`uploading ${filePerc} %`}</span>
          ) : filePerc == 100 ? (
            <span className="text-green-700">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
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
