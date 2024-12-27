import cn from "classnames";
import classes from "./style.module.css";
import SingleNewsPageCommentsList from "./SingleNewsPageCommentsList/SingleNewsPageCommentsList.tsx";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";

// @ts-ignore
import SendImg from "../../../../assets/icons/iconSend.svg?react";

const SingleNewsPageComment = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className={classes["SingleNewsPageComment"]}>
      <h2 className={classes["SingleNewsPageComment__title"]}>Комментарии</h2>

      <div className={classes["SingleNewsPageComment__input"]}>
        <input
          className={cn("text-medium", "text-500")}
          type="text"
          placeholder="Написать комментарий"
        />
        <button className={classes["SingleNewsPageComment__input--button"]}>
          <SendImg
            className={cn(classes["comment__input--button__img"], {
              [classes.dark]: isDarkMode,
            })}
          />
        </button>
      </div>
      <SingleNewsPageCommentsList />
      <button className={classes["SingleNewsPageComment__loadMore"]}>Показать больше</button>
    </div>
  );
};

export default SingleNewsPageComment;
