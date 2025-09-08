import React, { useRef, useEffect, useState } from "react";
import * as SearchService from "../../../services/SearchService";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { Controller, Scene } from "react-scrollmagic";

import etnia from "../../assets/etnia_white.png";

import withWidth from "@material-ui/core/withWidth";
import * as Scroll from "react-scroll";

import { Link } from "react-router-dom";
import PreviewCollection from "../PreviewCollection";
import listCollections from "../../assets/home/listCollections";

gsap.registerPlugin(CSSPlugin);

const scroll = Scroll.animateScroll;
const colecciones_aleatorias = Array.from({ length: 30 }, (_, i) => {
  let num_enfoque = Math.floor(Math.random() * 4);
  return {
    title: "Un título para la colección " + i,
    img: etnia,
    enfoque: Array.from({ length: num_enfoque }, (_, i) => "enfoque_" + i),
  };
});

const TarjetaColeccion = (props) => {
  const trigger = useRef();
  const classes = useStyles();
  return (
    <>
      <div
        ref={(element) => {
          trigger.current = element;
        }}
      ></div>
      <Scene
        duration={800}
        classToggle="visible"
        offset={-100}
        triggerElement={trigger.current}
      >
        {/* <Link to={`/${props.slug}`}> */}
        {/* <div className={classes.itemCol}>
            <Box className={classes.itemColTit}>
              <Typography variant="h4">{props.title}</Typography>
            </Box>

            <img src={props.img} />
          </div> */}
        {/* </Link> */}
        <div className={classes.notVisible}>
          <PreviewCollection
            home={true}
            ilustration={props.ilustration}
            title={props.title}
            slug={props.slug}
            especial={props.especial}
          />
        </div>
      </Scene>
    </>
  );
};

const TarjetaSimboloColeccion = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.columna}>
      <Box className={classes.symbolItem}>
        <Box className="inside">{props.icon}</Box>
      </Box>
    </Box>
  );
};

const LineasDecorativas = (props) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  let lineaRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (!loaded) {
      setLoaded(true);
      tl.fromTo(
        lineaRef.current.sort(() => (Math.random() > 0.5 ? 1 : -1)),
        {
          css: {
            height: "0%",
          },
        },
        {
          css: {
            height: "100%",
          },
          duration: 35,
          stagger: 1.5,
        },
      );
    }
  });

  return (
    <>
      {[...Array(5).keys()].map((d, i) => {
        let left_pos = (100 * (i + 1)) / props.numCol - 100 / props.numCol / 2;
        return (
          <>
            <div
              className={`${classes.linea} ${
                props.opacity ? classes.linea_opa : ""
              }`}
              style={{ left: left_pos + "%" }}
              ref={(element) => {
                lineaRef.current[i] = element;
              }}
            ></div>
          </>
        );
      })}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  linea: {
    width: 1,
    background: "white",
    position: "absolute",
    height: "0%",
    top: 0,
  },
  columnas: {
    display: "flex",
    overflow: "hidden",
    alignItems: "flex-start",
  },
  columna: {
    width: "100%",
    position: "relative",
    zIndex: 3,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

    "&:nth-child(even)": {
      paddingTop: theme.spacing(16),
    },
  },
  notVisible: {
    opacity: 0,
    transition: "all 1s ease",
    "&.visible": {
      top: 0,
      opacity: 1,
    },
  },
  itemCol: {
    margin: theme.spacing(6),
    background: theme.palette.primary.dark,
    maxWidth: 300,
    transition: "all 1s ease",
    transform: 'scale(.9)',
    opacity: 0,
    position: "relative",

    '&:hover': {
      transform: 'scale(1)',
    },

    "& img": {
      width: "100%",
      height: "auto",
    },

    "&.visible": {
      top: 0,
      opacity: 1,
    },
  },
  itemColTit: {
    color: "white",
    padding: theme.spacing(1),
    textAlign: "right",
    borderRight: "10px solid white",
  },

  symbolItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),

    "& .inside": {
      width: 100,
      background: "#333",
      color: "white",
      textAlign: "center",
      padding: theme.spacing(2),
    },

    "& svg": {
      width: "100%",
      height: "auto",
    },
  },
}));

function navigateToHash(hash) {
  const cleanhash = hash.replace("#", "");
  const el = document.getElementById(cleanhash);
  el &&
    el.scrollIntoView({
      behavior: "smooth",
    });
}

const GridContent = (props) => {
  const location = useLocation();
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [sizeColumnaItems, setSizeColumnaItems] = useState([]);
  const elementos = useRef([]);

  useEffect(() => {
    // SearchService.serviceCollectionMuseo({}).then(
    //   (d) => {
    //     let resp = d.hits.hits;
    //     resp.sort(() => (Math.random() > 0.5 ? 1 : -1));

    //     let sizeColumnaItems_ = Math.ceil(resp.length / numCol);

    //     setSizeColumnaItems(sizeColumnaItems_);
    //     setData(resp);
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    // );

    const resp = listCollections.map((d) => {
      d["ilustration"] = {
        code: d["Portada"],
      };

      return d;
    });

   

    let sizeColumnaItems_ = Math.ceil(resp.length / numCol) + 1;

    setSizeColumnaItems(sizeColumnaItems_);
    setData(resp)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      location.hash && navigateToHash(location.hash);
    }, 500);
  }, [data, location.hash]);

  let numCol = 1;

  switch (props.width) {
    case "sm":
      numCol = 2;
      break;
    case "md":
      numCol = 3;
      break;
    case "lg":
      numCol = 4;
      break;
    case "xl":
      numCol = 5;
      break;
    default:
      numCol = 1;
  }

  return (
    <>
      {data && sizeColumnaItems && (
        <div id="contenido" name="contenido">
          <LineasDecorativas numCol={numCol} />
          <Controller>
            <Box className={classes.columnas}>
              {[...Array(numCol).keys()].map((d, i) => {
                return (
                  <>
                    <Box className={classes.columna} key={i}>
                      {data
                        .slice(
                          i * (sizeColumnaItems - 1),
                          i * (sizeColumnaItems - 1) + sizeColumnaItems - 1,
                        )
                        .map((t, y) => {
                          return (
                            <>
                              <TarjetaColeccion
                                ilustration={
                                  t["ilustration"] ? t["ilustration"] : false
                                }
                                title={t["title"]}
                                img={t.img}
                                enfoque={t.enfoque}
                                i={i}
                                y={y}
                                slug={t["slug"] ? t["slug"] : false}
                                especial={t.especial}
                              />
                            </>
                          );
                        })}
                    </Box>
                  </>
                );
              })}
            </Box>
          </Controller>
        </div>
      )}
    </>
  );
};

export default withWidth()(GridContent);
