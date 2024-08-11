import React, { useEffect } from 'react';
import List from './List';

function App() {
    const initialItems = [
        {id: 1, name: 'Item 1', isComplete: false},
        {id: 2, name: 'Item 2', isComplete: false},
        {id: 3, name: 'Item 3', isComplete: false},
    ];

    useEffect(() => {
        // Guarda el color de fondo actual
        const currentBackgroundColor = document.body.style.backgroundColor;

        // Cambia el color de fondo a negro
        document.body.style.backgroundColor = 'blueviolet';

        // Cuando se desmonta el componente, restablece el color de fondo original
        return () => {
            document.body.style.backgroundColor = currentBackgroundColor;
        };
    }, []);

    return (
        <div className="App">
            <List initialItems={initialItems}/>
        </div>
    );
}

export default App;