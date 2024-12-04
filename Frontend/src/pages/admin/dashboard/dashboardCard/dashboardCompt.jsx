import "./dashboardCompt.css"; // Create a CSS file for styling
import Spinner from '../../../../components/spinner/spinner.jsx'
export default function DashboardCardCompt({value,title,loading=false, fontSize = "4.4rem", height='95%'}){
  return (
    <div className="info-card" style={{height:height}}>
      <div className="info-card-header">
        <span>{title}</span>
      </div>
      <div className="info-card-value" style={{fontSize}}>{loading ?<Spinner size={70} color="#ff6347"/> :value}</div>
      
    </div>
  );
};

