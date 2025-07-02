import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

function WhatsAppBtn() {
  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-center z-[1000]">
      {/* Text with fade-in animation */}
      {/* <div className="mb-1 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-medium bg-yellow-500 text-white px-2 py-1 rounded-md">
          CHAT NOW!
        </h3>
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-black/80 mx-auto"></div>
      </div> */}
      
      {/* WhatsApp button with pulse animation */}
      <a
        href="https://wa.me/9779851352013"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
      >
        <IoLogoWhatsapp size={28} className="transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </div>
  );
}

export default WhatsAppBtn;