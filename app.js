const express = require('express');
const app = express();
const port = 4567;
//cors rules
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db = [{id: 0, name: 'Juan', isComplete: false}, {id: 1, name: 'Pedro',isComplete: false}, {id: 2, name: 'Pablo',isComplete: false}];
let id = 3;

// capacitacion hecha, la TO-DO list
app.post('/create', (req, res) => {
    let body = req.body;

    let newItem = {
        id: id++,
        name: body.name,
        isComplete: false
    }

    db.push(newItem);

    console.log('oldBody',body);
    console.log('newBody', newItem)
    console.log('db', db);
    res.send(db);

    // en el postman pones el url completo con /post, elegis post, y en el body RAW escribis JSON con {} y mandale cumbia
});

app.put('/update/:id', (req, res) => {
   let id1 = parseInt(req.params.id);

   let iteme = req.body;
   console.log(iteme);

   let findItem = db.find(item => item.id === id1);
    console.log('Item encontrado', findItem);

   if(!findItem){ res.status(404).send('No se encontro el item') }
   findItem.name = iteme.name;
   res.send(db);
});

app.get('/getAll', (req, res) => {
    res.send(db);
});

app.delete('/delete/:id', (req, res) => {
    let id1 = parseInt(req.params.id);

    let findItem = db.find(item => item.id === id1);
    console.log('Item encontrado', findItem);

    if(!findItem){ res.status(404).send('No se encontro el item') }

    db = db.filter(item => item.id !== id1); // se podria hacer un pop nada mas en este indice de id de la lista mas que filtrar

    console.log('db', db);

    res.send(db);
});

app.delete('/deleteAll', (req, res) => {
    db=[];
    console.log('db', db);
    res.send(db);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);}
);