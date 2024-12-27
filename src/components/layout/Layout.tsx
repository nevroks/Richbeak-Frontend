import {Suspense, useEffect, useLayoutEffect} from 'react';
import Header from "./header/Header.tsx";
import {Outlet, useLocation} from "react-router-dom";

import classes from "./style.module.css";
import Footer from "./footer/Footer.tsx";
import { languageApi } from '../../utils/api/language/languageApi.ts';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import {messages} from "../../utils/consts/languages.ts";
import {IntlProvider} from "react-intl";

// @ts-ignore
/* import Add from "../../assets/addImg.svg?react"; */


const Layout = () => {
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        dispatch(languageApi.util.prefetch("getPriorityLanguage",undefined,{}))
    }, []);

    const location=useLocation()
    // const isNewsPage = matchPath(location.pathname, APP_PAGES_PATHS_CONSTS.NEWS_PAGE);
    // const isSingleNewsPage=location.pathname.startsWith("/news/")
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const language = useAppSelector((state) => state.language.language);
    return (
        <>
            <IntlProvider locale={language} messages={messages[language]}>
                <div className={classes['layout']}>
                    {/*<Header add={isNewsPage || isSingleNewsPage ?*/}
                    {/*    {add:<Add/>,link:"https://ekaterinburg.hh.ru/resume/99b74089ff0d7c2d890039ed1f326a75657054"}*/}
                    {/*    :*/}
                    {/*    undefined*/}
                    {/*}/>*/}
                    <Header add={undefined}/>
                    <div className={classes['page']}>
                        <Suspense fallback={<></>}>
                            <Outlet/>
                        </Suspense>
                    </div>
                    <Footer/>
                </div>
            </IntlProvider>
        </>
    );
};

export default Layout;