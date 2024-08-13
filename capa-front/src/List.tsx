import React, {useEffect, useState} from 'react';
import Item, {ItemProps} from "./Item";
import {Button, Checkbox, TextField} from "@mui/material";

import axios from "axios";

interface ListProps {
    initialItems: ItemProps[];
} // se puede borrar, se vuleve tupido con el useState

const APIURL = 'http://localhost:4567/';

const List = () => {
    const [items, setItems] = useState<ItemProps[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        axios.get( APIURL + 'items')
            .then(backItems => {
                console.log('List rendered', backItems.data);
                setItems(backItems.data)
            })
            .catch((error: Error) => {console.log('Error getting', error)});

        localStorage.setItem('items', JSON.stringify(items));

        addItem();
    },[]);

    const toggleComplete = (id: number) => {
        console.log('Toggled item with id: ' + id);
        const newItems = items.filter(item => item.id !== id);

        setTimeout(() => {
            // falta actualizar items, creo q con esto va
            setItems(newItems);
            console.log('Items after toggle', newItems);

            axios.delete(APIURL + `delete/${id}`, {data: {id: id}})
                .then(r => {
                    console.log('Item deleted', r.data);
                    setItems(r.data);
                }).catch((error: Error) => {
                console.log('Error deleting', error)
            });
        }, 1000);
    }

    const addItem = () => {
        if (!inputValue) {
            return;
        }
        setItems([...items, {id: items.length + 1, name: inputValue, isComplete: false}]);
        setInputValue('');

        axios.post(APIURL + 'post', {name: inputValue, isComplete: false})
            .then(r => {
                console.log('Item added', r.data);
                setItems(r.data);
            }).catch((error: Error) => {console.log('Error adding', error)});
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <ul style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {items && items.map(item => (
                    <div style={{backgroundColor: 'lightblue', padding: 10, margin: 5, borderRadius: 5}}>
                        <li key={item.id} style={{display: 'flex', alignItems: 'center'}}>
                            <Checkbox color={"secondary"}
                                      onChange={() => toggleComplete(item.id)}/>
                            <Item key={item.id} {...item} />
                        </li>
                    </div>
                    ))}
            </ul>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <TextField size="small"
                           id="outlined-basic"
                           color={"secondary"}
                           variant="filled"
                           inputProps={{style: {padding: 10}}}
                           value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <Button variant={"contained"} color={"secondary"} style={{color: 'white', margin: '10px'}}
                        onClick={addItem}>Add Item</Button>
            </div>

            <Button variant={"contained"} color={"secondary"} style={{color: 'white', margin: '10px'}}
                    onClick={() => setItems([])}>Clear List</Button>
        </div>
    );
}
export default List;