import React, {useEffect, useState} from 'react';
import Item, {ItemProps} from "./Item";
import {Button, Checkbox, TextField} from "@mui/material";


interface ListProps {
    initialItems: ItemProps[];
}

const defaultItems: ListProps = {
    initialItems: [
        {id: 1, name: 'Item 1', isComplete: false},
        {id: 2, name: 'Item 2', isComplete: false},
        {id: 3, name: 'Item 3', isComplete: false},
    ]
};

function loadItems(): ItemProps[] {
    const items = localStorage.getItem('items');
    if (items) {
        return JSON.parse(items);
    }
    return defaultItems.initialItems;
}

const List = () => {
    const [items, setItems] = useState<ItemProps[]>(loadItems());
    const [inputValue, setInputValue] = useState('');
    const [isInputValueValid, setIsInputValueValid] = useState(false);

    const toggleComplete = (id: number) => {
        console.log('Toggled item with id: ' + id);
        const newItems = items.filter(item => item.id !== id);

        // falta actualizar items, creo q con esto va
        setItems(newItems);
    }

    const addItem = () => {
        setItems([...items, {id: items.length + 1, name: inputValue, isComplete: false}]);
        setInputValue('');
        setIsInputValueValid(true);

    }

    useEffect(() => {
        console.log('List rendered', items);
        localStorage.setItem('items', JSON.stringify(items));
    },[items]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <ul style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {items.map(item => (
                    <li key={item.id} style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox color={"secondary"}
                                  checked={item.isComplete}
                                  onChange={() => toggleComplete(item.id)}/>
                        <Item key={item.id} {...item} />
                    </li>
                ))}
            </ul>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <TextField size="small"
                           id="outlined-basic"
                           color={"secondary"}
                           variant="filled"
                           inputProps={{style: {color: 'white', padding: 10}}}
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