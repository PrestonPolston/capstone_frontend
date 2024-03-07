import {
  amber,
  indigo,
  blue,
  lightBlue,
  cyan,
  green,
  lightGreen,
  lime,
  yellow,
  red,
  teal,
  deepPurple,
  grey,
  pink,
  orange,
  deepOrange,
  brown,
  blueGrey,
} from "@mui/material/colors";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const darkMode = useSelector((state) => state.theme.darkTheme);
const userPreferences = useSelector(
  (state) => state.userPreferences.preferences
);

const theme = createTheme({
  palette: {
    mode: darkMode ? "dark" : "light",
    primary: {
      main: userPreferences.primaryColor || "#1976d2",
    },
    background: {
      default: darkMode ? "#222" : userPreferences.secondaryColor || "#fff",
    },
    text: {
      primary: darkMode ? "#fff" : "#111",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  spacing: 8,
});
export default creat
