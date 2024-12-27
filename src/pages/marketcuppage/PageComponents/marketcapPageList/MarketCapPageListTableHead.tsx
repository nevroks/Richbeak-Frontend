import Button from "../../../../components/ui/button/Button";
import classes from "./style.module.css";
import cn from "classnames";
import {Dispatch, FC, SetStateAction} from "react";
import {FormattedMessage} from "react-intl";
import MarketCapPageListSelectedCategories from "./MarketCapPageListSelectedCategories";

type MarketCapPageListTableHeadPropsType = {
    sort: {
        sort: string;
        direction: "desc" | "asc";
    };
    setSort: Dispatch<
        SetStateAction<{
            sort: string;
            direction: "desc" | "asc";
        }>
    >;
};

const MarketCapPageListTableHead: FC<MarketCapPageListTableHeadPropsType> = ({sort, setSort}) => {
    
    const handleChangeSort = (sortName: string, direction: "desc" | "asc") => {
        if(sortName===sort.sort && direction===sort.direction){
            setSort({
                sort: "",
                direction: "desc",
            });
        }else{
            setSort({
                sort: sortName,
                direction: direction,
            });
        }

    };

    return (     
                    <thead>
                    <tr className={classes["MarketCapPageList--table__tr__categories"]}>
                        <th className={classes["MarketCapPageList--table__th"]}>
                            <div
                                className={classes["MarketCapPageList--container__cell__first"]}
                            >
                                <div className={classes["MarketCapPageList--box__cell"]}>
                                    <p
                                        className={cn(
                                            "text-semi-small",
                                            "text-500",
                                            classes["MarketCapPageList--text"]
                                        )}
                                    >
                                        #
                                    </p>
                                    <div
                                        className={classes["MarketCapPageList--container__buttons"]}
                                    >
                                        <Button
                                            onClick={() => handleChangeSort("cmc_rank", "asc")}
                                            className={cn(classes["MarketCapPageList--button__up"], {
                                                [classes["MarketCapPageList--button__up_active"]]:
                                                sort.sort === "cmc_rank" && sort.direction === "asc",
                                            })}
                                        />
                                        <Button
                                            onClick={() => handleChangeSort("cmc_rank", "desc")}
                                            className={cn(classes["MarketCapPageList--button__down"], {
                                                [classes["MarketCapPageList--button__down_active"]]:
                                                sort.sort === "cmc_rank" && sort.direction === "desc",
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className={classes["MarketCapPageList--container__rowItem"]}>
                                    <p
                                        className={cn(
                                            "text-semi-small",
                                            "text-500",
                                            classes["MarketCapPageList--text"]
                                        )}
                                    >
                                        <FormattedMessage id="marcetCap.ColumnTitle"/>
                                    </p>
                                    <div
                                        className={classes["MarketCapPageList--container__buttons"]}
                                    >
                                        <Button
                                            onClick={() => handleChangeSort("name", "asc")}
                                            className={cn(classes["MarketCapPageList--button__up"], {
                                                [classes["MarketCapPageList--button__up_active"]]:
                                                sort.sort === "name" && sort.direction === "asc",
                                            })}
                                        />
                                        <Button
                                            onClick={() => handleChangeSort("name", "desc")}
                                            className={cn(classes["MarketCapPageList--button__down"], {
                                                [classes["MarketCapPageList--button__down_active"]]:
                                                sort.sort === "name" && sort.direction === "desc",
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className={classes["MarketCapPageList--table__th_fake"]}>
                            <div className={classes["MarketCapPageList--fake"]}></div>
                        </th>
                        <th>
                            <div
                                className={classes["MarketCapPageList--container__cell__info"]}
                            >
                                <p
                                    className={cn(
                                        "text-semi-small",
                                        "text-500",
                                        classes["MarketCapPageList--text"]
                                    )}
                                >
                                    <FormattedMessage id="popup.price"/>
                                </p>
                                <div className={classes["MarketCapPageList--container__buttons"]}>
                                    <Button
                                        onClick={() => handleChangeSort("price", "asc")}
                                        className={cn(classes["MarketCapPageList--button__up"], {
                                            [classes["MarketCapPageList--button__up_active"]]:
                                            sort.sort === "price" && sort.direction === "asc",
                                        })}
                                    />
                                    <Button
                                        onClick={() => handleChangeSort("price", "desc")}
                                        className={cn(classes["MarketCapPageList--button__down"], {
                                            [classes["MarketCapPageList--button__down_active"]]:
                                            sort.sort === "price" && sort.direction === "desc",
                                        })}
                                    />
                                </div>
                            </div>
                        </th>
                        <MarketCapPageListSelectedCategories sort={sort} handleChangeSort={handleChangeSort}/>
                        <th>
                            <div
                                className={classes["MarketCapPageList--fake__last__cell"]}
                            ></div>
                        </th>
                    </tr>
                    </thead>
                    
    );
};

export default MarketCapPageListTableHead;