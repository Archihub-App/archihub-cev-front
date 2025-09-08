import React from 'react'

import { makeStyles } from "@material-ui/core"
import Box from "@material-ui/core/Box"

import logoCev from '../../assets/logo_comision.svg'
import logoJep from '../../assets/jep.svg'
import logoSip from '../../assets/sistema_integral.png'
import logoUb from '../../assets/ubpd.svg'

const useStyles = makeStyles((theme) => ({
    logos: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    logo: {
        width: '15%',
        maxWidth: 200,
        margin: theme.spacing(1),

        '&:nth-child(2)': {
            width: 120
        }
    },
}))

const Logos = props => {
    const classes = useStyles();
    return (
        <Box className={classes.logos}>
            {/* <img src={logoCev} className={classes.logo} />
            <img src={logoSip} className={classes.logo} />
            <img src={logoJep} className={classes.logo} />
            <img src={logoUb} className={classes.logo} /> */}
        </Box>
    )
}

export default Logos