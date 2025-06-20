import React from "react";

const features = [
  {
    title: "View Traveller Profiles",
    description: "See who's going!",
    bgColor: "bg-[#fbbf24]",
    textColor: "text-black",
    imgSrc: "https://st.depositphotos.com/1937573/2310/i/450/depositphotos_23100736-stock-photo-handsome-man-outdoors-portrait.jpg",
    alt: "Traveller Profile",
  },
  {
    title: "Join your hostel's Chat",
    description: "Chat with travellers 14 days before check-in",
    bgColor: "bg-[#5eead4]",
    textColor: "text-black",
    imgSrc: "/assets/girl.jpg",
    alt: "Hostel Chat",
  },
  {
    title: "RSVP to Linkups",
    description: "Explore and hang out with travellers.",
    bgColor: "bg-[#3b82f6]",
    textColor: "text-white",
    imgSrc: "/assets/boy.jpg",
    alt: "RSVP to Linkups",
  },
];

const ConnectionFeatures = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`${feature.bgColor} p-6 rounded-2xl shadow-md ${feature.textColor} flex flex-col items-center`}
          >
            <div className="relative w-full mb-4">
              <div className="absolute -top-4 -left-2 bg-white text-black px-3 py-1 font-bold text-lg skew-y-[-3deg] shadow">
                {feature.title}
              </div>
              <p className="mt-10 text-sm">{feature.description}</p>
            </div>
            <img
              src={feature.imgSrc}
              alt={feature.alt}
              className="rounded-lg mt-4"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConnectionFeatures;
