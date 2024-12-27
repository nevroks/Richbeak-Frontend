import { Dispatch, FC, SetStateAction } from "react";
import classes from "./style.module.css";
import cn from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import arrowCategoriesDown from '../../../assets/icons/arrowCategotiesDown.svg'
import iconDeleteCategories from '../../../assets/icons/iconDeleteCategories.svg'

// @ts-ignore
import LoopImg from "../../../assets/icons/iconLoop.svg?react";
import Input from "../../../../components/ui/input/Input";
import Button from "../../../../components/ui/button/Button";

type MarketCapPageFiltersItemPropsType = {
    filter: string;
    array: Array<string>;
    setState: Dispatch<
    SetStateAction<string>
>;
};

const MarketCapPageFiltersItem: FC<MarketCapPageFiltersItemPropsType> = ({filter, array, setState}) => {

  const intl = useIntl()

  return (
<>
      {filter === "" && (
        <nav className={classes["MarketCupPageFilters__nav"]}>
          <ul>
            <li>
              <span
                className={cn(
                  "text-semi-small",
                  "text-500",
                  classes["MarketCupPageFilters__nav--title"]
                )}
              >
                <FormattedMessage id="marcetCap.Category" />
                <img
                  className={classes["MarketCupPageFilters__nav--img"]}
                  src={arrowCategoriesDown}
                />
              </span>
              <ul className={classes["MarketCupPageFilters__sub-menu"]}>
                <Input
                  icon={<LoopImg />}
                  placeholder={intl.formatMessage({ id: "search.placeholder" })}
                  variant={"default"}
                  className={cn(
                    "text-semi-small",
                    "text-400",
                    classes["MarketCupPageFilters__input"]
                  )}
                ></Input>

                <p
                  className={cn(
                    "text-semi-small",
                    "text-500",
                    classes["MarketCupPageFilters__nav--subtitle"]
                  )}
                >
                  <FormattedMessage id="marcetCap.popularCategory" />
                </p>

                <div className={classes["MarketCupPageFilters__nav--box"]}>
                  {array.map((i: string, index: number) => (
                    <li onClick={() => setState(i)} key={index}>
                      <a
                        className={cn(
                          "text-medium",
                          "text-500",
                          classes["MarketCupPageFilters__nav--item"]
                        )}
                        href="#"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
            </li>
          </ul>
        </nav>
      )}

      {filter !== "" && (
        <p
          className={cn(
            "text-semi-small",
            "text-500",
            classes["MarketCupPageFilters__selected--indicator"]
          )}
        >
          {filter}
          <Button onClick={() => setState("")}>
            <img src={iconDeleteCategories} />
          </Button>
        </p>
      )} 

</>
  );
};

export default MarketCapPageFiltersItem;