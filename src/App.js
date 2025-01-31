import React, { useState } from 'react';

import "../src/css/app_design.css"

function App() {
  const [apiUrl, setApiUrl] = useState('');
  const [paramToken, setToken] = useState('');
  const [paramResolution, setResolution] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined API options
  const apiOptions = [
    { label: 'Select Exchange', value: '' },
    { label: 'NFO', value: 'NFO' },
    { label: 'NSE', value: 'NSE' },
    { label: 'Equity', value: 'EQ' }
  ];

  const apiResolution = [
    { label: 'Select Resolution', value: '' },
    { label: '5-Minutes', value: '5' },
    { label: '10-Minutes', value: '10' },
    { label: '15-Minutes', value: '15' },
    { label: '30-Minutes', value: '30' },
    { label: '1-Day', value: '1D' }
  ];

  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponseData(null);

    // Construct query parameters
    const queryParams = [];
    if (paramToken) queryParams.push(`token=${encodeURIComponent(paramToken)}`);
    if (paramResolution) queryParams.push(`resolution=${encodeURIComponent(paramResolution)}`);
    if (fromDate) queryParams.push(`from=${encodeURIComponent(fromDate)}`);
    if (toDate) queryParams.push(`to=${encodeURIComponent(toDate)}`);
    if (apiUrl) queryParams.push(`exchange=${encodeURIComponent(apiUrl)}`);

    const fullUrl = queryParams.length > 0 ? `https://api.example.com?${queryParams.join('&')}` : apiUrl;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main_container'>
      <div className='heading_content'>
      <h2>Market Marking</h2>
      </div>
      <form onSubmit={handleFetch} className='forms_container'>
        {/* Dropdown for API selection */}
        <div className='exchange_resolution_container'>
          <label>Exchange: </label>
          <select
            onChange={(e) => setApiUrl(e.target.value)}
            value={apiUrl}
          >
            {apiOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for API Resolution */}
        <div className='exchange_resolution_container' > 
          <label>Resolution: </label>
          <select
            onChange={(e) => setResolution(e.target.value)}
            value={paramResolution}
          >
            {apiResolution.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Input for Token */}
        <div className='token_container' >
          <label>Token: </label>
          <input
            type="text"
            placeholder="Enter Token Number"
            value={paramToken}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/* From Date and To Date Fields */}
        <div className='date_container'>
          <label>From Date: </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className='date_container'>
          <label>To Date: </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className='btn_container'>
          <button className='btn_fetch' type="submit" disabled={!apiUrl}>
            Fetch
          </button>
        </div>


      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {responseData && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '10px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
