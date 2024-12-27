import classes from "./style.module.css";
import {FC, useMemo} from "react";
import NewsItem from "../../NewsItem.tsx";
import {ICoin} from "../../../../types/types.ts";
import {publicationsApi} from "../../../../utils/api/publications/publicationsApi.ts";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import {FormattedMessage} from "react-intl";
import LoadingError from "../../../errors/loadingerror/LoadingError.tsx";

type CoinLastNewsListPropsType = {
    coin: ICoin
}

const CoinLastNewsList: FC<CoinLastNewsListPropsType> = ({coin}) => {
    const language = useAppSelector(state => state.language.language)
    const QueryParams = useMemo(() => {
        return `lang=${language.toLowerCase()}&limit=3&coin=${coin.id}&sort=desc`
    }, [coin, language])

    const {
        data: AllPublicationsQueryResponse,
        error,
        isLoading,
    } = publicationsApi.useGetAllPublicationsQuery(QueryParams)

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <LoadingError/>
    }
    return (
        <div className={classes["CoinLastNewsList"]}>
            <h2><FormattedMessage id={"singleNewsPage.latest"}/> {coin.name}</h2>
            <div className={classes["CoinLastNewsList__list"]}>
                {AllPublicationsQueryResponse!.data.map((news, index) => {
                    return <NewsItem variant={"small"} key={index} news={news}/>
                })}
            </div>
        </div>
    );
};

export default CoinLastNewsList;