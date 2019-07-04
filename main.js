//let bird;
let birds = [];    //存储一群鸟~
let pipes = [];   //存储管道
let count = -1;

let counter = 0;
const popultion = 300;  //种群数量
function setup() {
    createCanvas(500, 500);
    pipes.push(new Pipe());
    for (let i = 0; i < popultion; i++) {
        birds[i] = new Bird();
    }

}
function draw() {
    background('azure');

    if (frameCount % 90 == 0) {
        pipes.push(new Pipe());
        count++;
    }


    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
        for (let j = birds.length - 1; j >= 0; j--) {  //撞上柱子的鸟都消失
            if (pipes[i].hit(birds[j])){
                birds.splice(j, 1);
            }

        }
        // if (pipes[i].hit(bird)) {
        //     count = 0;
        //     console.log('Hit!!!');
        // }
        // if (!pipes[i].hit(bird)) {
        //     if ((bird.x - 16) >= (pipes[i].x + pipes[i].w)) {
        //         bird.score = count;
        //         console.log('score: ' + bird.score);
        //         return true;
        //     }
        // }
    }
    for (let bird of birds) {
        bird.update();
        bird.makePrediction(pipes);
        bird.show();
    }
}

function keyPressed() {
    if (key == ' ') {
        console.log('space');
        bird.up();
    }
}


// function bird_pass(pipe) {
//     if (!pipe.hit(bird)) {
//         if ((bird.x - 16) > (pipe.x + pipe.w)) {
//             bird.score++;
//             return true;
//         }
//     }
//     return false;
// }