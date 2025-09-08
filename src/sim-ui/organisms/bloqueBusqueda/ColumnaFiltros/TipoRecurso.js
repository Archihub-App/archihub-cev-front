import { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";

import Subtitle from "../../../atoms/Subtitle";

import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';
import CollectionsTwoToneIcon from '@mui/icons-material/CollectionsTwoTone';
import AudiotrackTwoToneIcon from '@mui/icons-material/AudiotrackTwoTone';

const useStyles = makeStyles((theme) => ({
  btnFiltrosSel: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: "white !important",
    '& .num': {
      color: '#fff !important',
    },
  },
  btnFiltros: {
    margin: 2,
    '& .num': {
      marginLeft: 5,
      fontSize: 11,
      backgroundColor: 'rgba(255,255,255,.9)',
      color: '#6883a5',
      padding: '1px 10px',
      borderRadius: '4px',
      position: 'relative',
      top: -2,
      borderBottom: '1px dashed #6883a5',
      fontWeight: 600,
    },
    '& svg': {
      width: 20
    }
  },
}));

const TipoRecurso = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  
  // function to add commas to numbers
  const numberWithCommas = (x) => {
    if (!x) return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Accordion expanded={true}>
      <AccordionSummary>
        <Subtitle>Filtrar por tipo de archivo</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {[
            { name: "Documento", icon: <ArticleTwoToneIcon /> },
						{ name: "Video", icon: <MovieCreationTwoToneIcon /> },
						// { name: "Visualización", icon: <DataUsageIcon /> },
						{ name: "Galería fotográfica", icon: <CollectionsTwoToneIcon /> },
						{ name: "Audio", icon: <AudiotrackTwoToneIcon /> }
          ].map((i, index) => (
            // <Tab
            //     key={i.name + index}
            //     className={props.tipo === i.name ? classes.btnFiltrosSel : classes.btnFiltros}
            //     icon={i.icon}
            //     label={i.name}
            //     onClick={() => {
            //         props.tipo === i.name
            //             ? props.setTipo(null)
            //             : props.setTipo(i.name)
            //     }}
            // />
            <>
              <Chip
                size="medium"
                onClick={() => {
                  props.tipo === i.name
                    ? props.setTipo(null)
                    : props.setTipo(i.name);
                }}
                className={classes.btnFiltros}
                color={props.tipo === i.name ? 'primary' : ''}
                variant={props.tipo === i.name ? 'default' : 'outlined'}
                key={i.name + index}
                label={<>
                  {i.name} <span className="num">{numberWithCommas(props.valores?.find(d => d.key === i.name)?.doc_count)}</span>
                </>}
                icon={i.icon}
              />
            </>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TipoRecurso;
