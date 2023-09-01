import { useGetTokenQuery } from "./app/apiSlice";
import { NavLink } from "react-router-dom";

const MainPageBanner = () => {
  const { data: account } = useGetTokenQuery();

  return (
    <div className="banner-container">
      <div className="container">
        <h1>Looking to sell your property?</h1>
        <h4>Let Us Help</h4>
        {!account && (
          <button type="button" className="btn btn-secondary">
            <NavLink to="/accounts/">Sign Up</NavLink>
          </button>
        )}
        {account && (
          <button type="button" className="btn btn-secondary">
            <NavLink to="/properties/new">List Property</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default MainPageBanner;
