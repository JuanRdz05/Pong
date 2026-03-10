import playerConfiguration from "./configuration";
import k from "../CANVAS/canvas.js";

export function createPlayer(posX, tag) {
	const isLeft = posX < k.width() / 2;

	return k.add([
		k.rect(playerConfiguration.width, playerConfiguration.height, {
			radius: 15,
		}),
		k.pos(posX, k.height() / 2 - playerConfiguration.height / 2),
		k.color("#c99355"),
		k.area({
			shape: new k.Rect(k.vec2(0), 1, playerConfiguration.height),
			offset: k.vec2(isLeft ? playerConfiguration.width : 0, 0),
		}),
		"player",
		tag,
		{
			score: 0,
			updateScore() {
				this.score += 1;
			},
		},
	]);
}
