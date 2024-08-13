import React, {useState} from "react";
import {ListItem, ListItemText, Checkbox, Button, Modal, TextField} from "@mui/material";
import axios from "axios";

interface ItemProps {
    id: number;
    name: string;
    isComplete: boolean;
}

interface ItemWithSetItemsProps extends ItemProps {
    setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
}

const APIURL = 'http://localhost:4567/';


const Item: React.FC<ItemWithSetItemsProps> = ({ id, name, isComplete , setItems}) => {
    const [open, setOpen] = useState(false);

    const [newInputValue, setNewInputValue] = useState('');

    const handleInputChange = (id: number) => {
        setOpen(true);
        console.log('Input changed', id);
        updateItem(id);
    }

    const updateItem = (id: number) => {
        if (!newInputValue) {
            return;
        }
        setNewInputValue('');
        setOpen(false);

        axios.put(APIURL + `put/${id}`, {name: newInputValue, isComplete: false})
            .then(r => {
                console.log('Item updated', r.data);
                setItems(r.data);
            }).catch((error: Error) => {console.log('Error adding', error)});
    }


    return (
        <ListItem key={id}>
            <ListItemText primary={name} style={{ color: 'black' }}/>
            <Button variant={"contained"} color={"secondary"} style={{color: 'white', margin: '10px'}}
                    onClick={() => handleInputChange(id)}>Update Item</Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={{backgroundColor: 'gray', padding: '1rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <TextField size="small"
                               id="outlined-basic"
                               color={"secondary"}
                               variant="filled"
                               inputProps={{style: {padding: 10}}}
                               value={newInputValue} onChange={(e) => setNewInputValue(e.target.value)}/>
                    <Button variant={"contained"} color={"secondary"} style={{color: 'white', margin: '10px'}}
                            onClick={() => updateItem(id)}>Save change</Button>
                </div>
            </Modal>
        </ListItem>
    );
}

export default Item;
export type { ItemProps };
