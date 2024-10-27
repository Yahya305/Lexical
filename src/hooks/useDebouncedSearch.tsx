import debounce from "lodash.debounce";
import { useState, useEffect, useCallback } from "react";

export function useDebouncedSearch(initialValue = "", delay = 2000) {
    const [debouncedValue, setDebouncedValue] = useState(initialValue);
    const [searchedText, setSearchedText] = useState(initialValue);

    const request = debounce(
        (searchName) => setDebouncedValue(searchName),
        delay
    );

    const debounceRequest = useCallback(
        (searchName: string) => request(searchName),
        []
    );

    const handleChange = (value: string) => {
        debounceRequest(value);
        setSearchedText(value);
    };

    return { searchedText, debouncedValue, handleChange };
}
