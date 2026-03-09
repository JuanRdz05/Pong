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
		// Invertimos la velocidad en X
		ball.vel.x = -ball.vel.x;
		if (ball.pos.x < k.width() / 2) {
			//Jugador de la izquierda
			//Aumento de velocidad
			ball.vel.x += 20;
			ball.vel.y -= 30;
			ball.pos.x = p.pos.x + p.width + (ball.radius || 0) + 1;
		} else {
			//Jugador de la derecha
			//Aumento de velocidad
			ball.vel.x -= 20;
			ball.vel.y += 30;
			ball.pos.x = p.pos.x - (ball.radius || 0) - 1;
		}
		//Aumentar la velocidad por cada golpe

		console.log("¡Rebote con jugador!");
		console.log("Velocidad de la pelota: " + ball.vel);
	});
}
