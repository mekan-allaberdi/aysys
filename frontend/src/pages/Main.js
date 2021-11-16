import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxTwoTonIcon from "@material-ui/icons/MoveToInbox";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ListSubheader from "@material-ui/core/ListSubheader";

import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import WorkTwoToneIcon from "@material-ui/icons/WorkTwoTone";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import StarTwoToneIcon from "@material-ui/icons/StarTwoTone";

import { makeStyles } from "@material-ui/core/styles";

import { StylesProvider } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { Route, Switch, NavLink as Link } from "react-router-dom";

import { Avatar } from "@material-ui/core";
import FolderChooser from "../components/document_manager/DocMain";
import UserList from "../components/account/UserList";
import { red } from "@material-ui/core/colors";

const drawerWidth = 220;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(90deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 8 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  grow: {
    flexGrow: 1,
  },
  avataritem: {
    width: "100%",
    maxWidth: "30ch",
    backgroundColor: theme.palette.background.paper,
  },
  avatar_photo_on_close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  avatar_photo_on_open: {
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
  },
  avatar_photo_top_left: {
    width: theme.spacing.unit * 2.8,
    height: theme.spacing.unit * 2.8,
  },
  header_on_open: {
    fontSize: "0.9em",
    display: "flex",
  },
  header_on_close: {
    fontSize: "0.4em",
    display: "none",
  },
  label_color: red,
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed,
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              style={{ color: "#ECEFF1" }}
              className={classes.grow}
              noWrap
            >
              AySys
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/kso.png"
                  className={classes.avatar_photo_top_left}
                />
              </IconButton>

              <Menu
                id="menu-appbar"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Account</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Setttings</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <Typography variant="inherit">Sign out</Typography>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />

          <List>
            <ListItem className={classes.avataritem} alignItems="flex-start">
              <ListItemAvatar
                className={
                  this.state.open
                    ? classes.avatar_photo_on_open
                    : classes.avatar_photo_on_close
                }
              >
                <Avatar alt="Remy Sharp" src="/static/images/kso.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Kakamyrat S."
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body3"
                      style={{ color: "#546E7A" }}
                    >
                      @manager
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="1">
              <ListItemIcon>
                <LibraryBooksTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="3">
              <ListItemIcon>
                <WorkTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem button key="3">
              <ListItemIcon>
                <GroupTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button key="2">
              <ListItemIcon>
                <FormatListBulletedTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader
                classes={{
                  root: this.state.open
                    ? classes.header_on_open
                    : classes.header_on_close,
                }}
                id="mail-list-subheader"
              >
                Mailbox
              </ListSubheader>
            }
          >
            <ListItem button component={Link} to="/" key="3">
              <ListItemIcon>
                <InboxTwoTonIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button component={Link} to="/users" key="3">
              <ListItemIcon>
                <SendTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Outbox" />
            </ListItem>
            <ListItem button key="2">
              <ListItemIcon>
                <StarTwoToneIcon style={{ color: "#37474F" }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <StylesProvider injectFirst>
              <Route path="/" exact component={FolderChooser} />
            </StylesProvider>
            <Route path="/users" component={UserList} />
          </Switch>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniDrawer);
