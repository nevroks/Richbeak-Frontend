import {useEffect, useMemo, useRef, useState} from "react";
import {useAppSelector} from "../../utils/hooks/ReduxHooks.ts";
import StatisticsPageRequestsPerSecondGraph
    from "./pageComponents/StatisticsPageRequestsPerSecondGraph/StatisticsPageRequestsPerSecondGraph.tsx";
import StatisticsPageUniqueUsersGraph
    from "./pageComponents/StatisticsPageUniqueUsersGraph/StatisticsPageUniqueUsersGraph.tsx";
import {publicationsApi} from "../../utils/api/publications/publicationsApi.ts";
import {IPublication} from "../../types/types.ts";
import Button from "../../components/ui/button/Button.tsx";
//import { messages } from "../../utils/consts/languages.ts";
import classes from "./style.module.css";
import cn from "classnames";
import NewsItem from "../../components/news/NewsItem.tsx";
import StatisticsPageUniqueUsersCountriesGraph
    from "./pageComponents/StatisticsPageUniqueUsersCountriesGraph/StatisticsPageUniqueUsersCountriesGraph.tsx";
import StatisticsPageCoins from "./pageComponents/StatisticsPageCoins/StatisticsPageCoins.tsx";
import StatisticsPageTags from "./pageComponents/StatisticsPageTags/StatisticsPageTags.tsx";

const StatisticsPage = () => {
    const isFirstRender = useRef(true);
    const [countOfNewsToShow, setCountOfNewsToShow] = useState(6);
    const [visibleNews, setVisibleNews] = useState<IPublication[]>([]);

    const countOfNewsToRequest = useMemo(() => {
        if (isFirstRender.current) {
            return countOfNewsToShow * 2;
        } else {
            return countOfNewsToShow;
        }
    }, [isFirstRender, countOfNewsToShow]);

    const language = useAppSelector((state) => state.language.language);

    const QueryParams = useMemo(() => {
        const res = `lang=${'ru'}&limit=${countOfNewsToRequest}&sort=desc`;
        return res;
    }, [language, countOfNewsToRequest]);

    const {
        data: AllPublicationsQueryResponse,
        isLoading,
        error,
    } = publicationsApi.useGetAllPublicationsQuery(QueryParams);

    useEffect(() => {
        if (!isLoading && AllPublicationsQueryResponse) {
            setVisibleNews(AllPublicationsQueryResponse.data.slice(0, countOfNewsToShow));
        }
    }, [countOfNewsToShow, AllPublicationsQueryResponse]);

    const handleMoreNewsButton = () => {
        setCountOfNewsToShow((prevState) => prevState + 6);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, []);

    return (
        <div className={classes["StatisticsPage__wrapper"]}>
            <section>
                <StatisticsPageRequestsPerSecondGraph/>
            </section>
            <section>
                <StatisticsPageUniqueUsersGraph/>
            </section>
            <section>
                <StatisticsPageUniqueUsersCountriesGraph/>
            </section>
            <section className={classes["newsStatistics"]}>
                <h2 className={classes["newsStatistics__title"]}>
                    Самые просматриваемые посты
                </h2>
                <div className={classes["newsStatistics__wrapper"]}>
                    {isLoading || error ? (
                        <h1>Загрузка...</h1>
                    ) : (
                        visibleNews.map((news, i) => {
                            return (
                                <NewsItem
                                    variant={"medium"}
                                    key={news.id}
                                    news={news}
                                    top={i}
                                />
                            );
                        })
                    )}
                </div>
                {!isLoading && AllPublicationsQueryResponse?.total && (
                    <>
                        {visibleNews.length <=
                            AllPublicationsQueryResponse!.total - countOfNewsToShow && (
                                <Button
                                    text={
                                        "Показать ещё (6)"
                                    }
                                    className={cn(
                                        "text-medium",
                                        "text-500",
                                        classes["newsStatistics__button--more"]
                                    )}
                                    onClick={handleMoreNewsButton}
                                />
                            )}
                    </>
                )}
            </section>
            <section className={classes["newsStatistics"]}>
                <StatisticsPageCoins/>
            </section>
            <section className={classes["newsStatistics"]}>
                <StatisticsPageTags/>
            </section>
        </div>
    );
};

export default StatisticsPage;
