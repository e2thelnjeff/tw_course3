const express = require('express');
const app = express();
const port = 3000;

let todos = [
    {id: 1, text: 'Finish repairing Ford', completed: false},
    {id: 2, text: 'Finish TW competency', completed: false},
    {id: 3, text: 'Start personal projects', completed: false},
    {id: 4, text: 'Apply for internships', completed: false},
    {id: 5, text: 'Re-scaffold to-do app', completed: true},
    {id: 6, text: 'Re-scaffold server for todoapp', completed: true}
];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/addItem', (req, res) => {
    const newItem = {
        id: todos.length + 1,
        text: req.query.text,
        completed: false
    };

    todos.push(newItem);
    res.json(todos);
});

app.get('/editItem', (req, res) => {
    const id = parseInt(req.query.itemID);
    const edits = req.query.text;
    const item = todos.find(item => item.id === id);
    item.text = edits;
    res.json(todos)
})

app.get('/delItem', (req, res) => {
    const id = parseInt(req.query.id);
    todos = todos.filter(item => item.id !== id);
    res.json(todos);
});

app.get('/updateItem', (req, res) => {
    const id = parseInt(req.query.id);
    const item = todos.find(item => item.id === id);
    item.completed = !item.completed;
    
    res.json(todos);

});

app.listen(port, ()=> {
    console.log('I am listening at http://localhost:'+port);
});