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
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      
      {/* 1. Glassmorphic container with deep shadow and border glow */}
      <div className="glass-strong w-full max-w-md rounded-3xl p-10 border border-teal-500/10 shadow-[0_0_50px_rgba(13,148,136,0.1)] relative overflow-hidden">
        
        {/* Decorative background radial ambient glows */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center mb-8 gradient-title">
          User Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-8">
          {profilePic && (
            <div className="relative mb-5 group">
              {/* 2. Added teal brand border ring and hover glow to avatar */}
              <img
                src={profilePic}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.2)] group-hover:border-teal-400 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all duration-300"
              />
            </div>
          )}

          {/* 3. Fully customized, premium file input layout */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-500/10 file:text-teal-300 hover:file:bg-teal-500/20 file:cursor-pointer cursor-pointer mb-4 outline-none focus:outline-none"
          />

          <Button
            size="sm"
            variant="outline"
            onClick={uploadImage}
            className="px-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Upload Image
          </Button>
        </div>

        {/* 4. Muted brand labels & custom styled dark input fields */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-teal-400/80 uppercase tracking-wider mb-2 ml-1">
            Display Name
          </label>
          <input
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="w-full bg-slate-950/40 border border-teal-500/20 text-gray-100 placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none hover:border-teal-500/40 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all duration-200"
          />
        </div>

        <div className="mb-8">
          <label className="block text-xs font-semibold text-teal-400/80 uppercase tracking-wider mb-2 ml-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
            className="w-full bg-slate-950/40 border border-teal-500/20 text-gray-100 placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none hover:border-teal-500/40 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all duration-200"
          />
        </div>

        {/* 5. Glowing brand CTA Button */}
        <Button
          size="lg"
          className="w-full glow-teal rounded-xl font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          onClick={updateProfile}
        >
          Update Profile
        </Button>

      </div>
    </div>
  );
}