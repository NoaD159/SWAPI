import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Popover, Box, InputAdornment } from "@mui/material";
import SearchResultPopup from "../components/SearchResultPopup";
import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ entities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
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
          console.log(searchResults);
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
      <h1 className="searchHead">Search the magical world of Star Wars</h1>
      <TextField
        className="searchInput"
        type="text"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={handleInputChange}
        inputRef={searchInputRef}
        inputProps={{
          style: { color: "rgb(182, 177, 177)" },
        }}
      />
      <Popover
        open={showPopup}
        className="searchPopup"
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
        disableAutoFocus
      >
        <div className="resultPopup">
          {entities.map((entity) => (
            <SearchResultPopup
              key={entity}
              entity={entity}
              results={searchResults[entity] || []}
            />
          ))}
        </div>
      </Popover>
      <Box
        className="starsWarsImg"
        component="img"
        alt="star wars poster"
        src="https://assets-prd.ignimgs.com/2022/05/25/starwarssaga-blogroll-1653501853399.jpg"
      />
    </div>
  );
}

export default Search;
