import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Popover, Box, InputAdornment } from "@mui/material";
import SearchResultPopup from "../components/SearchResultPopup";
import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ entities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showPopup, setShowPopup] = useState(searchTerm.length > 1);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm && searchTerm.length > 1) {
        Promise.all(
          entities.map((entity) =>
            axios.get(
              `https://swapi.dev/api/${entity.entityName}/?search=${searchTerm}`
            )
          )
        ).then((results) => {
          const filteredResults = {};

          results.forEach((result, index) => {
            const entityName = entities[index].entityName;
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
  }, [searchTerm, entities]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setAnchorEl(event.currentTarget);
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
        inputProps={{
          style: { color: " rgba(234, 234, 19,0.8)" },
        }}
      />
      <Popover
        open={showPopup}
        className="search-popup"
        onClose={() => setShowPopup(false)}
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          className: "popover-paper",
        }}
        disableAutoFocus
      >
        <div className="result-popup">
          {entities.map((entity) => (
            <SearchResultPopup
              key={entity.entityName}
              entity={entity.title}
              results={searchResults[entity.entityName] || []}
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
