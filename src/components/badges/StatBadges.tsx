import { FC } from "react";
import cn from "classnames";
import classes from "./style.module.css";
import BadgeSize from "./badgesize/BadgeSize";
import { StatBadgesProps } from "../../types/statBadgesTypes";

const StatBadges: FC<StatBadgesProps> = ({
  variant,
  isAbsolute,
  size,
  count = 0,
  top,
  style,
}) => {
  switch (variant) {
    case "viewsCounter": {
      return (
        <BadgeSize
          size={size}
          isAbsolute={isAbsolute}
          count={count}
          img={variant === "viewsCounter" ? "eye" : ""}
          style={style}
        />
      );
    }
    case "commentsCounter": {
      return (
        <BadgeSize
          size={size}
          isAbsolute={isAbsolute}
          count={count}
          img={variant === "commentsCounter" ? "comment" : ""}
          style={style}
        />
      );
    }
    case "topNum":
      return top || top === 0 ? (
        <div
          className={cn(
            isAbsolute ? classes["position"] : "",
            classes["topNum__top"]
          )}
        >
          <p
            className={cn(
              "text-semi-small",
              "text-500",
              classes["topNum__counter"]
            )}
          >
            # {top + 1}
          </p>
        </div>
      ) : null;

    default:
      return;
  }
};

export default StatBadges;
