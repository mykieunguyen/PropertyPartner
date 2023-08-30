import { useGetTokenQuery } from "./app/apiSlice";
import { NavLink } from "react-router-dom";

const MainPageBanner = () => {
  const { data: account } = useGetTokenQuery();
  console.log(account);

  return (
    <div className="banner-container">
      <h1>Looking to sell your property?</h1>
      <h4>LET US HELP</h4>
      {!account && (
        <button type="button" className="btn btn-secondary">
          <NavLink to="/accounts/">Sign Up</NavLink>
        </button>
      )}
      {account && (
        <button type="button" className="btn btn-secondary">
          <NavLink to="/properties/">List Property</NavLink>
        </button>
      )}
    </div>
  );
};

export default MainPageBanner;
