import IndicatorsItemPopup from "../indicatorsitems/IndicatorsItemPopup";
import classes from "./style.module.css";
import cn from "classnames";
import { popupConsts } from "../../../../../../utils/consts/popupConsts";
import { FormattedMessage } from "react-intl";

type IndicatorsListPopup = unknown;

const IndicatorsListPopup: React.FC<IndicatorsListPopup> = () => {
  return (
    <div className={classes["PopupIndicatorsList"]}>
      {/* <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            Стоимость
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.price.map((item, index: number) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div> */}

      <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            <FormattedMessage id="popup.priceChange" />
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.changeInPrice.map((item, index) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            <FormattedMessage id="popup.capitalization" />
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.capitalization.map((item, index) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            <FormattedMessage id="popup.volune" />
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.volume.map((item, index) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            <FormattedMessage id="popup.supply" />
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.reserve.map((item, index) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div>

      <div className={classes["PopupIndicatorsList--row__border"]}>
        <div className={classes["PopupIndicatorsList--row"]}>
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["PopupIndicatorsList--row__text__name"]
            )}
          >
            <FormattedMessage id="popup.others" />
          </p>
          <div
            className={classes["PopupIndicatorsList--container__indicators"]}
          >
            {popupConsts.others.map((item, index) => (
              <IndicatorsItemPopup item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorsListPopup;
