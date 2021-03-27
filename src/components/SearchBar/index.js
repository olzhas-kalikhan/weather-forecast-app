import { useEffect, useRef, useState } from 'react';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';
import Locations from '../../city.list.json';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const [marginTop, setMarginTop] = useState("40%")
    const listItemRefs = useRef([]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
    }
    const handleSearchChange = (e) => {
        let term = e.target.value;
        setSearchTerm(term);

    }
    const handleKeyPressed = (e) => {
        e = e || window.event;
        if (e.key === "ArrowDown" && activeSuggestion < searchSuggestions.length - 1) {
            setActiveSuggestion(activeSuggestion + 1)
        }
        if (e.key === "ArrowUp" && activeSuggestion > 0) {
            setActiveSuggestion(activeSuggestion - 1)
        }
        if (e.key === "Enter" && activeSuggestion >= 0) {
            onSearch(searchSuggestions[activeSuggestion]);
            setSearchTerm("");
            setMarginTop("10%");
        }
    }
    useEffect(() => {
        if (searchTerm.length > 3) {
            let suggestions = Locations.filter(location => location.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
            setSearchSuggestions(suggestions);
        }
        else {
            setSearchSuggestions([])
        }
        setActiveSuggestion(-1)
    }, [searchTerm])
    useEffect(() => {
        listItemRefs.current = listItemRefs.current.slice(0, searchSuggestions.length);
    }, [searchSuggestions]);
    useEffect(() => {
        if (activeSuggestion > -1)
            listItemRefs.current[activeSuggestion].scrollIntoView();
    }, [activeSuggestion])
    const handleListItemClick = async (location) => {
        onSearch(location);
        setSearchTerm("");
        setMarginTop("10%");

    }
    return (

        <div className="search-bar-container" onKeyDown={handleKeyPressed} style={{ marginTop }}>
            <div className="search-bar">
                <input
                    className="search-bar-input"
                    type="text"
                    placeholder="Search Location..."
                    name="search"
                    autoComplete="off"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-bar-submit-btn" type="submit" onClick={onSubmit}> <SearchIcon style={{ fontSize: 50 }} /></button>
            </div>
            <ul className="search-suggestions">
                {searchSuggestions.map((location, i) =>
                    <li
                        ref={el => listItemRefs.current[i] = el}
                        key={`search-suggestion-${i}`}
                        style={activeSuggestion === i ? { backgroundColor: "#ACF0F2" } : {}}
                        onClick={() => handleListItemClick(location)}
                    >
                        {location.name}, {location.country}
                    </li>
                )}
            </ul>

        </div >

    );
}
export default SearchBar;