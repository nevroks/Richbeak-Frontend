import {useEffect } from 'react'

function useDocumentTitle(title:string,lang:string) {
    useEffect(() => {
        document.title = title;
    }, [title,lang]);
}
export default useDocumentTitle