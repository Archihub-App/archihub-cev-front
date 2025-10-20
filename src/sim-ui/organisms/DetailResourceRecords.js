import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Chip, CircularProgress } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import * as ArchihubService from "../../services/ArchihubService";


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
    backgroundColor: "white"
  },
  recordBox: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  recordName: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  recordsContainer: {
    padding: theme.spacing(2),
  },


}));

const DetailResourceRecords = (props) => {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      if (props.records && props.records.length > 0) {
        setLoading(true);
        try {
          const recordPromises = props.records.map(record =>
            ArchihubService.getRecordById(record.id)
          );
          const fetchedRecords = await Promise.all(recordPromises);
          setRecords(fetchedRecords);
        } catch (error) {
          console.error("Error fetching records:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecords();
  }, [props.records]);

  const handleDownload = (recordId) => {
    setDownloading(prev => ({ ...prev, [recordId]: true }));
    ArchihubService.downloadRecord(recordId, (progress) => { })
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className={classes.recordsContainer}>
        <Typography variant="body1" color="textSecondary">
          No hay registros disponibles
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.recordsContainer}>
      {records.map((record) => (
        <Box key={record.id} className={classes.recordBox}>
          <Typography variant="p" className={classes.recordName}>
            {record.name || record.title || `Record ${record.id}`}
          </Typography>
          <Chip
            label={downloading[record.id] ? "Descargando..." : "Descargar"}
            icon={downloading[record.id] ? <CircularProgress size={20} style={{ color: 'white' }} /> : <GetAppIcon style={{ color: 'white' }} />}
            onClick={() => handleDownload(record._id.$oid)}
            className={classes.chipActive}
            disabled={downloading[record.id]}
          />
        </Box>
      ))}
    </div>
  )
};

export default DetailResourceRecords;
