import { useState } from "react";
import { publicationsCoinsApi } from "../../utils/api/publicationscoins/publicationsCoinsApi";
import Editor from "../../components/editor/Editor";
import { ICoin } from "../../types/types";

import classes from "./style.module.css";
// @ts-ignore
/* import AddCoinImg from "../../assets/icons/iconAddCoin.svg?react"; */
import Pagination from "../../components/pagination/Pagination";

const CoinEditorPage: React.FC = () => {
  const { data: AllPublicationsCoinsQueryResponse, isLoading: IsCoinsLoading } =
    publicationsCoinsApi.useGetAllPublicationsCoinsQuery();

  const [countOfCoinsPerPage, setCountOfCoinsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * countOfCoinsPerPage;
  const endIndex = startIndex + countOfCoinsPerPage;
  const paginatedCoins: ICoin[] | undefined = AllPublicationsCoinsQueryResponse && AllPublicationsCoinsQueryResponse.slice(startIndex, endIndex);

  return (
    <section className={classes["editor"]}>
      <div className={classes["editor__header"]}>
        <h2 className={classes["editor__header--title"]}>Редактор монет</h2>
        {/* <button
          className={cn(
            classes["editor__header--button"],
            "text-500",
            "text-semi-small"
          )}
        >
          <AddCoinImg />
          Добавить монету
        </button> */}
      </div>
      <Editor page={page} countOfItemsPerPage={countOfCoinsPerPage} isLoading={IsCoinsLoading} response={paginatedCoins} type='coins' />
      <Pagination
        setPage={setPage}
        page={page}
        countOfCoinsPerPage={countOfCoinsPerPage}
        setCountOfCoinsPerPage={setCountOfCoinsPerPage}
        totalItems={AllPublicationsCoinsQueryResponse ? AllPublicationsCoinsQueryResponse.length : 0}
      />
    </section>
  );
};

export default CoinEditorPage;
