import classes from "./style.module.css";
import cn from "classnames";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

// @ts-ignore
import IconArrowDown from "../../../../assets/icons/iconArronDown.svg?react";
import { marketcapApi } from "../../../../utils/api/marketcap/marketcapApi.ts";

type MarketCapPageInfoProps = {
};

const MarketCapPageInfo: FC<MarketCapPageInfoProps> = () => {
  // const [fetchKey, {data: key}] = marketcapApi.useLazyGetCsrfQuery()
  // useEffect(() => {
  //     fetchKey()
  // }, []);
  // const navigate = useNavigate()
  // const {
  //     data: globalMetricsResponse,
  //     isLoading,
  //     error,
  //     refetch
  //     // @ts-ignore
  // } = marketcapApi.useGetCapitalizationQuery(key === undefined ? skipToken : key)

  // useEffect(() => {
  //     if (globalMetricsResponse && globalMetricsResponse.quote) {
  //         const interval = setInterval(async () => {
  //             await fetchKey()
  //             refetch()
  //         }, 60000)

  //         return () => clearInterval(interval)
  //     }

  // }, [globalMetricsResponse]);
  const {
    data: globalMetricsResponse,
    isLoading
    // @ts-ignore
  } = marketcapApi.useGetCapitalizationQuery();

  if (!globalMetricsResponse) {
    return null;
  }

  if (isLoading || !globalMetricsResponse) {
    return;
  }

  if (!globalMetricsResponse) {
    return null;
  }

  const isCapitalizationCourseDown =
    globalMetricsResponse[0].quote.USD
      .total_market_cap_yesterday_percentage_change < 0;
  const isDayVolumeDown =
    globalMetricsResponse[0].quote.USD
      .total_volume_24h_yesterday_percentage_change < 0;
  const isBitcoinDominating =
    globalMetricsResponse[0].btc_dominance_24h_percentage_change > 0;
  const isEthDominating =
    globalMetricsResponse[0].eth_dominance_24h_percentage_change > 0;
  return (
    <div className={classes["MarketCapPageInfo--info"]}>
      <div className={classes["MarketCapPageInfo--info__container"]}>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__name"]
          )}
        >
          <FormattedMessage id="marcetCap.capitalization" />
        </p>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__text"]
          )}
        >
          ${" "}
          {String(
            (
              globalMetricsResponse[0].quote.USD.total_market_cap / 1000000000
            ).toFixed(1)
          )}
          B
        </p>
        <p
          style={
            isCapitalizationCourseDown
              ? { color: "var(--red-500-color)" }
              : { color: "var(--green-500-color)" }
          }
          className={cn(
            "text-medium",
            "text-500",
            classes["MarketCapPageInfo--info__percent"]
          )}
        >
          <IconArrowDown
            className={cn(classes["MarketCapPageInfo--course__img"], {
              [classes.down]: isCapitalizationCourseDown,
              [classes.up]: !isCapitalizationCourseDown,
            })}
          />
          {String(
            globalMetricsResponse[0].quote.USD.total_market_cap_yesterday_percentage_change.toFixed(
              2
            )
          )}{" "}
          %
        </p>
      </div>
      <div className={classes["MarketCapPageInfo--info__container"]}>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__name"]
          )}
        >
          <FormattedMessage id="marcetCap.volume" />
        </p>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__text"]
          )}
        >
          ${" "}
          {String(
            (
              globalMetricsResponse[0].quote.USD.total_volume_24h / 1000000000
            ).toFixed(2)
          )}{" "}
          B
        </p>
        <p
          style={
            isDayVolumeDown
              ? { color: "var(--red-500-color)" }
              : { color: "var(--green-500-color)" }
          }
          className={cn(
            "text-medium",
            "text-500",
            classes["MarketCapPageInfo--info__percent"]
          )}
        >
          <IconArrowDown
            className={cn(classes["MarketCapPageInfo--course__img"], {
              [classes.down]: isDayVolumeDown,
              [classes.up]: !isDayVolumeDown,
            })}
          />
          {globalMetricsResponse[0].quote.USD.total_volume_24h_yesterday_percentage_change.toFixed(
            2
          )}{" "}
          %
        </p>
      </div>
      <div className={classes["MarketCapPageInfo--info__container"]}>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__name"]
          )}
        >
          <FormattedMessage id="marcetCap.dominance" />
        </p>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__text"]
          )}
        >
          BTC {String(globalMetricsResponse[0].btc_dominance.toFixed(2))}%
        </p>
        <p
          style={
            !isBitcoinDominating
              ? { color: "var(--red-500-color)" }
              : { color: "var(--green-500-color)" }
          }
          className={cn(
            "text-medium",
            "text-500",
            classes["MarketCapPageInfo--info__percent"]
          )}
        >
          <IconArrowDown
            className={cn(classes["MarketCapPageInfo--course__img"], {
              [classes.down]: !isBitcoinDominating,
              [classes.up]: isBitcoinDominating,
            })}
          />
          {globalMetricsResponse[0].btc_dominance_24h_percentage_change.toFixed(2)}{" "}
          %
        </p>
      </div>
      <div className={classes["MarketCapPageInfo--info__container"]}>
        <p
          className={cn(
            "text-semi-large",
            "text-500",
            classes["MarketCapPageInfo--info__text"]
          )}
        >
          ETH {String(globalMetricsResponse[0].eth_dominance.toFixed(2))}%
        </p>
        <p
          style={
            !isEthDominating
              ? { color: "var(--red-500-color)" }
              : { color: "var(--green-500-color)" }
          }
          className={cn(
            "text-medium",
            "text-500",
            classes["MarketCapPageInfo--info__percent"]
          )}
        >
          <IconArrowDown
            className={cn(classes["MarketCapPageInfo--course__img"], {
              [classes.down]: !isEthDominating,
              [classes.up]: isEthDominating,
            })}
          />
          {globalMetricsResponse[0].eth_dominance_24h_percentage_change.toFixed(2)}{" "}
          %
        </p>
      </div>
    </div>
  );
};

export default MarketCapPageInfo;
