import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/authenticationSlice";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { PATH } from "../../constansts";
import { RootState } from "@/redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authedUser }= useSelector((state: RootState) => state.authentication);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(PATH.LOGIN)
  };


  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li  className={`nav-item ${location.pathname === PATH.HOME ? ' active': ''}`}>
            <Link to="/" className={"nav-link"} data-testid="nav-1">
              Home
            </Link>
          </li>
          <li  className={`nav-item ${location.pathname === PATH.LEADER_BOARD ? ' active': ''}`}>
            <Link to="/leaderboard"  className={"nav-link"}  data-testid="nav-2">
              Leaderboard
            </Link>
          </li>
          <li  className={`nav-item ${location.pathname === PATH.NEW_QUESTION ? ' active': ''}`}>
            <Link to="/add"   className={"nav-link"}  data-testid="nav-3">
              New
            </Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {authedUser && (
          <>
            <img
              src={authedUser.avatarURL}
              alt={`${authedUser.name} Avatar`}
              className="user-avatar"
            />
            <span className="user-name">{authedUser.name}</span>
          </>
        )}
        <button className="logout-btn" onClick={handleLogout} data-testid="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
