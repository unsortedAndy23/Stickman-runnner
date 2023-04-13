const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1000,
		height: 460
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
const game = new Phaser.Game(config);

//game configs
let speed = 1;
let bg, clouds, bamboo, stickman, object, gameOvr, overTxt, banner; 
let runAnim;
let gameState = "start";

function preload() {
this.load.image('bg', 'assets/bg.png');
this.load.image('clouds', 'assets/clouds.png');
this.load.image('bamboo', 'assets/bamboo.png');
this.load.image('car', 'assets/car.png');
this.load.image('shark', 'assets/shark.png');
this.load.image('gameOver', 'assets/gameover.png');
this.load.image('banner', 'assets/banner.png');
this.load.spritesheet('running', 'assets/running.png', { frameWidth: 204, frameHeight: 244, endFrame: 4 });
}

function create() {
    bg = this.add.image(1000, 230, 'bg').setScale(0.5).setOrigin(0.5);
    clouds = this.add.image(500, 130, 'clouds').setScale(0.5).setOrigin(0.5);
    bamboo = this.add.image(800, 280, 'bamboo').setScale(0.4).setOrigin(0.5);
    stickman = this.add.sprite(100, 230, 'running', 0).setScale(0.4);
    banner = this.add.sprite(200, 80, 'banner', 0).setScale(0.7)
    this.add.text(160, 100, "Made by @unsortedAndy23", { font:"20px Arial", fill:"#000000"})
    this.add.text(500, 400, "PRESS 'SPACE' TO FLIP", { font:"20px Arial", fill:"#000000"}).setOrigin(0.5)
    gameOvr = this.add.sprite(560, 80, 'gameOver', 0).setScale(0.4)
    gameOvr.visible = false;
    overTxt = this.add.text(500, 40, "RELOAD TO RESTART", { font:"20px Arial", fill:"#000000"}).setOrigin(0.5)
    .visible = false;


    //animation
     runAnim =  stickman.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('running', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    stickman.anims.play('run');
    
    //input
    this.input.keyboard.on('keydown-SPACE', function(event) {
        if(gameState !== 'start') return;
        if(stickman.y === 230){
        stickman.y = 336;
        stickman.flipY = true;
        }else if(stickman.y === 336){
            stickman.y = 230;
            stickman.flipY = false;
        }
    });
    //touch support
    this.input.on('pointerdown', function(pointer) {
        if(gameState !== 'start') return;
        if(stickman.y === 230){
        stickman.y = 336;
        stickman.flipY = true;
        }else if(stickman.y === 336){
            stickman.y = 230;
            stickman.flipY = false;
        }
    });

    // Create a timer event that fires every x seconds
this.time.addEvent({
    delay: 1/speed * 4000,
    loop: true,
    callback: () => {
        if(gameState !== 'start') return;
      let num = (Math.random() < 0.5)
      const sprite = this.add.sprite(1000, num ? 210 : 360, num ? 'car': 'shark');
      sprite.setScale(num ? 0.6 : 0.8)
  
      // Set a custom property to track whether the sprite is alive or not
      sprite.alive = true;
  
      // Add the sprite to the game scene
      this.add.existing(sprite);
    }
  });
  

  
}

function update() {
    if(gameState !== 'start') return;
    //setting speed
    if(gameState === 'start') speed += 0.003
    bg.x -= 1 * speed;
    clouds.x -= 0.5 * speed;
    bamboo.x -= 2 * speed;
    runAnim.frameRate = 100;

    //loops
    if(bg.x < 0) bg.x = 690;
    if(clouds.x < 0)clouds.x = 690;
    if(bamboo.x < 250)bamboo.x = 490;

    this.children.each((sprite) => {

        if (sprite.alive){
            sprite.x -= 2 * speed;
            if(sprite.x < 10){
            sprite.alive = false;
            sprite.destroy();
            }
            if(((sprite.x < stickman.x+ 40)&& (sprite.x > stickman.x- 40))){
                if((sprite.y === 210 && stickman.y === 230)||(sprite.y === 360 && stickman.y === 336)){
                    gameOvr.visible = true;
                    overTxt.visible = true;
                    speed = 0;
                    stickman.anims.pause()
                    console.log("Game over!")
                    gameState = 'end';
                }
            }
        }
      });
}

