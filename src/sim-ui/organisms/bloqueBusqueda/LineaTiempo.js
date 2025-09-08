import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    slider: {
        '& .MuiSlider-valueLabel': {
            fontSize: 10
        }
    }
}))

const LineaTiempo = props => {
    const classes = useStyles()
    const { temporalRange } = props

    let min = 1944
    let max = 2021

    let start = 1944
    let end = 2021

    if (temporalRange) {
        start = temporalRange.split('-')[0]
        end = temporalRange.split('-')[1]
    }
    // const start = "start" in  tiempo ? new Date(Date.parse(tiempo["start"])).getFullYear():min
    // const end = "end" in  tiempo ? new Date(Date.parse(tiempo["end"])).getFullYear():max

    // const  sendWithTimeout = () => {
    //   setTimeout(() => )
    // }

    const handleChange = (e, v) => {
        props.setTemporalRange(v.join('-'))
    }

    return (
        <>
            <Box mt={6} mb={3}>
                <Slider
                    className={classes.slider}
                    value={[parseInt(start), parseInt(end)]}
                    min={min}
                    color="secondary"
                    marks
                    max={max}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                />
            </Box>
        </>
    )
}

export default LineaTiempo
