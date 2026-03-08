import ballConfiguration from "./ballConfiguration.js";
import k from "../CANVAS/canvas.js";

export default function createBall() {
	return k.add([
		circle(ballConfiguration.radius),
		pos(ballConfiguration.position_x, ballConfiguration.position_y),
		color("#c99355"),
		area(),
		body({
			mass: 1,
			isStatic: false,
		}),
		"ball",
	]);
}
