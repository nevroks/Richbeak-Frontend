import {IPublicationImgParagraph, IPublicationTextParagraph} from "../../../../types/types.ts";
import {FC} from "react";
import cn from "classnames";
import classes from "./style.module.css";
import {Link} from "react-router-dom";

type SingleNewsPageParagraphPropsType={
    paragraph:IPublicationImgParagraph | IPublicationTextParagraph,
}

const SingleNewsPageParagraph:FC<SingleNewsPageParagraphPropsType> = ({paragraph}) => {
    switch (paragraph.class){
        case "TextParagraph":
            return (
                <>{"isTitle" in paragraph && paragraph.isTitle ?
                    <h1 className={classes["SingleNewsPageParagraph__text--title"]}>{paragraph.text}</h1>
                    :
                    <p className={cn("text-400", "text-semi-large",classes["SingleNewsPageParagraph__text--text"])}>{paragraph.text}</p>}
                </>
            );
        case "ImgParagraph":
            return (
                <div className={classes["SingleNewsPageParagraph__img--wrapper"]}>
                    <img className={classes["SingleNewsPageParagraph__img--img"]} src={paragraph.data} alt="News img"/>
                    <p className={cn("text-semi-small",
                        "text-400",
                        classes["SingleNewsPageParagraph__img--source"])}>
                        {paragraph.text} <Link to={"link" in paragraph ? paragraph.link : ""}>{"linkText" in paragraph && paragraph.linkText}</Link>
                    </p>
                </div>
            );
    }

};

export default SingleNewsPageParagraph;