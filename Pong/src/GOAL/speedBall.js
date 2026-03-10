import k from "../CANVAS/canvas.js";

export function speedBall(MaxSpeed, ballSpeed, ball) {
	const speedPhase1 = 600;
	const speedPhase2 = 1000;
	if (Math.abs(ballSpeed) >= speedPhase1) {
		ball.use(k.color("#c39762"));
	}
	if (Math.abs(ballSpeed) >= speedPhase2) {
		ball.use(k.color("#e38820"));
	}
	if (Math.abs(ballSpeed) >= MaxSpeed) {
		ball.use(k.color("#f6f2ed"));
	}
}
