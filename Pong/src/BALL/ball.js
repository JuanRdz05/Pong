import ballConfiguration from "./ballConfiguration.js";
import k from "../CANVAS/canvas.js";

export default function createBall() {
	return k.add([
		k.circle(ballConfiguration.radius),
		k.pos(ballConfiguration.position_x, ballConfiguration.position_y),
		k.color("#c99355"),
		k.area(),
		k.offscreen(),
		k.body({
			mass: 1,
			isStatic: false,
		}),
		k.outline(2, k.rgb(184, 124, 57)),

		"ball",
	]);
}
