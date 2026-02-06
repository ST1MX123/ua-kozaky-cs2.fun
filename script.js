// ====== Steam логін ======
document.querySelector(".steam-btn").addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = "/auth/steam";
});

async function loadProfile() {
    try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if(data.name) {
            document.getElementById("profile").style.display = "block";
            document.getElementById("nickname").innerText = data.name;
            document.getElementById("avatar").src = data.avatar;
        }
    } catch(e) {
        console.error("Не вдалось завантажити профіль:", e);
    }
}

// ====== ТОП ГРАВЦІ (демо) ======
const topPlayers = [
    { name: "KOZAK_1", kills: 320 },
    { name: "UA_Sniper", kills: 287 },
    { name: "BANDERA", kills: 250 }
];

const list = document.getElementById("topList");
topPlayers.forEach(player => {
    const li = document.createElement("li");
    li.innerText = player.name + " — " + player.kills + " kills";
    list.appendChild(li);
});

// ====== Статус сервера ======
function checkServer() {
    const status = document.getElementById("serverStatus");
    setTimeout(() => {
        status.innerHTML = "Онлайн 🟢";
        status.style.color = "lime";
    }, 2000);
}

checkServer();
window.onload = loadProfile;

// ====== Skin Changer ======
const skins = {
    ak47: {
        redline: 'skins/ak47_redline.png',
        hyperbeast: 'skins/ak47_hyperbeast.png',
        dragon: 'skins/ak47_dragon.png',
        default: 'skins/ak47_default.png'
    },
    m4a1: {
        redline: 'skins/m4a1_redline.png',
        hyperbeast: 'skins/m4a1_hyperbeast.png',
        dragon: 'skins/m4a1_dragon.png',
        default: 'skins/m4a1_default.png'
    },
    awp: {
        redline: 'skins/awp_redline.png',
        hyperbeast: 'skins/awp_hyperbeast.png',
        dragon: 'skins/awp_dragon.png',
        default: 'skins/awp_default.png'
    },
    usp: {
        redline: 'skins/usp_redline.png',
        hyperbeast: 'skins/usp_hyperbeast.png',
        dragon: 'skins/usp_dragon.png',
        default: 'skins/usp_default.png'
    }
};

const weaponSelect = document.getElementById('weapon');
const skinSelect = document.getElementById('skin');
const skinPreview = document.getElementById('skinPreview');

function updateSkin() {
    const weapon = weaponSelect.value;
    const skin = skinSelect.value;
    skinPreview.src = skins[weapon][skin];
}

weaponSelect.addEventListener('change', updateSkin);
skinSelect.addEventListener('change', updateSkin);

// Початковий показ
updateSkin();
