class Bird {
    constructor() {     //鸟的构造器
        this.y = height / 2;
        this.x = 200;
        this.gravity = 1;
        this.lift = -17;
        this.velocity = 0;
        this.score = 0;
        this.fitness = 0;
        this.movingtime = 0;
        this.nn = new NeuralNetwork(4, 4, 1);   //生成神经网络实例， 有4个输入， 4个隐藏结点，1个输出
    }
    show() {
        // ellipse(this.x, this.y, 16, 16);     //显示 方法
        stroke(200);
        fill(100 ,18,18, 150);
        ellipse(this.x, this.y, 32, 50);
    }

    makePrediction(pipes) {           //利用神经网络预测
        let inputs = [];
        let frontPipe = null;
        let distance = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let dist = pipes[i].x - this.x;
            if (dist < distance) {
                frontPipe = pipes[i];
                distance = dist;
            }
        }
        inputs[0] = this.y / height;     //定义4个输入
        inputs[1] = frontPipe.top / height;
        inputs[2] = frontPipe.bottom / height;
        inputs[3] = frontPipe.x / width;
        let output = this.nn.predict(inputs);  //这里输出为一个数组！！
        if (output[0] > 0.5) {
            this.up();
        }
    }

    calcFitness() {

    }

    mutate() {      //每代发生变异
        this.nn = this.nn.mutate(0.2);
    }
    update() {    //对鸟的状态进行更新
        this.velocity += this.gravity;
        this.velocity *= 0.9
        this.y += this.velocity;


        if (this.y > height) {  //不能超出下界
            this.y = height;
            this.velocity = 0;
        }
        if (this.y < 0) {   //不能超出上界
            this.y = 0;
            this.velocity = 0;
        }
    }
    up() {
        this.velocity += this.lift;    //上升
    }
}
