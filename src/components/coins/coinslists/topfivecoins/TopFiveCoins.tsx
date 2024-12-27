import CoinShortItem from "../../coinsitems/coinshortitem/CoinShortItem.tsx";
import classes from "./style.module.css";
import {FormattedMessage} from "react-intl";
import {marketcapApi} from "../../../../utils/api/marketcap/marketcapApi.ts";

import {useEffect} from "react";
import LoadingError from "../../../errors/loadingerror/LoadingError.tsx";


const TopFiveCoins = () => {

    const {
        data: getListingsQueryResponse,
        isLoading,
        error,
        refetch
    } = marketcapApi.useGetListingsQuery({
        queryParams: "?start=1&limit=5"
    })
    useEffect(() => {
        const interval = setInterval(async () => {
            await refetch()
        }, 60000)

        return () => clearInterval(interval)
    }, []);

    if (error || !getListingsQueryResponse) {
        return <LoadingError/>
    }
    return (
        <div className={classes["TopFiveCoins"]}>
            <h2><FormattedMessage id={"singleNewsPage.topCoins"}/></h2>
            {!isLoading && <div className={classes["TopFiveCoins__list"]}>
                {getListingsQueryResponse.data!.map((coin, index) => {
                    return <CoinShortItem coin={coin} key={index}/>
                })}
            </div>}
        </div>
    );
};

export default TopFiveCoins;