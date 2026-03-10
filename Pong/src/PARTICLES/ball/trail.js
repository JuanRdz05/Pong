import k from "../../CANVAS/canvas";

export const createTrail = (ball) => {
	if (!ball || !ball.vel || ball.vel.len() === 0) return;

	// 1. Obtenemos la dirección de la bola y su perpendicular (normal)
	const dir = ball.vel.unit(); // Hacia dónde va
	const norm = dir.normal(); // El "ancho" (hacia los lados)

	const length = 45;
	const ballRadius = ball.radius || 8;
	const p1 = norm.scale(ballRadius); // Esquina superior base
	const p4 = norm.scale(-ballRadius); // Esquina inferior base
	const p2 = dir.scale(-length).add(norm.scale(1)); // Punta arriba (ancho casi 0)
	const p3 = dir.scale(-length).add(norm.scale(-1)); // Punta abajo (ancho casi 0)

	return k.add([
		k.pos(ball.pos),
		k.polygon([p1, p2, p3, p4]), // Dibuja la forma cerrada
		k.color("#a27745"),
		k.opacity(0.4),
		k.z(-1),
		"trail",
		{
			update() {
				this.opacity -= k.dt() * 4;
				if (this.opacity <= 0) k.destroy(this);
			},
		},
	]);
};
