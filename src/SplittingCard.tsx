import { useRef } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  TextFieldProps,
  CardContent,
} from "@mui/material";
import { DeleteForeverOutlined } from "@material-ui/icons";

type SplittingCardProps = {
  name: string;
  values: number[];
  setValues: (values: number[]) => void;
};

const SplittingCard = ({ name, values, setValues }: SplittingCardProps) => {
  const inputRef = useRef<TextFieldProps>(null);

  const handleAddValue = (event: React.KeyboardEvent<HTMLElement>) => {
    const inputComponent = inputRef.current;
    if (event.key === "Enter" && inputComponent !== null) {
      const input = inputComponent.value;
      if (typeof input === "string") {
        const val: number = parseFloat(
          input.replace(/,/, ".").replace("€", "")
        );
        if (!isNaN(val)) {
          setValues([...values, val]);
          inputComponent.value = "";
        }
      }
    }
  };

  const handleRemoveValue = (index: number) => {
    setValues([...values.slice(0, index), ...values.slice(index + 1)]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {name}
        </Typography>
        <List dense>
          {values.map((price, index) => (
            <ListItem key={index}>
              <ListItemIcon onClick={() => handleRemoveValue(index)}>
                <DeleteForeverOutlined />
              </ListItemIcon>
              <ListItemText>{price}€</ListItemText>
            </ListItem>
          ))}
        </List>
        <TextField
          id={name.toLowerCase()}
          label={"Add " + name + " expense"}
          onKeyUp={handleAddValue}
          inputRef={inputRef}
        />
      </CardContent>
    </Card>
  );
};

export default SplittingCard;
