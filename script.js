let cols = document.querySelectorAll('.col')
let colsBlock = document.getElementById('cols')
const removeButton = document.getElementById('rndmBtn')
cols[0].style.backgroundColor = 'green'
cols[1].style.backgroundColor = 'red'
cols[2].style.backgroundColor = 'blue'

cols.forEach((element) => {
    element.querySelector('.remove-btn').addEventListener('click', ()=> checkLength(element))
    element.addEventListener('mouseover', ()=>{
        element.querySelector('.remove-btn').hidden = false
    })
    element.addEventListener('mouseout', ()=>{
        element.querySelector('.remove-btn').hidden = true
    })
})

function checkLength(item) {
    if (cols.length === 1) {
        alert('You need at least 1 color block')
    }
    else{
        item.remove();
        cols = document.querySelectorAll('.col')
    }
}

class ColorBlock {
    constructor(color, id) {
        this.color = color;
        this.id = id;
    }

    addBlock(color) {
        const colsBlock = document.getElementById('cols');
        const newBlock = document.createElement('div');
        newBlock.classList.add('col');
        newBlock.id = this.id;

        const button = document.createElement('button');
        button.classList.add('remove-btn');
        button.hidden = true;
        button.innerHTML = '<img src="img/close-svgrepo-com.svg" alt="Закрыть" width=30px>';
        button.addEventListener('click', () => checkLength(newBlock));

        const header = document.createElement('h2');
        header.classList.add('color-code');
        header.textContent = color;

        newBlock.style.backgroundColor = this.color;

        newBlock.addEventListener('mouseover', () => {
            button.hidden = false;
        });

        newBlock.addEventListener('mouseout', () => {
            button.hidden = true;
        });

        newBlock.appendChild(button);
        newBlock.appendChild(header);

        colsBlock.appendChild(newBlock);
    }
}

document.getElementById('rndmBtn').addEventListener('click', function() {
    const hexCodes = '0123456789ABCDEF';
    let backColor = '#';
    for (let i = 0; i < 6; i++) {
        backColor += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }

    const id = 'col-' + Math.floor(Math.random() * 1000); 
    const newColorBlock = new ColorBlock(backColor, id);
    newColorBlock.addBlock(backColor);
    cols = document.querySelectorAll('.col')

});


