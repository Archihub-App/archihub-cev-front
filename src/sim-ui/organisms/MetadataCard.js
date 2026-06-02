import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MapaColombia from "./extraCard/MapaColombia";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
  root: {
    border: "none",
    padding: "5px",
    color: theme.palette.primary.main,
    width: "10%",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({}));

const formatValue = (field) => {
  if (field.type === 'simple-date' && field.value) {
    return new Date(field.value).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return field.value;
};

function MetadataCard(props) {
  const classes = useStyles();
  const [fields, setFields] = React.useState(props.fields || null);
  useEffect(() => {
    setFields(props.fields);
  }, [props.fields]);

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableBody>
          {
            (fields && fields.length) ? (
              <>
                {
                  fields.map((row) => {
                    if (row.description) {
                      let descriptionContent = row.description;

                      if (row.type === 'location' && Array.isArray(row.description)) {
                        let geoData = [];
                        row.description.forEach(loc => {
                          if (loc.level_0) {
                            if (!geoData.find(g => g.code === loc.level_0.ident)) {
                              geoData.push({ code: loc.level_0.ident });
                            }
                          }
                          if (loc.level_1) {
                            const code1 = `${loc.level_0 ? loc.level_0.ident : 'CO'}-${loc.level_1.ident}`;
                            if (!geoData.find(g => g.code === code1)) {
                              geoData.push({ code: code1 });
                            }
                          }
                          if (loc.level_2) {
                            const code2 = `${loc.level_0 ? loc.level_0.ident : 'CO'}-${loc.level_1 ? loc.level_1.ident : '00'}-${loc.level_2.ident}`;
                            if (!geoData.find(g => g.code === code2)) {
                              geoData.push({ code: code2, geoPoint: loc.level_2.geoPoint || loc.geoPoint });
                            }
                          }
                        });

                        descriptionContent = (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div>
                              {row.description.map((loc, idx) => {
                                const parts = [];
                                if (loc.level_0) parts.push(loc.level_0.name);
                                if (loc.level_1) parts.push(loc.level_1.name);
                                if (loc.level_2) parts.push(loc.level_2.name);
                                return <div key={idx}>{parts.join(', ')}</div>;
                              })}
                            </div>
                            {geoData.length > 0 && (
                              <div style={{ width: '100%', maxWidth: '250px', marginTop: '10px' }}>
                                <MapaColombia geo={geoData} />
                              </div>
                            )}
                          </div>
                        );
                      } else if (Array.isArray(row.description)) {
                        // Fallback for other array descriptions to avoid React crashes
                        descriptionContent = JSON.stringify(row.description);
                      }

                      return (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {descriptionContent}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    return null;
                  })}
              </>
            ) : ''
          }
        </TableBody>
      </Table>

    </TableContainer>
  );
}

export default MetadataCard;
