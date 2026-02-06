const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(session({
  secret: "ua-kozaky-secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
    returnURL: "https://ua-kozaky-cs2-fun-241.onrender.com/auth/steam/return",
    realm: "https://ua-kozaky-cs2-fun-241.onrender.com/",
    apiKey: "CC2CBE4BC8F74FAD5E8EDB850AB5C982"
  },
  function(identifier, profile, done) {
    return done(null, profile);
  }
));

app.get("/auth/steam",
  passport.authenticate("steam"),
  function(req, res) {}
);

app.get("/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/api/user", (req, res) => {
  if (!req.user) return res.json(null);

  res.json({
    name: req.user.displayName,
    avatar: req.user.photos[2].value
  });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Server running"));
