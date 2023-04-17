const bird = document.getElementById('bird');
const pipes = document.getElementsByClassName('pipe'); // Lấy danh sách các ống nước
const gravity = 0.5;
const jumpHeight = 10;
let position = 200;
let velocity = 0;

function jump() {
    velocity = -jumpHeight;
}

document.addEventListener('keydown', jump);

function gameLoop() {
    // Cập nhật vị trí của chim dựa trên vận tốc và trọng lực
    velocity += gravity;
    position += velocity;
    bird.style.top = position + 'px';

    // Kiểm tra va chạm với các ống nước
    const birdRect = bird.getBoundingClientRect();
    for (let i = 0; i < pipes.length; i++) {
        const pipeRect = pipes[i].getBoundingClientRect();
        if (birdRect.right > pipeRect.left && birdRect.left < pipeRect.right &&
            birdRect.top < pipeRect.bottom && birdRect.bottom > pipeRect.top) {
            alert('Game over!');
            location.reload(); // Tải lại trang khi game over
        }
    }

    // Cập nhật vị trí của các ống nước và kiểm tra khi nào cần tạo ống mới
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        const pipeRect = pipe.getBoundingClientRect();
        const pipeWidth = pipeRect.right - pipeRect.left;
        const pipeLeft = pipeRect.left - pipeWidth;

        if (pipeLeft <= 0) {
            // Ống đã đi qua màn hình, cần di chuyển ống đến vị trí mới
            const pipeHeight = Math.floor(Math.random() * 200) + 100;
            pipe.style.height = pipeHeight + 'px';
            pipe.style.left = window.innerWidth + 'px';
        } else {
            // Di chuyển ống sang trái
            pipe.style.left = (pipeRect.left - 2) + 'px';
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
