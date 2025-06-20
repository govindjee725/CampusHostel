import { FaRegUser, FaHotel } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdTravelExplore } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../pages/LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } flex flex-col md:flex-row justify-between items-center px-4 py-3 shadow-sm bg-white`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="/assets/hostel_logo.jpg" alt="Hostelworld Logo" className="h-12 w-12 mr-2" />
          <div>
            <span className="font-bold text-[#4d9af2] text-lg">Campus</span>&nbsp;
            <span className="font-bold text-[#64b191] text-lg">Hostel</span>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 border rounded-full hover:bg-gray-100"
        >
          <FiMenu />
        </button>
      </div>

      {/* Action Buttons (Mobile & Desktop) */}
      <div
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0`}
      >
        {/* All Hostels */}
        <button
          onClick={() => navigate('/all-hostels')}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
        >
          <FaHotel className="text-lg" />
          <span>{t('All Hostels')}</span>
        </button>

        {/* Connect & Help (Scroll to Section) */}
        <button
          onClick={() => {
            const el = document.getElementById('connect-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-500"
        >
          <MdTravelExplore className="text-lg" />
          <span>{t('Connect & Help')}</span>
        </button>

       
      </div>
    </nav>
  );
};

export default Navbar;
