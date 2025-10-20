import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DescriptionIcon from "@material-ui/icons/Description";
import MovieCreationIcon from "@material-ui/icons/MovieCreation";
import ImageIcon from "@material-ui/icons/Image";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import GaleriaTarjeta from "./extraCard/GaleriaTarjeta";
import ItemDocumento from "./extraCard/ItemDocumento";
import ReproductorAudio from "./extraCard/ReproductorAudio";
import ListadoAudios from "./extraCard/ListadoAudios";
import VizViewer from "../molecules/VizViewer";


const useStyles = makeStyles((theme) => ({
  tabs: {
    color: theme.palette.primary.main,
    height: "0px",
  },
  iconLabelWrapper: {
    flexDirection: "row",
    justifyContent: "left",
    marginBottom: "0px",
    textTransform: "capitalize",
  },
  icon: {
    color: "white",
  },
  labelIcon: {
    width: "auto",
    padding: 0,
  },
  root: {
    marginLeft: "20px",
    marginRight: "20px",
    height: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    marginTop: "5px",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  document: {},
 
  containerChip: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      filter: "alpha(opacity=50)",
      opacity: 0.5,
      cursor: "pointer",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      filter: "alpha(opacity=70)",
      opacity: 0.7,
    },
    filter: "alpha(opacity=70)",
    opacity: 0.7,
    margin: theme.spacing(1),
  },
  chipActive: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      filter: "brightness(120%)",
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    margin: theme.spacing(1),
  },
  screen: {
   // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white"
  },

 
}));

const DetailResourceRecords = (props) => {

  

  return (
    <></>
  )
};

export default DetailResourceRecords;
