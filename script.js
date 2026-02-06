// =================
// ТОП ГРАВЦІ
// =================
const topPlayersArr = [
    { name: "KOZAK_1", score: 1020 },
    { name: "UA_Rifler", score: 980 },
    { name: "BANDERIVETS", score: 940 },
    { name: "ZYLA", score: 900 },
    { name: "SHYFT", score: 870 }
];

const topList = document.getElementById("topList");
topPlayersArr.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} — ${p.score}`;
    topList.appendChild(li);
});

// =================
// СТАТУС СЕРВЕРА (демо)
// =================
function checkServer() {
    const status = document.getElementById("serverStatus");
    setTimeout(() => {
        status.innerText = "Онлайн 🟢";
        status.style.color = "lime";
    }, 1500);
}
checkServer();

// =================
// Профіль після Steam
// =================
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
            if (data.nickname) {
                document.getElementById("profile").style.display = "block";
                document.getElementById("nickname").innerText = data.nickname;
                document.getElementById("avatar").src = data.avatar;
            }
        });
});
