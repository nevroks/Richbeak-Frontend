import classes from "./style.module.css";
import {Link, NavLink, useNavigate, useSearchParams} from "react-router-dom";
import cn from "classnames";
import Input from "../../ui/input/Input.tsx";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";
import {setLanguage} from "../../../store/language/languageSlice.ts";
import {ChangeEvent, FC, ReactNode, useCallback, useEffect, useState} from "react";
import HeaderMobile from "./HeaderMobile.tsx";
import Button from "../../ui/button/Button.tsx";
import {languageApi} from "../../../utils/api/language/languageApi.ts";
import {FormattedMessage} from "react-intl";
import Dropdown from "../../ui/dropdown/Dropdown.tsx";
import DropdownItem from "../../ui/dropdown/DropdownItem.tsx";
import useMediaQuery from "../../../utils/hooks/useMediaQuery.ts";
import {MEDIA_CONSTS} from "../../../utils/consts/mediaConsts.ts";
import {messages} from "../../../utils/consts/languages.ts";
import ThemeToggleButton from "../../ui/button/themetogglebutton/ThemeToggleButton.tsx";
import {APP_PAGES_PATHS_CONSTS} from "../../../utils/consts/appConsts.ts";
import {appLanguages} from "../../../types/types.ts";

// @ts-ignore
import MenuImg from "./../../../assets/icons/menu.svg?react";
// @ts-ignore
import MenuCloseImg from "./../../../assets/icons/close-square.svg?react";
// @ts-ignore
import LogoImg from "../../../assets/NewLogo.svg?react";
// @ts-ignore
import LoopImg from "./../../../assets/icons/iconLoop.svg?react";

type HeaderPropsType={
    add:{
        add:ReactNode,
        link:string
    }|undefined
}
const Header:FC<HeaderPropsType> = ({add}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const isDarkMode=useAppSelector(state => state.theme.isDarkMode)
    const [isMenuActive, setMenuStatus] = useState(false);
    const [isSearchActive, setSearchStatus] = useState(false);
    const isPhoneOrSmaller=useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA)
    const language = useAppSelector((state) => state.language.language);
    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const form = evt.target as HTMLFormElement;
      const query = form.search.value;
      navigate(APP_PAGES_PATHS_CONSTS.SEARCH_PAGE);
      setSearchParams({search: query})
    }
       const [searchValue, setSearchValue] = useState(searchQuery);

       useEffect(() => {
           setSearchValue(searchQuery);
       }, [searchQuery]);

       const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const newValue = (evt.target as HTMLInputElement).value;
        setSearchValue(newValue);
        setSearchParams({ search: newValue });
    }

    // -----this data prefetched-----
    const {
        data: useGetPriorityLanguageQueryResponse,
        isLoading: isPriorityLanguageLoading,
    } = languageApi.useGetPriorityLanguageQuery()
    // -----this data prefetched-----

    useEffect(() => {
        if (!isPriorityLanguageLoading) {
            dispatch(setLanguage(useGetPriorityLanguageQueryResponse!.language))
        }
}, [isPriorityLanguageLoading]);

    const {
        data: useGetAllLanguagesQueryResponse,
        isLoading: isAllLanguagesLoading,
    } = languageApi.useGetAllLanguagesQuery()

    const [chosenLanguage, setLanguageDropdown] = useState({name: 'EN',id:99});
    useEffect(() => {
        // @ts-ignore
        setLanguageDropdown({name: useGetPriorityLanguageQueryResponse?.language ? useGetPriorityLanguageQueryResponse!.language : 'EN',id: useGetAllLanguagesQueryResponse?.languages?.findIndex((el) => el === useGetPriorityLanguageQueryResponse?.language)})
    }, [useGetAllLanguagesQueryResponse, useGetPriorityLanguageQueryResponse])

    const setLanguageCallback = useCallback((langItem: {id: number, name: appLanguages}) => {
        setLanguageDropdown(langItem);
        dispatch(setLanguage(langItem.name));
    }, [dispatch, setLanguageDropdown])

    if (isAllLanguagesLoading) {
        return
    }

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
                            <Link to={APP_PAGES_PATHS_CONSTS.NEWS_PAGE}>
                                <LogoImg className={cn(classes["header--navigation__logo--img"], {
                                    [classes.dark]: isDarkMode
                                })}/>
                                <h4 className={classes["header--navigation__logo--name"]}>
                                    <FormattedMessage id="header.logoName"/>
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
                                        to={APP_PAGES_PATHS_CONSTS.NEWS_PAGE}
                                    >
                                        <FormattedMessage id="firstPage.name"/>
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
                                        to={APP_PAGES_PATHS_CONSTS.MARKET_CAP_PAGE}
                                    >
                                        <FormattedMessage id="secondPage.name"/>
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
                                        to={APP_PAGES_PATHS_CONSTS.TOP_NEWS_PAGE}
                                    >
                                        <FormattedMessage id="thirdPage.name"/>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className={classes["header--controls"]}>
                        <div className={classes["header--container"]}>
                            <div className={classes["header--options"]}>
                                {isPhoneOrSmaller ? (
                                    <>
                                        <div className={classes["header--options__button"]}>
                                            <Button
                                                onClick={() => {
                                                    if(isPhoneOrSmaller){
                                                        navigate('/search');
                                                        setMenuStatus(false)
                                                    }
                                                    setSearchStatus(!isSearchActive);
                                                }}
                                                type="button"
                                            >
                                                {!isSearchActive ? <LoopImg/> : <MenuCloseImg/>}
                                            </Button>
                                        </div>
                                        {isSearchActive && (
                                            <form autoComplete="false" onSubmit={handleSubmit}
                                                  className={classes["header--options__search--wrapper"]}
                                            >
                                                <Input type="search" name="search" value={searchValue}
                                                       onChange={handleChange}
                                                       icon={<LoopImg/>}
                                                       placeholder={messages[language]["search.placeholder"]}
                                                       variant={"default"}
                                                       className={cn(classes["header--options__search--wrapper__input"])}
                                                />
                                            </form>
                                        )}
                                    </>
                                ) : (
                                    <form autoComplete="false" onSubmit={handleSubmit}>
                                        <Input type="search" name="search" value={searchValue} onChange={handleChange}
                                               icon={<LoopImg/>}
                                               placeholder={messages[language]["search.placeholder"]}
                                               variant={"default"}
                                        />
                                    </form>

                                )}

                                <div className={classes["header--options__button"]}>
                                    <ThemeToggleButton/>
                                </div>

                            </div>
                            {isPhoneOrSmaller && (
                                <Button
                                    onClick={() => {
                                        if(isPhoneOrSmaller){
                                            setSearchStatus(false)
                                        }
                                        setMenuStatus(!isMenuActive);
                                    }}
                                    type="button"
                                >
                                    {isMenuActive ? <MenuCloseImg/> : <MenuImg/>}
                                </Button>
                            )}
                        </div>
                        <Dropdown
                            choseOptional={false}
                            state={chosenLanguage}
                            setState={setLanguageCallback}
                            content={useGetAllLanguagesQueryResponse?.languages ? <>{useGetAllLanguagesQueryResponse?.languages.map((el, index) => {
                                return <DropdownItem key={index} value={index} text={el}/>
                            })}</> : <><DropdownItem text={'noth'} key={99} value={99}/></>}
                            size='xsmall'
                            text="EN"
                            style="button"
                            contentClassname={classes["header__language--dropdown__content"]}
                        />
                        {/*<Button onClick={() => navigate(APP_PAGES_PATHS_CONSTS.SIGN_IN_PAGE)} type="button" className={cn('text-medium', 'text-500',classes["header--controls__button"])} text="SIGN IN"/>*/}
                    </div>
                </nav>
                {isPhoneOrSmaller && <HeaderMobile isActive={isMenuActive}/>}
        </header>
    );
};

export default Header;
