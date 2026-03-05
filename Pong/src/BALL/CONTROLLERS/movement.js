import ball from "../ball.js";
import k from "../../CANVAS/canvas.js";
import ballConfiguration from "../ballConfiguration.js";

//Velocidades
ball.vel.x = -200;
ball.vel.y = -500;

//Función para que la pelota rebote en la parte superior e inferior de la pantalla
function bounce(ball) {
	if (ball.pos.y + ballConfiguration.radius > k.height()) {
		ball.pos.y = k.height() - ballConfiguration.radius;
		ball.vel.y *= -1;
	} else if (ball.pos.y - ballConfiguration.radius < 0) {
		ball.pos.y = ballConfiguration.radius;
		ball.vel.y *= -1;
	}
}

k.onUpdate(() => {
	bounce(ball);
});

export default bounce;
