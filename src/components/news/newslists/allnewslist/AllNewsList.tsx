import {FC, useEffect, useMemo, useRef, useState} from 'react';
import classes from "./style.module.css";
import cn from "classnames";
import Button from "../../../ui/button/Button.tsx";
import NewsItem from "../../NewsItem.tsx";
import {publicationsApi} from "../../../../utils/api/publications/publicationsApi.ts";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import TagsListWithSelect from "../../../tags/tagslistwithselect/TagsListWithSelect.tsx";
import {appPublicationsTimeSpan, ICoin, IPublication, ITag} from "../../../../types/types.ts";
import {messages} from "../../../../utils/consts/languages.ts";
import PublicationTimeSpanDropdown
    from "../../../ui/dropdown/publicationtimespandropdown/PublicationTimeSpanDropdown.tsx";
import CoinsDropdown from "../../../ui/dropdown/coinsdropdown/CoinsDropdown.tsx";
import {useNavigate} from "react-router-dom";


type AllNewsListPropsType = {
    isTop?: boolean,
    title: string
}

const AllNewsList: FC<AllNewsListPropsType> = ({isTop, title}) => {

    const isFirstRender = useRef(true)
    const [countOfNewsToShow, setCountOfNewsToShow] = useState(3)
    const navigate = useNavigate()
    const [newsArray, setNewsArray] = useState<IPublication[]>([])
    const [visibleNews, setVisibleNews] = useState<IPublication[]>([]);

    const [newsTimeSpan, setNewsTimeSpan] = useState<appPublicationsTimeSpan>("week")
    // @ts-ignore
    const [selectedCoin, setSelectedCoin] = useState<Omit<ICoin, 'ticker'>>({id: undefined, name: 'nocoin'});
    const [selectedTag, setSelectedTag] = useState<ITag>({
        id: 999,
        name: "Без фильтров",
    })
    const [prevSelCoin, setPrevCoin] = useState(selectedCoin)
    const [prevSelTag, setPrevTag] = useState(selectedTag)


    const setSelectedAndPrevTag = (tag: ITag, state?: ITag) => {
        if (state) setPrevTag(state);
        setSelectedTag(tag);
    }

    const [page, setPage] = useState(1)

    const language = useAppSelector(state => state.language.language)
    const [prevLanguage, setPrevLanguage] = useState(language)

    const countOfNewsToRequest = useMemo(() => {
        if (isFirstRender) {
            return countOfNewsToShow * 2
        } else {
            return countOfNewsToShow
        }
    }, [isFirstRender])

    const QueryParams = useMemo(() => {
        let res = `lang=${language.toLowerCase()}&limit=${countOfNewsToRequest}&page=${page}`
        if (isTop) {
            res = res + `&sort=desc`;
        }
        if (selectedTag.name !== "Без фильтров") {
            res = res + `&tags=${selectedTag.id}`
        }
        if (selectedCoin.id !== undefined) {
            res = res + `&coin=${selectedCoin.id}`
        }
        if (isTop) {
            res = res + `&timespan=${newsTimeSpan}`
        }
        return res
    }, [language, countOfNewsToRequest, page, selectedTag.name, selectedTag.id, selectedCoin.id, newsTimeSpan])
    const {
        data: AllPublicationsQueryResponse,
        isLoading,
        error
    } = publicationsApi.useGetAllPublicationsQuery(QueryParams)

    useEffect(() => {
        if (selectedCoin.id === prevSelCoin.id && selectedTag.id === prevSelTag.id && !isLoading) {
            setNewsArray([...newsArray, ...AllPublicationsQueryResponse!.data])
        }
        if ((selectedCoin.id !== prevSelCoin.id || selectedTag.id !== prevSelTag.id || language !== prevLanguage) && !isLoading) {
            setPrevLanguage(language);
            setCountOfNewsToShow(() => 3)
            setPage(() => 1)
            setNewsArray([...AllPublicationsQueryResponse!.data]);
        }
    }, [AllPublicationsQueryResponse, isLoading]);
    useEffect(() => {

        setVisibleNews(newsArray.slice(0, countOfNewsToShow));

    }, [countOfNewsToShow, newsArray]);

    const handleMoreNewsButton = () => {
        if (selectedCoin.id !== prevSelCoin.id || selectedTag.id !== prevSelTag.id) {
            setNewsArray([...AllPublicationsQueryResponse!.data])
            setPrevCoin(selectedCoin)
            setPrevTag(selectedTag)
        }
        setCountOfNewsToShow(prevState => prevState + 3)
        setPage(prevState => prevState + 1)
    };
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
        }
    }, []);


    if (error) {
        // @ts-ignore
        navigate(`/error/${error.status}`, {replace: true})
        return
    }

    return (
        <div className={classes['AllNewsList']}>
            <div className={cn(classes['AllNewsList__header'])}>
                <h1 className={classes["AllNewsList__header--title"]}>{title}</h1>
                {isTop && <PublicationTimeSpanDropdown contentArr={[
                        {id: "week", name: messages[language]["newsPage.selectionWeek"]}
                        , {id: "month", name: messages[language]["newsPage.selectionMonth"]}
                        , {id: "year", name: messages[language]["newsPage.selectionYear"]}
                    ]} timeSpan={newsTimeSpan} setTimeSpan={setNewsTimeSpan}/>}
            </div>
            <div className={classes['AllNewsList__container']}>
                {/*// @ts-ignore*/}
                <CoinsDropdown setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} setPrevCoin={setPrevCoin}/>
                {/*// @ts-ignore*/}
                <TagsListWithSelect selectedTag={selectedTag} setSelectedTag={setSelectedAndPrevTag}/>
            </div>
            {!isLoading &&
                visibleNews.map((news) => {
                        return (<NewsItem variant={"large"} key={news.id} news={news}/>)
                    }
                )}
            {!isLoading &&
                <>
                    {visibleNews.length <= AllPublicationsQueryResponse!.total &&
                        <Button
                            text={messages[language]["newsPage.ButtonShowMore"]}
                            className={cn(
                                "text-medium",
                                "text-500",
                                classes['AllNewsList__more--button']
                            )}
                            onClick={handleMoreNewsButton}
                        />
                    }
                </>
            }
        </div>
    );
};

export default AllNewsList;