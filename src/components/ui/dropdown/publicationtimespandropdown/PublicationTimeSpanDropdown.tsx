import {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react';
import {messages} from "../../../../utils/consts/languages.ts";
import Dropdown from "../Dropdown.tsx";
import DropdownItem from "../DropdownItem.tsx";
import {useAppSelector} from "../../../../utils/hooks/ReduxHooks.ts";
import {appPublicationsTimeSpan} from "../../../../types/types.ts";
import classes from "./style.module.css";
import { useLocation } from 'react-router-dom';

type PublicationTimeSpanDropdownPropsType = {
    timeSpan: string,
    setTimeSpan: Dispatch<SetStateAction<appPublicationsTimeSpan>>
    contentArr: { id: string; name: string }[];
}

const PublicationTimeSpanDropdown: FC<PublicationTimeSpanDropdownPropsType> = ({setTimeSpan, contentArr}) => {
    const location = useLocation();
    const language = useAppSelector(state => state.language.language)

    const [topNewsDate, setTopNewsDate] = useState({name: "Per week", id: "week"})

    const setDropdownTimeSpan = useCallback((timeSpanObj: { name: string, id: appPublicationsTimeSpan }) => {
        setTopNewsDate(timeSpanObj)
        setTimeSpan(timeSpanObj.id)
    }, [setTopNewsDate, setTimeSpan])
    useEffect(() => {
        setTopNewsDate({...topNewsDate, name: location.pathname.includes('/admin') ? "За неделю" : messages[language]["newsPage.selectionWeek"]})
    }, [language]);
    return (
        <>
            <Dropdown activeClassName={classes["PublicationTimeSpanDropdown__wrapper"]}
                setState={setDropdownTimeSpan}
                state={topNewsDate}
                content={<>
                    {contentArr.map(time =>
                        <DropdownItem key={time.id} value={time.id} text={time.name}/>
                    )}
                </>}
                search={false}
                size='small'
                text={topNewsDate.name}
                style='button'
                contentClassname={classes["PublicationTimeSpanDropdown__content"]}
                choseOptional={false}
            />
        </>
    );
};

export default PublicationTimeSpanDropdown;