import PieChart from './containers/PieChart/PieChart';
import RankingChart from './containers/RankingChart/RankingChart';
import HeatChart from './containers/HeatChart/HeatChart';
import DateRange from './containers/DateRange/DateRange';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="section">
      <DateRange />
      <div className="d-flex">
        <PieChart />
      </div>
      <div className="d-flex pt-3">
        <RankingChart />
        <HeatChart />
      </div>
    </div>
  );
}

export default App;
