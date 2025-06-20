import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HostelDetailPage() {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:5000/api/hostels/${id}`)
      .then(res => res.json())
      .then(data => setHostel(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!hostel) return <p className="text-center mt-10">{t('loading')}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold">{hostel.name}</h1>
      <p className="text-gray-500">{hostel.location}</p>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <img
          src={hostel.images[0]}
          alt="Main"
          className="rounded-xl w-full h-[400px] object-cover"
        />
        <div className="grid grid-cols-2 gap-2">
          {hostel.images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`img-${i}`}
              className="rounded-lg object-cover h-[190px]"
            />
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        {/* Left: Description */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-blue-700 uppercase">
            {t('Hostel Facilities')}
          </h2>
          {hostel.description?.length > 0 ? (
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              {hostel.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">{t('noDescription')}</p>
          )}

          <div className="mt-4">
            <p>
              🏠 {hostel.beds} {t('bed')} • 🚿 {hostel.bathrooms} {t('bath')} • 👥 {hostel.guests} {t('guests')}
            </p>
            <p className="mt-2">
              ({hostel.reviews} {t('reviews')})
            </p>
          </div>
        </div>

        {/* Right: Price & Booking */}
        <div className="bg-white p-4 rounded-xl w-full md:w-[300px] space-y-3 ">
           {/* WhatsApp & Call Side-by-Side Buttons */}
          <div className="flex gap-2">
            <a
              href={`https://wa.me/91${hostel.phone || '9690752035'}?text=Hi, I'm interested in your hostel "${hostel.name}"`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition"
            >
              📱 {t('WhatsApp')}
            </a>
            <a
              href={`tel:${hostel.phone || '9690752035'}`}
              className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
            >
              📞 {t('Call')}
            </a>
          </div>
          {/* Reserve Button on Top */}
          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
            {t('reserve')}
          </button>

         
          
        </div>
      </div>
    </div>
  );
}

export default HostelDetailPage;
