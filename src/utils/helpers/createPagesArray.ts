export function createPagesArray(totalItems:number, itemsPerPage:number) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagesArray = [];

    for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
    }

    return pagesArray;
}