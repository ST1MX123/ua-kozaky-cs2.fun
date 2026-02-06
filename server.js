const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
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

// Passport Steam
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
    returnURL: 'https://ua-kozaky-cs2-fun.onrender.com/auth/steam/return', 
    realm: 'https://ua-kozaky-cs2-fun.onrender.com/',
    apiKey: 'CC2CBE4BC8F74FAD5E8EDB850AB5C982' // ← заміни на свій ключ
}, (identifier, profile, done) => {
    profile.identifier = identifier;
    return done(null, profile);
}));

app.use(passport.initialize());
app.use(passport.session());

// Steam маршрути
app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', 
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

app.get('/logout', (req, res) => {
    req.logout(() => { res.redirect('/'); });
});

// Головна
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API профілю
app.get('/api/profile', (req, res) => {
    if(req.user){
        res.json({
            nickname: req.user.displayName,
            avatar: req.user.photos[2].value
        });
    } else {
        res.json({ nickname: null, avatar: null });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
