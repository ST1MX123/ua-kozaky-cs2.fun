const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("YOUR_MONGODB_URL");

const userSchema = new mongoose.Schema({
  steamId: String,
  balance: { type: Number, default: 1000 },
  openedCases: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

const caseItems = [
  { name: "AK-47 Redline", chance: 40, price: 200 },
  { name: "AWP Asiimov", chance: 25, price: 500 },
  { name: "M4A4 Howl", chance: 5, price: 2000 },
  { name: "Glock Fade", chance: 30, price: 300 }
];

function openCase() {
  const rand = Math.random() * 100;
  let sum = 0;

  for (let item of caseItems) {
    sum += item.chance;
    if (rand <= sum) return item;
  }
}

app.post("/open-case", async (req, res) => {
  const { steamId } = req.body;

  let user = await User.findOne({ steamId });
  if (!user) {
    user = await User.create({ steamId });
  }

  if (user.balance < 100) {
    return res.json({ error: "Недостатньо балансу" });
  }

  const reward = openCase();

  user.balance -= 100;
  user.balance += reward.price;
  user.openedCases += 1;

  await user.save();

  res.json({ reward, balance: user.balance });
});

app.get("/top-players", async (req, res) => {
  const players = await User.find().sort({ balance: -1 }).limit(5);
  res.json(players);
});

app.listen(3000, () => console.log("Server running"));
