import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

import Filter from "./Filter";
import styles from "./styles";
import data from "./data.json";

import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class FolderChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderOnly: false,
      isSearch: false,
      isSearching: false,
      searchVal: "",
      currentPath: data.path,
      breadcrumbsUrls: this.generateBreadcrumbs(data.path),
      folders: [],
      files: [],
      messageIdtt: "ddddddd",
    };

    this.data = data;
  }

  componentDidMount() {}
  componentWillUnmount() {}

  toggleSearch = (toggle) => {
    // search.find("span").hide();
    this.setState({ isSearching: toggle });
  };
  handleSearch = (event, value) => {
    value = value.trim();
    this.setState({ searchVal: value });
    if (value.length === 0) this.toggleSearch(false);
  };
  handleKeyUp = (event) => {
    console.log("keyup....");
    if (event.keyCode === 27) {
      this.handleFocusOut();
    }
  };
  handleFocusOut = (event) => {
    if (!this.state.searchVal.length) this.setState({ isSearching: false });
  };
  handleClickFolders = (nextDir) => (event) => {
    event.preventDefault();
    console.log("handleClickFolders =", nextDir);

    var breadcrumbsUrls = this.state.breadcrumbsUrls;

    if (this.state.isSearching) {
      // Building the breadcrumbs
      breadcrumbsUrls = this.generateBreadcrumbs(nextDir);
      this.toggleSearch(false);
    } else {
      breadcrumbsUrls.push(nextDir);
    }
    console.log("update breadcrumbsUrls =", breadcrumbsUrls);
    this.setState({ currentPath: nextDir, breadcrumbsUrls: breadcrumbsUrls });
  };

  handleSelectFolders = (nextDir) => (event) => {
    event.preventDefault();
    this.setState({ selected: nextDir });
  };
  handleBreadcrumbsClick = (index) => (event) => {
    var breadcrumbsUrls = this.state.breadcrumbsUrls;
    var url = breadcrumbsUrls[index];

    breadcrumbsUrls = this.generateBreadcrumbs(url);
    this.setState({ breadcrumbsUrls: breadcrumbsUrls, currentPath: url });
  };

  // Splits a file path and turns it into clickable breadcrumbs
  generateBreadcrumbs = (nextDir) => {
    var path = nextDir.split("/").slice(0);
    for (var i = 1; i < path.length; i++) {
      path[i] = path[i - 1] + "/" + path[i];
    }
    return path;
  };

  // Locates a file by path
  searchByPath = (dir) => {
    var path = dir.split("/"),
      demo = [this.data],
      flag = 0;

    for (var i = 0; i < path.length; i++) {
      for (var j = 0; j < demo.length; j++) {
        if (demo[j].name === path[i]) {
          flag = 1;
          demo = demo[j].items;
          break;
        }
      }
    }

    demo = flag ? demo : [];
    return demo;
  };

  // Recursively search through the file tree
  rSearchData = (data, searchTerms) => {
    var matched = [];
    var self = this;
    data.forEach(function (d) {
      if (d.type === "folder") {
        if ("items" in d) {
          matched = matched.concat(self.rSearchData(d.items, searchTerms));
        }

        if (d.name.toLowerCase().match(searchTerms)) {
          matched.push({ type: "folder", item: d });
        }
      } else if (d.type === "file") {
        if (d.name.toLowerCase().match(searchTerms)) {
          matched.push({ type: "file", item: d });
        }
      }
    });

    console.log("LALALS MATCHED", matched, data);

    return matched;
  };

  searchData = (data, searchTerms) => {
    var self = this;
    var matched =
      !searchTerms || searchTerms.length == 0
        ? []
        : self.rSearchData(data, searchTerms);

    console.log("LALALLASD", matched);

    var folders = matched.filter((item) => item.type === "folder");
    var files = matched.filter((item) => item.type === "file");

    return {
      folders: folders.map((x) => x.item),
      files: files.map((x) => x.item),
    };
  };

  // This function escapes special html characters in names
  escapeHTML = (text) => {
    return text
      .replace(/\&/g, "&amp;")
      .replace(/\</g, "&lt;")
      .replace(/\>/g, "&gt;");
  };

  // Convert file sizes from bytes to human readable units
  bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Bytes";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  getFilteredData = () => {
    if (this.state.isSearching) {
      console.log("Search Data ");
      return this.searchData([data], this.state.searchVal);
    } else {
      return this.searchByPath(this.state.currentPath);
    }
  };

  render() {
    const { classes } = this.props;

    var filteredData = this.getFilteredData();
    var scannedFolders = [];
    var scannedFiles = [];
    const test = 1000;

    if (Array.isArray(filteredData)) {
      filteredData.forEach(function (d) {
        if (d.type === "folder") {
          scannedFolders.push(d);
        } else if (d.type === "file") {
          scannedFiles.push(d);
        }
      });
    } else if (typeof filteredData === "object") {
      scannedFolders = filteredData.folders;
      scannedFiles = filteredData.files;
    }

    return (
      <div className={classes.root}>
        <div
          className={clsx(
            classes.filemanager,
            this.state.isSearching && "searching"
          )}
        >
          <div className={classes.appbar}>
            <div
              className={classes.search}
              onClick={() => {
                this.toggleSearch(true);
              }}
            >
              {this.state.isSearching && (
                <Filter
                  updateFilter={this.handleSearch}
                  onKeyUp={this.handleKeyUp}
                  onFocusOut={this.handleFocusOut}
                  value={this.state.searchVal}
                  placeholder={"Search"}
                  ref={(input) => {
                    this.Filter = input;
                  }}
                />
              )}
            </div>
            <div className={classes.breadcrumbs}>
              {this.state.isSearching ? (
                <span>Search results: </span>
              ) : (
                this.state.breadcrumbsUrls.map((u, idx) => {
                  var name = u.split("/");
                  return (
                    <div style={{ display: "inline-block" }}>
                      {idx !== this.state.breadcrumbsUrls.length - 1 && (
                        <a onClick={this.handleBreadcrumbsClick(idx)}>
                          <span className="folderName">
                            {name[name.length - 1]}
                          </span>
                        </a>
                      )}
                      {idx !== this.state.breadcrumbsUrls.length - 1 && (
                        <span
                          className="arrow"
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                        >
                          {"▸"}
                        </span>
                      )}
                      {idx === this.state.breadcrumbsUrls.length - 1 && (
                        <span className="folderName">
                          {name[name.length - 1]}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <Divider variant="middle" />
          <div style={{ marginLeft: "15px", marginTop: "15px" }}>
            <Link
              component="button"
              variant="body2"
              style={{ marginRight: "15px", color: "#1565C0" }}
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Upload
              <input type="file" label={"fds"} hidden />
            </Link>

            <Button variant="contained" component="label">
              Upload File
              <input type="file" label={"fds"} hidden />
            </Button>
            <Link
              component="button"
              variant="body2"
              style={{ marginRight: "15px", color: "#1565C0" }}
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              New Folder
            </Link>
          </div>

          <ul
            className={clsx(
              classes.data,
              !this.state.isSearching && "animated"
            )}
          >
            {scannedFolders.map((f, idx) => {
              var itemsLength = f.items.length,
                name = this.escapeHTML(f.name);

              return (
                <li
                  className="folders"
                  onClick={this.handleSelectFolders(f.path)}
                  onDoubleClick={this.handleClickFolders(f.path)}
                >
                  <a title={f.path} className="folders">
                    <span
                      className={clsx(
                        classes.icon,
                        classes.folder,
                        itemsLength && "full"
                      )}
                    />
                    {f.path === this.state.selected && (
                      <span className={clsx(classes.icon, classes.selected)} />
                    )}
                    <span className="name">{name}</span>
                    <span className="details">
                      {itemsLength +
                        (itemsLength === 1
                          ? " item"
                          : itemsLength > 1
                          ? " items"
                          : " Empty")}
                    </span>
                  </a>
                </li>
              );
            })}
            {scannedFiles.map((f) => {
              var fileSize = this.bytesToSize(f.size);
              var name = this.escapeHTML(f.name);
              var fileType = name.split(".");
              fileType = fileType[fileType.length - 1];

              return (
                <li
                  className={clsx(
                    "files",
                    this.state.folderOnly && "unselectable"
                  )}
                >
                  <a title={f.path} className="files">
                    <span
                      className={clsx(
                        classes.icon,
                        classes.file,
                        "f-" + fileType
                      )}
                    >
                      {fileType}
                    </span>
                    <span className="name">{name}</span>
                    <span className="details">{fileSize}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {!scannedFolders.length && !scannedFiles.length && (
            <div className={classes.nothingfound}>
              <div className="nofiles" />
              <span>No files here.</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

FolderChooser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderChooser);
