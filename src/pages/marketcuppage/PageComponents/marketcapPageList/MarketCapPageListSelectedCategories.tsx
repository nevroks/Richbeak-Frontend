import Button from "../../../../components/ui/button/Button.tsx";
import classes from "./style.module.css";
import cn from "classnames";
import iconInfo from "../../../../assets/icons/iconInfo.svg";
import { useAppSelector } from "../../../../utils/hooks/ReduxHooks.ts";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

type MarketCapPageListSelectedCategoriesPropsType = {
  sort: {
    sort: string;
    direction: "desc" | "asc";
  };
  handleChangeSort: (sortName: string, direction: "desc" | "asc") => void
};

const MarketCapPageListSelectedCategories: FC<MarketCapPageListSelectedCategoriesPropsType> = ({
  sort,
  handleChangeSort,
}) => {
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories.value
  );

  return (
    <>
      {selectedCategories.map((item, index) => {
        switch (item.id) {
          case "market_cap":
          case "volume_24h":
          case "circulating_supply":
            return (
              <th key={index}>
                <div
                  onClick={() => /* console.log("onClick=()") */{}}
                  className={classes["MarketCapPageList--container__cell__info"]}
                >
                  <p
                    className={cn(
                      "text-semi-small",
                      "text-500",
                      classes["MarketCapPageList--text"]
                    )}
                  >
                    <FormattedMessage id={item.name} />
                  </p>
                  <div className={classes["MarketCapPageList--container__buttons"]}>
                    <Button
                      onClick={() => handleChangeSort(item.id, "asc")}
                      className={cn(classes["MarketCapPageList--button__up"], {
                        [classes["MarketCapPageList--button__up_active"]]:
                          sort.sort === item.id && sort.direction === "asc",
                      })}
                    />
                    <Button
                      onClick={() => handleChangeSort(item.id, "desc")}
                      className={cn(classes["MarketCapPageList--button__down"], {
                        [classes["MarketCapPageList--button__down_active"]]:
                          sort.sort === item.id && sort.direction === "desc",
                      })}
                    />
                  </div>
                  <a className={classes["MarketCapPageList--icon__info"]}>
                    <img src={iconInfo} />
                  </a>
                  <p
                    className={cn(
                      "text-small",
                      "text-500",
                      classes["MarketCapPageList--icon__info__text"]
                    )}
                  >
                    {(() => {
                      switch (item.id) {
                        case "volume_24h":
                          return <FormattedMessage id="Info.volume_24h" />;
                        case "market_cap":
                          return <FormattedMessage id="Info.market_cap" />;
                        case "circulating_supply":
                          return <FormattedMessage id="Info.circulation" />;
                      }
                    })()}
                  </p>
                </div>
              </th>
            );

          default:
            return (
              <th key={index}>
                <div
                  className={classes["MarketCapPageList--container__cell__info"]}
                >
                  <p
                    className={cn(
                      "text-semi-small",
                      "text-500",
                      classes["MarketCapPageList--text"]
                    )}
                  >
                    <FormattedMessage id={item.name} />
                  </p>
                  <div className={classes["MarketCapPageList--container__buttons"]}>
                    <Button
                      onClick={() => handleChangeSort(item.id, "asc")}
                      className={cn(classes["MarketCapPageList--button__up"], {
                        [classes["MarketCapPageList--button__up_active"]]:
                          sort.sort === item.id && sort.direction === "asc",
                      })}
                    />
                    <Button
                      onClick={() => handleChangeSort(item.id, "desc")}
                      className={cn(classes["MarketCapPageList--button__down"], {
                        [classes["MarketCapPageList--button__down_active"]]:
                          sort.sort === item.id && sort.direction === "desc",
                      })}
                    />
                  </div>
                </div>
              </th>
            );
        }
      })}
    </>
  );
};

export default MarketCapPageListSelectedCategories;
