import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Popover,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchResultPopup from "../components/SearchResultPopup";
import "../styles/Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef(null);

  const entities = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        // loop over all entities and send requests to the API
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
    }, 100);

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
        sx={{
          border: "solid 3px rgb(88, 88, 209)",
          borderRadius: "15px",
          width: "45%",
          "&::placeholder": {
            color: "grey",
          },
        }}
        inputProps={{
          style: { color: "rgb(182, 177, 177)" },
        }}
      />
      <Popover
        open={showPopup}
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
        style={{
          maxHeight: "450px",
          marginLeft: "10%",
          marginTop: "1rem",
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
        sx={{
          width: "50%",
          marginLeft: "25%",
          marginTop: "3rem",
          display: "block",
          opacity: "0.5",
        }}
        alt="star wars poster"
        src="https://assets-prd.ignimgs.com/2022/05/25/starwarssaga-blogroll-1653501853399.jpg"
      />
    </div>
  );
}

export default Search;
