import React, {useState} from "react";
import {
    ListItem,
    ListItemText,
    Checkbox,
    Button,
    Modal,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import axios from "axios";

interface ItemProps {
    id: number;
    name: string;
    isComplete: boolean;
    updatedAt: Date;
    createdAt: Date;
}

interface ItemWithSetItemsProps extends ItemProps {
    setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
    toggleComplete: (id: number) => void;
}

const APIURL = 'http://localhost:4567/api/list/';


const Item: React.FC<ItemWithSetItemsProps> = ({ id, name, isComplete , setItems,    toggleComplete}) => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [newInputValue, setNewInputValue] = useState('');

    const handleInputChange = (id: number) => {
        setOpen(true);
        console.log('Input changed', id);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOpen(false);
    };

    const updateItem = (id: number) => {
        if (!newInputValue) {
            return;
        }
        setNewInputValue('');
        setOpen(false);
        handleCloseDialog();

        axios.put(APIURL + `update/${id}`, {id: id, name: newInputValue, isComplete: false})
            .then(r => {
                console.log('Item updated', r.data);
                setItems(prevItems => prevItems.map(item => item.id === id ? r.data : item));
            }).catch((error: Error) => {console.log('Error adding', error)});
    }




    return (
        <ListItem key={id} style={{ flexDirection: 'column', alignItems: 'start' }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox color={"secondary"}
                              onChange={() => toggleComplete(id)}/>
                    <ListItemText primary={name} style={{color: 'black', justifySelf: 'center'}}/>

                </div>
                <Button variant={"contained"} color={"secondary"} style={{color: 'white', margin: '10px'}}
                        onClick={() => handleInputChange(id)}>Update Item</Button>
            </div>
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
                            onClick={handleOpenDialog}>Save change</Button>
                </div>
            </Modal>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action will update the item. Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button onClick={() => updateItem(id)} color="secondary" autoFocus>
                        Yes, update
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
}

export default Item;
export type { ItemProps };
