import NewsItem from "../../components/news/NewsItem";
import classes from "./style.module.css";
import cn from "classnames";
import Button from "../../components/ui/button/Button";
import { useEffect, useState, useRef, useMemo } from "react";
import { useAppSelector } from "../../utils/hooks/ReduxHooks.ts";
import { publicationsApi } from "../../utils/api/publications/publicationsApi";
import { IPublication } from "../../types/types";
import {useNavigate, useSearchParams} from "react-router-dom";
import useDebounce from "../../utils/hooks/useDebounce.ts";
import {messages} from "../../utils/consts/languages.ts";

const NewsSearchPage = () => {

  const isFirstRender = useRef(true);
  const [countOfNewsToShow, setCountOfNewsToShow] = useState(3);

  const [visibleNews, setVisibleNews] = useState<IPublication[]>([]);

  const countOfNewsToRequest = useMemo(() => {
    if (isFirstRender.current) {
      return countOfNewsToShow * 2;
    } else {
      return countOfNewsToShow;
    }
  }, [isFirstRender, countOfNewsToShow]);

  const language = useAppSelector((state) => state.language.language);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const QueryParams = useMemo(() => {
       if (!searchQuery.trim()) return `lang=${language.toLowerCase()}&limit=${countOfNewsToRequest}`;
    const res = `search=${searchQuery}&lang=${language.toLowerCase()}&limit=${countOfNewsToRequest}`;
    return res;
  }, [ searchQuery, language, countOfNewsToRequest]);
  const debouncedQuery = useDebounce(QueryParams, 300);

  const {
    data: AllPublicationsQueryResponse,
    isLoading,
    error,
  } = publicationsApi.useGetAllPublicationsQuery(debouncedQuery);

  useEffect(() => {
    if (!isLoading && AllPublicationsQueryResponse) {
    setVisibleNews(AllPublicationsQueryResponse.data.slice(0, countOfNewsToShow));
    }
  }, [countOfNewsToShow, AllPublicationsQueryResponse]);

  const handleMoreNewsButton = () => {
    setCountOfNewsToShow((prevState) => prevState + 3);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);
  const navigate=useNavigate()

  if (error) {
    // @ts-ignore
    navigate(`/error/${error.status}`, {replace: true})
    return
  }

  return (
    <main>
      <section className={classes["newsSearchPage"]}>
        <h1 className={classes["newsSearchPage__title"]}>Поиск: {searchQuery}</h1>
        <div className={classes["newsSearchPage__wrapper"]}>
      
          {isLoading || error ? (
            <h1>Loading...</h1>
          ) : (
            visibleNews.map((news) => {
              return <NewsItem variant={"medium"} key={news.id} news={news} />;
            })
          )}
        </div>
        {!isLoading &&
            <>
              {visibleNews.length<=AllPublicationsQueryResponse!.total-countOfNewsToShow &&
                  <Button
                      text={messages[language]["newsPage.ButtonShowMore"]}
                      className={cn(
                          "text-medium",
                          "text-500",
                          classes["newsSearchPage__button--more"]
                      )}
                      onClick={handleMoreNewsButton}
                  />
              }
            </>
        }
      </section>
    </main>
  );
};

export default NewsSearchPage;
