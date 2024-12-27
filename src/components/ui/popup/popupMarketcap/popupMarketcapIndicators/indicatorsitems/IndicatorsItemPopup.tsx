import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../utils/hooks/ReduxHooks";
import classes from "./style.module.css";
import cn from "classnames";
import Button from "../../../../button/Button";
import deleteIcon from "../../../../../../assets/icons/iconDeleteCategories.svg";
import {
  addCategoryPopup,
  deleteCategoryPopup,
} from "../../../../../../store/selectedCategoriesPopup/selectedCategoriesPopupSlice";
import { FormattedMessage } from "react-intl";

type IndicatorsItemPopup = {
  item: {
    id:string,
    name:string
  },
};

const IndicatorsItemPopup: React.FC<IndicatorsItemPopup> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [isSelectedCategory, setIsSelectedCategory] = useState(false);
  const selectedCategoriesPopup = useAppSelector(
    (state) => state.selectedCategoriesPopup.value
  );

  useEffect(() => {
    const selectedElement = selectedCategoriesPopup.find((i) => i.id === item.id);
    setIsSelectedCategory(false);
    if(selectedElement === undefined) {return}
    if (selectedElement.id === item.id) {
      setIsSelectedCategory(true);
    }
    if (selectedElement.id !== item.id) {
      setIsSelectedCategory(false);
    }
  }, [selectedCategoriesPopup]);

  function deleteElement() {
    dispatch(deleteCategoryPopup(item));
    setIsSelectedCategory(false);
  }

  function addCategory(category: { id: string; name: string }) {
    dispatch(addCategoryPopup(category));
    setIsSelectedCategory(true);
  }

  return (
    <>
      {!isSelectedCategory && (
        <div
          style={{
            pointerEvents:
              selectedCategoriesPopup.length >= 7 ? "none" : "auto",
          }}

          onClick={() => addCategory(item)}
          className={classes["PopupIndicatorsItem"]}
        >
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsItem--text"]
            )}
          >
            <FormattedMessage id={item.name}/>
          </p>
        </div>
      )}
      {isSelectedCategory && (
        <div className={classes["PopupIndicatorsItem--category__selected"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsItem--text__selected"]
            )}
          >
            <FormattedMessage id={item.name}/>
          </p>
          <Button
            className={classes["PopupIndicatorsItem--category__button"]}
            onClick={() => deleteElement()}
          >
            <img src={deleteIcon} alt={"delete_icon"}/>
          </Button>
        </div>
      )}
    </>
  );
};

export default IndicatorsItemPopup;
