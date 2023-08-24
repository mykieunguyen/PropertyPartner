import { NavLink } from "react-router-dom";
import { useGetTokenQuery } from "./app/apiSlice";
import { useLogoutMutation } from "./app/apiSlice";

const Nav = () => {
  const { data: account } = useGetTokenQuery();
  const [logout, logoutResponse] = useLogoutMutation();

  return (
    <>
      <header>
        <div>
          <NavLink to="/">Property Partner</NavLink>
          {!account && <NavLink to="/Login">Login</NavLink>}
          {account && (
            <button to="/Logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Nav;
