const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db = [{id: 0, name: 'Juan'}, {id: 1, name: 'Pedro'}, {id: 2, name: 'Pablo'}];
let id = 3;

app.get('/', (req, res) => {
    res.send('Hello World bitche!' +
        'akjdsdoonomjkd cjcdfgfuoidjfyugf x \n udhewbwyeftiqcdeytwiucetyiuwvwuyywouyufcicufcyiux fyiuxcyuixu f');
});

// capacitacion hecha, la TO-DO list
app.post('/post', (req, res) => {
    let body = req.body;

    let newItem = {
        id: id++,
        name: body.name,
    }

    db.push(newItem);

    console.log('oldBody',body);
    console.log('newBody', newItem)
    console.log('db', db);
    res.send({body,newItem});

    // en el postman pones el url completo con /post, elegis post, y en el body RAW escribis JSON con {} y mandale cumbia
});


app.put('/put/:id', (req, res) => {
   let id1 = parseInt(req.params.id);

   let iteme = req.body;
   console.log(iteme);

   let findItem = db.find(item => item.id === id1);
    console.log('Item encontrado', findItem);

   if(!findItem){ res.status(404).send('No se encontro el item') }
   findItem.name = iteme.name;
   res.send(findItem);
});

app.get('/get', (req, res) => {
    res.send(db);
});

app.delete('/delete/:id', (req, res) => {
    let id1 = parseInt(req.params.id);

    let findItem = db.find(item => item.id === id1);
    console.log('Item encontrado', findItem);

    if(!findItem){ res.status(404).send('No se encontro el item') }

    db = db.filter(item => item.id !== id1); // se podria hacer un pop nada mas en este indice de id de la lista mas que filtrar

    console.log('db', db);

    res.send(findItem);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);}
);