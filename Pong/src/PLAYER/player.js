import playerConfiguration from "./configuration";

const player = add([
	rect(playerConfiguration.width, playerConfiguration.height),
	pos(20, 20),
	color("#c99355"),
	area(),
	"player",
]);

export default player;
