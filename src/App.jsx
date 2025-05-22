import './App.css';
import { useTitle } from './hooks';

const App = () => {
  useTitle('Booking Nimbus');
  return (
    <div className="content">
      <h1>Welcome to Booking Care Nimbus</h1>
    </div>
  );
};

export default App;
