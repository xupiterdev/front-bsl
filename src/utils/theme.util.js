import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'

let theme = createMuiTheme({
    typography : {
        fontFamily : "'Montserrat', sans-serif",
    },
    overrides : {
        MuiFormHelperText : {
            root : {
                fontSize : "1em"
            }
        }
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

theme.palette.primary = {
    light: '#3f6bab',
    main: '#0f4796',
    dark: '#0a3169',
    contrastText: '#e6e6e6'
}
theme.palette.secondary = {
    light: '#bf4746',
    main: '#af1918',
    dark: '#7a1110',
    contrastText: '#e6e6e6'
}

theme = responsiveFontSizes(theme)


export default theme;