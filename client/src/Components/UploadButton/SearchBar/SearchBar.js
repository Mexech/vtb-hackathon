import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [query, setQuery] = useState({});
    const handleQuery = (event) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if (query != "")
            fetch("/api/graphql")
            fetch(`/getautocomplete/${query}`)
                .then(data => data.text())
                .then(text => console.log(text))
    }, [query]);
    
    return ( 
        <div>
            <input
                type="text"
                placeholder="Введите запрос"
                onChange={handleQuery}
            />
            <button>Поиск</button>
        </div>
    );
}

export default SearchBar;