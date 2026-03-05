import player from "./player.js";
import playerConfig from "./configuration.js";
import k from "../CANVAS/canvas.js";

const limits = {
	y: k.height - playerConfig.height,
};

const playerMovement = [
	onKeyDown("w", () => {
		if (player.pos.y > 0) {
			player.move(0, -playerConfig.speed);
		}
	}),
	onKeyDown("s", () => {
		// Obtenemos el alto actual con k.height()
		const limitY = k.height() - playerConfig.height;

		if (player.pos.y < limitY) {
			player.move(0, playerConfig.speed);
		}
	}),
];

export default playerMovement;
