import classes from "./style.module.css";
import SingleNewsPageCommentsItem from "../SingleNewsPageCommentItem/SingleNewsPageCommentsItem.tsx";

const SingleNewsPageCommentsList = () => {
    return (
        <ul className={classes["SingleNewsPageCommentsList"]}>
            <li className={classes["SingleNewsPageCommentsList__item"]}>
                <SingleNewsPageCommentsItem/>{" "}
                <ul className={classes["SingleNewsPageCommentsList__item--replies"]}>
                    {" "}
                    <li className={classes["SingleNewsPageCommentsList__item--replies__item"]}>
                        <SingleNewsPageCommentsItem/>
                    </li>
                </ul>
            </li>
            <li className={classes["SingleNewsPageCommentsList__item"]}>
                <SingleNewsPageCommentsItem/>{" "}
            </li>
            <li className={classes["SingleNewsPageCommentsList__item"]}>
                <SingleNewsPageCommentsItem/>
            </li>
        </ul>
    );
};

export default SingleNewsPageCommentsList;
