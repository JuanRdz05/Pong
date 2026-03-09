import k from "../CANVAS/canvas.js";

export function createGoal(side) {
	//Crea una variable que indica si el side es left, entonces será verdadero
	const isLeft = side === "left";
	return k.add([
		k.rect(20, k.height()),
		k.pos(isLeft ? 0 : k.width(), 0),
		k.color("#c99355"),
		k.anchor(isLeft ? "topleft" : "topright"),
		k.area(),
		"goal",
		side,
	]);
}
