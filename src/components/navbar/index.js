import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { db } from "../../db"
import { useLiveQuery } from "dexie-react-hooks"
import { login } from '../../components/login/userSlice'
import data from "./data.json";
import { logout } from '../../components/login/userSlice'
import { ReactComponent as BurgerIcon } from "../../icons/burger.svg";
import { ReactComponent as LogoutIcon } from "../../icons/logout.svg";
import { useEffect, useRef, useState } from "react";
import "./index.css";

function Navbar() {
  const user = useSelector((state) => state.user.value)
  const web3 = useSelector((state) => state.web3.value)
  console.log("user in navbar", user, web3)
  const dispatch = useDispatch()
  const dbUsers = useLiveQuery(
    () => db.user.toArray()
  );
  console.log("dbUsers", dbUsers)
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarMobileRef = useRef();
  useEffect(() => {
    document.querySelector("html").addEventListener("click", (event) => {
      if (!event.target.closest(".navbar-item")) setMenuOpen(false);
    });
  }, []);

  useEffect(() => {
    console.log("user, dbUsers", user, dbUsers)
    !user?.value && dbUsers?.length && dispatch(login(dbUsers[0]))
  },[dbUsers])

  
  return (
    <>
      <nav ref={navbarMobileRef} className="navbar mobile container">
        <Link
          className="navbar-link logo"
          to="/"
          onClick={() => setMenuOpen(false)}
        >
        </Link>
        <div
          className="navbar-item burger-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <BurgerIcon />
        </div>
        {menuOpen && (
          <ul className="navbar-list">
            {data.items?.map((item, index) => (
              <>
                <li className="navbar-item" key={`menu-item-${index}`}>
                  <Link
                    className="navbar-link"
                    to={item.url}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              </>
            ))}
            <li className="navbar-item login" key={`menu-item-login`}>
              <Link
                className="navbar-link login"
                to={data.login.url}
                onClick={() => setMenuOpen(false)}
              >
                {data.login.title} >
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <nav className="navbar non-mobile container">
        <ul className="navbar-list">
          <li className="navbar-item" key={`menu-item-logo`}>
            <Link className="navbar-link logo" to="/" />
          </li>
          {data.items?.map((item, index) => (
            <>
              <li className="navbar-item" key={`menu-item-${index}`}>
                <Link className="navbar-link" to={item.url}>
                  {item.title}
                </Link>
              </li>
            </>
          ))}
          <li className="navbar-item login" key={`menu-item-login`}>
            {user?.online ? 
            <Link className="" to={data.my_account.url}>
              {`...${user?.web3Address.slice(-3)}`}
              <LogoutIcon className="logout" />
            </Link>
            :
              <Link className="" to={data.login.url}>
              {data.login.title}
              </Link>
            }
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
