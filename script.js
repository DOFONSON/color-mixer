let cols = document.querySelectorAll('.col')
let colsBlock = document.getElementById('cols')
const removeButton = document.getElementById('rndmBtn')
cols[0].style.backgroundColor = '#00FF00'
cols[1].style.backgroundColor = '#FF0000'
cols[2].style.backgroundColor = '#0000FF'

document.getElementById('mixBtn').addEventListener('click', () => {
    const colors = [...cols].map((element) => {
        return element.style.backgroundColor
    })
    mix(colors)
})

document.getElementById('mixingText').addEventListener('click', (evt) => {
    navigator.clipboard.writeText(evt.target.textContent)
})

cols.forEach((element) => {
    setTextColor(element.querySelector('.color-code'), element.style.backgroundColor)
    element.querySelector('.color-code').addEventListener('click', (evt) => {
        navigator.clipboard.writeText(evt.target.textContent)
    })
    element.querySelector('.remove-btn').addEventListener('click', () => checkLength(element))
    element.addEventListener('mouseover', () => {
        element.querySelector('.remove-btn').hidden = false
    })
    element.addEventListener('mouseout', () => {
        element.querySelector('.remove-btn').hidden = true
    })
})

function checkLength(item) {
    if (cols.length === 1) {
        alert('You need at least 1 color block')
    }
    else {
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

        const header = document.createElement('h3');
        header.classList.add('color-code');
        header.textContent = color;
        setTextColor(header, color)
        header.addEventListener('click', (evt) => {
            navigator.clipboard.writeText(evt.target.textContent)
        })

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

document.getElementById('rndmBtn').addEventListener('click', function () {
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

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}



function mix(colorArray) {
    const block = document.getElementById('mixingColor')
    block.style.backgroundColor = blendColors(colorArray)
    block.querySelector('#mixingText').textContent = blendColors(colorArray).toUpperCase()
    setTextColor(block.querySelector('#mixingText'), blendColors(colorArray).toUpperCase())
}

function blendColors(colors) {
    const rgbColors = colors.map(color => {
        const matches = color.match(/(\d+),\s*(\d+),\s*(\d+)/);

        if (matches) {
            return {
                r: parseInt(matches[1]),
                g: parseInt(matches[2]),
                b: parseInt(matches[3])
            };
        }
        return null; 
    }).filter(rgb => rgb !== null);

    let colorAmount = {
        r: 0,
        g: 0,
        b: 0,
    }

    rgbColors.forEach((color) => {
        for (const key in color) {
            switch (true) {
                case color[key] == '0':
                    continue
                default:
                    colorAmount[key] += 1
                    break;
            }
        }
    })
    let sumR = 0, sumG = 0, sumB = 0;
    rgbColors.forEach(color => {
        sumR += color.r;
        sumG += color.g;
        sumB += color.b;
    });
    const blendedColor = {
        r: Math.min(Math.round(sumR / colorAmount.r || 0), 255), 
        g: Math.min(Math.round(sumG / colorAmount.g || 0), 255),
        b: Math.min(Math.round(sumB / colorAmount.b || 0), 255)
    };

    
    return rgbToHex(blendedColor.r, blendedColor.g, blendedColor.b);
}

function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
        const hex = c.toString(16); 
        return hex.length === 1 ? "0" + hex : hex;
    };

    const hexR = componentToHex(r);
    const hexG = componentToHex(g);
    const hexB = componentToHex(b);

    return "#" + hexR + hexG + hexB;
}