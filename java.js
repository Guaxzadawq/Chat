document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById('chat-box');
    const usernameInput = document.getElementById('username');
    const userPhotoInput = document.getElementById('user-photo');
    const userPhotoPreview = document.getElementById('user-photo-preview');

    let messages = [];

    userPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            userPhotoPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    sendBtn.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        const username = usernameInput.value.trim();
        const userPhoto = userPhotoPreview.src;

        if (messageText && username) {
            const message = {
                username: username,
                text: messageText,
                photo: userPhoto,
                timestamp: new Date().toLocaleTimeString()
            };
            messages.push(message);
            displayMessages();
            messageInput.value = '';
        } else {
            alert('Por favor, insira um nome de usuário e uma mensagem.');
        }
    });

    function displayMessages() {
        chatBox.innerHTML = '';
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.innerHTML = `
                <img src="${message.photo}" class="chat-photo" alt="Foto do Usuário">
                <div class="chat-text">
                    <strong>${message.username}</strong> <span class="chat-time">${message.timestamp}</span><br>
                    ${message.text}
                </div>
            `;
            chatBox.appendChild(messageElement);
        });
    }
});
