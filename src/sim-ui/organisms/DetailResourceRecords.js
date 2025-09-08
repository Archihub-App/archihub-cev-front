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
  const { records, recordCode, type } = props;
  const [groupRecords, setGroupRecords] = useState({});
  const [optValue, setOptValue] = React.useState(0);
  const [component, setComponent] = React.useState(<></>);
  const [full, setFull] = React.useState(false);
  const [center, setCenter] = React.useState(false);
  const [gallery, setGallery] = React.useState(false);


  const classes = useStyles();


  useEffect(() => {
    loadInit();
  }, [type, recordCode]);



  useEffect(() => {
    var key = Object.keys(groupRecords)[optValue];
    loadComponent(key, groupRecords[key]);
  }, [optValue, full]);

  const handleClickOptions = (index) => {
    setOptValue(index);
  };

  const loadInit = () => {
    let recordsLocal = records;

    if (type && type != "") {
      recordsLocal = recordsLocal.filter(
        (record) => record.support.toLowerCase() == type.toLowerCase(),
      );
    }

    if (recordCode && recordCode != "") {
      recordsLocal = recordsLocal.filter(
        (record) => record.idmongo == recordCode,
      );
    }

    const groupRecordsReduce = recordsLocal.reduce(function (r, a) {
      r[a.support] = r[a.support] || [];
      r[a.support].push(a);
      return r;
    }, Object.create(null));
    const groupRecordsReduceOrdered = Object.keys(groupRecordsReduce)
      .sort()
      .reduce((obj, key) => {
        obj[key] = groupRecordsReduce[key];
        return obj;
      }, {});

    setGroupRecords(groupRecordsReduceOrdered);
    var key = Object.keys(groupRecordsReduceOrdered)[optValue];
    loadComponent(key, groupRecordsReduceOrdered[key]);
  };

  const getIcon = (topic) => {
    let icon = <DescriptionIcon className={classes.icon} color="white" />;
    switch (topic) {
      case "Documento":
        icon = <DescriptionIcon className={classes.icon} color="white" />;
        break;
      case "Video":
        icon = <MovieCreationIcon className={classes.icon} color="white" />;
        break;
      case "Galería fotográfica":
        icon = <ImageIcon className={classes.icon} color="white" />;
        break;
      case "Audio":
        icon = <AudiotrackIcon className={classes.icon} color="white" />;
        break;
      case "Visualización":
        icon = <DataUsageIcon className={classes.icon} color="white" />;
        break;
    }
    return icon;
  };

  const loadDocument = async (records) => {
    const record = records[0];

    setComponent(
      <div className={classes.document + " classTest"}>
        <ItemDocumento
          modificacionPieza={false}
          lectura={true}
          record={record}
          fullScreen={full}
        />
      </div>,
    );
  };

  const loadMedia = async (type, register, records) => {
    let reproductorAudio = <></>;
    if (records.length > 1) {
      reproductorAudio = (
        <ListadoAudios
          lectura={true}
          audios={records}
          name={register}
          autoPlaying={true}
          place={"explora"}
          fullscreen={full}
        />
      );
    } else {
      const record = records[0];
      if (type.toLowerCase() === "audio") {
        setCenter(true);
        reproductorAudio = (
          <div>
            <ReproductorAudio
              titulo={""}
              record={record}
              lectura={true}
              autoplaying={false}
              fullScreen={full}
            />
          </div>
        );
      } else {
        reproductorAudio = (
          <div>
            <ReproductorAudio
              titulo={""}
              record={record}
              lectura={true}
              autoplaying={false}
              fullScreen={full}
            />
          </div>
        );
      }
    }

    setComponent(reproductorAudio);
  };

  const loadViz = async (records) => {
    const record = records[0];
    if (records.length > 0) {
      let localComponent = (
        <VizViewer record={record} metadata={record.metadata.firstLevel} />
      );
      setComponent(localComponent);
    }
  };

  const loadGallery = async (records) => {
    setGallery(true);
    setComponent(
      <div>
        <GaleriaTarjeta lectura={true} imagenes={records} />
      </div>,
    );
  };

  const loadComponent = (topic, records) => {
    switch (topic) {
      case "Documento":
        loadDocument(records);
        break;
      case "Video":
        loadMedia(topic, topic, records);
        break;
      case "Galería fotográfica":
        loadGallery(records);
        break;
      case "Audio":
        loadMedia(topic, topic, records);
        break;
      case "Visualización":
        loadViz(records);
        break;
    }
  };

  return (
    <div className={classes.root}>
      {recordCode && recordCode != "" ? null : (
        <div className={classes.containerChip}>
          {Object.entries(groupRecords).map(([key, value], i) => {
            if (key !== "undefined") {
              return (
                <Chip
                  icon={getIcon(key)}
                  label={key}
                  onClick={(e) => {
                    handleClickOptions(i);
                  }}
                  className={optValue === i ? classes.chipActive : classes.chip}
                />
              );
            }
          })}
        </div>
      )}

      <div className={classes.container}>
          <div className={gallery?null:classes.screen}>{component}</div>
      </div>
    </div>
  );
};

export default DetailResourceRecords;
