import React from 'react'

import { makeStyles } from "@material-ui/core"
import Box from "@material-ui/core/Box"

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
        </Box>
    )
}

export default Logos