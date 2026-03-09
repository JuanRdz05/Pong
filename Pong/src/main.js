import k from "./CANVAS/canvas.js";
import { initPlayerControls } from "./PLAYER/controllers.js";
import playerConfiguration from "./PLAYER/configuration.js";
import { createPlayer } from "./PLAYER/player.js";
import createBall from "./BALL/ball.js";
import { initBallMovement, bounce } from "./BALL/CONTROLLERS/movement.js";
import { createGoal } from "./GOAL/goal.js";
import { detectGoal, ballEvents } from "./GOAL/detectarGol.js";

k.scene("game", () => {
	const p1 = createPlayer(120, "p1");
	const p2 = createPlayer(k.width() - 120, "p2");
	const b = createBall();
	createGoal("left");
	createGoal("right");

	//Inicializar el sistema
	initBallMovement(b);
	initPlayerControls(p1, p2, playerConfiguration);

	//Lógica de colisiones
	ballEvents(b, p1, p2);
	detectGoal(p1, p2);

	const pauseText = k.add([
		k.text("PAUSA"),
		k.pos(k.center()),
		k.anchor("center"),
		k.z(100),
		k.color("#121212"),
		k.opacity(0),
		k.fixed(), // Para que no se mueva si la cámara se moviera
	]);

	initPlayerControls(p1, p2, playerConfiguration);

	k.onKeyPress("escape", () => {
		k.debug.paused = !k.debug.paused;
		pauseText.opacity = k.debug.paused ? 1 : 0;
	});

	k.onKeyPress("r", () => {
		k.debug.paused = false;
		k.go("game");
	});
});

// Arrancamos el motor
k.go("game");
