import {useEffect, useState} from "react";

import ParsingPageItem from "./PageComponents/ParsingPageItem/ParsingPageItem";
import Button from "../../components/ui/button/Button.tsx";
import {parsersApi} from "../../utils/api/parsers/parsersApi.ts";
import {parseSourceType} from "../../types/types.ts";
import classes from "./style.module.css";

const ParsingPage = () => {
    const {data: serverSources, isLoading, error} = parsersApi.useGetAllParsersQuery()

    const [changeParsers] = parsersApi.usePatchAllParsersMutation()
    const [localeSources, setLocaleSources] = useState<parseSourceType[] | []>([]);

    const handleChange = () => {
        changeParsers(localeSources);
    }

    useEffect(() => {
        if (!isLoading) {
            setLocaleSources(serverSources!);
        }
    }, [serverSources, isLoading]);

    if (error) {
        // @ts-ignore
        return <h1>Some server error with name/code {error.error}</h1>
    }

    if (localeSources.length === 0) {
        return null;
    }

    return (
        <main>
            <section className={classes["ParsingPage"]}>
                <h2 className={classes["ParsingPage__title"]}>
                    Временное отключение источников парсинга
                </h2>
                <div className={classes["ParsingPage__container--links"]}>
                    {localeSources.map((source, index) => (
                        <ParsingPageItem setStateFn={setLocaleSources} source={source} key={index} index={index}/>
                    ))}
                </div>
                <div className={classes["ParsingPage__change"]}>
                    {JSON.stringify(localeSources) !== JSON.stringify(serverSources) &&
                        <Button className={classes["ParsingPage__change--btn"]} onClick={handleChange}
                                text={"Сохранить"}/>}
                </div>

            </section>
        </main>
    );
};

export default ParsingPage;
