import playerConfig from "./configuration.js";
import k from "../CANVAS/canvas.js";
import ball from "../BALL/ball.js";

// En lugar de export const playerMovement = [...]
export const initPlayerControls = (p1, p2, playerConfig) => {
	// --- CONTROLES JUGADOR 1 (Izquierda) ---
	k.onKeyDown("w", () => {
		if (p1.pos.y > 0) {
			p1.move(0, -playerConfig.speed);
		}
	});

	k.onKeyDown("s", () => {
		if (p1.pos.y < k.height() - playerConfig.height) {
			p1.move(0, playerConfig.speed);
		}
	});

	// --- CONTROLES JUGADOR 2 (Derecha) ---
	k.onKeyDown("up", () => {
		if (p2.pos.y > 0) {
			p2.move(0, -playerConfig.speed);
		}
	});

	k.onKeyDown("down", () => {
		if (p2.pos.y < k.height() - playerConfig.height) {
			p2.move(0, playerConfig.speed);
		}
	});
};

//Función para que la pelote rebote en el jugador
export function bounceOnPlayer(player) {
	if (
		ball.pos.x > player.pos.x &&
		ball.pos.x < player.pos.x + playerConfig.width &&
		ball.pos.y > player.pos.y &&
		ball.pos.y < player.pos.y + playerConfig.height
	) {
		ball.vel.x *= -1;
	}
	//Necesitamos despegar un poco la pelota del jugador
	if (ball.pos.x < k.width() / 2) {
		ball.pos.x = player.pos.x + playerConfig.width;
	} else {
		ball.pos.x = player.pos.x - 1;
	}
}
