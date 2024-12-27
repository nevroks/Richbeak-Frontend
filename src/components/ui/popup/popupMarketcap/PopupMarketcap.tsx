import React, { Dispatch, SetStateAction, useState } from "react";
import classes from "./style.module.css";
import cn from "classnames";
import Popup from "../Popup";
import Button from "../../button/Button";
import iconArrowRotateRight from "../../../../assets/icons/iconArrowRotateRight.svg";
import iconChangeIndicator from "../../../../assets/icons/iconChangeIndicator.svg";
import IndicatorsListPopup from "./popupMarketcapIndicators/indicatorslists/IndicatorsListPopup";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/ReduxHooks";
import { addCategory } from "../../../../store/selectedCategories/selectedCategoriesSlice";
import {
  changeCategoryPopup,
  deleteCategoryPopup,
  getInitialState,
} from "../../../../store/selectedCategoriesPopup/selectedCategoriesPopupSlice";
import { FormattedMessage } from "react-intl";

type PropsMarketcap = {
  onClose: () => void;
  closePopupMarketCap: () => void;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

const PopupMarketcap: React.FC<PropsMarketcap> = ({
  onClose,
  closePopupMarketCap,
  setIsPopupOpen,
}) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedCategoriesPopup = useAppSelector(
    (state) => state.selectedCategoriesPopup.value
  );

  function deleteSelectedCategory(category: null | string) {
    dispatch(deleteCategoryPopup(category));
  }

  function dragStartHandler(card: null | string) {
    setCurrentCategory(card);
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: null | string
  ) {
    e.preventDefault();
    dispatch(
      changeCategoryPopup({ card: card, currentCategory: currentCategory })
    );
  }

  function defaultCategories() {
    dispatch(getInitialState());
  }

  function applyChanges() {
    dispatch(addCategory(selectedCategoriesPopup));
    setIsPopupOpen(false);
  }

  return (
    <Popup onClose={onClose} >
      <div className={classes["PopupMarketcap--box__counter"]}>
        <h3><FormattedMessage id="popup.title" /></h3>
        <h4 className={classes["PopupMarketcap--text__counter"]}>
          {selectedCategoriesPopup.length}/7
        </h4>
      </div>
      <p
        className={cn(
          "text-semi-large",
          "text-400",
          classes["PopupMarketcap--text"]
        )}
      >
        <FormattedMessage id="popup.subtitle" />
      </p>
      <div className={classes["PopupMarketcap--box"]}>
        <Button
          className={cn(
            "text-semi-small",
            "text-500",
            classes["PopupMarketcap--button__default__indicators"]
          )}
          onClick={() => defaultCategories()}
        >
          <FormattedMessage id="popup.buttonDefault" />
          <img
            className={
              classes["PopupMarketcap--button__default__indicators__img"]
            }
            src={iconArrowRotateRight}
          />
        </Button>
        <div className={classes["PopupMarketcap--box__indicators__selected"]}>
          {selectedCategoriesPopup.length !== 0 &&
            selectedCategoriesPopup.map((item, index) => (
              <div
                draggable={true}
                  // @ts-ignore
                onDragStart={() => dragStartHandler(item)}
                onDragOver={(e) => dragOverHandler(e)}
                  // @ts-ignore
                onDrop={(e) => dropHandler(e, item)}
                key={index}
                className={classes["PopupMarketcap--box__indicator__selected"]}
              >
                <p
                  className={cn(
                    "text-medium",
                    "text-500",
                    classes["PopupMarketcap--text__index"]
                  )}
                >
                  {index + 1}
                </p>
                <p className={cn("text-medium", "text-500")}><FormattedMessage id={item.name}/></p>
                <Button
                  className={
                    classes["PopupMarketcap--button__change__indicator"]
                  }
                    // @ts-ignore
                  onClick={() => deleteSelectedCategory(item)}
                >
                  <img
                    className={
                      classes["PopupMarketcap--button__change__indicator__img"]
                    }
                    src={iconChangeIndicator}
                  />
                </Button>
              </div>
            ))}
        </div>
      </div>
      <IndicatorsListPopup />
      <div className={classes["PopupMarketcap--button__save__container"]}>
        <Button
          className={cn(
            "text-medium",
            "text-500",
            classes["PopupMarketcap--button__save"]
          )}
          onClick={() => closePopupMarketCap()}
        >
        <FormattedMessage id="marcetCap.ButtonUndo" />
        </Button>
        <Button
          className={cn(
            "text-medium",
            "text-500",
            classes["PopupMarketcap--button__save"],
            classes["PopupMarketcap--button__save__on"]
          )}
          onClick={() => applyChanges()}
        >
        <FormattedMessage id="marcetCap.ButtonApply" />
        </Button>
      </div>
    </Popup>
  );
};

export default PopupMarketcap;
