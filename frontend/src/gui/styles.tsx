import checkboxClasses from "@mui/material/Checkbox/checkboxClasses";
import createThemeMui from "@mui/material/styles/createTheme";

const defTheme = createThemeMui({});

export const themeMui = createThemeMui(defTheme, {
  palette: {
    primary: {
      main: "#ED7433"
    },
    secondary: {
      main: "#fefbf9",
      dark: "#A4A4A4"
    },
    success: {
      main: "#2CDEA8"
    },
    error: {
      main: "#DE4A2C"
    },
    text: {
      primary: "#000000"
    }
  },
  typography: {
    fontFamily: ["Open Sans"].join(",")
  },
  components: {
    MuiDivider: {
      defaultProps: {
        light: true
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          backgroundColor: "#fefbf9"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontWeight: 700
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED7433"
          },
          "&:hover .MuiInputLabel-outlined": {
            color: "#ED7433"
          }
        }
      }
    },
    MuiNativeSelect: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED7433"
          },
          "&:hover .MuiInputLabel-outlined": {
            color: "#ED7433"
          }
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          "& .MuiCircularProgress-svg": {
            color: "#ED7433"
          }
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-adornedStart": {
            color: "#ED7433"
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        contained: {
          fontFamily: "Open Sans",
          color: "#fefbf9",
          backgroundColor: "#A4A4A4",
          "&:hover": {
            backgroundColor: "#A4A4A4"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          fontWeight: 400
        },
        h5: {
          fontFamily: "Open Sans",
          fontWeight: 700
        },
        h6: {
          fontFamily: "Open Sans",
          fontWeight: 400
        },
        h3: {
          fontFamily: "Open Sans",
          fontWeight: 400
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          "&.Mui-selected": {
            backgroundColor: "#3F4048"
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          fontFamily: "Open Sans",
          color: "#BDBDBD",
          fontWeight: 700
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        color: "primary"
      },
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          backgroundColor: "#fefbf9",
          fontWeight: 700,
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ED7433"
          },
          "&:hover .MuiInputLabel-outlined": {
            color: "#ED7433"
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          color: "#9FA2B4"
        },
        selectRoot: {
          fontFamily: "Open Sans",
          color: "#4B506D"
        }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary"
      },
      styleOverrides: {
        root: {
          fontFamily: "Open Sans",
          background: "#fefbf9",
          width: "34px",
          height: "34px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
          marginRight: 8,
          "&:hover": {
            background: "#fefbf9"
          },
          [`&.${checkboxClasses.checked}`]: {
            background: "#ED7433"
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Open Sans"
        }
      }
    }
  }
});
