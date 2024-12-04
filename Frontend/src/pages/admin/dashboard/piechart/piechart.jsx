import {useState, useEffect} from 'react';
import './piechart.css';
import axios from 'axios';
import Spinner from '../../../../components/spinner/spinner.jsx'
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";
import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const totalLots = 2346;

const COLORS = ["#f54254", "#6031f7", "#FFBB28"]; // Update colors for "No Data"

const Bullet = ({ backgroundColor, size }) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size
      }}
    ></div>
  );
};

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="LegendList">
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="BulletLabelText">{entry.value}</div>
          </div>
          <div style={{ marginLeft: "20px" }}>{entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ viewBox, labelText, value }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="20"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 30}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="#0088FE"
        fontSize="26"
        fontWeight="600"
      >
        {value}
      </text>
    </g>
  );
};

export default function Piechart() {

  const { data: piechartData, isLoading: piechartDataLoding, error: piechartDataError } = useQuery({
    queryKey: ['piechartData'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/lot-counts`);
        return response.data;
      } catch (error) {
        console.error('Error fetching lot counts:', error);
        throw new Error('Failed to fetch lot counts.');
      }
    },
    keepPreviousData: true, // Keeps the old data while fetching new data
  });

  useEffect(()=>{
    console.log(piechartData?.data);
  },[piechartData])

  if(piechartDataLoding){
    return (
      <div className="piechart-container">
        <Spinner size={90} color="#ff6347"/>
      </div>
    ); 
  }

  const { occupiedLots = 0, vacantLots = 0 } = piechartData?.data || {};

  const noDataLots = Math.max(totalLots - (occupiedLots + vacantLots), 0);

  const data01 = [
    { name: "Occupied", value: occupiedLots },
    { name: "Vacants", value: vacantLots },
    { name: "No Data", value: noDataLots }
  ];

  return (
    <div className="piechart-container">
      <div
        style={{
          width: "100%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data01}
              dataKey="value"
              cx={160}
              cy={100}
              innerRadius={75}
              outerRadius={100}
            >
              {data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={<CustomLabel labelText="Cemetery Lots" value={totalLots} />}
                position="center"
              />
            </Pie>
            <Legend content={<CustomizedLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
