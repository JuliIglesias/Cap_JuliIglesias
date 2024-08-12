import React, { useEffect } from 'react';
import List from './List';

function App() {

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
            <List/>
        </div>
    );
}

export default App;