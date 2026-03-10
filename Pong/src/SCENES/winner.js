// PARTICLE/SCENES/winner.js (o la ruta donde lo tengas)
import k from "../CANVAS/canvas.js";

k.scene("winner", (data) => {
	k.add([
		k.text(`¡GANADOR: ${data.winnerName}!`),
		k.pos(k.center()),
		k.anchor("center"),
	]);

	k.onKeyPress("enter", () => k.go("game"));
});
