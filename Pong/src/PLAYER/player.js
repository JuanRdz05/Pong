import playerConfiguration from "./configuration";

const player = add([
	rect(playerConfiguration.width, playerConfiguration.height),
	pos(20, 20),
	color(50, 50, 50),
	area(),
	"player",
]);

export default player;
