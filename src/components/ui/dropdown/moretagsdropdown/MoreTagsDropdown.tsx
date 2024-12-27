import {FC, useEffect, useMemo, useRef} from 'react';
import DropdownItem from "../DropdownItem.tsx";
import {messages} from "../../../../utils/consts/languages.ts";
import classes from "./style.module.css";
import Dropdown from "../Dropdown.tsx";
import {publicationsTagsApi} from "../../../../utils/api/publicationstags/publicationsTagsApi.ts";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import {ITag} from "../../../../types/types.ts";

type MoreTagsDropdownPropsType = {
    countOfTagsToShow: number
    selectedTag: ITag,
    setDropdownTagSelection: (tag: ITag, selectedTag: ITag) => void
}

const MoreTagsDropdown: FC<MoreTagsDropdownPropsType> = ({countOfTagsToShow, selectedTag, setDropdownTagSelection}) => {
    const language = useAppSelector(state => state.language.language)
    const isTagFromDropDownRef = useRef(false)
    const {
        data: AllPublicationsTagsQueryResponse,
    } = publicationsTagsApi.useGetAllPublicationsTagsQuery()
    const dropdownTagsArray = useMemo(() => {
        return AllPublicationsTagsQueryResponse!.slice(countOfTagsToShow)
    }, [AllPublicationsTagsQueryResponse]);
    useEffect(() => {
        for (let i = 0; i < dropdownTagsArray.length; i++) {
            if (dropdownTagsArray[i].name === selectedTag.name) {
                isTagFromDropDownRef.current = true
                break
            } else {
                isTagFromDropDownRef.current = false
            }
        }
    }, [selectedTag.name]);


    return (
        <>
            <Dropdown
                setState={setDropdownTagSelection}
                state={isTagFromDropDownRef.current ?
                    selectedTag
                    :
                    {
                        id: "Не выбрано",
                        name: messages[language]["newsPage.ButtonMore"]
                    }}
                content={<>
                    {dropdownTagsArray.map(tag =>
                        <DropdownItem key={tag.id} value={tag.id} text={tag.name}/>
                    )}
                </>}
                search={true}
                size='medium'
                text={messages[language]["newsPage.ButtonMore"]}
                style='text'
                choseOptional={false}
                activeClassName={isTagFromDropDownRef.current && classes["Dropdown__button"]}
            />
        </>

    );
};

export default MoreTagsDropdown;