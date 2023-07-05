import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import "../styles/SearchResultPopup.css";

function SearchResultPopup({ results, entity }) {
  const entityName = entity.charAt(0).toUpperCase() + entity.slice(1);

  const nameKey = entity === "films" ? "title" : "name";
  if (!results || results.length === 0) {
    return null;
  }
  return (
    <div>
      <h3 className="search-result-head">{entityName}</h3>
      <List>
        {results.slice(0, 3).map((result, index) => (
          <ListItem key={index}>
            <ListItemText primary={result[nameKey]} />
          </ListItem>
        ))}
      </List>
      <Link to={`/${entity}`}>
        <IconButton className="view-all-button">
          View All <RemoveRedEye className="view-all-icon" />
        </IconButton>
      </Link>
    </div>
  );
}

export default SearchResultPopup;
