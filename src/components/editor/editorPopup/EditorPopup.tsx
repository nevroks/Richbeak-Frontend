import React, { useRef, forwardRef, } from "react";
import classes from "./style.module.css";
import cn from "classnames";
// @ts-ignore
import TrashImg from "../../../assets/icons/iconTrashRed.svg?react";
// @ts-ignore
import EditBlackImg from "../../../assets/icons/iconEditBlack.svg?react";

interface PopupPosition {
  top: number;
  left: number;
}

interface EditorPopupProps {
  position: PopupPosition;
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EditorPopup = forwardRef<HTMLDivElement, EditorPopupProps>(
  ({ position, visible, onEdit, onDelete }, ref) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const combinedRef = (ref as React.RefObject<HTMLDivElement>) || popupRef;

    // const handleClickOutside: EventListener = (event) => {
    //   const mouseEvent = event as unknown as MouseEvent;
    //   if (
    //     combinedRef.current &&
    //     !combinedRef.current.contains(mouseEvent.target as Node)
    //   ) {
    //     // onClose();
    //   }
    // };

    // useEffect(() => {
    //   if (visible) {
    //     document.addEventListener("mousedown", handleClickOutside);
    //   } else {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   }
    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //   };
    // }, [visible]);

    if (!visible) {
      return null;
    }

    return (
      <div
        ref={combinedRef}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          zIndex: 1000,
          transform: "translateX(-95%)",
        }}
        className={classes["editorPopup"]}
      >
        <ul
          className={cn(
            classes["editorPopup__list"],
            "text-500",
            "text-medium"
          )}
        >
          <li onClick={onEdit} className={classes["editorPopup__list--item"]}>
            <span>
              <EditBlackImg />
            </span>
            Переименовать
          </li>
          <li
            onClick={onDelete}
            className={cn(
              classes["editorPopup__list--item"],
              classes["delete"]
            )}
          >
            <span>
              <TrashImg />
            </span>
            Удалить
          </li>
        </ul>
      </div>
    );
  }
);

export default EditorPopup;
