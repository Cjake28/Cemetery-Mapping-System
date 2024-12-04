import {useState} from 'react'
import './bargraph.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Spinner from '../../../../components/spinner/spinner.jsx';
import YearDropdown from './yeardropdown.jsx';

// Utility to convert a date string to a month name
function convertToMonthName(dateString) {
  const [year, month] = dateString.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
  ];
  return monthNames[parseInt(month, 10) - 1];
}

// Generate a full array of months with default values
function generateFullYearData(data) {
  const currentYear = new Date().getFullYear();
  const yearFromData = data?.[0]?.month.split("-")[0] || currentYear;

  const allMonths = Array.from({ length: 12 }, (_, i) => ({
    month: `${yearFromData}-${String(i + 1).padStart(2, "0")}`,
    total_burials: 0,
  }));

  // Map through all months and merge with actual data
  return allMonths.map((monthObj) => {
    const matchingMonth = data.find((item) => item.month === monthObj.month);
    return matchingMonth || monthObj;
  });
}

export default function MonthlyBurialsBarGraph({ data, isLoading = false, selectedYear, onYearChange }) {
  
  if (isLoading) return <Spinner size={70} color="#ff6347" />;

  // Generate full data set for the detected or current year
  const fullYearData = generateFullYearData(data || []);

  // Transform data to include month names
  const transformedData = fullYearData.map(item => ({
    ...item,
    month: convertToMonthName(item.month),
  }));

  return (
    <div className="bargraph-container">
        <YearDropdown selectedYear={selectedYear} onYearChange={onYearChange}/>
      {!data || data.length === 0 ? (
        <div style={{ textAlign: "center", height: "100%", width: "100%", padding: "20px", color: "#888" }}>
          No data available for the selected period.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={transformedData} margin={{ top: 0, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_burials" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
