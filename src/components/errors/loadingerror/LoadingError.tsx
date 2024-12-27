import cn from "classnames";
import classes from "./style.module.css";

import { useAppSelector } from "../../../utils/hooks/ReduxHooks";
//@ts-ignore
import BlackDangerImg from "../../../assets/icons/iconDangerBlack.svg?react";
//@ts-ignore
import WhiteDangerImg from "../../../assets/icons/iconDangerWhite.svg?react";

const LoadingError = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  return (
    <div className={classes["loadingError"]}>
      <div className={classes["loadingError__wrapper"]}>
        {isDarkMode ? (
          <WhiteDangerImg className={cn(classes["loadingError__img"])} />
        ) : (
          <BlackDangerImg className={cn(classes["loadingError__img"])} />
        )}

        <h5 className={cn(classes["loadingError__title"])}>
          Что-то пошло не так
        </h5>
      </div>

      <p
        className={cn("text-500", "text-small", classes["loadingError__text"])}
      >
        Контент не смог загрузиться, попробуйте перезагрузить страницу
      </p>
    </div>
  );
};

export default LoadingError;
