"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function Profile() {

  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // GET PROFILE
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

  // UPDATE PROFILE
  const updateProfile = async () => {

    try {

      const res = await axios.put(
        "/api/user/update-profile",
        { user_name, email },
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

  // UPLOAD IMAGE
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

        window.dispatchEvent(new Event("authChanged"));

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

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="glass-strong w-full max-w-md rounded-3xl p-10 shadow-xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8 gradient-title">
          User Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">

          {profilePic && (
            <img
              src={profilePic}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
            />
          )}

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            className="text-sm mb-3"
          />

          <Button
            size="sm"
            variant="outline"
            onClick={uploadImage}
          >
            Upload Image
          </Button>

        </div>

        {/* NAME */}
        <input
          value={user_name}
          onChange={(e)=>setUserName(e.target.value)}
          placeholder="Name"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* UPDATE BUTTON */}
        <Button
          size="lg"
          className="w-full"
          onClick={updateProfile}
        >
          Update Profile
        </Button>

      </div>

    </div>

  );
}