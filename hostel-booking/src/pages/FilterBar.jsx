// src/components/FilterBar.jsx
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import FilterModal from './FilterSidebar';

const FilterBar = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="flex gap-6 items-center overflow-x-auto px-4 py-3 bg-white sticky top-0 z-40 border-b">
        {['Amazing pools', 'Farms', 'Castles', 'Rooms', 'Treehouses'].map((category) => (
          <button key={category} className="flex flex-col items-center">
            <span className="text-sm">{category}</span>
          </button>
        ))}

        {/* Filter Button */}
        <button
          onClick={() => setShowFilter(true)}
          className="flex items-center border px-3 py-1.5 rounded-full ml-auto"
        >
          <Filter className="w-4 h-4 mr-2" />
          <span>Filters</span>
        </button>
      </div>

      <FilterModal show={showFilter} onClose={() => setShowFilter(false)} onApply={() => setShowFilter(false)} />
    </>
  );
};

export default FilterBar;
