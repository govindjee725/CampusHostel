import React from 'react';
import { useParams } from 'react-router-dom';

function HostelDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Hostel Details for ID: {id}</h1>
    </div>
  );
}

export default HostelDetailsPage;
