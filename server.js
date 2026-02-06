const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Статичні файли
app.use(express.static(path.join(__dirname)));

// Сесії
app.use(session({
    secret: 'ua-kozaky-secret',
    resave: false,
    saveUninitialized: true
}));

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API для демо Steam профілю
app.get('/api/profile', (req, res) => {
    res.json({
        name: 'DemoPlayer',
        avatar: 'https://i.imgur.com/4NZ6uLY.png'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
