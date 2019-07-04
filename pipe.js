class Pipe {
    constructor() {     //管道构造器
        let spacing = 110;   //管道之间的空隙是固定的
        this.top = random(height / 6, 3 / 4 * height);  //顶部管道高度
        this.bottom = height - (this.top + spacing);   //底部管道高度（从上至下）
        this.x = width;
        this.w = 70;
        this.speed = 3;
        this.beenhit = false;     //判断鸟是否被撞到的  flag
    }

    show() {   //显示
        fill('green');
        if (this.beenhit) {
            fill(255, 0, 0);

        }

        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    update() {    //更新管道状态，这里是不断往左移动
        this.x -= this.speed;
    }
    offscreen() {     //判断是否跑出左边的屏幕
        if (this.x < -this.w) return true;
        else return false;
    }

    hit(bird) {   //判断鸟是否撞到
        if ((bird.y - 16) <= this.top || (bird.y + 16) >= (height - this.bottom)) {
            if ((bird.x + 16) >= this.x && (bird.x - 16) <= (this.x + this.w)) {
                this.beenhit = true;
                return true;
            }
        }
        this.beenhit = false;
        return false;
    }

    
}
