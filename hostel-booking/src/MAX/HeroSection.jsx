const HeroSection = () => {
    return (
      <section className="bg-gradient-to-r from-purple-800 to-pink-600 text-white py-10 px-6 rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-2">Meet your people.</h1>
        <p className="mb-6 text-lg">Choose where to stay and we'll show you who with!</p>
  
        <div className="bg-white rounded-full p-4 shadow-lg flex flex-wrap items-center space-x-4 max-w-4xl mx-auto">
          <input type="text" placeholder="Where do you want to go?" className="flex-1 outline-none px-4" />
          <input type="date" className="outline-none px-2" />
          <input type="date" className="outline-none px-2" />
          <input type="number" placeholder="Guests" className="outline-none w-20 px-2" />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full">Let's go!</button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  