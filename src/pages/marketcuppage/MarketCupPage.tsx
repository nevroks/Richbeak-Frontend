import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/ReduxHooks.ts";

import classes from "./style.module.css";
import cn from "classnames";
import Button from "../../components/ui/button/Button";

import PopupMarketcap from "../../components/ui/popup/popupMarketcap/PopupMarketcap";

import { addCategory } from "../../store/selectedCategories/selectedCategoriesSlice";
import { addCategoryPopupBeforeChange } from "../../store/selectedCategoriesPopup/selectedCategoriesPopupSlice";
import { addcategoriesBeforeChange } from "../../store/categoriesBeforeChange/categoriesBeforeChangeSlice";

import useDocumentTitle from "../../utils/hooks/useDocumentTitle.ts";
import { MarketCupPageTitle } from "../../utils/consts/pagetitles/martketCupPageTitles.ts";
import iconEdit from "../../assets/icons/iconEdit.svg";

import useDebounce from "../../utils/hooks/useDebounce.ts";
import { FormattedMessage } from "react-intl";
import MarketCapPageInfo from "./PageComponents/marketcapPageInfo/MarketCapPageInfo.tsx";
import MarketCapPageList from "./PageComponents/marketcapPageList/MarketCapPageList.tsx";
import Pagination from "../../components/pagination/Pagination.tsx";
import { marketcapApi } from "../../utils/api/marketcap/marketcapApi.ts";

const MarketCupPage = () => {
  const [countOfCoinsPerPage, setCountOfCoinsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ sort: string; direction: "asc" | "desc" }>(
    {
      sort: "",
      direction: "asc",
    }
  );
  const language = useAppSelector((state) => state.language.language);
  const debouncedPage = useDebounce(page, 300);
  //тут есть useEffect
  useDocumentTitle(MarketCupPageTitle[language], language);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const categoriesBeforeChange = useAppSelector(
    (state) => state.categoriesBeforeChange.value
  );
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories.value
  );
  const dispatch = useAppDispatch();

  function openPopupMarketCap() {
    //сохраняем те категории которые уже были
    dispatch(addcategoriesBeforeChange(selectedCategories));
    dispatch(addCategoryPopupBeforeChange(selectedCategories));
    setIsPopupOpen(true);
  }

  function closePopupMarketCap() {
    dispatch(addCategory(categoriesBeforeChange));
    setIsPopupOpen(false);
  }

  const {
    data: allCoins,
    // @ts-ignore
  } = marketcapApi.useGetAllCoinsQuery();

  return (
    <main>
      <section className={classes["MarketCupPage"]}>
        <h1>
          <FormattedMessage id="marcetCap.title" />
        </h1>
        <MarketCapPageInfo />
        <div className={classes["MarketCupPage--box"]}>
          {/* <div className={classes["MarketCupPage--buttons__container"]}>
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["MarketCupPage--button"]
              )}
            >
              <FormattedMessage id='marcetCap.ButtonAll'/>
              <img
                src={iconSquare}
                className={classes["MarketCupPage--button__Square"]}
              />
            </Button>
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["MarketCupPage--button"]
              )}
              text="Memes"
            />
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["MarketCupPage--button"]
              )}
              text="Solana Eco"
            />
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["MarketCupPage--button"]
              )}
              text="AI"
            />
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["MarketCupPage--button"]
              )}
              text="Gaming"
            />
          </div> */}
          <div className={classes["MarketCupPage--buttons__container"]}>
            {/* <select
              className={cn(
                "text-medium",
                "text-500",
                classes["MarketCupPage--selection"]
              )}
              defaultValue={"$ USD"}
              onChange={(e) => dispatch(changeCurrency(e.target.value))}
            >
              <option value={"EUR"}>€ EUR</option>
              <option value={"RUB"}>₽ RUB</option>
              <option value={"USD"}>$ USD</option>
            </select> */}
            <div className={classes["MarketCupPage--buttons__box"]}>
              {/* <Button
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCupPage--button__grey"],
                  classes["MarketCupPage--button__grey--filter"],{
                      [classes.active]:isFiltered
                    })}
              >
                <FormattedMessage id="marcetCap.ButtonFilters" />
                <IconFilter alt="Иконка 'Фильтры'" className={classes["MarketCupPage--button__icon"]}/>
              </Button> */}
              <Button
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCupPage--button__grey"],
                  classes["MarketCupPage--button__edit"]
                )}
                onClick={() => openPopupMarketCap()}
              >
                <FormattedMessage id="marcetCap.ButtonEdit" />
                <img
                  className={classes["MarketCupPage--button__icon"]}
                  src={iconEdit}
                  alt="Иконка 'Редактировать'"
                />
              </Button>
            </div>
          </div>
        </div>
        {/* <MarketCapPageFilters /> */}
        <MarketCapPageList
          setSort={setSort}
          sort={sort}
          page={page}
          debouncedPage={debouncedPage}
          countOfCoinsPerPage={countOfCoinsPerPage}
        />
        <Pagination
          totalItems={allCoins && allCoins.total}
          setPage={setPage}
          page={page}
          countOfCoinsPerPage={countOfCoinsPerPage}
          setCountOfCoinsPerPage={setCountOfCoinsPerPage}
        />
      </section>

      {isPopupOpen && (
        <PopupMarketcap
          setIsPopupOpen={setIsPopupOpen}
          closePopupMarketCap={closePopupMarketCap}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </main>
  );
};

export default MarketCupPage;
