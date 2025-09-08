import React, { useRef, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import * as SearchService from "../../services/SearchService";
import Typography from "@material-ui/core/Typography";
import { Controller, Scene } from "react-scrollmagic";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import * as RecordsService from "../../services/RecordsService";

const useStyles = makeStyles((theme) => ({
  itemCol: {
    minWidth: "200px",
    width: "20%",
    background: "#19447c",
    transition: "all 1s ease",

    "& img": {
      width: "100%",
      height: "auto",
    },

    "&.visible": {
      top: 0,
      opacity: 1,
    },
  },
  itemColHome: {
    margin: theme.spacing(6),
    background: theme.palette.primary.dark,
    maxWidth: 300,
    transition: "all 1s ease",
    opacity: 1,
    position: "relative",

    "& img": {
      width: "100%",
      height: "auto",
    },

    "&.visible": {
      top: 0,
      opacity: 1,
    },

    "&.especial": {
      // background: '#2961a7'
    }
  },
  itemColTit: {
    gap: 20,
    color: "white",
    display: "flex",
    padding: "8px",
    textAlign: "right",
    justifyContent: "right",
  },
  type: {
    width: "10px",
    minWidth: "10px",
    maxWidth: "10px",
    height: "5vh",
    backgroundColor: "#1fc0c8",
    margin: "-8px",
    padding: "0px",

    ".especial &": {
      backgroundColor: '#d7dd7e'
    }
  },
  link: {
    textDecoration: "unset",
    display: 'block'
  },
}));

const PreviewCollection = (props) => {
  const classes = useStyles();
  const [imagen, setImagen] = React.useState(false);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    if (props.ilustration) {
      if (props.ilustration.ilustrationPathSaved) {
        let images = props.ilustration.ilustrationPathSaved.split("/");
        if (images.length) {
          let code = images[images.length - 1].split(".");
          code = code[0];
          const resp = await RecordsService.serviceImageResize(code, "small");
          if (resp) {
            setImagen(URL.createObjectURL(resp));
          }
        }
      } else if (props.ilustration.code) {
        // const resp = await RecordsService.serviceImageResize(
        //   props.ilustration.code,
        //   "small",
        // );
        const resp = await import("../assets/home_temp/" + props.ilustration.code + "-min.png")
        if (resp) {
          // setImagen(URL.createObjectURL(resp));
          setImagen(resp.default);
        }
      }
    }
  };

  return (
    <>
      <div className={`${props.home ? classes.itemColHome : classes.itemCol} ${props.especial ? 'especial' : ''}`}>
        {props.slug ? (
          <a className={`${classes.link}`} href={props.especial ? `${props.slug}` : `${props.slug}`}>
            <Box className={classes.itemColTit}>
              <Typography variant="h6">{props.title}</Typography>
              <div className={classes.type}></div>
            </Box>
            <img src={imagen} />
          </a>
        ) : (
          <>
            <Box className={classes.itemColTit}>
              <Typography variant="h6">{props.title}</Typography>
              <div className={classes.type}></div>
            </Box>
            <img src={imagen} />
          </>
        )}

      </div>
    </>
  );
};

export default PreviewCollection;
