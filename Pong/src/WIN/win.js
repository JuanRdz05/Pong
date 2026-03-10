import k from "../CANVAS/canvas.js";

export function winnerPlayer(p1, p2) {
	k.onUpdate(() => {
		if (p1.score >= p1.maxScore) {
		} else if (p2.score >= p2.maxScore) {
		}
	});
}
