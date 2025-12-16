import express from 'express';
import { signup,login } from './Controllers/UserController.js';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hello World');
});

app.post('/signup',signup);
app.post('/signin',login);
