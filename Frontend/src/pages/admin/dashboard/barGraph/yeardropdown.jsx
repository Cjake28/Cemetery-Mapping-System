import React from 'react';
import './yearDropdown.css';

export default function YearDropdown({ selectedYear, onYearChange }) {
  const currentYear = new Date().getFullYear();

  // Generate a range of years (e.g., from currentYear to currentYear - 10)
  const years = Array.from({ length: 200 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const selected = e.target.value;
    onYearChange(selected); // Pass the selected year to the parent component
  };

  return (
    <div className="year-dropdown-container">
      <label htmlFor="year-select" className="year-dropdown-label">Select Year:</label>
      <select
        id="year-selected"
        value={selectedYear}
        onChange={handleChange}
        className="year-dropdown-select"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
