export interface IPublication {
    id: number,
    createdAt: string,
    lang: string,
    title: string,
    status: string,
    description: string,
    preview: string,
    tags: ITag[]
    coin: ICoin,
    publicationsGroup: {
        id: number,
        views: number,
        preview: string
        tags: number[],
        coin: number
    }
}

export interface IPublicationParagraph {
    id: number,
    order: number,
    type: "text" | "img",
    class: "TextParagraph" | "ImgParagraph"
    text: string,
    data?: string
}

export interface IPublicationTextParagraph extends IPublicationParagraph {
    style: "bold",
    isTitle: boolean
}

export interface IPublicationImgParagraph extends IPublicationParagraph {
    link: string
    linkText: string
}

export interface ICoin {
    id: number,
    name: string,
    ticker: string
}

export interface ITag {
    id: number,
    name: string
}

export type parseSourceType = {
    url: string,
    enabled: boolean
}
export type appLanguages = 'RU' | 'PT' | 'UA' | 'FR' | 'ES' | 'TH' | 'ID' | 'EN';
export type appPublicationsTimeSpan = 'year' | "month" | "week" | 'day';
export type dropDownSizes = 'xsmall' | 'small' | 'medium' | 'large';