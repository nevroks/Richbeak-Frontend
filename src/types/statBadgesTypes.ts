export interface StatBadgesProps {
    variant: "viewsCounter" | "commentsCounter" | "topNum";
    isAbsolute: boolean;
    count?: number;
    size: "medium" | "large";
    top: number | undefined;
    style?: object | undefined;
}

export interface BadgeSizeProps {
    size: "medium" | "large";
    img: "eye" | "comment" | "";
    count: number;
    isAbsolute: boolean;
    style: object | undefined;
}
  