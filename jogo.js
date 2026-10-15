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

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { gravity: { y: 800 } } },
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);

// CENA DE MENU
class MenuScene extends Phaser.Scene {
    constructor() { super('MenuScene'); }
    create() {
        this.add.text(400, 250, 'GRAVITY CLIMB', { fontSize: '64px', fill: '#00ffcc' }).setOrigin(0.5);
        let btn = this.add.rectangle(400, 400, 200, 60, 0xff00ff).setInteractive();
        this.add.text(400, 400, 'PLAY', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        
        btn.on('pointerdown', () => this.scene.start('GameScene'));
    }
}

// CENA DO JOGO
class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }
    create() {
        this.cameras.main.setBackgroundColor('#000033'); // Começa azul escuro
        this.player = this.add.circle(400, 550, 20, 0xffffff);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        
        this.level = 0;
        this.input.on('pointerdown', () => {
            this.player.body.velocity.y = -500;
            this.player.body.gravity.y *= -1;
            this.updateBackground();
        });
    }

    updateBackground() {
        this.level++;
        // Muda cor conforme sobe
        let colors = [0x000033, 0x330033, 0x333300, 0x000000];
        let newColor = colors[Math.min(this.level % colors.length, 3)];
        this.cameras.main.setBackgroundColor(newColor);
        
        // Aqui você adicionaria lógica para criar nuvens ou foguetes
        if(this.level > 5) this.add.text(100, 100, 'NUVENS...', {fill: '#fff'});
    }
}
