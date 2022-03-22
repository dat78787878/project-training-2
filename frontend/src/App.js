import PieChart from './containers/PieChart/PieChart';
import RankingChart from './containers/RankingChart/RankingChart';
import HeatChart from './containers/HeatChart/HeatChart';
import DateRange from './containers/DateRange/DateRange';
import ModalShow from './containers/PieChart/ModalShow';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="section">
      <DateRange />
      <ModalShow />
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
