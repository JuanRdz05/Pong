import k from "../CANVAS/canvas.js";
import createBall from "../BALL/ball.js";
import { initBallMovement } from "../BALL/CONTROLLERS/movement";
import { bounce } from "../BALL/CONTROLLERS/movement";

export function detectGoal(p1, p2, scoreP1, scoreP2) {
	k.onCollide("ball", "goal", (ball, goal) => {
		if (goal.is("left")) {
			//Anoto el jugador de la derecha
			p2.updateScore();
			scoreP2.text = p2.score;
		} else if (goal.is("right")) {
			//Anoto el jugador de la izquierda
			p1.updateScore();
			scoreP1.text = p1.score;
		}

		k.destroy(ball);
		k.wait(1, () => {
			const newBall = createBall();
			initBallMovement(newBall);
			ballEvents(newBall, p1, p2);
		});
	});
}

export function ballEvents(ball, p1, p2) {
	//Función para rebotar en las paredes
	ball.onUpdate(() => {
		bounce(ball);
	});
	ball.onCollide("player", (p) => {
		ball.vel.x = -ball.vel.x;

		const accelX = 125;
		ball.vel.x += ball.vel.x > 0 ? accelX : -accelX;

		//Caluculamos la distancia relativa al centro del jugador
		const centerPlayer = p.pos.y + p.height / 2;
		const centerBall = ball.pos.y;

		//Normalizamos el impacto
		const normalizedImpact = (centerBall - centerPlayer) / p.height;

		//Aplicamos la intensidad del impacto
		const bounceIntensity = 1200;
		ball.vel.y = normalizedImpact * bounceIntensity;

		if (ball.pos.x < k.width() / 2) {
			ball.pos.x = p.pos.x + p.width + (ball.radius || 0) + 1;
		} else {
			ball.pos.x = p.pos.x - (ball.radius || 0) - 1;
		}

		console.log("Nuevo vector de velocidad:", ball.vel);
	});
}
