import k from "../../CANVAS/canvas.js";
export const createTrail = (ball) => {
	if (!ball || !ball.vel || ball.vel.len() === 0) return;

	const currentSpeed = ball.vel.len();
	const direction = ball.vel.unit();
	const perpendicular = direction.normal();

	// Configuración dinámica basada en la velocidad
	const config = {
		length: k.map(currentSpeed, 0, 700, 10, 30),
		width: (ball.radius || 8) * 2,
		duration: 0.2,
		color: ball.color || k.rgb(162, 119, 69),
		opacity: 0.5,
	};

	const halfWidth = config.width / 2;
	// Puntos del trapecio
	const p1 = perpendicular.scale(halfWidth);
	const p2 = perpendicular.scale(-halfWidth);
	const p3 = direction.scale(-config.length).add(perpendicular.scale(-0.5));
	const p4 = direction.scale(-config.length).add(perpendicular.scale(0.5));

	return k.add([
		k.pos(ball.pos),
		k.polygon([p1, p4, p3, p2]),
		k.color(config.color),
		k.opacity(config.opacity),
		k.z(-1),
		"trail",
		{
			elapsed: 0,
			update() {
				this.elapsed += k.dt();
				const progress = Math.min(this.elapsed / config.duration, 1);
				this.opacity = config.opacity * (1 - progress);

				if (progress >= 1) {
					k.destroy(this);
				}
			},
		},
	]);
};
