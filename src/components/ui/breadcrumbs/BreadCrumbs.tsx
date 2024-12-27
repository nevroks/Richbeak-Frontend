import {Link, useLocation} from "react-router-dom";
import classes from "./style.module.css";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((el) => el);

    return (
        <div className={classes["Breadcrumbs__container"]}>
            {pathnames.map((pathname:string, index:number) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                // To make sure the last breadcrumb is not a link
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <p key={index}>{/^\d+$/.test(pathname) ? "Все новости" : pathname}</p>
                ) : (
                    <div style={{display:"flex"}} key={index}>
                        <Link to={routeTo}>
                            {pathname.toUpperCase()}
                        </Link>
                        <div className={classes["Breadcrumbs__container--crumb__divider"]}>
                            /
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Breadcrumbs