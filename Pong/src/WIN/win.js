import k from "../CANVAS/canvas.js";

export function winnerPlayer(p1, p2) {
	const maxScore = 1;
	k.onUpdate(() => {
		if (p1.score >= maxScore) {
			k.debug.log("El jugador 1 ha ganado!");
		} else if (p2.score >= maxScore) {
			k.debug.log("El jugador 2 ha ganado!");
		}
	});
}
