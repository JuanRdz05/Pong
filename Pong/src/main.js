import k from "./CANVAS/canvas.js";
import { initPlayerControls } from "./PLAYER/controllers.js";
import playerConfiguration from "./PLAYER/configuration.js";
import { createPlayer1, createPlayer2 } from "./PLAYER/player.js";
import createBall from "./BALL/ball.js";
import { initBallMovement, bounce } from "./BALL/CONTROLLERS/movement.js";

k.scene("game", () => {
	// 1. Instanciamos los objetos usando las funciones "fábrica"
	const p1 = createPlayer1();
	const p2 = createPlayer2();
	const b = createBall();

	initBallMovement(b);

	const pauseText = k.add([
		k.text("PAUSA"),
		k.pos(k.center()),
		k.anchor("center"),
		k.z(100),
		k.color("#121212"),
		k.opacity(0),
		k.fixed(), // Para que no se mueva si la cámara se moviera
	]);

	// 2. Inicializar controles pasándoles los objetos recién creados
	initPlayerControls(p1, p2, playerConfiguration);

	// 3. Lógica de colisión mejorada
	b.onCollide("player", (p) => {
		// Invertimos la velocidad en X
		b.vel.x = -b.vel.x;
		if (b.pos.x < k.width() / 2) {
			b.pos.x = p.pos.x + p.width + (b.radius || 0) + 1;
		} else {
			b.pos.x = p.pos.x - (b.radius || 0) - 1;
		}

		console.log("¡Rebote con jugador!");
	});
	k.onKeyPress("escape", () => {
		k.debug.paused = !k.debug.paused;
		pauseText.opacity = k.debug.paused ? 1 : 0;
	});

	k.onKeyPress("r", () => {
		k.debug.paused = false;
		k.go("game");
	});

	k.onUpdate(() => {
		bounce(b);
	});
});

// Arrancamos el motor
k.go("game");
