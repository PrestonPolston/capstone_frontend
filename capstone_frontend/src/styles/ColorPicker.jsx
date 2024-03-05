import {
  amber,
  blue,
  green,
  red,
  teal,
  deepPurple,
  grey,
  pink,
  lime,
  orange,
} from "@mui/material/colors";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const muiColors = [
  { name: "Amber", color: amber[500] },
  { name: "Blue", color: blue[500] },
  { name: "Green", color: green[500] },
  { name: "Red", color: red[500] },
  { name: "Teal", color: teal[500] },
  { name: "Purple", color: deepPurple[500] },
  { name: "Grey", color: grey[500] },
  { name: "Pink", color: pink[500] },
  { name: "Lime", color: lime[500] },
  { name: "Orange", color: orange[500] },
];

const MUIColorPaletteSelect = ({ selectedColor, onSelectColor }) => {
  return (
    <FormControl>
      <Select value={selectedColor} onChange={onSelectColor}>
        {muiColors.map((color) => (
          <MenuItem
            key={color.name}
            value={color.color}
            style={{ backgroundColor: color.color, color: "white" }}
          >
            {color.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MUIColorPaletteSelect;
