export default (theme) => ({
  root: {
    width: "95%",
    backgroundColor: "#FAFAFA",
    font: "14px normal Arial, Helvetica, sans-serif",
    zIndex: "-4",
  },
  filemanager: {
    width: "100%",
    maxWidth: "1340px",
    position: "relative",
    margin: "80px auto 50px",
    "& $breadcrumbs": {
      color: "#607D8B",
      marginLeft: "20px",
      marginBottom: "15px",
      marginTop: "20px",
      fontSize: "14px",
      lineHeight: "25px",
    },
    "& $buttons": {
      marginRight: "10px",
    },
    "& $appbar": {
      backgroundColor: "#546E7A",
      position: "fixed",
    },
    "& $breadcrumbs a:link, & $breadcrumbs a:visited": {
      color: "#37474F",
      textDecoration: "none",
    },
    "& $breadcrumbs a:hover": {
      textDecoration: "underline",
    },
    "& $breadcrumbs .arrow": {
      color: "#6a6a72",
      marginLeft: "20px",

      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "15px",
    },
    "& $search": {
      position: "absolute",
      paddingRight: "30px",
      cursor: "pointer",
      right: 0,
      fontSize: "17px",
      color: "#37474F",
      display: "block",
      width: "50px",
      height: "50px",
    },
    "& $search:before": {
      content: "''",
      position: "absolute",
      marginTop: "12px",
      width: "15px",
      height: "15px",
      borderRadius: "60%",
      border: "2px solid #01579B",
      right: "8px",
    },
    "& $search:after": {
      content: "''",
      width: "3px",
      height: "10px",
      backgroundColor: "#01579B",
      borderRadius: "3px",
      position: "absolute",
      top: "23px",
      right: "6px",
      "-webkit-transform": "rotate(-45deg)",
      transform: "rotate(-45deg)",
    },
    "& $search input[type=search]": {
      borderRadius: "2px",
      color: "#37474F",
      backgroundColor: "#ECEFF1",
      width: "250px",
      height: "38px",
      marginLeft: "-195px",
      paddingLeft: "20px",
      textDecorationColor: "#4d535e",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "20px",
      display: "inline-block",
      outline: "none",
      border: "none",
      paddingRight: "10px",
      "-webkit-appearance": "none",
    },
    "& $data": {
      marginTop: "60px",
      zIndex: "-3",
    },
    "& $data.animated": {
      "-webkit-animation": "showSlowlyElement 700ms",
      animation: "showSlowlyElement 700ms",
    },
    "& $data li": {
      borderRadius: "3px",
      backgroundColor: "#FAFAFA",
      width: "280px",
      height: "100px",
      listStyleType: "none",
      margin: "10px",
      display: "inline-block",
      position: "relative",
      overflow: "hidden",
      padding: "0.3em",
      zIndex: "1",
      cursor: "pointer",
      boxSizing: "border-box",
      transition: "0.3s background-color",
    },
    "& $data li.files.unselectable": {
      cursor: "not-allowed",
    },
    "& $data li:hover": {
      backgroundColor: "#ECEFF1",
    },
    "& $data li.files.unselectable a": {
      pointerEvents: "none",
    },
    "& $data li a": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
    },
    "& $data li .name": {
      color: "#37474F",
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "20px",
      width: "150px",
      whiteSpace: "nowrap",
      display: "inline-block",
      position: "absolute",
      overflow: "hidden",
      textOverflow: "ellipsis",
      top: "40px",
    },
    "& $data li .details": {
      color: "#607D8B",
      fontSize: "13px",
      fontWeight: 400,
      width: "55px",
      height: "10px",
      top: "64px",
      whiteSpace: "nowrap",
      position: "absolute",
      display: "inline-block",
    },
    "& $nothingfound": {
      backgroundColor: "#CFD8DC",
      width: "23em",
      height: "21em",
      margin: "0 auto",
      display: "block",
      fontFamily: "Arial",
      "-webkit-animation": "showSlowlyElement 700ms",
      animation: "showSlowlyElement 700ms",
    },
    "& $nothingfound .nofiles": {
      margin: "30px auto",
      top: "3em",
      borderRadius: "50%",
      position: "relative",
      backgroundColor: "#d72f6e",
      width: "11em",
      height: "11em",
      lineHeight: "11.4em",
    },
    "& $nothingfound .nofiles:after": {
      content: "'×'",
      position: "absolute",
      color: "#37474F",
      fontSize: "14em",
      marginRight: "0.092em",
      right: 0,
    },
    "& $nothingfound span": {
      margin: "0 auto auto 6.8em",
      color: "#37474F",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "20px",
      height: "13px",
      position: "relative",
      top: "2em",
    },
  },
  container_buttons: {
    textAlign: "flex",
    display: "inline-block",
  },
  button_cell: {
    margin: "1px",
    textAlign: "center",
    display: "inline-block",
  },
  breadcrumbs: {},
  search: {},
  data: {},
  nothingfound: {},
  folderSelected: {},
  "@media all and (max-width: 965px)": {
    filemanager: {
      margin: "30px auto 0",
      padding: "1px",
    },
  },
  "::-webkit-input-placeholder": {
    color: "#4d535e",
  },
  ":-moz-placeholder": {
    color: "#4d535e",
    opacity: 1,
  },
  "::-moz-placeholder": {
    color: "#4d535e",
    opacity: 1,
  },
  ":-ms-input-placeholder": {
    color: "#4d535e",
  },
  "@media all and (max-width:965px)": {
    "$filemanager $data li": {
      width: "100%",
      margin: "5px 0",
    },
  },
  "@keyframes showSlowlyElement": {
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "0%": {
      transform: "scale(1.2)",
      opacity: 0,
    },
  },
  icon: {
    fontSize: "23px",
    "&$selected:after": {
      content: "''",
      display: "block",
      width: "10px",
      height: "18px",
      border: "solid #000",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
    },
    "&$folder:before": {
      content: "''",
      float: "left",
      backgroundColor: "#7ba1ad",
      width: "1.5em",
      height: "0.45em",
      marginLeft: "0.07em",
      marginBottom: "-0.07em",
      borderTopLeftRadius: "0.1em",
      borderTopRightRadius: "0.1em",
      boxShadow: "1.25em 0.25em 0 0em #7ba1ad",
    },
    "&$folder:after": {
      content: "''",
      float: "left",
      clear: "left",
      backgroundColor: "#a0d4e4",
      width: "3em",
      height: "2.25em",
      borderRadius: "0.1em",
    },
    "&$folder.full:before": {
      height: "0.55em",
    },
    "&$folder.full:after": {
      height: "2.15em",
      boxShadow: "0 -0.12em 0 0 #37474F",
    },
    "&$file:first-line": {
      fontSize: "13px",
      fontWeight: 700,
    },
    "&$file:after": {
      content: "''",
      position: "absolute",
      zIndex: -1,
      borderWidth: "0px",
      borderBottom: "2.6em solid #DADDE1",
      borderRight: "2.22em solid rgba(0, 0, 0, 0)",
      top: "-34.5px",
      right: "-4px",
    },

    "&$file": {
      "&.f-avi, &.f-flv, &.f-mkv, &.f-mov, &.f-mpeg, &.f-mpg, &.f-mp4, &.f-m4v, &.f-wmv":
        {
          boxShadow: "1.74em -2.1em 0 0 #7e70ee inset",
        },
      "&.f-avi:after, &.f-flv:after, &.f-mkv:after, &.f-mov:after, &.f-mpeg:after, &.f-mpg:after, &.f-mp4:after, &.f-m4v:after, &.f-wmv:after":
        {
          borderBottomColor: "#5649c1",
        },

      "&.f-mp2, &.f-mp3, &.f-m3u, &.f-wma, &.f-xls, &.f-xlsx": {
        boxShadow: "1.74em -2.1em 0 0 #5bab6e inset",
      },
      "&.f-mp2:after, &.f-mp3:after, &.f-m3u:after, &.f-wma:after, &.f-xls:after, &.f-xlsx:after":
        {
          borderBottomColor: "#448353",
        },

      "&.f-doc, &.f-docx, &.f-psd": {
        boxShadow: "1.74em -2.1em 0 0 #03689b inset",
      },
      "&.f-doc:after, &.f-docx:after, &.f-psd:after": {
        borderBottomColor: "#2980b9",
      },

      "&.f-gif, &.f-jpg, &.f-jpeg, &.f-pdf, &.f-png": {
        boxShadow: "1.74em -2.1em 0 0 #e15955 inset",
      },
      "&.f-gif:after, &.f-jpg:after, &.f-jpeg:after, &.f-pdf:after, &.f-png:after":
        {
          borderBottomColor: "#c6393f",
        },

      "&.f-deb, &.f-dmg, &.f-gz, &.f-rar, &.f-zip, &.f-7z": {
        boxShadow: "1.74em -2.1em 0 0 #867c75 inset",
      },
      "&.f-deb:after, &.f-dmg:after, &.f-gz:after, &.f-rar:after, &.f-zip:after, &.f-7z:after":
        {
          borderBottomColor: "#685f58",
        },

      "&.f-html, &.f-rtf, &.f-xml, &.f-xhtml": {
        boxShadow: "1.74em -2.1em 0 0 #a94bb7 inset",
      },
      "&.f-html:after, &.f-rtf:after, &.f-xml:after, &.f-xhtml:after": {
        borderBottomColor: "#d65de8",
      },

      "&.f-js": {
        boxShadow: "1.74em -2.1em 0 0 #d0c54d inset",
      },
      "&.f-js:after": {
        borderBottomColor: "#a69f4e",
      },

      "&.f-css, &.f-saas, &.f-scss": {
        boxShadow: "1.74em -2.1em 0 0 #44afa6 inset",
      },
      "&.f-css:after, &.f-saas:after, &.f-scss:after": {
        borderBottomColor: "#30837c",
      },
    },
  },
  selected: {
    display: "inline-block",
    position: "absolute",
    left: "50px",
    top: "45px",
  },
  folder: {
    display: "inline-block",
    margin: "1em",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  file: {
    width: "2.5em",
    height: "3em",
    lineHeight: "3em",
    textAlign: "center",
    borderRadius: "0.25em",
    color: "#FFF",
    display: "inline-block",
    margin: "0.9em 1.2em 0.8em 1.3em",
    position: "relative",
    overflow: "hidden",
    boxShadow: "1.74em -2.1em 0 0 #A4A7AC inset",
  },
  "@media (max-width: 1024px)": {
    "#bsaHolder, footer": {
      display: "none",
    },
  },
});
