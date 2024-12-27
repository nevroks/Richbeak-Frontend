import { FC } from "react";
import useMediaQuery from "../../utils/hooks/useMediaQuery.ts";
import { MEDIA_CONSTS } from "../../utils/consts/mediaConsts.ts";
import classes from "./style.module.css";
import cn from "classnames";
import CryptoCoin from "../cryptocoin/CryptoCoin.tsx";
import TagsListItem from "../tags/TagsListItem.tsx";
import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";
import { IPublication } from "../../types/types.ts";
import StatBadges from "../badges/StatBadges.tsx";

interface INewsItemProps {
  variant: "small" | "medium" | "large";
  news: IPublication;
  top?: number;
}

const NewsItem: FC<INewsItemProps> = ({ variant, news, top }) => {
  const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA);

  switch (variant) {
    case "large":
      return (
        <Link to={`/news/${news.id}`}>
          <div className={classes["longNewsItem"]}>
            <img src={news.publicationsGroup.preview} alt={"news_preview"} />
            {/*<StatBadges*/}
            {/*  isAbsolute={true}*/}
            {/*  variant="commentsCounter"*/}
            {/*  size={variant}*/}
            {/*  count={0}*/}
            {/*  top={undefined}*/}
            {/*  style={{*/}
            {/*    marginRight: window.innerWidth <= 1280 ? '62px' :'71px',*/}
            {/*  }}*/}
            {/*/>*/}
            <StatBadges
              isAbsolute={true}
              variant="viewsCounter"
              count={
                news?.publicationsGroup?.views
                  ? news.publicationsGroup.views
                  : 0
              }
              size={variant}
              top={undefined}
            />
            <div className={classes["longNewsItem__container"]}>
              <div className={classes["longNewsItem__header"]}>
                <h2 className={classes["longNewsItem__header--title"]}>
                  {news.title}
                </h2>
                <p
                  className={cn(
                    classes["longNewsItem__header--text"],
                    "text-400",
                    "text-semi-large"
                  )}
                >
                  {!isPhoneOrSmaller
                    ? news.description.substring(0, 280)
                    : news.description.substring(0, 194)}
                  {!isPhoneOrSmaller && news.description.length > 280 && "..."}
                  {isPhoneOrSmaller && news.description.length > 194 && "..."}
                </p>
              </div>
              <div className={classes["longNewsItem__footer"]}>
                {isPhoneOrSmaller && (
                  <div className={classes["longNewsItem__footer--tags"]}>
                    {news.tags.slice(0, 2).map((tag, index) => (
                      <TagsListItem tag={tag} key={index} />
                    ))}
                  </div>
                )}
                <div className={classes["longNewsItem__footer--money__tags"]}>
                  <div className={classes["longNewsItem__footer--money__coin"]}>
                    {Boolean(news.coin) && <CryptoCoin coin={news.coin} />}
                  </div>
                  {!isPhoneOrSmaller && (
                    <div className={classes["longNewsItem__footer--tags"]}>
                      {news.tags.map((tag, index) => (
                        <TagsListItem tag={tag} key={index} />
                      ))}
                    </div>
                  )}
                </div>
                <p
                  className={cn(
                    classes["longNewsItem__footer--date"],
                    "text-400",
                    "text-medium"
                  )}
                >
                   <FormattedDate value={news.createdAt}/>
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    case "medium":
      return (
        <Link to={`/news/${news.id}`}>
          <div className={classes["mediumNewsItem"]}>
            <StatBadges
              variant="topNum"
              isAbsolute={true}
              top={top}
              size={variant}
            />
            {/*  <StatBadges*/}
            {/*  isAbsolute={true}*/}
            {/*  variant="commentsCounter"*/}
            {/*  size={variant}*/}
            {/*  count={0}*/}
            {/*  top={undefined}*/}
            {/*  style={{*/}
            {/*    marginRight: window.innerWidth <= 1280 ? '53px' :'70px',*/}
            {/*  }}*/}
            {/*/>*/}
            <StatBadges
              isAbsolute={true}
              variant="viewsCounter"
              count={
                news?.publicationsGroup?.views
                  ? news.publicationsGroup.views
                  : 0
              }
              size="medium"
              top={undefined}
            />

            <img src={news.publicationsGroup.preview} alt={"news_preview"} />
          

            <div className={classes["mediumNewsItem__tags"]}>
              {news.tags.slice(0, 2).map((tag, index: number) => (
                <TagsListItem tag={tag} key={index} />
              ))}
            </div>
            <div className={classes["mediumNewsItem__content--wrapper"]}>
              <h3 className={classes["mediumNewsItem__content--title"]}>
                {!isPhoneOrSmaller ? news.title : news.title.substring(0, 49)}
                {isPhoneOrSmaller && "..."}
              </h3>
              <div className={classes["mediumNewsItem__content--info"]}>
                {Boolean(news.coin) && <CryptoCoin coin={news.coin} />}
                <p
                  className={cn(
                    classes["mediumNewsItem__content--info__date"],
                    "text-400",
                    "text-medium"
                  )}
                >
                   <FormattedDate value={news.createdAt}/>
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    case "small":
      return (
        <Link to={`/news/${news.id}`}>
          <div className={classes["smallNewsItem"]}>
            <img
              className={classes["smallNewsItem--img"]}
              src={news.publicationsGroup.preview}
              alt={"news_preview"}
            />
            <div className={classes["smallNewsItem--info"]}>
              <h5 className={classes["smallNewsItem--info__title"]}>
                {isPhoneOrSmaller
                  ? news.title.substring(0, 40)
                  : news.title.substring(0, 56)}
                ...
              </h5>
              <div className={classes["smallNewsItem--info__tags"]}>
                {news.tags.slice(0, 2).map((tag, index) => (
                  <TagsListItem
                    customFont={cn("text-500", "text-small")}
                    tag={tag}
                    key={index}
                  />
                ))}
              </div>
              <div className={classes["smallNewsItem--info__footer"]}>
                {Boolean(news.coin) && (
                  <CryptoCoin version={"mini"} coin={news.coin} />
                )}
                <p
                  className={cn(
                    classes["smallNewsItem--info__footer--date"],
                    "text-extra-small",
                    "text-400"
                  )}
                >
                  <FormattedDate value={news.createdAt} />
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
  }
};

export default NewsItem;
