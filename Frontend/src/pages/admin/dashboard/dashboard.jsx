import {useState, useEffect} from 'react'
import './dashboard.css';
import axios from 'axios';
import Piechart from './piechart/piechart.jsx';
import MonthlyBurialsBarGraph from './barGraph/bargraph.jsx'
import DashboardCardCompt from './dashboardCard/dashboardCompt.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

function convertToMonthName(dateString) {
  if (!dateString) {
    return "Invalid date"; // Or another placeholder value
  }

  const [year, month] = dateString.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthIndex = parseInt(month, 10) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    return "Invalid month"; // Handle invalid month values
  }

  return monthNames[monthIndex];
}

const  convertToTwoDecimalPlaces = (value) => {
  // Convert the string to a number and format it to two decimal places
  return parseFloat(value).toFixed(2);
}


export default function Dashboard() {
  const queryClient = useQueryClient();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to the current year

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year, 10));
  };

  // Query for admin counts
  const { data: adminCounts, isLoading: admincountsQLoading, error: admincountsError } = useQuery({
    queryKey: ['adminCountsQ'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/admin-counts`);
        return response.data.adminCounts;
      } catch (error) {
        console.error('Error fetching admin counts:', error);
        throw new Error('Failed to fetch admin counts.');
      }
    },
  });

  // Query for user counts
  const { data: userCounts, isLoading: usercountsQLoading, error: usercountsError } = useQuery({
    queryKey: ['userCountsQ'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/user-counts`);
        return response.data.userCounts;
      } catch (error) {
        console.error('Error fetching user counts:', error);
        throw new Error('Failed to fetch user counts.');
      }
    },
  });

  // Query for month with the least burials
  const { data: leastBurialsMonth, isLoading: leastBurialsLoading, error: leastBurialsError } = useQuery({
    queryKey: ['burialData', selectedYear], // Include selectedYear in queryKey
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/burial_data`, {
          params: { year: selectedYear }, // Use selectedYear directly
        });
        return response.data; 
      } catch (error) {
        console.error('Error fetching least burials month:', error);
        throw new Error('Failed to fetch least burials month.');
      }
    },
    keepPreviousData: true, // Keeps the old data while fetching new data
  });
  

  useEffect(()=>{
    console.log(leastBurialsMonth);
    // console.log(convertToMonthName(leastBurialsMonth?.data?.leastBurialsMonth?.month));
  },[leastBurialsMonth]);

  const leastBurialMonthName = leastBurialsMonth?.data?.leastBurialsMonth?.month
  ? convertToMonthName(leastBurialsMonth.data.leastBurialsMonth.month)
  : "N/A";

  const AverageSales = leastBurialsMonth?.data?.averageBurials
  ? convertToTwoDecimalPlaces(leastBurialsMonth?.data?.averageBurials)
  : "N/A";

  const monthlyBurials = leastBurialsMonth?.data?.monthlyBurials || [];

  // const { occupiedLots, vacantLots, noData } = piechartData?.data;

  return (
    <div className="dashboard-container">
      <div className="dashboard-box piechart-box">
        <Piechart 
          // occupiedLots={occupiedLots}
          // vacantLots={vacantLots}
        />
      </div>
      <div className="dashboard-middle">
        <div className="dashboard-sub-box bargraph-parent-container">
          <MonthlyBurialsBarGraph 
            data={monthlyBurials} 
            isloading={leastBurialsLoading} 
            selectedYear={selectedYear.toString()}  
            onYearChange={handleYearChange}
          />
        </div>
        <div className="dashboard-sub-box">
          <div className="middle-sub-box btm-mid-dash">
          <DashboardCardCompt
              title="Average Sales"
              value={AverageSales}
              loading={leastBurialsLoading}
              // height = '90%'
            />
          </div>
          <div className="middle-sub-box">
            <DashboardCardCompt
              title="Month with Least Sales"
              value={leastBurialMonthName}
              loading={leastBurialsLoading}
              fontSize="3rem"
            />
          </div>
        </div>
      </div>
      <div className="dashboard-last-box">
        <div className="dashboard-sub-box">
          <DashboardCardCompt
            title="Admin"
            value={adminCounts || 0}
            loading={admincountsQLoading}
          />
        </div>
        <div className="dashboard-sub-box">
          <DashboardCardCompt
            title="User"
            value={userCounts || 0}
            loading={usercountsQLoading}
          />
        </div>
      </div>
    </div>
  );
}
