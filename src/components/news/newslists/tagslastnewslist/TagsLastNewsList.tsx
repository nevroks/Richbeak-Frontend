import {FC, useMemo} from "react";
import classes from "./style.module.css";
import NewsItem from "../../NewsItem.tsx";
import {ITag} from "../../../../types/types.ts";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import {publicationsApi} from "../../../../utils/api/publications/publicationsApi.ts";
import cn from "classnames";
import {FormattedMessage} from "react-intl";
import LoadingError from "../../../errors/loadingerror/LoadingError.tsx";

type TagsLastNewsListPropsType = {
    tag: ITag,
    direction: "vertically" | "horizontally"
}

const TagsLastNewsList: FC<TagsLastNewsListPropsType> = ({tag, direction}) => {

    const language = useAppSelector(state => state.language.language)
    const QueryParams = useMemo(() => {
        return `lang=${language.toLowerCase()}&limit=3&tags=${tag.id}&sort=desc`
    }, [tag, language])

    const {
        data: AllPublicationsQueryResponse,
        error,
        isLoading,
    } = publicationsApi.useGetAllPublicationsQuery(QueryParams)

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error){
        return <LoadingError/>
    }
    return (
        <div className={classes["TagsLastNewsList"]}>
            <h2><FormattedMessage id={"singleNewsPage.also"}/></h2>
            <div className={cn(classes["TagsLastNewsList__list"], {
                [classes.horizontal__list]: direction === "horizontally",
                [classes.vertical__list]: direction === "vertically"
            })}>
                {AllPublicationsQueryResponse!.data.map((news, index) => {
                    return <NewsItem variant={"small"} key={index} news={news}/>
                })}
            </div>
        </div>
    );
};

export default TagsLastNewsList;