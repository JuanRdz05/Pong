import ball from "../ball.js";
import k from "../../CANVAS/canvas.js";
import ballConfiguration from "../ballConfiguration.js";

export function initBallMovement(ball) {
	const speed = 500;
	//Decidimos si la poelta ira hacía la derecha o la izquierda
	const direction = Math.random() > 0.5 ? 0 : Math.PI;
	//Ajusta el angulo a 45 grados
	const spread = Math.PI / 4;
	//Generamos un valor aleatorio entre 0 y spread
	const angle = direction + (Math.random() * spread - spread / 2);

	ball.vel.x = Math.cos(angle) * speed;
	ball.vel.y = Math.sin(angle) * speed;
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
