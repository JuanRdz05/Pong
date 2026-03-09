import playerConfiguration from "./configuration";
import k from "../CANVAS/canvas.js";

export function createPlayer(posX, tag) {
	return k.add([
		k.rect(playerConfiguration.width, playerConfiguration.height),
		k.pos(posX, k.height() / 2 - playerConfiguration.height / 2),
		k.color("#c99355"),
		k.area(),
		"player",
		tag,
		{
			//Establecemos la puntuación inicial del jugadro
			score: 0,
			//Función para actualizar la puntuación del jugador
			updateScore() {
				this.score += 1;
			},
		},
	]);
}
