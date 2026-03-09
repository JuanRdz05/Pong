import k from "../../CANVAS/canvas";
import ballConfiguration from "../../BALL/ballConfiguration";

export const createTrail = (x, y) => {
	return k.add([
		k.circle(ballConfiguration.radius),
		k.pos(x, y),
		k.color("#a27745"),
		k.opacity(0.6),
		k.anchor("center"),
		k.z(-1),
		"trail",
		{
			lifetime: 0.5, // Duración total del rastro
			update() {
				// Calcular el progreso (0 a 1)
				this.lifetime -= k.dt();
				const progress = 1 - this.lifetime / 0.5;

				// Reducir opacidad de forma lineal
				this.opacity = 0.6 * (1 - progress);

				// Reducir radio con curva cuadrática (termina en punta)
				this.radius = ballConfiguration.radius * Math.pow(1 - progress, 2);

				// Limpieza
				if (this.lifetime <= 0) {
					k.destroy(this);
				}
			},
		},
	]);
};
