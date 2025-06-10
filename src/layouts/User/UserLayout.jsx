import { HeaderHome } from '../../components';

const UserLayout = ({ children }) => {
  return (
    <>
      <HeaderHome />
      <main>{children}</main>
      <footer>Footer </footer>
    </>
  );
};

export default UserLayout;
