import { Link } from 'react-router';

const UserLayout = ({ children }) => {
  return (
    <>
      <header>Header </header>
      <Link to="/login">Login</Link>
      <main>{children}</main>
      <footer>Footer </footer>
    </>
  );
};

export default UserLayout;
