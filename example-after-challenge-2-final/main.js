const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_SPEED = 300;
const BULLET_SPEED = 500;
const ENEMY_SPEED = 150;
const ENEMY_SPAWN_INTERVAL = 1000; // ms

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Core assets
    this.load.image("background", "assets/backgrounds/lvl_one_background.png");
    this.load.image("player", "assets/player_ships/playerShip1_blue.png");
    this.load.image("enemy", "assets/asteroids/meteorBrown_med1.png");
    this.load.image("bullet", "assets/bullets/player-bullet.png");
  }

  create() {
    // Background
    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "background");

    // Player
    this.player = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT - 80, "player");
    this.player.setCollideWorldBounds(true);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Groups
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 30,
    });

    this.enemies = this.physics.add.group();

    // Enemy spawn timer
    this.time.addEvent({
      delay: ENEMY_SPAWN_INTERVAL,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    // Collisions
    this.physics.add.overlap(
      this.bullets,
      this.enemies,
      this.handleBulletEnemyCollision,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.handlePlayerHit,
      null,
      this
    );

    // Score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "20px",
      color: "#ffffff",
    });
  }

  spawnEnemy() {
    const x = Phaser.Math.Between(40, GAME_WIDTH - 40);
    const enemy = this.enemies.create(x, -20, "enemy");
    enemy.setVelocityY(ENEMY_SPEED);
    enemy.setCollideWorldBounds(false);
  }

  fireBullet() {
    const bullet = this.bullets.get(this.player.x, this.player.y - 40, "bullet");
    if (!bullet) return;

    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.body.enable = true;
    bullet.setVelocityY(-BULLET_SPEED);
  }

  handleBulletEnemyCollision(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();
    this.addScore(10);
  }

  handlePlayerHit(player, enemy) {
    enemy.destroy();
    this.addScore(-5);
  }

  addScore(amount) {
    this.score += amount;
    this.scoreText.setText("Score: " + this.score);
  }

  update() {
    if (!this.player || !this.cursors) return;

    // Player movement
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-PLAYER_SPEED);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(PLAYER_SPEED);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-PLAYER_SPEED);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(PLAYER_SPEED);
    }

    // Shooting
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.fireBullet();
    }

    // Clean up off-screen bullets
    this.bullets.children.iterate((bullet) => {
      if (!bullet) return;
      if (bullet.active && bullet.y < -50) {
        bullet.destroy();
      }
    });

    // Clean up off-screen enemies
    this.enemies.children.iterate((enemy) => {
      if (!enemy) return;
      if (enemy.active && enemy.y > GAME_HEIGHT + 50) {
        enemy.destroy();
      }
    });
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
