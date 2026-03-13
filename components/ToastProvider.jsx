'use client'

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastProvider() {

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      toastClassName="rounded-xl shadow-lg border border-gray-200 backdrop-blur-md"
      bodyClassName="text-sm font-medium"
      progressClassName="bg-blue-500"
    />
  )
}