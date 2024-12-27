import classes from "./style.module.css";
import cn from "classnames";
import {FC} from "react";
import {GetListingsQueryArrayElementResponseType} from "../../../../types/responseTypes.ts";

type CoinShortItemPropsType = {
    coin: GetListingsQueryArrayElementResponseType
}

const CoinShortItem: FC<CoinShortItemPropsType> = ({coin}) => {

    const isCourseDown = coin.quote.USD.percent_change_1h < 0

    return (
        <div className={classes["CoinShortItem"]}>
            <div className={classes["CoinShortItem__info"]}>
               <img src={coin.logo} alt="coin_logo"/>
               <div>
                   <p className={cn("text-500", "text-medium")}>{coin.name}</p>
                   <p className={cn("text-500", "text-small")}>{coin.symbol}</p>
               </div>
            </div>
            <div className={classes["CoinShortItem__stats"]}>
               <p className={cn("text-500", "text-medium")}>{Number(coin.quote.USD.price).toLocaleString('ru-RU', {
                   style: 'currency',
                   currency: 'USD',
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2,
               }).replace(",", '.')}</p>
               <p style={isCourseDown ?
                   {color: "var(--red-500-color)"}
                   :
                   {color: "var(--green-500-color)"}}
                  className={cn("text-500", "text-small")}>{coin.quote.USD.percent_change_1h.toFixed(2)}%</p>
            </div>
        </div>
    );
};

export default CoinShortItem;