import {useState} from "react";
import {publicationsTagsApi} from "../../utils/api/publicationstags/publicationsTagsApi";
import Editor from "../../components/editor/Editor";

import classes from "./style.module.css";
import cn from "classnames";
// @ts-ignore
import AddTagImg from "../../assets/icons/iconAddTag.svg?react";
import Pagination from "../../components/pagination/Pagination";
import PopupEditor from "../../components/ui/popup/popupEditor/PopupEditor";

const TagEditorPage: React.FC = () => {
    const {data: AllPublicationsTagsQueryResponse, isLoading: IsTagsLoading} =
        publicationsTagsApi.useGetAllPublicationsTagsQuery();

    const [countOfTagsPerPage, setCountOfTagsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [popupAddVisible, setPopupAddVisible] = useState(false);
    const [changeTagNameValue, setChangeTagNameValue] = useState('');
    const [inputError, setInputError] = useState(false);

    const [createTag] = publicationsTagsApi.useCreateTagMutation();
    const onCreateTag = () => {
        if(AllPublicationsTagsQueryResponse?.some((el) => el.name.toLowerCase() === changeTagNameValue.toLowerCase())){
            setInputError(true);
        } else createTag({name: changeTagNameValue})
    }
    const onInputChange = (value: string) => {
        setChangeTagNameValue(value)
        setInputError(false)
    }
    const onPopupClose = () => {
        setPopupAddVisible(false);
        setChangeTagNameValue('');
        setInputError(false);
    }
    const startIndex = (page - 1) * countOfTagsPerPage;
    const endIndex = startIndex + countOfTagsPerPage;
    const paginatedTags = AllPublicationsTagsQueryResponse?.slice(startIndex, endIndex);
    if (IsTagsLoading){
        return
    }
    return (
        <section className={classes["editor"]}>
            <div className={classes["editor__header"]}>
                <h2 className={classes["editor__header--title"]}>Редактор тегов</h2>
                <button
                    className={cn(
                        classes["editor__header--button"],
                        "text-500",
                        "text-semi-small"
                    )}
                    onClick={() => {setPopupAddVisible(true)}}
                >
                    <AddTagImg/>
                    Добавить тег
                </button>
            </div>
            <Editor page={page} countOfItemsPerPage={countOfTagsPerPage} isLoading={IsTagsLoading} response={paginatedTags!} type='tags' />
            <Pagination
                setPage={setPage}
                page={page}
                countOfCoinsPerPage={countOfTagsPerPage}
                setCountOfCoinsPerPage={setCountOfTagsPerPage}
                totalItems={AllPublicationsTagsQueryResponse!.length}
            />
            {
            popupAddVisible && 
                <PopupEditor
                    onInputChange={onInputChange}
                    inputValue={changeTagNameValue}
                    setIsPopupOpen={setPopupAddVisible} 
                    onClose={onPopupClose}
                    title="Добавить тэг"
                    errorText="Тэг с таким именем уже есть"
                    error={inputError}
                    onBtnClick={onCreateTag}
                />
            }
        </section>
    );
};

export default TagEditorPage;