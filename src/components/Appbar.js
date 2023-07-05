// import React from "react";
// import {
//   AppBar,
//   CssBaseline,
//   Drawer,
//   Hidden,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from "@mui/material";

// import { Menu, Close } from "@mui/icons-material";

// import PropTypes from "prop-types";

// import { useTheme } from "@emotion/react";

// import {  makeStyles } from "@mui/styles";

// const drawerWidth = 240;
// const Styles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   drawer: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   closeMenuButton: {
//     marginRight: "auto",
//     marginLeft: 0,
//   },
// }));
// function ResponsiveDrawer() {
//   const dummyCategories = [
//     "Hokusai",
//     "Hiroshige",
//     "Utamaro",
//     "Kuniyoshi",
//     "Yoshitoshi",
//   ];
//   const classes = Styles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   function handleDrawerToggle() {
//     setMobileOpen(!mobileOpen);
//   }
//   const drawer = (
//     <div>
//       <List>
//         {dummyCategories.map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="Open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className={classes.menuButton}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Responsive drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <nav className={classes.drawer}>
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden smUp implementation="css">
//           <Drawer
//             variant="temporary"
//             anchor={theme.direction === "rtl" ? "right" : "left"}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             <IconButton
//               onClick={handleDrawerToggle}
//               className={classes.closeMenuButton}
//             >
//               <Close />
//             </IconButton>
//             {drawer}
//           </Drawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <Drawer
//             className={classes.drawer}
//             variant="permanent"
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//           >
//             <div className={classes.toolbar} />
//             {drawer}
//           </Drawer>
//         </Hidden>
//       </nav>
//       <div className={classes.content}>
//         <div className={classes.toolbar} />
//         <div>???</div>
//       </div>
//     </div>
//   );
// }
// ResponsiveDrawer.propTypes = {
//   // Injected by the documentation to work in an iframe.
//   // You won't need it on your project.
//   container: PropTypes.object,
// };
// export default ResponsiveDrawer;
