import classes from "./style.module.css";
import {Link, NavLink} from "react-router-dom";
import cn from "classnames";
import {useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";
import {FC, ReactNode} from "react";
import useMediaQuery from "../../../utils/hooks/useMediaQuery.ts";
import {MEDIA_CONSTS} from "../../../utils/consts/mediaConsts.ts";
import ThemeToggleButton from "../../ui/button/themetogglebutton/ThemeToggleButton.tsx";
import {APP_PAGES_PATHS_CONSTS} from "../../../utils/consts/appConsts.ts";

// @ts-ignore
import LogoImg from "../../../assets/NewLogo.svg?react";

type AdminHeaderPropsType = {
    add: {
        add: ReactNode,
        link: string
    } | undefined
}
const AdminHeader: FC<AdminHeaderPropsType> = ({add}) => {
    const isDarkMode = useAppSelector(state => state.theme.isDarkMode)
    /* const [isMenuActive, setMenuStatus] = useState(false); */
    const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA)


    return (
        <header className={classes["header"]}>
            {add &&
                <>
                    <Link target={"_blank"} to={add.link}>
                        <div className={classes["header__add"]}>
                            {add.add}
                        </div>
                    </Link>
                    <div className={classes["add_gap"]}>
                        {add.add}
                    </div>
                </>}
            <nav className={classes["header--wrapper"]}>
                <div className={classes["header--navigation"]}>
                    <div className={classes["header--navigation__logo"]}>
                        <Link to={APP_PAGES_PATHS_CONSTS.STATISTICS_PAGE}>{/* statistics? */}
                            <LogoImg className={cn(classes["header--navigation__logo--img"], {
                                [classes.dark]: isDarkMode
                            })}/>
                            <h4 className={classes["header--navigation__logo--name"]}>
                                Richbeak
                            </h4>
                        </Link>
                    </div>
                    {!isPhoneOrSmaller && (
                        <ul className={classes["header--navigation__list"]}>
                            <li
                                className={cn(
                                    classes["header--navigation__list--item"],
                                    "text-400",
                                    "text-medium"
                                )}
                            >
                                <NavLink
                                    className={({isActive}) =>
                                        cn(classes["header--navigation__list--item__link"], {
                                            [classes.active]: isActive,
                                        })
                                    }
                                    to={APP_PAGES_PATHS_CONSTS.STATISTICS_PAGE}
                                >
                                    Статистика
                                </NavLink>
                            </li>
                            <li
                                className={cn(
                                    classes["header--navigation__list--item"],
                                    "text-400",
                                    "text-medium"
                                )}
                            >
                                <NavLink
                                    className={({isActive}) =>
                                        cn(classes["header--navigation__list--item__link"], {
                                            [classes.active]: isActive,
                                        })
                                    }
                                    to={APP_PAGES_PATHS_CONSTS.PARSING_PAGE}
                                >
                                    Парсинг
                                </NavLink>
                            </li>
                            <li
                                className={cn(
                                    classes["header--navigation__list--item"],
                                    "text-400",
                                    "text-medium"
                                )}
                            >
                                <NavLink
                                    className={({isActive}) =>
                                        cn(classes["header--navigation__list--item__link"], {
                                            [classes.active]: isActive,
                                        })
                                    }
                                    to={APP_PAGES_PATHS_CONSTS.COINS_PAGE}
                                >
                                    Монеты
                                </NavLink>
                            </li>
                            <li
                                className={cn(
                                    classes["header--navigation__list--item"],
                                    "text-400",
                                    "text-medium"
                                )}
                            >
                                <NavLink
                                    className={({isActive}) =>
                                        cn(classes["header--navigation__list--item__link"], {
                                            [classes.active]: isActive,
                                        })
                                    }
                                    to={APP_PAGES_PATHS_CONSTS.TAGS_PAGE} /* add translations for admin header links */
                                >
                                    Теги
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
                <div className={classes["header--controls"]}>
                    <div className={classes["header--container"]}>
                        <div className={classes["header--options"]}>
                            <div className={classes["header--options__button"]}>
                                <ThemeToggleButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* {isPhoneOrSmaller && <HeaderMobile isActive={isMenuActive}/>} */}
        </header>
    );
};

export default AdminHeader;
