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

function preload() {

}

function create() {

}

function update() {

}