const config = {
    type: Phaser.AUTO,
    parent: 'game-container', // Isso liga ao div do HTML
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 1000 } }
    },
    scene: { create, update }
};

const game = new Phaser.Game(config);
let player;
let deathCount = 0;

function create() {
    // Criando a bolinha neon (Cyan)
    player = this.add.circle(400, 300, 20, 0x00ffcc);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;

    this.physics.world.on('worldbounds', () => {
        handleDeath();
    });

    this.input.on('pointerdown', () => {
        player.body.velocity.y = -500;
        player.body.gravity.y *= -1; 
    });
}

function handleDeath() {
    deathCount++;
    player.setPosition(400, 300);
    player.body.velocity.y = 0;
    
    if (deathCount % 3 === 0) {
        alert("Ops! Assista a um anúncio para continuar o desafio!");
    }
}

function update() {}
