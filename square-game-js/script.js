const square = document.querySelector('#square');

const windowSize = {
    height: window.innerHeight,
    width: window.innerWidth
}

window.onresize = () => {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
    // console.clear();
    // console.log(windowSize);
}

const hero = {
    name: 'Spider Man',
    position: {
        x: 0,
        y: 0
    },
    direction: 0, /* forward - 0 | right - 1 | backward - 2 | left - 3 */

    turnLeft() {
        this.direction = this.direction === 0 ? 3 : this.direction - 1;
    },

    turnRight() {
        this.direction = this.direction === 3 ? 0 : this.direction + 1;
    },

    walk(steps) {
        switch (this.direction) {
            case 0:
                if (this.position.y > 0)
                    this.position.y-= steps;
                break;
            case 1:
                if (this.position.x < windowSize.width - 100)
                    this.position.x+= steps;
                break;
            case 2:
                if (this.position.y < windowSize.height - 100)
                    this.position.y+= steps;
                break;
            case 3:
                if (this.position.x > 0)
                    this.position.x-= steps;
                break;
        }
    },

    getPosition() {
        return `x: ${this.position.x}\ny: ${this.position.y}\ndirection: ${this.direction}`;
    }
}

document.addEventListener('keydown', event => {
    switch (event.code) {
        case 'ArrowUp':
            hero.walk(10);
            break;
        case 'ArrowLeft':
            hero.turnLeft();
            break;
        case 'ArrowRight':
            hero.turnRight();
            break;
    }

    square.style.left = hero.position.x + 'px';
    square.style.top = hero.position.y + 'px';

    // console.clear();
    // console.log(hero.getPosition());
});
