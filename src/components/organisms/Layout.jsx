import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import MobileSidebar from "@/components/organisms/MobileSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

return (
<div className="min-h-screen bg-surface">
      {/* Desktop Header */}
<div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-header-bg h-16 shadow-lg">
        <div className="flex items-center justify-between h-full px-6">
          {/* Left side - Logo */}
          <div className="flex items-center">
<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-header-bg font-bold text-lg">C</span>
            </div>
            <h1 className="text-white text-xl font-bold">ClearITT</h1>
          </div>
          
          {/* Right side - Clone & Edit Button */}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-16 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content */}
<div className="lg:pl-72 lg:pt-16">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-header-bg px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-white"
          >
            <ApperIcon name="Menu" size={24} />
          </Button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">
<div className="flex items-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2">
                <span className="text-header-bg font-bold text-sm">C</span>
              </div>
              ClearITT
            </div>
          </div>
</div>

        {/* Main Content */}
        <main className="min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-6 sm:px-6 lg:px-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default Layout;