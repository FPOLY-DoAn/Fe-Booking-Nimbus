// import './App.css';
import { useTitle } from './hooks';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  useTitle('Booking Nimbus');
  return (
    <>
      <AppRoutes/>
    </>

  );
};

export default App;
