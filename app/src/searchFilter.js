import React from "react";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce"

const App = ({onSearchChange}) => {
    const filterBySearch = (event) => {
        const text = event?.target?.value;
        onSearchChange(text)
    };

    const debounceOnChange = debounce(filterBySearch, 400);

    return (
        <div>
            <input id="search-box" placeholder="Search..." onChange={filterBySearch} />
        </div>
    )
}

export default App;