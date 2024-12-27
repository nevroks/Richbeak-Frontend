import {FC, useEffect, useState} from "react";
import classes from "./style.module.css";
import Button from "../../ui/button/Button.tsx";
import cn from "classnames";
import {publicationsTagsApi} from "../../../utils/api/publicationstags/publicationsTagsApi.ts";
import {ITag} from "../../../types/types.ts";
import {messages} from "../../../utils/consts/languages.ts";
import {useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";

import useMediaQuery from "../../../utils/hooks/useMediaQuery.ts";
import { MEDIA_CONSTS } from "../../../utils/consts/mediaConsts.ts";
import MoreTagsDropdown from "../../ui/dropdown/moretagsdropdown/MoreTagsDropdown.tsx";



type TagsListWithSelectPropsType = {
    setSelectedTag: (tag: ITag, state?: { name: string }) => void,
    selectedTag: ITag
}

const TagsListWithSelect: FC<TagsListWithSelectPropsType> = ({setSelectedTag, selectedTag}) => {
    const language=useAppSelector(state => state.language.language)
    const [visibleTags, setVisibleTags] = useState<ITag[]>([]);
    const [countOfTagsToShow, setCountOfTagsToShow] = useState(5)

    const {
        data: AllPublicationsTagsQueryResponse,
        isLoading: isTagsLoading,
    } = publicationsTagsApi.useGetAllPublicationsTagsQuery()

    const setTagSelection = (tag: ITag, selectedTag: { name: string }) => {
        if (tag.name === selectedTag.name) {
            return
        }

        setSelectedTag(tag, selectedTag)
    }
    const setDropdownTagSelection = (tag: ITag, selectedTag:{name:string}) => {
        setTagSelection(tag, selectedTag);
    }

    const isPhoneOrSmaller = useMediaQuery(MEDIA_CONSTS.PHONE_MEDIA)
    const isTabletOrSmaller=useMediaQuery(MEDIA_CONSTS.TABLET_MEDIA)
    const isSemiPhoneOrSmaller=useMediaQuery(MEDIA_CONSTS.SEMI_PHONE_MEDIA)
    useEffect(() => {
        if (!isTagsLoading) {
            setVisibleTags(AllPublicationsTagsQueryResponse!.slice(0, countOfTagsToShow))
        }
    }, [AllPublicationsTagsQueryResponse, countOfTagsToShow]);

    useEffect(() => {
        if(isTabletOrSmaller) setCountOfTagsToShow(4)
        if(isSemiPhoneOrSmaller) setCountOfTagsToShow(1)
        if(isPhoneOrSmaller) setCountOfTagsToShow(0)
    }, []);
    return (
        <div className={classes['topNewsList_container_tags']}>
            <Button
                className={cn(
                    "text-semi-small",
                    "text-500",
                    classes["TagsListWithSelect__tag--button"], {
                        [classes.selected]: selectedTag.name === "Без фильтров"
                    })}
                text={messages[language]["newsPage.ButtonNoFilters"]}
                onClick={() => setTagSelection({id: 0, name: "Без фильтров"}, selectedTag)}
            />
            {!isTagsLoading &&
                visibleTags.map((tag) => (
                    <Button
                        className={cn(
                            "text-semi-small",
                            "text-500",
                            classes["TagsListWithSelect__tag--button"], {
                                [classes.selected]: selectedTag === tag
                            })}
                        text={tag.name}
                        key={tag.id}
                        onClick={() => setTagSelection(tag, selectedTag)}
                    />))
            }
            {!isTagsLoading && <MoreTagsDropdown selectedTag={selectedTag} countOfTagsToShow={countOfTagsToShow} setDropdownTagSelection={setDropdownTagSelection}/>}
        </div>
    );
};

export default TagsListWithSelect;

