const cols = document.querySelectorAll('.col')
let colsBlock = document.getElementById('cols')
const removeButton = document.getElementById('rndmBtn')
cols[0].style.backgroundColor = 'green'
cols[1].style.backgroundColor = 'red'
cols[2].style.backgroundColor = 'blue'


// JavaScript

class ColorBlock {
    constructor(color, id) {
        this.color = color;
        this.id = id;
    }

    // Метод для создания и добавления нового блока
    addBlock() {
        const colsBlock = document.getElementById('cols');
        const newBlock = document.createElement('div');
        newBlock.classList.add('col');
        newBlock.id = this.id;

        // Создаем кнопку и заголовок
        const button = document.createElement('button');
        button.classList.add('remove-btn');
        button.hidden = false;
        button.innerHTML = '<img src="img/close-svgrepo-com.svg" alt="Закрыть" width=30px>';
        button.addEventListener('click', () => {
            newBlock.style.display='none'
        })

        const header = document.createElement('h2');
        header.classList.add('color-code');
        header.textContent = 'Text';

        // Устанавливаем цвет
        newBlock.style.backgroundColor = this.color;

        // Добавляем кнопку и заголовок в новый блок
        newBlock.appendChild(button);
        newBlock.appendChild(header);

        // Добавляем новый блок в контейнер
        colsBlock.appendChild(newBlock);
    }
}

// Обработчик кнопки добавления блока
document.getElementById('rndmBtn').addEventListener('click', function() {
    // Генерируем случайный цвет
    const hexCodes = '0123456789ABCDEF';
    let backColor = '#';
    for (let i = 0; i < 6; i++) {
        backColor += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }

    // Генерируем уникальный ID
    const id = 'col-' + Math.floor(Math.random() * 1000); // Можно выбрать любую систему генерации ID

    // Создаем новый блок с помощью класса ColorBlock и добавляем его
    const newColorBlock = new ColorBlock(backColor, id);
    newColorBlock.addBlock();
});

