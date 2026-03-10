import k from "./CANVAS/canvas.js";
import { initPlayerControls } from "./PLAYER/controllers.js";
import playerConfiguration from "./PLAYER/configuration.js";
import { createPlayer } from "./PLAYER/player.js";
import createBall from "./BALL/ball.js";
import { initBallMovement, bounce } from "./BALL/CONTROLLERS/movement.js";
import { createGoal } from "./GOAL/goal.js";
import { detectGoal, ballEvents } from "./GOAL/detectarGol.js";
import { winnerPlayer } from "./WIN/win.js";
import Press2P from "./fonts/Press_Start_2P/PressStart2P-Regular.ttf";
import gameMusic from "./SOUNDS/game_music.wav";
import menuSound from "./SOUNDS/menu_sound.wav";
import "./SCENES/winner.js";

//FONT DEL JUEGO
k.loadFont("Press Start 2P", Press2P);
//MUSICA DEL JUEGO
k.loadSound("game_music", gameMusic);
//SFX del menu
k.loadSound("menu_sound", menuSound);

let musicHandle = null;
let isPaused = false;

k.scene("game", () => {
	const p1 = createPlayer(120, "p1");
	const p2 = createPlayer(k.width() - 120, "p2");
	const b = createBall();
	createGoal("left");
	createGoal("right");

	//Verificar que no haya musica activa
	if (musicHandle) {
		musicHandle.stop();
	}
	const maxScore = 7;
	//Inicializar el sistema
	initBallMovement(b);
	initPlayerControls(p1, p2, playerConfiguration);
	// Texto de puntuación
	const scoreP1 = k.add([
		k.text("0", {
			size: 60,
			width: 300,
			align: "center",
			font: "Press Start 2P",
		}),
		k.outline(6, k.rgb(150, 110, 60)),
		k.color(k.rgb(201, 147, 85)),
		k.pos(k.width() / 4, 50),
		k.anchor("center"),
		k.scale(1),
		k.animate({ relative: true }),
		k.z(100),
		{
			maxScore: maxScore,
		},
	]);

	const scoreP2 = k.add([
		k.text("0", {
			size: 60,
			width: 300,
			align: "center",
			font: "Press Start 2P",
		}),
		k.outline(6, k.rgb(150, 110, 60)),
		k.color(k.rgb(201, 147, 85)),
		k.pos((k.width() * 3) / 4, 50),
		k.anchor("center"),
		k.scale(1),
		k.animate({ relative: true }),
		k.z(100),
		{
			maxScore: maxScore,
		},
	]);

	//Lógica de colisiones
	ballEvents(b, p1, p2);
	detectGoal(p1, p2, scoreP1, scoreP2);

	const pauseText = k.add([
		k.text("PAUSA"),
		{
			font: "Press Start 2P",
		},
		k.pos(k.center()),
		k.anchor("center"),
		k.z(100),
		k.color("#121212"),
		k.opacity(0),
		k.fixed(), // Para que no se mueva si la cámara se moviera
	]);

	initPlayerControls(p1, p2, playerConfiguration);
	//Lógica para el ganador
	winnerPlayer(p1, p2);
	//Inicializamos la musica
	musicHandle = k.play("game_music", {
		volume: 0.3,
		speed: 1.2,
		loop: true,
	});

	k.onSceneLeave(() => {
		if (musicHandle) {
			musicHandle.stop("game_music");
		}
	});
	k.onKeyPress("escape", () => {
		k.play("menu_sound", { volume: 0.3, speed: 1.2 });

		isPaused = !isPaused;
		// Esto congela TODO el motor (movimiento, cronómetros y updates)
		k.debug.paused = isPaused;

		pauseText.opacity = isPaused ? 1 : 0;
	});
	k.onKeyPress("r", () => {
		if (k.debug.paused) {
			k.debug.paused = false;
			if (musicHandle) musicHandle.stop();
			k.go("game");
		}
	});
});

k.onLoad(() => {
	console.log("Cargando assets del juego...");
	k.go("game");
});
