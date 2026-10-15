const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 800 }, debug: false }
    },
    scene: { create, update }
};

const game = new Phaser.Game(config);
let player;
let deathCount = 0;

function create() {
    // Bolinha maior e centralizada
    player = this.add.circle(400, 300, 30, 0xff00ff); // Magenta Neon
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;

    // Quando bater na borda (topo ou chão)
    this.physics.world.on('worldbounds', (body, up, down) => {
        if (up || down) handleDeath();
    });

    // Clique para pular/inverter
    this.input.on('pointerdown', () => {
        player.body.velocity.y = -600; // Salto mais forte
        player.body.gravity.y *= -1;   // Inverte a gravidade
    });
}

function handleDeath() {
    deathCount++;
    player.setPosition(400, 300);
    player.body.velocity.y = 0;
    
    if (deathCount % 3 === 0) {
        alert("Ops! Assista a um anúncio para continuar!");
    }
}

function update() {}
