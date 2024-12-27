import cn from "classnames";
import classes from "./style.module.css";
import StatBadges from "../../../../../components/badges/StatBadges.tsx";

// @ts-ignore
import LikeImg from "../../../../../assets/icons/iconLike.svg?react";
// @ts-ignore
import DislikeImg from "../../../../../assets/icons/iconDislike.svg?react";

const SingleNewsPageCommentsItem = () => {
  return (
    <div className={classes["SingleNewsPageCommentsItem"]}>
      <img
        className={classes["SingleNewsPageCommentsItem--avatar"]}
        src="https://assets-global.website-files.com/65eabeb429209bcb54c7efdd/6641ea5a98216d8f1623d31a_jonas-kakaroto-KIPqvvTOC1s-unsplash-p-1080.jpg"
        alt="avatar"
      />
      <div className={classes["SingleNewsPageCommentsItem--wrapper"]}>
        <div className={classes["SingleNewsPageCommentsItem--user"]}>
          <h4 className={classes["SingleNewsPageCommentsItem--user__title"]}>
            Пользователь
          </h4>{" "}
          <span
            className={cn(
              "text-medium",
              "text-500",
              classes["SingleNewsPageCommentsItem--user__tag"]
            )}
          >
            @User
          </span>{" "}
          <span
            className={cn(
              "text-medium",
              "text-500",
              classes["SingleNewsPageCommentsItem--user__dot"]
            )}
          >
            .
          </span>
          <span
            className={cn(
              "text-medium",
              "text-500",
              classes["SingleNewsPageCommentsItem--user__time"]
            )}
          >
            17ч
          </span>
        </div>

        <p className={classes["SingleNewsPageCommentsItem--text"]}>
          The{" "}
          <span className={classes["SingleNewsPageCommentsItem--text__tag"]}>
            #Bitcoin
          </span>{" "}
          whales are HUNGRY! The number of whales with 100-1000{" "}
          <span className={classes["SingleNewsPageCommentsItem--text__tag"]}>$BTC</span>{" "}
          is no longer climbing slowly & gradually, it's looking parabolic as
          more & more whales accumulate.
        </p>
        <div
          className={cn(
            "text-medium",
            "text-500",
            classes["SingleNewsPageCommentsItem--likes"]
          )}
        >
          <button className={classes["SingleNewsPageCommentsItem--likes__like"]}>
            <LikeImg
              className={classes["SingleNewsPageCommentsItem--likes__like--img"]}
            />{" "}
            <span>1K</span>
          </button>{" "}
          <button className={classes["SingleNewsPageCommentsItem--likes__dislike"]}>
            <DislikeImg
              className={classes["SingleNewsPageCommentsItem--likes__dislike--img"]}
            />{" "}
            <span>1K</span>
          </button>
          <span className={classes["SingleNewsPageCommentsItem--likes__reply"]}>
            Ответить
          </span>
          <StatBadges
            variant="viewsCounter"
            isAbsolute={false}
            size="large"
            count={10000}
            style={{ color: "var(--comment)" }}
            top={undefined}
          ></StatBadges>
        </div>
      </div>
    </div>
  );
};

export default SingleNewsPageCommentsItem;
