// Отримання профілю користувача після логіну Steam
window.addEventListener('DOMContentLoaded', () => {
    fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
            if(data.nickname){
                const profileBox = document.getElementById('profile');
                profileBox.style.display = 'block';
                document.getElementById('nickname').innerText = data.nickname;
                document.getElementById('avatar').src = data.avatar;
            }
        });

    // Демо Skin Changer
    const weaponSelect = document.getElementById('weapon');
    const skinSelect = document.getElementById('skin');
    const skinPreview = document.getElementById('skinPreview');

    function updateSkin(){
        // просто текст замість картинки для демо
        skinPreview.alt = weaponSelect.value + ' — ' + skinSelect.value;
    }

    weaponSelect.addEventListener('change', updateSkin);
    skinSelect.addEventListener('change', updateSkin);
});
