import { useLocation } from "react-router-dom";

const NoNavbar = ({ children }) => {
  const location = useLocation();
  const pathsWithoutNavbar = ["/login","/register"];
  const showNavbar = !pathsWithoutNavbar.includes(location.pathname);

  return <div>{showNavbar && children}</div>;
};

export default NoNavbar;