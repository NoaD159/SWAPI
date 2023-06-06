import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Popover, Box, InputAdornment } from "@mui/material";
import SearchResultPopup from "../components/SearchResultPopup";
import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ entities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showPopup, setShowPopup] = useState(searchTerm.length > 1);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm && searchTerm.length > 1) {
        Promise.all(
          entities.map((entity) =>
            axios.get(`https://swapi.dev/api/${entity}/?search=${searchTerm}`)
          )
        ).then((results) => {
          const filteredResults = {};

          results.forEach((result, index) => {
            const entityName = entities[index];
            filteredResults[entityName] = result.data.results;
          });
          setSearchResults(filteredResults);
          setShowPopup(true);
        });
      } else {
        setSearchResults([]);
        setShowPopup(false);
      }
    }, 200);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="Search">
      <h1 className="search-head">Search the magical world of Star Wars</h1>
      <TextField
        className="search-input"
        type="text"
        placeholder="Search"
        InputProps={{
          maxLength: 20,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="search-icon" />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={handleInputChange}
        inputRef={searchInputRef}
        inputProps={{
          style: { color: " rgba(234, 234, 19,0.8)" },
        }}
      />
      <Popover
        open={showPopup}
        className="search-popup"
        anchorEl={searchInputRef.current}
        anchorReference="anchorEl"
        onClose={() => setShowPopup(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: searchInputRef.current?.clientWidth || "auto",
            minWidth: "unset",
            maxWidth: "unset",
            whiteSpace: "nowrap",
          },
        }}
        disableAutoFocus
      >
        <div className="result-popup">
          {entities.map((entity) => (
            <SearchResultPopup
              key={entity}
              entity={entity}
              results={searchResults[entity] || []}
            />
          ))}
          {searchTerm &&
            Object.values(searchResults).every(
              (results) => results.length === 0
            ) && (
              <div>
                <p className="no-result-popup">- No Matching Results -</p>
              </div>
            )}
        </div>
      </Popover>
      <Box
        className="starsWars-img"
        component="img"
        alt="star wars poster"
        src="https://assets-prd.ignimgs.com/2022/05/25/starwarssaga-blogroll-1653501853399.jpg"
      />
    </div>
  );
}

export default Search;
