import {useEffect, useRef, useState} from "react";
import cn from "classnames";
import classes from "./style.module.css";
import Button from "../ui/button/Button";
import {IEditorProps, IPopupPosition} from "../../types/editorTypes";
import StatBadges from "../badges/StatBadges";
import EditorPopup from "./editorPopup/EditorPopup.tsx";
import Input from "../ui/input/Input.tsx";

// @ts-ignore
/* import SettingsImg from "../../assets/icons/iconSettings.svg?react"; */
// @ts-ignore
import EditorEditImg from "../../assets/icons/editorEditIcon.svg?react";
// @ts-ignore
import EditorCancelImg from "../../assets/icons/editorCancelIcon.svg?react";

const Editor = ({response, isLoading, type, page, countOfItemsPerPage}: IEditorProps) => {
    const MAX_TEXT_LENGTH = 12;

    const [popupVisible, setPopupVisible] = useState(false);
    const [fullTextPopupVisible, setFullTextPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState<IPopupPosition>({
        top: 0,
        left: 0,
    });


    const [isTextEditing, setIsTextEditing] = useState<number | null>(null)

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [selectedItemText, setSelectedItemText] = useState<string | null>(null);
    const [changeTagNameValue, setChangeTagNameValue] = useState('');

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const popupRef = useRef<HTMLDivElement | null>(null);
    // const location = useLocation()

    //хуки не полагается юзать условно, но тут работает почему-то
    //если что, можно разделить и условно юзать нужный в confirmEdit и handleDelete
    // const [deleteTagOrCoin] = /* type === "tags" ? */ publicationsTagsApi.useDeleteTagMutation() /* : publicationsCoinsApi.useDeleteCoinMutation(); */
    // const [updateTagOrCoin] = /* type === "tags" ? */ publicationsTagsApi.useUpdateTagMutation() /* : publicationsCoinsApi.useUpdateCoinMutation(); */
    // const showPopup = (index: number, event: MouseEvent<HTMLSpanElement>) => {
    //     event.stopPropagation();
    //     const target = event.currentTarget as HTMLSpanElement;
    //     const rect = target.getBoundingClientRect();
    //
    //     setFullTextPopupVisible(false);
    //
    //     setPopupPosition({
    //         top: rect.bottom + window.scrollY + 10,
    //         left: rect.left + window.scrollX + target.offsetWidth / 2,
    //     });
    //
    //     setSelectedItemId(response[index].id);
    //     setPopupVisible(true);
    // };

    const hidePopup = () => {
        setPopupVisible(false);
        setSelectedItemId(null);
    };
    const cancelEdit = () => {
        setIsTextEditing(null)
        setChangeTagNameValue('')
    }
    const confirmEdit = (id: number) => {
        // updateTagOrCoin({id, name: changeTagNameValue}).unwrap()
        //     .then(() => cancelEdit()) // mb добавить оптимистик апдейт, ну и я хз почему запрос ничего не делает
        //     .catch((error) => error)
        return;
        //Этот lоg никогда не выведется и нужен просто чтобы TS не ныл,и если чё можно было не удалять
        //код а просто раскоментить старое
        console.log(id)
    }
    // дополнить две функции ниже selectedItemId
    const handleEdit = (id: number | null) => {
        setIsTextEditing(id)
        hidePopup();
    };

    const handleDelete = (id: number | null) => {
        if (id !== null) {
            // deleteTagOrCoin(id);
            // hidePopup();
        }
    };

    const shortenText = (text: string, max = text.length): string => {
        return text.length > max ? text.substring(0, max) + "..." : text;
        //Этот lоg никогда не выведется и нужен просто чтобы TS не ныл,и если чё можно было не удалять
        //код а просто раскоментить старое
        console.log(type)
    };

    const handleShowFullText = (id: number) => {
        const element = response?.find((el) => el.id === id);

        if (element) {
            const index = response?.findIndex((el) => el.id === id);
            const target = itemRefs.current[index || 1];

            if (target) {
                const rect = target.getBoundingClientRect();

                setPopupVisible(false);

                setPopupPosition({
                    top: rect.bottom + window.scrollY - 20,
                    left: rect.left + window.scrollX + target.clientWidth / 2 - 30,
                });

                setSelectedItemText(element.name);
                setFullTextPopupVisible(true);
            }
        }
    };

    const hideFullTextPopup = () => {
        setFullTextPopupVisible(false);
        setSelectedItemText(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: Event | undefined) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event!.target as Node)
            ) {
                hideFullTextPopup();
                hidePopup()
            }
        };
        document.addEventListener("mousedown", () => handleClickOutside(event));

        return () => {
            document.removeEventListener("mousedown", () => handleClickOutside(event));
        };
    }, [popupRef]);
    return (
        <section className={classes["editor"]}>
            <div className={classes["editor__main"]}>
                <ul className={classes["editor__main--list"]}>
                    {!isLoading &&
                        response?.map((el, index) => (
                            <div key={el.id}>
                                <li
                                    className={cn(
                                        classes["editor__main--list__el"],
                                        "text-500",
                                        "text-semi-large"
                                    )}
                                    ref={(el) => (itemRefs.current[index] = el)}
                                >
                                    <span className={cn("text-500", "text-medium")}>#{(page*countOfItemsPerPage-countOfItemsPerPage)+index+1}</span>
                                    {/* !isTextEditing && */ isTextEditing !== el.id && shortenText(el.name, MAX_TEXT_LENGTH)}
                                    {isTextEditing === el.id &&
                                        <Input className={cn(classes["editor__input"])} placeholder='type here'
                                               variant="basic" type="text" value={changeTagNameValue}
                                               onChange={(event) => setChangeTagNameValue(event.target.value)}/>}
                                    <div className={classes["editor__main--list__el--info"]}>
                                        {el.name.length > MAX_TEXT_LENGTH && isTextEditing !== el.id && (
                                            <Button
                                                onClick={() => handleShowFullText(el.id)}
                                                type="button"
                                            >
                                                ...
                                            </Button>
                                        )}
                                        {isTextEditing !== el.id &&
                                            <StatBadges
                                                variant="viewsCounter"
                                                isAbsolute={false}
                                                size="medium"
                                                count={0}
                                                top={undefined}/>
                                        }
                                        {/*  !!!! HERE IS SHESTERNYA COMMENTED !!!!
                                         {location.pathname !== APP_PAGES_PATHS_CONSTS.STATISTICS_PAGE && isTextEditing !== el.id &&
                                            <span onClick={(event) => showPopup(index, event)}>
                                                <SettingsImg/>
                                            </span>} */}
                                        {isTextEditing === el.id &&
                                            <>
                                                <span onClick={() => confirmEdit(el.id)}>
                                                    <EditorEditImg className={classes["editor__editIcon"]}/>
                                                </span>
                                                <span onClick={cancelEdit}>
                                                    <EditorCancelImg className={classes["editor__cancelIcon"]}/>
                                                </span>
                                            </>
                                        }
                                    </div>
                                </li>
                                <EditorPopup
                                    ref={popupRef}
                                    position={popupPosition}
                                    visible={popupVisible}
                                    onClose={hidePopup}
                                    onEdit={() => handleEdit(selectedItemId)}
                                    onDelete={() => handleDelete(selectedItemId)}
                                />
                            </div>
                        ))}

                    {fullTextPopupVisible && selectedItemText && (
                        <div
                            ref={popupRef}
                            className={classes["editor__main--list__popup"]}
                            style={{
                                top: popupPosition.top,
                                left: popupPosition.left,
                            }}
                        >
                            <div>
                                <p>{selectedItemText}</p>
                            </div>
                        </div>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default Editor;