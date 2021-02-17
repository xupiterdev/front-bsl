import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'

let theme = createMuiTheme({
    typography : {
        fontFamily : "'Montserrat', sans-serif",
    },
    overrides : {
        MuiFormControl : {
            root : {
                width : "100%",
                marginBottom : "0.5em"
            }
        },
        MuiFormHelperText : {
            root : {
                fontSize : "1em"
            }
        },
        MuiButton : {
            label : {
                fontSize : "1em"
            }
        },
        MuiTableCell : {
            root : {
                whiteSpace : "nowrap"
            }
        }
    }
})

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