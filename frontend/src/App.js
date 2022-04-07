import PieChart from './containers/PieChart/PieChart';
import RankingChart from './containers/RankingChart/RankingChart';
import HeatChart from './containers/HeatChart/HeatChart';
import LineChart from './containers/LineChart/LineChart';
import DateRange from './containers/DateRange/DateRange';
import ModalShow from './containers/PieChart/ModalShow';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <div className="header">
        <DateRange />
        <ModalShow />
      </div>
      <div className="section">
        <Row>
          <Col xl={4} lg={6} md={12}>
            <PieChart />
          </Col>
          <Col xl={8} lg={12} md={12}>
            <LineChart />
          </Col>
        </Row>
        <div className="pt-3">
          <Row>
            <Col xl={5} lg={8} md={12}>
              <RankingChart />
            </Col>
            <Col xl={7} lg={12} md={12}>
              <HeatChart />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
