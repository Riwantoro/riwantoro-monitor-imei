import { useState, useEffect } from 'react';
import inmatesData from './wbp.json';
import './InmateSearch.css';  // Tambahkan ini

const InmateSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredInmates, setFilteredInmates] = useState([]);

  // Get the first date key and inmate list
  const dateKey = Object.keys(inmatesData)[0];
  const inmateList = inmatesData[dateKey].filter(inmate => 
    // Filter out the header row
    inmate.Manajemen_Imei !== "No"  // Tambahkan filter ini
  );

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredInmates([]);
      return;
    }

    setIsLoading(true);
    
    // Filter inmates based on the search query
    const filtered = inmateList.filter((inmate) => {
      const searchQuery = query.toLowerCase().trim();
      // Convert values to string before comparison
      return (
        String(inmate.Nama || '').toLowerCase().includes(searchQuery) ||
        String(inmate.Imei || '').toLowerCase().includes(searchQuery) ||
        String(inmate.Handphone || '').toLowerCase().includes(searchQuery)
      );
    });

    setFilteredInmates(filtered);
    setIsLoading(false);
  }, [query, inmateList]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="inmate-search-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari berdasarkan Nama, IMEI, atau Handphone"
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>

      {isLoading && <div className="spinner"></div>}

      {!isLoading && query.trim() && filteredInmates.length === 0 && (
        <p className="text-center mt-4">Pencarian tidak ditemukan untuk: "{query}".</p>
      )}

      <div className="inmate-display">
        {!isLoading && filteredInmates.length > 0 && (
          <ul className="suggestions">
            {filteredInmates.map((inmate, index) => (
              <li 
                key={inmate.Manajemen_Imei || index} 
                className="suggestion-item p-4 mb-2 border rounded shadow-sm"
              >
                <strong>Nama:</strong> {inmate.Nama || 'N/A'} <br />
                <strong>IMEI:</strong> {inmate.Imei || 'N/A'} <br />
                <strong>Handphone:</strong> {inmate.Handphone || 'N/A'} <br />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InmateSearch;