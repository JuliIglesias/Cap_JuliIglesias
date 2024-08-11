import React from "react";
import {ListItem, ListItemText, Checkbox} from "@mui/material";

interface ItemProps {
    name: string;
    isComplete: boolean;
    id: number;
}

const Item: React.FC<ItemProps> = ({ id, name, isComplete }) => {
    return (
        <ListItem key={id}>
            <ListItemText primary={name} style={{ color: 'white' }}/>
        </ListItem>
    );
}

export default Item;
export type { ItemProps };
