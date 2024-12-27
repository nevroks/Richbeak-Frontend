import {createBrowserRouter} from "react-router-dom";
import Layout from "../../components/layout/Layout.tsx";
import {lazy} from "react";
import {APP_PAGES_PATHS_CONSTS} from "../consts/appConsts.ts";

import NotFoundPage from "../../pages/errorpages/NotFoundPage.tsx";
import ServerErrorPage from "../../pages/errorpages/ServerErrorPage.tsx";
import StatisticsPage from "../../pages/StatisticsPage/StatisticsPage.tsx";

import AdminLayout from "../../components/layout/adminLayout/adminLayout.tsx";
import {ProtectedRouteElement} from "../hocs/protectedRoute/protectedRoute.tsx";

import ParsingPage from "../../pages/parsingpage/ParsingPage.tsx";
// import SignInPage from "../../pages/signInPage/signInPage.tsx";
import SignInPage from "../../pages/signInPage/signInPage.tsx";

const NewsPage = lazy(() => import("../../pages/newspage/NewsPage.tsx"))
const TopNewsPage = lazy(() => import("../../pages/topnewspage/TopNewsPage.tsx"))
const MarketCupPage = lazy(() => import("../../pages/marketcuppage/MarketCupPage.tsx"))
const SingleNewsPage = lazy(() => import("../../pages/singlenewspage/SingleNewsPage.tsx"))
const NewsSearchPage = lazy(() => import("../../pages/newssearchpage/NewsSearchPage.tsx"))
const TagEditorPage = lazy(() => import("../../pages/tageditorpage/TagEditorPage.tsx"))
const CoinEditorPage = lazy(() => import("../../pages//coineditorpage/CoinEditorPage.tsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: APP_PAGES_PATHS_CONSTS.NEWS_PAGE,
                element: <NewsPage/>,

            },
            {
                path: APP_PAGES_PATHS_CONSTS.TOP_NEWS_PAGE,
                element: <TopNewsPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.MARKET_CAP_PAGE,
                element: <MarketCupPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.SINGLE_NEWS_PAGE,
                element: <SingleNewsPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.SEARCH_PAGE,
                element: <NewsSearchPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.SIGN_IN_PAGE,
                element: <SignInPage/>
            },
            // {
            //     path: APP_PAGES_PATHS_CONSTS.SIGN_UP_PAGE,
            //     element: <SignUpPage/>
            // }
        ]
    },
    {
        path: "/admin",
        element: <ProtectedRouteElement element={<AdminLayout/>}/>,
        children: [
            {
                path: APP_PAGES_PATHS_CONSTS.STATISTICS_PAGE,
                element: <StatisticsPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.PARSING_PAGE,
                element: <ParsingPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.TAGS_PAGE,
                element: <TagEditorPage/>
            },
            {
                path: APP_PAGES_PATHS_CONSTS.COINS_PAGE,
                element: <CoinEditorPage/>
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage/>
    },
    {
        path: APP_PAGES_PATHS_CONSTS.SERVER_ERROR_PAGE,
        element: <ServerErrorPage/>
    },
]);
export default router;
