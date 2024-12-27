import { FC, useEffect, useState } from "react";
import classes from "./style.module.css";

import MarketCapPageFiltersItem from "./MarketCapPageFiltersItem";

type MarketCapPageFiltersPropsType = {};

const MarketCapPageFilters: FC<MarketCapPageFiltersPropsType> = () => {
  const [category, setCategory] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [platform, setPlatform] = useState("");
  const [industry, setIndustry] = useState("");

  const filtersArr = ['Platform', 'RingCT', 'Store Of Value']
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setIsFiltered] = useState(false);
  useEffect(() => {
    if (
      category.length > 1 ||
      algorithm.length > 1 ||
      platform.length > 1 ||
      industry.length > 1
    ) {
      setIsFiltered(true);
      return;
    }
    setIsFiltered(false);
  }, [category, algorithm, platform, industry]);

  return (
    <div className={classes["MarketCupPageFilters__container--filters"]}>
        <MarketCapPageFiltersItem filter={category} array={filtersArr} setState={setCategory} />
        <MarketCapPageFiltersItem filter={algorithm} array={filtersArr} setState={setAlgorithm} />
        <MarketCapPageFiltersItem filter={platform} array={filtersArr} setState={setPlatform} />
        <MarketCapPageFiltersItem filter={industry} array={filtersArr} setState={setIndustry} />
    </div>
  );
};

export default MarketCapPageFilters;
