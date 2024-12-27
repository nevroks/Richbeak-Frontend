import classes from "./style.module.css";
import cn from "classnames";
import { useAppSelector } from "../../../../utils/hooks/ReduxHooks.ts";

import {FC} from "react";

// @ts-ignore
import IconArrowDown from "../../../../assets/icons/iconArronDown.svg?react";
import {GetListingsQueryArrayElementResponseType} from "../../../../types/responseTypes.ts";

type MarketCapPageItemPropsType={
    item:GetListingsQueryArrayElementResponseType,
    category:{
      id:string,
      name: string
    }
}

const MarketCapPageItem:FC<MarketCapPageItemPropsType> = ({ item, category }) => {
  const isPercentChangeCourse = item.quote.USD.percent_change_1h < 0;
  const isPercentChange_7d = item.quote.USD.percent_change_7d < 0;
  const isPercentChange_24h = item.quote.USD.percent_change_24h < 0;
  const isPercentChange_30d = item.quote.USD.percent_change_30d < 0;
  const isPercentChange_60d = item.quote.USD.percent_change_60d < 0;
  const isPercentChange_90d = item.quote.USD.percent_change_90d < 0;
  const currency = useAppSelector((state) => state.currency.value);

  // const [isInfoAboutCoinFetched, setIsInfoAboutCoinFetched] = useState(false);
  // useEffect(() => {
  //   setIsInfoAboutCoinFetched(false)
  // }, [item]);
  // const coinID = item.id;
  // const [fetchKey, { data: key}] = marketcapApi.useLazyGetCsrfQuery()
  // useEffect(() => {
  //   fetchKey()
  // }, []);
  // const {
  //   data: getCoinInfoResponse,
  //   error,
  // } = marketcapApi.useGetCoinInfoQuery(
  //   key === undefined ? skipToken : { key: key.token, id: coinID },
  //   {
  //     skip: isInfoAboutCoinFetched,
  //   }
  // );

  // useEffect(() => {
  //   if (getCoinInfoResponse) {
  //     setIsInfoAboutCoinFetched(true);
  //   }
  // }, [getCoinInfoResponse]);

  // if (error) {
  //   return;
  // }

  return (
    <>
      {(() => {
        switch (category.id) {
          case "cmc_rank":
            return (
              <p
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCapPageList--table__td__index"]
                )}
              >
                {" "}
                {item.cmc_rank}{" "}
              </p>
            );
            case "img":
                return (<img src={item.logo} className={classes["MarketCapPageList--money__img"]} alt="coin_logo"/>)    
           return
          case "name":
            return (
              <p
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCapPageList--table__td__text"],
                    classes["MarketCapPageList--table__td__text--name"]
                )}
              >
                {" "}
                {item.name}{" "}
              </p>
            );
          case "symbol":
            return (
              <p
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCapItem--anotherName"]
                )}
              >
                {" "}
                {item.symbol}{" "}
              </p>
            );
          default:
            return (
              <>
                {(() => {
                  switch (category.id) {
                    case "fully_diluted_market_cap":
                      if (item.quote.USD.fully_diluted_market_cap === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.fully_diluted_market_cap
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}
                        </p>
                    case "market_cap":
                      if (item.quote.USD.market_cap === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.market_cap
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    case "market_cap_dominance":
                      if (item.quote.USD.market_cap_dominance === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                        >
                          {String(item.quote.USD.market_cap_dominance.toFixed(2))}%
                        </p>
                      );
                    case "percent_change_1h":
                      if (item.quote.USD.percent_change_1h === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChangeCourse
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChangeCourse,
                                [classes.up]: !isPercentChangeCourse,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_1h.toFixed(2))}%
                        </p>
                      );

                    case "percent_change_7d":
                      if (item.quote.USD.percent_change_7d === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChange_7d
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChange_7d,
                                [classes.up]: !isPercentChange_7d,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_7d.toFixed(2))}%
                        </p>
                      );
                    case "percent_change_24h":
                      if (item.quote.USD.percent_change_24h === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChange_24h
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChange_24h,
                                [classes.up]: !isPercentChange_24h,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_24h.toFixed(2))}
                          %
                        </p>
                      );
                    case "percent_change_30d":
                      if (item.quote.USD.percent_change_30d === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChange_30d
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChange_30d,
                                [classes.up]: !isPercentChange_30d,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_30d.toFixed(2))}
                          %
                        </p>
                      );
                    case "percent_change_60d":
                      if (item.quote.USD.percent_change_60d === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChange_60d
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChange_60d,
                                [classes.up]: !isPercentChange_60d,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_60d.toFixed(2))}
                          %
                        </p>
                      );
                    case "percent_change_90d":
                      if (item.quote.USD.percent_change_90d === null) {
                        return <p>N/A</p>;
                      }
                      return (
                        <p
                          className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["MarketCapPageList--table__td__text"]
                          )}
                          style={
                            isPercentChange_90d
                              ? { color: "var(--red-500-color)" }
                              : { color: "var(--green-500-color)" }
                          }
                        >
                          <IconArrowDown
                            className={cn(
                              classes["MarketCupPage--course__img"],
                              {
                                [classes.down]: isPercentChange_90d,
                                [classes.up]: !isPercentChange_90d,
                              }
                            )}
                          />
                          {String(item.quote.USD.percent_change_90d.toFixed(2))}
                          %
                        </p>
                      );
                    case "volume_24h":
                      if (item.quote.USD.volume_24h === null) {
                        return <p>N/A</p>;
                      }
                      return  <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.volume_24h
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    case "volume_7d":
                      if (item.quote.USD.volume_7d === null) {
                        return <p>N/A</p>;
                      }
                      return  <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"]
                      )}>{item.quote.USD.volume_7d
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    case "volume_30d":
                      if (item.quote.USD.volume_30d === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.volume_30d
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    case "max_supply":
                      if (item.max_supply === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.max_supply.toLocaleString('ru-RU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      }).replace(",", '.')}{' '}{item.symbol}</p>
                    case "total_supply":
                      if (item.total_supply === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.total_supply.toLocaleString('ru-RU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      }).replace(",", '.')}{' '}{item.symbol}</p>
                    case "tvl":
                      if (item.quote.USD.tvl === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.tvl.toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    case "circulating_supply":
                      if (item.circulating_supply === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.circulating_supply.toLocaleString('ru-RU', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                      }).replace(",", '.')}{' '}{item.symbol}</p>
                    case "price":
                      if (item.quote.USD.price === null) {
                        return <p>N/A</p>;
                      }
                      return <p
                      className={cn(
                        "text-semi-small",
                        "text-500",
                        classes["MarketCapPageList--table__td__text"])}>{item.quote.USD.price
                        .toLocaleString("ru-RU", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(",", ".")}</p>
                    default:
                      return null;
                  }
                })()}
              </>
            );
        }
      })()}
    </>
  );
};

export default MarketCapPageItem;