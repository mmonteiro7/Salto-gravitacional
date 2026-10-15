const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 1000 }, debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);
let player;

function preload() {}

function create() {
    // Criando a bolinha neon
    player = this.add.circle(400, 300, 20, 0x00ffcc);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // Evento de toque
    this.input.on('pointerdown', () => {
        player.body.velocity.y = -500;
        player.body.gravity.y *= -1; // Inverte a gravidade
    });
}

function update() {}
