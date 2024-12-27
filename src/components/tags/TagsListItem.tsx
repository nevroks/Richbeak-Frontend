import classes from "./style.module.css";
import cn from "classnames";
import {FC} from "react";
import {ITag} from "../../types/types.ts";


type TagsListItemPropsType = {
    tag: ITag,
    customFont?: string
}
const TagsListItem: FC<TagsListItemPropsType> = ({tag, customFont}) => {

    const isFontCustom = Boolean(customFont)

    return (
        <>
            <p className={cn(classes["TagsListItem__name"], {
                // @ts-ignore
                [customFont]: isFontCustom,
                "text-semi-large": !isFontCustom,
                "text-500": !isFontCustom,
            })}
            >{tag.name}</p>
            <p className={cn(classes["TagsListItem__dot"], {
                // @ts-ignore
                [customFont]: isFontCustom,
                "text-semi-large": !isFontCustom,
                "text-500": !isFontCustom,
            })}
            >•</p>
        </>
    );
};

export default TagsListItem;
