import {ICoin, ITag} from "./types.ts";


export interface IPopupPosition {
    top: number;
    left: number;
}

export interface IEditorProps {
    isLoading: boolean,
    response: ITag[] | ICoin[] | undefined,
    type: 'coins' | 'tags',
    page:number,
    countOfItemsPerPage:number
}
