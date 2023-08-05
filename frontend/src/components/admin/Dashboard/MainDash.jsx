import Cards from "../../common/DashboardCard/Cards";
import Table from "../../common/Table/Table"
import "./MainDash.css";

const MainDash = () => {
    return (
      <div className="MainDash">
        <h1>Dashboard</h1>
        <Cards />
        <Table />
      </div>
    );
  };
  
  export default MainDash;