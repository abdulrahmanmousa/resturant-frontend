import React from "react";
import Navbar from "../landing-page/Navbar";
import Footer from "../landing-page/Footer";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-Epilogue">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
