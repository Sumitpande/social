import Filter from "bad-words";

export const filter = new Filter({ placeHolder: "X" });

export const paginate = (array: any, page_size: number, page_number: number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};
