import playerConfiguration from "./configuration";
import k from "../CANVAS/canvas.js";

export function createPlayer1() {
	return k.add([
		k.rect(playerConfiguration.width, playerConfiguration.height),
		k.pos(120, k.height() / 2 - playerConfiguration.height / 2),
		k.color("#c99355"),
		k.area(),
		"player",
	]);
}

export function createPlayer2() {
	return k.add([
		k.rect(playerConfiguration.width, playerConfiguration.height),
		k.pos(k.width() - 120, k.height() / 2 - playerConfiguration.height / 2),
		k.color("#c99355"),
		k.area(),
		"player",
	]);
}
