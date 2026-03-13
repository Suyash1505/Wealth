"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {

  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // GET USER PROFILE
  useEffect(() => {

    axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {

      if (res.data.success) {
        setUserName(res.data.user.user_name);
        setEmail(res.data.user.email);
        setProfilePic(res.data.user.profilePic);
      }

    })
    .catch(() => {
      toast.error("Failed to load profile");
    });

  }, []);

  // UPDATE PROFILE DETAILS
  const updateProfile = async () => {

    try {

      const res = await axios.put(
        "/api/user/update-profile",
        {
          user_name,
          email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully");
      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );

    }

  };

  // UPLOAD PROFILE IMAGE
  const uploadImage = async () => {

    if (!image) {
      toast.warning("Select an image first");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        "/api/user/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.success) {
        setProfilePic(res.data.image);
        localStorage.setItem("profilePic", res.data.image);
        window.dispatchEvent(new Event("authChanged"))
        toast.success("Image uploaded successfully");

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Image upload failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          User Profile
        </h2>

        <div className="flex flex-col items-center">

          {profilePic && (
            <img
              src={profilePic}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover mb-4 border"
            />
          )}

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            className="mb-3"
          />

          <button
            onClick={uploadImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
          >
            Upload Image
          </button>

        </div>

        <input
          value={user_name}
          onChange={(e)=>setUserName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded mb-4"
        />

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded mb-6"
        />

        <button
          onClick={updateProfile}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Profile
        </button>

      </div>

    </div>

  );
}