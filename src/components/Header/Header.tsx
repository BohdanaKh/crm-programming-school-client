import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions } from "../../redux";
import { authService } from "../../services";
import css from "./Header.module.css";

const Header = () => {
  const { me } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!me) {
      dispatch(
        authActions.setMe(JSON.parse(window.localStorage.getItem("me"))),
      );
    }
  }, [me]);

  return (
    <div className={css.Header}>
      <button
        className={css.logo}
        onClick={() => {
          navigate("orders?page=1");
        }}
      >
        Logo
      </button>

      <div className={css.buttonsWrapper}>
        <div className={css.admin}>
          {me?.role === "admin" && <Link to={"adminPanel"}>Admin board</Link>}
        </div>
        <Link to={`users/${me?.id}`}>
          <button className={css.user}>
            {me?.name}
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              style={{ color: "#f7f7f7" }}
            />
          </button>
        </Link>
        <button
          className={css.logout}
          onClick={async () => {
            await authService.logout();
            navigate("login");
          }}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="lg"
            style={{ color: "#f1f2f3" }}
          />
        </button>
      </div>
    </div>
  );
};

export { Header };
