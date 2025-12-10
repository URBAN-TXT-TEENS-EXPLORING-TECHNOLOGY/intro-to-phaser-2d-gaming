const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Load background and player assets
    this.load.image("background", "assets/backgrounds/lvl_one_background.png");
    this.load.image("player", "assets/player_ships/playerShip1_blue.png");
  }

  create() {
    // Add background centered in the game
    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "background");

    // Create player sprite near the bottom center
    this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 80, "player");
    this.player.setCollideWorldBounds(true);

    // Create cursor keys for input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (!this.cursors || !this.player) return;

    const speed = 300; // pixels per second

    // Reset velocity each frame
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: MainScene,
};

new Phaser.Game(config);
