import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { authService } from "../../services";
import css from "./Header.module.css";

const Header = () => {
  const { me } = useAppSelector((state) => state.authReducer);

  return (
    <div className={css.Header}>
      <div className={css.logo}>
        <Link to={"orders"}>Logo</Link>
      </div>
      <div className={css.user}>
        {me.role === "admin" && <Link to={"adminPanel"}>Admin</Link>}
        <Link to={`users/${me.id}`}>
          <FontAwesomeIcon icon={faUser} style={{ color: "#f4f6fb" }} />
        </Link>
        <Link to={"logout"}>
          <button
            onClick={async () => {
              await authService.logout();
            }}
            style={{
              backgroundColor: "green",
              width: "50px",
              height: "60px",
              border: "none",
            }}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "#f7f7f8" }}
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export { Header };
