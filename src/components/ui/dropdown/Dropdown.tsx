import DropdownItem from "./DropdownItem.tsx";
import {ReactElement, ReactNode, useEffect, useRef, useState,} from "react";
import DropdownContent from "./DropdownContent.tsx";
import Button from "../button/Button.tsx";
import classes from "./style.module.css";
import dropdownArrowImg from "./../../../assets/icons/arrowCategotiesDown.svg";
import cn from "classnames";
import DropDownSearch from "./DropdownSearch.tsx";
import {dropDownSizes} from "../../../types/types.ts";
import {messages} from "../../../utils/consts/languages.ts";
import {useAppSelector} from "../../../utils/hooks/ReduxHooks.ts";


type DropdownPropsType<T> = {
    content: T;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: any;
    state: {
        id: number | string;
        name: string;
    };
    icon?: ReactNode;
    search?: boolean;
    size?: dropDownSizes;
    text?: string,
    style?: 'button' | 'text',
    contentClassname?: string,
    choseOptional?: boolean,
    activeClassName?: string | false,
    buttonClassName?: string
};

const Dropdown = <T, >({
                           icon,
                           content,
                           setState,
                           state,
                           search,
                           size = "medium",
                           text = 'Не выбрано',
                           style = 'button',
                           choseOptional = true,
                           contentClassname = '',
                           activeClassName,
                           buttonClassName
                       }: DropdownPropsType<T>): ReactNode => {
    const [selected, setSelected] = useState(false);
    const firstRender = useRef(true);
    const DropdownRef = useRef(null);
    const [opened, setOpened] = useState(false);
    //searchStr - state for DropdownSearch component(which renders if search prop is true), which is typical controlled input(with icon)
    const [searchStr, setSearchStr] = useState("");
    const language = useAppSelector(state => state.language.language)
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setSelected(true);
    }, [state]);


    //close on click out of the dropdown
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (
                DropdownRef.current &&
                // @ts-ignore
                !DropdownRef.current.contains(event.target)
            ) {
                setOpened(false);
            }
        };

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, [DropdownRef]);

    const handleDropdownButtonClick = () => {
        setOpened((prevState) => !prevState);
    };

    return (
        <div className={cn(classes[`Dropdown__wrapper`], classes[`Dropdown__wrapper--${size}`])} ref={DropdownRef}>
            <Button
                className={cn(classes[`Dropdown__${style}`], classes[`Dropdown__${style}--${size}`], {
                    // @ts-ignore
                    [activeClassName]: Boolean(activeClassName) && selected,
                    // @ts-ignore
                    [buttonClassName]: Boolean(buttonClassName)
                })}
                onClick={handleDropdownButtonClick}
            >
                <div className={classes["Dropdown__button--value"]}>
                    {Boolean(icon) && icon}
                    {!selected ? (
                        <DropdownItem
                            setState={() => {
                            }}
                            text={`${text}`}
                            value={undefined}
                        />
                    ) : (
                        
                        <DropdownItem
                            setState={() => {
                            }}
                            
                            text={state.name}
                            value={state.id}
                        />
                    )}
                </div>
                <img
                    className={cn(classes[`Dropdown__${style}--state__img`], {
                        [classes.openned]: opened,
                    })}
                    src={dropdownArrowImg}
                    alt=""
                />
            </Button>
            {opened && (
                <DropdownContent /* setState={setState} */ search={search} size={size}
                                                           contentClassname={contentClassname}>
                    {search && (
                        <DropDownSearch
                            value={searchStr}
                            onChange={setSearchStr}
                            type={"text"}
                            placeholder={messages[language]["DropDown.search__text"]}
                        />
                    )}
                    {search
                        // @ts-ignore
                        ? content.props.children.map(
                            (dropdownItem: ReactElement, index: number) => {
                                if (
                                    dropdownItem.props.text
                                        .toLowerCase()
                                        .includes(searchStr.toLowerCase())
                                )
                                    return (
                                        <DropdownItem
                                            {...dropdownItem.props}
                                            state={state}
                                            key={index}
                                            setState={setState}
                                        />
                                    );
                            }
                        )
                        // @ts-ignore
                        : content.props.children.map(
                            (dropdownItem: ReactElement, index: number) => {
                                return (
                                    <DropdownItem
                                        {...dropdownItem.props}
                                        state={state}
                                        key={index}
                                        setState={setState}
                                    />
                                );
                            }
                        )}
                    {selected && (
                        choseOptional &&
                        <DropdownItem
                            text={messages[language]["DropDown.unselected__option"]}
                            value={undefined}
                            setState={setState}
                            state={state}
                        />
                    )}
                </DropdownContent>
            )}
        </div>
    );
};

export default Dropdown;
