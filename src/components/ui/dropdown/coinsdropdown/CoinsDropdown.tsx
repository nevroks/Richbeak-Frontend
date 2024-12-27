import {Dispatch, FC, SetStateAction} from 'react';
import Dropdown from "../Dropdown.tsx";
import DropdownItem from "../DropdownItem.tsx";
import {publicationsCoinsApi} from "../../../../utils/api/publicationscoins/publicationsCoinsApi.ts";
import {ICoin} from "../../../../types/types.ts";
import classes from "./style.module.css";
// @ts-ignore
import MoneyIcon from "./../../../../assets/icons/IconMoney.svg?react";
import cn from "classnames";



type CoinsDropdownPropsType={
    selectedCoin:ICoin,
    setSelectedCoin:Dispatch<SetStateAction<Omit<ICoin, "ticker">>>,
    setPrevCoin:Dispatch<SetStateAction<Omit<ICoin, "ticker">>>
}

const CoinsDropdown:FC<CoinsDropdownPropsType> = ({setSelectedCoin,selectedCoin,setPrevCoin}) => {

    const {
        data: AllPublicationsCoinsQueryResponse,
        isLoading: IsCoinsLoading,
    } = publicationsCoinsApi.useGetAllPublicationsCoinsQuery()

    const setSelectedAndPrevCoin = (coin: Omit<ICoin, 'ticker'>, state?: Omit<ICoin, 'ticker'>) => {
        if (state) setPrevCoin(state);
        setSelectedCoin(coin);
    }

    return (
        <>
            {!IsCoinsLoading &&
                <Dropdown activeClassName={cn(classes['Coins__dropdown'],classes["dropdown__button"])}
                    setState={setSelectedAndPrevCoin}
                    state={selectedCoin}
                    icon={<MoneyIcon/>}
                    content={<>
                        {AllPublicationsCoinsQueryResponse!.map(coin =>
                            <DropdownItem key={coin.id} value={coin.id} text={coin.name}/>
                        )}
                    </>}
                    search={true}
                    size='medium'
                />
            }
        </>
    );
};

export default CoinsDropdown;