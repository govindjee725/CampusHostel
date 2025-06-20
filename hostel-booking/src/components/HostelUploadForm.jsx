import React, { useState } from 'react';
import axios from 'axios';

const HostelUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: '',
    reviews: '',
    discount: '',
    image: null,
  });

  const [status, setStatus] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Uploading...');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/hostels/upload', data);
      setStatus('Hostel uploaded successfully!');
      console.log('Success:', res.data);
    } catch (err) {
      console.error('Upload error:', err);
      setStatus('Upload failed.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Add Hostel</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Hostel Name" value={formData.name} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="rating" type="number" step="0.1" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
        <input name="reviews" type="number" placeholder="Reviews" value={formData.reviews} onChange={handleChange} required />
        <input name="discount" type="number" placeholder="Discount" value={formData.discount} onChange={handleChange} required />
        <input name="image" type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default HostelUploadForm;
