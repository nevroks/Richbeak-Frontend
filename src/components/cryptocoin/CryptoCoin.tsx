import cn from "classnames";
import classes from "./style.module.css";
import {FC} from "react";
import {ICoin} from "../../types/types.ts";

interface ICryptoCoinProps {
    coin: ICoin,
    version?: "mini"
}

const CryptoCoin: FC<ICryptoCoinProps> = ({coin, version}) => {

    switch (version) {
        case "mini":
            return (
                <p
                    className={cn(
                        "text-500",
                        "text-extra-small",
                        classes['CryptoCoin__text'],
                        classes['mini']
                    )}
                >
                    {coin.name}
                </p>
            );
        default:
            return (
                <p
                    className={cn(
                        classes['CryptoCoin__text'],
                        "text-500",
                        "text-medium",
                    )}
                >
                    {coin.name}
                </p>
            );
    }
};

export default CryptoCoin;