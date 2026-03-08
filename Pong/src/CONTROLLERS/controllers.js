import k from "../CANVAS/canvas.js";

const pauseText = k.add([
	k.text("PAUSA"),
	k.pos(k.center()),
	k.anchor("center"),
	k.z(100),
	k.color("#121212"),
	k.opacity(0),
]);

const controller = k.onKeyPress("escape", () => {
	k.debug.paused = !k.debug.paused;

	if (k.debug.paused) {
		pauseText.opacity = 1;
		console.log("Juego Pausado");
	} else {
		pauseText.opacity = 0;
		console.log("Juego Reanudado");
	}
});

export default controller;
