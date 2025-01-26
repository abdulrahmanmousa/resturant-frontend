import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "../landing-page/Navbar";
import Footer from "../landing-page/Footer";
export default function Layout({
  hasFooter = true,
  children,
  className,
  ...props
}) {
  return (
    <div className="flex flex-col min-h-screen font-Epilogue">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className={cn("flex-grow", className)} {...props}>
        {children}
      </main>

      {/* Footer */}
      {hasFooter && <Footer />}
    </div>
  );
}
