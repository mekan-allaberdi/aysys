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
import NewFolderComponent from "./new_folder.component";
import LinearProgress from "@material-ui/core/LinearProgress";

import { get_folder_or_files } from "../../api/document_manager";
import api from "../../api/api";

class FolderChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      folderOnly: false,
      isSearch: false,
      isSearching: false,
      searchVal: "",
      currentPathID: "4",
      breadcrumbsUrls: [{ id: 4, name: "root" }],
      filteredData: [],
      folders: [],
      documents: [],
    };
  }

  componentDidMount() {
    console.debug("After mount! Let's load data from API...");

    const { breadcrumbsUrls } = this.state;
    this.goToDir(breadcrumbsUrls[breadcrumbsUrls.length - 1].id);
  }

  goToDir = (directory_id) => {
    this.setState({ isLoading: true });
    get_folder_or_files({ parent_folder: directory_id }, "folder").then(
      (folders) => {
        this.setState({ folders: folders });
        this.setState({ isLoading: false });
      }
    );

    get_folder_or_files({ folder: directory_id }, "document").then(
      (documents) => {
        this.setState({ documents: documents });
        this.setState({ isLoading: false });
      }
    );
  };

  refresh_dir = () => {
    console.log("REFRESHED");
    this.goToDir(this.state.currentPathID);
  };

  componentWillUnmount() {}

  toggleSearch = (toggle) => {
    // search.find("span").hide();
    this.setState({ isSearching: toggle });
  };
  handleSearch = (event, value) => {
    value = value.trim();
    this.setState({ searchVal: value });
    if (value.length === 0) this.toggleSearch(false);

    if (this.toggleSearch) {
      this.searchData(value);
    }
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

    let breadcrumbsUrls = this.state.breadcrumbsUrls;

    this.goToDir(nextDir.id);

    // if (this.state.isSearching) {
    //   // Building the breadcrumbs
    //   breadcrumbsUrls = this.generateBreadcrumbs(nextDir);
    //   this.toggleSearch(false);
    // } else {
    //   breadcrumbsUrls.push({ id: nextDir.id, name: nextDir.name });
    // }
    breadcrumbsUrls.push({ id: nextDir.id, name: nextDir.name });

    console.log("update breadcrumbsUrls =", breadcrumbsUrls);
    this.setState({
      currentPathID: nextDir.id,
      breadcrumbsUrls: breadcrumbsUrls,
    });
  };

  handleSelectFolders = (item_id) => (event) => {
    event.preventDefault();
    this.setState({ selected: item_id });
  };

  get_current_path = () => {
    return this.state.breadcrumbsUrls.map((item) => item.name).join("/");
  };

  get_current_folder_names = () => {
    return this.state.folders.map((item) => item.name);
  };

  handleBreadcrumbsClick = (nextDir, idx) => (event) => {
    let { breadcrumbsUrls } = this.state;
    this.setState({
      breadcrumbsUrls: breadcrumbsUrls.slice(0, idx + 1),
    });

    this.goToDir(nextDir.id);
  };

  // Splits a file path and turns it into clickable breadcrumbs
  generateBreadcrumbs = (nextDir) => {
    const { breadcrumbsUrls } = this.state;
    let new_breadcrumbsUrls = breadcrumbsUrls.concat([
      { dir: nextDir.name, id: nextDir.id },
    ]);

    this.setState({ breadcrumbsUrls: new_breadcrumbsUrls });
  };

  // Locates a file by path
  searchByPath = (id) => {
    get_folder_or_files(id).then((res) => {
      return res;
    });
  };

//   // Recursively search through the file tree
//   rSearchData = (data, searchTerms) => {
//     var matched = [];
//     var self = this;
//     data.forEach(function (d) {
//       if (d.type === "folder") {
//         if ("items" in d) {
//           matched = matched.concat(self.rSearchData(d.items, searchTerms));
//         }

//         if (d.name.toLowerCase().match(searchTerms)) {
//           matched.push({ type: "folder", item: d });
//         }
//       } else if (d.type === "file") {
//         if (d.name.toLowerCase().match(searchTerms)) {
//           matched.push({ type: "file", item: d });
//         }
//       }
//     });

//     console.log("LALALS MATCHED", matched, data);

//     return matched;
//   };

  searchData = (searchTerms) => {
    this.setState({ documents: [], folders: [], isLoading: true });

    if (searchTerms || searchTerms.length > 0) {
      get_folder_or_files({ search: searchTerms }, "document").then(
        (documents) => {
          this.setState({ documents: documents });
          this.setState({ isLoading: false });
        }
      );
    }

    // console.log("LALALLASD", matched);

    // var folders = matched.filter((item) => item.type === "folder");
    // var files = matched.filter((item) => item.type === "file");

    // return {
    //   folders: folders.map((x) => x.item),
    //   files: files.map((x) => x.item),
    // };
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
      return this.searchData(this.state.searchVal);
    } else {
      return this.searchByPath(this.state.currentPathID);
    }
  };

  render() {
    const { classes } = this.props;

    const { isSearching, isLoading, folders, documents, currentPathID } =
      this.state;

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
                  return (
                    <div style={{ display: "inline-block" }}>
                      <a onClick={this.handleBreadcrumbsClick(u, idx)}>
                        <span className="folderName">{u.name}</span>
                      </a>
                      {idx !== this.state.breadcrumbsUrls.length - 1 && (
                        <span
                          className="arrow"
                          style={{ marginLeft: "10px", marginRight: "10px" }}
                        >
                          {"▸"}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <Divider variant="middle" />
          <div
            className={classes.container_buttons}
            style={{ marginLeft: "15px" }}
          >
            <div className={classes.button_cell}>
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
            </div>
            <div className={classes.button_cell}>
              <NewFolderComponent
                refresh_dir={this.refresh_dir.bind(this)}
                current_path={this.get_current_path()}
                current_path_id={currentPathID}
                folder_names={this.get_current_folder_names()}
              />
            </div>
          </div>

          <ul
            className={clsx(
              classes.data,
              !this.state.isSearching && "animated"
            )}
          >
            {folders.map((f, idx) => {
              var itemsLength =
                  f.child_folders.length + f.child_documents.length,
                name = this.escapeHTML(f.name);

              return (
                <li
                  className="folders"
                  onClick={this.handleSelectFolders(f.id)}
                  onDoubleClick={this.handleClickFolders(f)}
                  id={idx}
                >
                  <a title={f.path} className="folders">
                    <span
                      className={clsx(
                        classes.icon,
                        classes.folder,
                        itemsLength && "full"
                      )}
                    />
                    {f.id === this.state.selected && (
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
            {documents.map((f) => {
              console.log("WTTTF", f.file);
              var fileSize = this.bytesToSize(f.file.size);
              var name = this.escapeHTML(f.name);
              var fileType = f.file.name.split(".");
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

          {!folders.length && !documents.length && !isSearching && !isLoading && (
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
