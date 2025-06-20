const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 px-6 pt-12 pb-8 border-t border-gray-700">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        
        {/* Campus Hostels */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">🏠 Campus Hostels</h3>
          <p className="text-gray-400 leading-relaxed">
            Providing safe, student-friendly accommodations. Where comfort meets community.
          </p>
        </div>

        {/* Quick Access */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">🔗 Quick Access</h4>
          <ul className="space-y-2">
            <li className="hover:text-white transition">Find a Hostel</li>
            <li className="hover:text-white transition">Safety Guidelines</li>
            <li className="hover:text-white transition">FAQs</li>
            <li className="hover:text-white transition">Contact Support</li>
          </ul>
        </div>

        {/* For Students */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">🎓 Student Info</h4>
          <ul className="space-y-2">
            <li className="hover:text-white transition">Join the Community</li>
            <li className="hover:text-white transition">Rules & Policies</li>
            <li className="hover:text-white transition">Dining & Facilities</li>
            <li className="hover:text-white transition">Student Reviews</li>
          </ul>
        </div>

       

        {/* Get in Touch */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Get in Touch</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+919690752035" className="hover:text-white transition">📞 +91 9690752035</a></li>
            <li><a href="mailto:campushostel01@gmail.com" className="hover:text-white transition">✉️ campushostel01@gmail.com</a></li>
            <li><a href="https://wa.me/9690752035" className="hover:text-white transition" target="_blank" rel="noopener noreferrer">💬 WhatsApp Chat</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 mb-5"></div>

     {/* Divider Line */}
      <div className="border-t border-gray-600 mt-10 mb-6"></div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4 text-gray-400">
        
        <div>© 2025 Campus Hostels. All rights reserved.</div>
        
        <div className="flex gap-3">
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span>|</span>
          <span className="hover:text-white cursor-pointer">Privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

