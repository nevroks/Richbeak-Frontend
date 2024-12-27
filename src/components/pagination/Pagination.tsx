import React, { FC, useState, useEffect } from "react";
import classes from "./style.module.css";
import cn from "classnames";
import Button from "../ui/button/Button";
import PaginationButton from "./paginationbutton/PaginationButton";

import iconArrowLeft from "../../assets/icons/iconArrowLeft.svg";
import iconArrowRight from "../../assets/icons/iconArrowRight.svg";

import { FormattedMessage } from "react-intl";
import { createPagesArray } from "../../utils/helpers/createPagesArray.ts";
import DropdownItem from "../ui/dropdown/DropdownItem.tsx";
import Dropdown from "../ui/dropdown/Dropdown.tsx";

type PaginationProps = {
  page: number;
  countOfCoinsPerPage: number;
  setCountOfCoinsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
};

const Pagination: FC<PaginationProps> = ({
  page,
  countOfCoinsPerPage,
  setCountOfCoinsPerPage,
  setPage,
  totalItems,
}) => {
  const [isSelectedPage, setIsSelectedPage] = useState(page);
  const [paginationArr, setPaginationArr] = useState<number[]>([]);
  const pagesArray = createPagesArray(totalItems, countOfCoinsPerPage);
  useEffect(() => {
    setPaginationArr(pagesArray.slice(0, 4));
  }, [totalItems, countOfCoinsPerPage]);

  const selectPageNumber = (number: number) => {
    setPage(number);
    setIsSelectedPage(number);
    updatePaginationArray(number);
  };

  const updatePaginationArray = (selectedPage: number) => {
    const pagesArray = createPagesArray(totalItems, countOfCoinsPerPage);
    if (selectedPage <= pagesArray.length - 4) {
      setPaginationArr(pagesArray.slice(selectedPage - 1, selectedPage + 3));
    } else {
      setPaginationArr(pagesArray.slice(pagesArray.length - 4));
    }
  };

  const selectPageWithArrowRight = () => {
    selectPageNumber(isSelectedPage + 1);
  };

  const selectPageWithArrowLeft = () => {
    if (isSelectedPage > 1) {
      selectPageNumber(isSelectedPage - 1);
    }
  };

  const setPagePaginationDropDown = (i: {id: number}) => {
    setCountOfCoinsPerPage(i.id);
    setPage(1);
    setIsSelectedPage(1);
    setPaginationArr([1, 2, 3, 4]);
  };

  return (
    <div className={classes["container__pagination"]}>
      <div className={classes["box__line_left"]}>
        <p
          className={cn(
            "text-semi-small",
            "text-400",
            classes["text__pagination"]
          )}
        >
          <FormattedMessage id="marcetCap.pages" />{" "}
          {page * countOfCoinsPerPage - (countOfCoinsPerPage - 1)} -{" "}
          {page * countOfCoinsPerPage} <FormattedMessage id="marcetCap.of" />{" "}
          {totalItems}
        </p>
      </div>
      <div className={classes["box__pagination"]}>
        <Button
          onClick={selectPageWithArrowLeft}
          className={classes["pagination__img"]}
          disabled={isSelectedPage === 1}
        >
          <img src={iconArrowLeft} alt="Previous Page" />
        </Button>
        {isSelectedPage > pagesArray.length / 2 && isSelectedPage !== 1 && (
          <>
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["PaginationButton--button__page"]
              )}
              onClick={() => selectPageNumber(pagesArray[0])}
            >
              {pagesArray[0]}
            </Button>
            <p
              className={cn(
                "text-semi-small",
                "text-500",
                classes["PaginationButton--button__page"]
              )}
            >
              ...
            </p>
          </>
        )}

        {paginationArr.map((item) => (
          <PaginationButton
            key={item}
            onClick={() => selectPageNumber(item)}
            isSelected={isSelectedPage === item}
          >
            {item}
          </PaginationButton>
        ))}
        {isSelectedPage < pagesArray.length / 2 && (
          <>
            <p
              className={cn(
                "text-semi-small",
                "text-500",
                classes["PaginationButton--button__page"]
              )}
            >
              ...
            </p>
            <Button
              className={cn(
                "text-semi-small",
                "text-500",
                classes["PaginationButton--button__page"]
              )}
              onClick={() => selectPageNumber([...pagesArray].reverse()[0])}
            >
              {[...pagesArray].reverse()[0]}
            </Button>
          </>
        )}
        <Button
          onClick={selectPageWithArrowRight}
          className={classes["pagination__img"]}
          disabled={isSelectedPage === pagesArray.length}
        >
          <img src={iconArrowRight} alt="Next Page" />
        </Button>
      </div>
      <div className={classes["box__line"]}>
        <p
          className={cn(
            "text-semi-small",
            "text-400",
            classes["text__pagination"]
          )}
        >
          <FormattedMessage id="marcetCap.rows" />
        </p>
        <Dropdown
          choseOptional={false}
          // @ts-ignore
          state={{ name: countOfCoinsPerPage, id: countOfCoinsPerPage }}
          setState={setPagePaginationDropDown}
          content={
            <>
              <DropdownItem key={1} value={5} text={"5"} />
              <DropdownItem key={2} value={10} text={"10"} />
              <DropdownItem key={3} value={25} text={"25"} />
              {/* <DropdownItemPages key={4} value={50} text={50}/>
                            <DropdownItemPages key={5} value={100} text={100}/> */}
            </>
          }
          size="xsmall"
          // @ts-ignore
          text={countOfCoinsPerPage}
          style="button"
          contentClassname={classes["MarketCupPage--dropdown__content"]}
        />
      </div>
    </div>
  );
};

export default Pagination;
