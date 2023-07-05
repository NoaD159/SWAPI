import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Search, Menu } from "@mui/icons-material";
import "../styles/Navbar.css";

function Navbar({ entities }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar
        style={{
          backgroundColor: "#2E3B55",
          width: "100%",
        }}
        position="static"
      >
        <CssBaseline />
        <Toolbar>
          <Box className="navbar-container">
            <Typography
              style={{ fontWeight: "800" }}
              variant="h4"
              className="logo"
            >
              SWAPI
            </Typography>{" "}
            <Box
              className="navlinks"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <NavLink to="/" className="link">
                <Search className="search-icon" /> Search
              </NavLink>
              {entities.map((entity) => {
                const capitalizedTitle =
                  entity.title.charAt(0).toUpperCase() + entity.title.slice(1);
                return (
                  <NavLink
                    key={entity.title}
                    to={`/${entity.entityName}`}
                    className="link"
                  >
                    {capitalizedTitle}
                  </NavLink>
                );
              })}
            </Box>
            <IconButton
              edge="end"
              onClick={toggleDrawer}
              className="menu-button"
              sx={{
                display: { md: "none" },
                color: "yellow",
                marginLeft: "2rem",
              }}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor="left"
        PaperProps={{
          sx: { width: 200, backgroundColor: "rgba(230, 230, 255,0.8)" },
        }}
        sx={{ display: { md: "none" } }}
      >
        <List>
          <ListItem component={NavLink} className="drawer-link" to="/">
            <ListItemText primary="Search" />
          </ListItem>
          {entities.map((entity) => {
            const capitalizedTitle =
              entity.title.charAt(0).toUpperCase() + entity.title.slice(1);
            return (
              <ListItem
                key={entity.title}
                className="drawer-link"
                component={NavLink}
                to={`/${entity.entityName}`}
                onClick={toggleDrawer}
              >
                <ListItemText primary={capitalizedTitle} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
export default Navbar;
