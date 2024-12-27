import { useLocation } from "react-router-dom";
import classes from "./style.module.css";

const Preloader = () => {
  const location = useLocation();
  const locationMarket = location.pathname === "/market";

  switch (true) {
    case locationMarket:
      return (
        <tbody>
          <tr>
            <td>
              <div className={classes["preloader__market"]}>
                <div className={classes["preloader__container"]}>
                  <span className={classes["preloader__round--market"]}></span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      );
    default:
      return (
        <div className={classes["preloader"]}>
          <div className={classes["preloader__container"]}>
            <span className={classes["preloader__round"]}></span>
          </div>
        </div>
      );
  }
};

export default Preloader;
