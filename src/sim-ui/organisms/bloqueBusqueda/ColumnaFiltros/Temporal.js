import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import LineaTiempo from "../LineaTiempo";
import Subtitle from "../../../atoms/Subtitle";

const Temporal = (props) => {
  const theme = useTheme();

  return (
    <Accordion expanded={true}>
      <AccordionSummary>
        <Subtitle>Filtrar por años</Subtitle>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ minWidth: "100%" }}>
          <FormControl fullWidth sx={{ marginBottom: theme.spacing(0.5) }}>
            <InputLabel id="periodos-select-label">
              Periodos de esclarecimiento
            </InputLabel>
            <Select
              labelId="periodos-select-label"
              id="periodos-select"
              value={props.temporalRange ? props.temporalRange : ""}
              label="Periodos de esclarecimiento"
              onChange={(e, v) => {
                props.setTemporalRange(v.props.value);
              }}
            >
              <MenuItem value={"1944-1958"}>
                1944-1958
              </MenuItem>
              <MenuItem value={"1958-1977"}>
                1958-1977
              </MenuItem>
              <MenuItem value={"1977-1990"}>
                1977-1990
              </MenuItem>
              <MenuItem value={"1991-2002"}>1991-2002</MenuItem>
              <MenuItem value={"2002-2016"}>
                2002-2016
              </MenuItem>
              <MenuItem value={"2016-2020"}>2016-2020</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ margin: "5%" }}>
            <LineaTiempo
              temporalRange={props.temporalRange}
              setTemporalRange={props.setTemporalRange}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Temporal;
