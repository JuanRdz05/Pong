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

function colors(score) {
	const paletaColores = [
		k.rgb(255, 220, 150),
		k.rgb(255, 180, 100),
		k.rgb(230, 126, 34),
		k.rgb(201, 147, 85),
		k.rgb(180, 100, 50),
		k.rgb(120, 70, 30),
		k.rgb(180, 100, 50),
		k.rgb(201, 147, 85),
	];

	let i = 0;

	function runNextTween() {
		if (i >= paletaColores.length) return;
		k.tween(
			score.color,
			paletaColores[i],
			0.1,
			(v) => (score.color = v),
			k.easings.easeOutElastic,
		).then(() => {
			i++;
			runNextTween(); // Llama al siguiente color cuando este termina
		});
	}

	runNextTween();
}

function tweenScale(score) {
	const escalas = [k.vec2(0.8), k.vec2(1), k.vec2(1.5), k.vec2(1)];
	let i = 0;

	function loopTween() {
		if (i >= escalas.length) return;

		k.tween(
			score.scale,
			escalas[i],
			0.15,
			(v) => (score.scale = v),
			k.easings.easeOutBack,
		).then(() => {
			i++;
			loopTween();
		});
	}

	loopTween();
}

function tweenScore(score) {
	tweenScale(score);
	colors(score);
}

function scoreAnimation(score) {
	score.animate(
		"color",
		[
			k.rgb(255, 220, 150),
			k.rgb(255, 180, 100),
			k.rgb(230, 126, 34),
			k.rgb(201, 147, 85),
			k.rgb(180, 100, 50),
			k.rgb(120, 70, 30),
			k.rgb(180, 100, 50),
			k.rgb(201, 147, 85),
		],
		{
			loop: true,
			easing: k.easings.easeOutElastic,
			duration: 0.2,
		},
	);
}

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
			tweenScore(scoreP2);
			if (p2.score >= p2.maxScore - 1) {
				scoreAnimation(scoreP2);
			}
			victoryPlayer(p2, "Jugador 2");
		} else if (goal.is("right")) {
			//Anoto el jugador de la izquierda
			p1.updateScore();
			tweenScore(scoreP1);
			scoreP1.text = p1.score;
			if (p1.score >= p1.maxScore - 1) {
				scoreAnimation(scoreP1);
			}
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
	if (player.score >= player.maxScore) {
		k.wait(1, () => {
			k.go("winner", { winnerName: name });
		});
	}
}

export function ballEvents(ball, p1, p2) {
	ball.onUpdate(() => {
		if (ball.paused) return;
		bounce(ball);

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
