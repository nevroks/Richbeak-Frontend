import classes from "./style.module.css";
import { useAppSelector } from "../../../../utils/hooks/ReduxHooks.ts";
import { marketcapApi } from "../../../../utils/api/marketcap/marketcapApi.ts";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import MarketCapPageItem from "../marketcapPageItem/MarketCapPageItem.tsx";
import MarketCapPageListTableHead from "./MarketCapPageListTableHead.tsx";
import Preloader from "../../../../components/ui/preloader/Preloader.tsx";
import cn from "classnames";

type MarketCapPageListPropsType = {
  sort: {
    sort: string;
    direction: "desc" | "asc";
  };
  page: number;
  debouncedPage: number;
  setSort: Dispatch<
    SetStateAction<{
      sort: string;
      direction: "desc" | "asc";
    }>
  >;
  countOfCoinsPerPage: number;
};

const MarketCapPageList: FC<MarketCapPageListPropsType> = ({
  countOfCoinsPerPage,
  page,
  setSort,
  sort,
  debouncedPage,
}) => {
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories.value
  );
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  useEffect(() => {
    if (debouncedPage !== page && !isLoading) {
      setIsPreloaderActive(true);
    } else {
      setIsPreloaderActive(false);
    }
  }, [debouncedPage, page]);
  const QueryParams = useMemo(() => {
    let res = `?limit=${countOfCoinsPerPage}&page=${debouncedPage}`;
    // if (page > 1) {
    //   res = `?limit=${countOfCoinsPerPage}&page=${page * countOfCoinsPerPage - countOfCoinsPerPage + 1}`;
    // }
    if (sort.sort.length !== 0) {
      res = res + `&sort=${sort.sort}&sort_dir=${sort.direction}`;
    }

    return res;
  }, [countOfCoinsPerPage, debouncedPage, sort]);

  const { data: getListingsQueryResponse, isLoading } =
    marketcapApi.useGetListingsQuery({
      queryParams: QueryParams,
    });

  useEffect(() => {
    const interval = setInterval(() => {
      // setIsNeedData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [getListingsQueryResponse]);

  if (isLoading) {
    return;
  }

  return (
    <div className={classes["MarketCapPageList--container__relative"]}>
      <div className={classes["MarketCapPageList"]}>
        <table className={classes["MarketCapPageList--table"]}>
          <MarketCapPageListTableHead sort={sort} setSort={setSort} />
          <tbody>
            {getListingsQueryResponse &&
              getListingsQueryResponse.data!.map((item, index) => {
                return (
                  <tr
                    className={classes["MarketCapPageList--table__tr"]}
                    key={index}
                  >
                    <td className={classes["MarketCapPageList--table__th"]}>
                      <div
                        className={
                          classes["MarketCapPageList--container__cell__first"]
                        }
                      >
                        <MarketCapPageItem
                          category={{ name: "cmc_rank", id: "cmc_rank" }}
                          item={item}
                        />
                        <div
                          className={classes["MarketCapPageList--box__cell"]}
                        >
                          <MarketCapPageItem
                            category={{ name: "img", id: "img" }}
                            item={item}
                          />

                          <MarketCapPageItem
                            category={{ name: "name", id: "name" }}
                            item={item}
                          />
                          <MarketCapPageItem
                            category={{ name: "symbol", id: "symbol" }}
                            item={item}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={classes["MarketCapPageList--fake"]}></div>
                    </td>
                    <td>
                      <MarketCapPageItem
                        category={{ name: "popup.price", id: "price" }}
                        item={item}
                      />
                    </td>
                    {selectedCategories.map((category, index) => (
                      <td key={index}>
                        <MarketCapPageItem category={category} item={item} />
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
          <tbody>
        {isPreloaderActive &&
            (() => {
                switch (countOfCoinsPerPage) {
                    case 10:
                        return <tr>
                            <td>
                                <div className={cn(
                                    classes["MarketCapPageList__preloader--overlay"],
                                    classes["MarketCapPageList__preloader--overlay__10"]
                                )}></div>
                            </td>
                        </tr>;
                    case 25:
                        return <tr>
                            <td>
                                <div className={cn(
                                    classes["MarketCapPageList__preloader--overlay"],
                                    classes["MarketCapPageList__preloader--overlay__25"]
                                )}></div>
                            </td>
                        </tr>;
                    default:
                        return <tr>
                            <td>
                                <div className={classes["MarketCapPageList__preloader--overlay"]}></div>
                            </td>
                        </tr>;
                }
            })()}
</tbody>
          {isPreloaderActive && <Preloader />}
        </table>
      </div>
    </div>
  );
};

export default MarketCapPageList;
