import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import "../styles/SearchResultPopup.css";

function SearchResultPopup({ results, entity }) {
  const nameKey = entity === "films" ? "title" : "name";
  if (!results || results.length === 0) {
    return null;
  }
  return (
    <div style={{ width: "100%" }}>
      <h3 className="searchResultHead">{entity}</h3>
      <List>
        {results.slice(0, 3).map((result, index) => (
          <ListItem key={index}>
            <ListItemText primary={result[nameKey]} />
          </ListItem>
        ))}
      </List>
      <IconButton
        style={{ fontSize: "medium", padding: " 0 1rem", left: "50%" }}
      >
        View All <RemoveRedEye style={{ marginLeft: "1rem" }} />{" "}
      </IconButton>
    </div>
  );
}

export default SearchResultPopup;
