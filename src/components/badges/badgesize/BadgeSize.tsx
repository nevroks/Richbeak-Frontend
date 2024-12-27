import { FC } from "react";
import { setCount } from "../../../utils/helpers/setCount";
import cn from "classnames";
import classes from "./style.module.css";
// @ts-ignore
import EyeImg from "../../../assets/icons/iconEye.svg?react";
// @ts-ignore
import CommentsImg from "../../../assets/icons/iconComments.svg?react";

import { BadgeSizeProps } from "../../../types/statBadgesTypes";

const BadgeSize: FC<BadgeSizeProps> = ({
  size,
  img,
  count,
  isAbsolute,
  style,
}) => {
  switch (size) {
    case "large":
      return (
        <div
          className={cn(
            isAbsolute ? classes["position"] : "",
            classes["largeCounter"]
          )}
          style={style}
        >
          <p
            className={cn(
              classes["counter__text"],
              "text-semi-small",
              "text-500"
            )}
          >
            {setCount(count)}
          </p>
          {img === "eye" ? (
            <EyeImg className={cn(classes["counter__image"])} />
          ) : (
            <CommentsImg className={cn(classes["counter__image"])} />
          )}
        </div>
      );

    case "medium":
      return (
        <div
          className={cn(
            isAbsolute ? classes["position"] : "",
            classes["mediumCounter"]
          )}
          style={style}
        >
          <p
            className={cn(
              classes["counter__text"],
              "text-semi-small",
              "text-500"
            )}
          >
            {setCount(count)}
          </p>
          {img === "eye" ? (
            <EyeImg className={cn(classes["counter__image"])} />
          ) : (
            <CommentsImg className={cn(classes["counter__image"])} />
          )}
        </div>
      );
    default:
      return null;
  }
};

export default BadgeSize;
