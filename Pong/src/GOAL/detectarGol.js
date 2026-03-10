import k from "../CANVAS/canvas.js";
import createBall from "../BALL/ball.js";
import { initBallMovement } from "../BALL/CONTROLLERS/movement";
import { bounce } from "../BALL/CONTROLLERS/movement";
import { createTrail } from "../PARTICLES/ball/trail";
import { spawnSparks } from "../PARTICLES/ball/spark";
import { createGoalExplosion } from "../PARTICLES/goal/goalExplosion";
import { speedBall } from "../GOAL/speedBall";
import hitSound from "../SOUNDS/hit_sound.wav";
import goalSound from "../SOUNDS/goal_sound.wav";

//Cargamos el sonido de impacto
k.loadSound("impact", hitSound);
k.loadSound("goal_sound", goalSound);
let goalHandle = null;

export function detectGoal(p1, p2, scoreP1, scoreP2) {
	k.onCollide("ball", "goal", (ball, goal) => {
		goalHandle = k.play("goal_sound", {
			volume: 2,
			speed: 2,
		});

		createGoalExplosion(ball.pos, goal.is("left") ? "left" : "right");

		if (goal.is("left")) {
			//Anoto el jugador de la derecha
			p2.updateScore();
			scoreP2.text = p2.score;
			victoryPlayer(p2, "Jugador 2");
		} else if (goal.is("right")) {
			//Anoto el jugador de la izquierda
			p1.updateScore();
			scoreP1.text = p1.score;
			victoryPlayer(p1, "Jugador 1");
		}
		k.destroy(ball);
		k.wait(1, () => {
			const newBall = createBall();
			initBallMovement(newBall);
			ballEvents(newBall, p1, p2);
		});
	});
}

function victoryPlayer(player, name) {
	if (player.score >= 1) {
		k.go("winner", { winnerName: name });
	}
}

export function ballEvents(ball, p1, p2) {
	ball.onUpdate(() => {
		bounce(ball); //

		const speedPhase1 = 600;
		if (Math.abs(ball.vel.x) >= speedPhase1) {
			createTrail(ball);
		}
	});
	ball.onCollide("player", (p) => {
		if (
			(ball.vel.x > 0 && ball.vel.x < 1000) ||
			(ball.vel.x < 0 && ball.vel.x > -1000)
		) {
			k.play("impact", {
				volume: 0.6,
				speed: 2.5,
			});
		}
		spawnSparks(ball.pos);
		ball.vel.x = -ball.vel.x;

		const speedMultiplier = 1.2;
		ball.vel.x *= speedMultiplier;
		if (ball.vel.x > 1000 || ball.vel.x < -1000) {
			k.shake(10);
			k.play("impact", {
				volume: 0.8,
				speed: 2.5,
			});
		}
		//Agregamos un limite de velocidad
		const maxSpeed = 1800;
		if (Math.abs(ball.vel.x) >= maxSpeed) {
			ball.vel.x = ball.vel.x > 0 ? maxSpeed : -maxSpeed;
		}

		speedBall(maxSpeed, ball.vel.x, ball);
		//Caluculamos la distancia relativa al centro del jugador
		const centerPlayer = p.pos.y + p.height / 2;
		const centerBall = ball.pos.y;

		//Normalizamos el impacto
		const normalizedImpact = (centerBall - centerPlayer) / p.height;

		//Aplicamos la intensidad del impacto
		const bounceIntensity = 1000;
		ball.vel.y = normalizedImpact * bounceIntensity;

		if (ball.pos.x < k.width() / 2) {
			ball.pos.x = p.pos.x + p.width + (ball.radius || 0) + 1;
		} else {
			ball.pos.x = p.pos.x - (ball.radius || 0) - 1;
		}

		console.log("Nuevo vector de velocidad:", ball.vel);
	});
}
