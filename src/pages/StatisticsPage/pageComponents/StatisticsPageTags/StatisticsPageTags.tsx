import { FC, useEffect, useState } from "react";
import Editor from "../../../../components/editor/Editor";
import classes from "./style.module.css";
import cn from "classnames";
import { publicationsTagsApi } from "../../../../utils/api/publicationstags/publicationsTagsApi";
import { ITag } from "../../../../types/types";
import Button from "../../../../components/ui/button/Button";

type StatisticsPageTagsPropsType = object;

const StatisticsPageTags: FC<StatisticsPageTagsPropsType> = () => {
  const [countOfTagsToShow, setCountOfTagsToShow] = useState(6);
  const [tags, setTags] = useState<ITag[]>([]);
  const [visibleTags, setVisibleTags] = useState<ITag[]>([]);

  const { data: AllPublicationsTagsQueryResponse, isLoading: IsTagsLoading } =
    publicationsTagsApi.useGetAllPublicationsTagsQuery();

  useEffect(() => {
    if (!IsTagsLoading && AllPublicationsTagsQueryResponse) {
      setTags(AllPublicationsTagsQueryResponse);
    }
  }, [AllPublicationsTagsQueryResponse, IsTagsLoading]);

  const handleMoreTagsButton = () => {
    setCountOfTagsToShow((prevState) => prevState + 6);
  };

  useEffect(() => {
    setVisibleTags(tags.slice(0, countOfTagsToShow));
  }, [countOfTagsToShow, tags]);

  return (
    <>
      <h2 className={classes["StatisticsPageTags__title"]}>
        Самые просматриваемые теги
      </h2>
      <div className={classes["StatisticsPageTags__wrapper"]}>
        {
        /* @ts-ignore */}
        <Editor IsLoading={IsTagsLoading} response={visibleTags} />
      </div>
      <Button
        text={
          /* messages[language]["newsPage.ButtonShowMore"] */ "Показать ещё (6)"
        }
        className={cn(
          "text-medium",
          "text-500",
          classes["StatisticsPageTags__button--more"]
        )}
        onClick={handleMoreTagsButton}
      />
    </>
  );
};

export default StatisticsPageTags;
