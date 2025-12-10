const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Assets will be loaded here during the lesson.
    // Example (later):
    // this.load.image("background", "assets/backgrounds/lvl_one_background.png");
    // this.load.image("player", "assets/player_ships/playerShip1_blue.png");
  }

  create() {
    // Game objects will be created here.
    // For now, we just set a background color so students
    // know the game is running.
    this.cameras.main.setBackgroundColor("#050711");

    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2, "Phaser Game Starter", {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 40, "Session 1: We will add a background and player here.", {
        fontSize: "14px",
        color: "#9ca3af",
      })
      .setOrigin(0.5);
  }

  update(time, delta) {
    // Movement and game logic will be added during the lesson.
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
