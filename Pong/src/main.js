import kaplay from "kaplay";

const k = kaplay();

//Game objects
const obj = add([
	rect(25, 60), // Draw this object as a rectangle
	pos(10, 20), // Position this object in X: 10 and Y: 20
	"shape", // Classify this object as "shape"
]);

onKeyDown("left", () => {
	obj.move(-100, 0);
});

onKeyDown("right", () => {
	obj.move(200, 0); // Move the object while "right" key is held down
});

onKeyDown("up", () => {
	obj.move(0, -100);
});

onKeyDown("down", () => {
	obj.move(0, 100);
});

const isPlayer = obj.is("player");
debug.log(isPlayer);
