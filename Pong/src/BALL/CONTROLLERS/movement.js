import ball from "../ball.js";
import k from "../../CANVAS/canvas.js";
import ballConfiguration from "../ballConfiguration.js";

export function initBallMovement(ball) {
	//Velocidad original 500
	const speed = 500;
	const angle = rand(0, 360);
	ball.vel.x = speed;
	ball.vel.y = Math.cos(angle) * speed;
	//Velocidad inicial
	console.log("Velocidad inicial: " + ball.vel);
}

//Función para que la pelota rebote en la parte superior e inferior de la pantalla
export function bounce(ball) {
	if (ball.pos.y + ballConfiguration.radius > k.height()) {
		ball.pos.y = k.height() - ballConfiguration.radius;
		ball.vel.y *= -1;
	} else if (ball.pos.y - ballConfiguration.radius < 0) {
		ball.pos.y = ballConfiguration.radius;
		ball.vel.y *= -1;
	}
}
