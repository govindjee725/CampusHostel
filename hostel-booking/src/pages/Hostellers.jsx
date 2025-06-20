import React from "react";
import { motion } from "framer-motion";

const travellers = [
  { src: "/travel/boy1.jpeg", top: "10%", left: "20%", flag: "/flags/br.png" },
  { src: "/travel/girl1.jpeg", top: "30%", left: "10%", flag: "/flags/cn.png" },
  { src: "/travel/girl2.jpeg", top: "60%", left: "15%", flag: "/flags/de.png" },
  { src: "/travel/girl3.jpeg", top: "20%", left: "75%", flag: "/flags/kr.png" },
  { src: "/travel/boy2.jpeg", top: "50%", left: "70%", flag: "/flags/ie.png" },
  { src: "/travel/boy3.jpeg", top: "75%", left: "60%", flag: "/flags/es.png" },
];

const TravellerBubble = ({ src, top, left, flag }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="absolute"
    style={{ top, left }}
  >
    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
      <img src={src} alt="traveller" className="w-full h-full object-cover" />
      <img
        src={flag}
        alt="flag"
        className="absolute bottom-0 right-0 w-5 h-5 rounded-full border border-white"
      />
    </div>
  </motion.div>
);

const Hostellers = () => {
  return (
    <section className="relative bg-purple-600 text-white min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-4xl font-bold text-center">
        See <span className="text-yellow-300">who’s going</span>.
      </h2>
      <p className="mt-2 text-lg text-center max-w-md">
        Connect with other hostellers staying in the same hostel or city as you.
      </p>

      {/* Hostel Card */}
      <div className="relative z-10 mt-10 bg-white text-black p-4 rounded-2xl shadow-lg w-[300px] text-center">
        <img
          src="/travel/hostel.jpg"
          alt="/travel/picture.jpeg"
          className="rounded-xl mb-2 h-40 w-full object-cover"
        />
        <h3 className="text-lg font-bold">By Campus Hostel</h3>
        <p className="text-sm text-gray-700">📍 IN Greater Noida</p>
        <div className="mt-4">
  <a
    href="tel:9690752035"
    className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-purple-700 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h1a2 2 0 012 2v2a2 2 0 01-2 2H5v2a12 12 0 0012 12h2a2 2 0 002-2v-1a2 2 0 00-2-2h-2a2 2 0 01-2-2v-1a2 2 0 012-2h1a2 2 0 002-2V5a2 2 0 00-2-2H5z"
      />
    </svg>
    Call: 9690752035
  </a>
</div>
      </div>

      {/* Traveller Bubbles */}
      {travellers.map((t, i) => (
        <TravellerBubble key={i} {...t} />
      ))}

      {/* QR Code */}
      

      {/* Floating dots */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full absolute bg-yellow-400 animate-ping"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </section>
  );
};

export default Hostellers;
