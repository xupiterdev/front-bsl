import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'

let theme = createMuiTheme({
    typography : {
        fontFamily : "'Saira Condensed', sans-serif",
    }
})

// theme.overrides.MuiButton = {
//     root : {
//         letterSpacing : "2px",
//         fontFamily : "'Saira Condensed', sans-serif",
//         fontWeight : "bold",
//         fontSize : "1em"
//     }
// }

// theme.palette.primary = {
//     light: '#2d3959',
//     main: '#162447',
//     dark: '#13203f',
//     contrastText: '#e6e6e6'
// }
// theme.palette.secondary = {
//     light: '#a33144',
//     main: '#991B30',
//     dark: '#89182b',
//     contrastText: '#e6e6e6'
// }

theme = responsiveFontSizes(theme)


export default theme;