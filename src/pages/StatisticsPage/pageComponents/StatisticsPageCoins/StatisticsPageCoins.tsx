import { FC, useEffect, useState } from "react";
import Editor from "../../../../components/editor/Editor";
import { publicationsCoinsApi } from "../../../../utils/api/publicationscoins/publicationsCoinsApi";
import classes from "./style.module.css";
import cn from "classnames";
import { ICoin } from "../../../../types/types";
import Button from "../../../../components/ui/button/Button";

type StatisticsPageCoinsPropsType = object;

const StatisticsPageCoins: FC<StatisticsPageCoinsPropsType> = () => {
  const [visibleCoins, setVisibleCoins] = useState<ICoin[]>([]);
  const [countOfCoinsToShow, setCountOfCoinsToShow] = useState(6);

  const { data: AllPublicationsCoinsQueryResponse, isLoading: IsCoinsLoading } =
    publicationsCoinsApi.useGetAllPublicationsCoinsQuery();
  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    if (!IsCoinsLoading && AllPublicationsCoinsQueryResponse) {
      setCoins(AllPublicationsCoinsQueryResponse);
    }
  }, [AllPublicationsCoinsQueryResponse, IsCoinsLoading]);

  useEffect(() => {
    setVisibleCoins(coins.slice(0, countOfCoinsToShow));
  }, [countOfCoinsToShow, coins]);

  const handleMoreCoinsButton = () => {
    setCountOfCoinsToShow((prevState) => prevState + 6);
  };

  return (
    <>
      <h2 className={classes["StatisticsPageCoins__title"]}>
        Самые просматриваемые монеты
      </h2>
      <div className={classes["StatisticsPageCoins__wrapper"]}>
        {
          /* @ts-ignore */}
        <Editor IsLoading={IsCoinsLoading} response={visibleCoins} />
      </div>
      <Button
        text={
          "Показать ещё (6)"
        }
        className={cn(
          "text-medium",
          "text-500",
          classes["StatisticsPageCoins__button--more"]
        )}
        onClick={handleMoreCoinsButton}
      />
    </>
  );
};

export default StatisticsPageCoins;
