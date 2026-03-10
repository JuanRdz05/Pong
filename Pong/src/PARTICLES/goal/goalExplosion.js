import k from "../../CANVAS/canvas";

const colors = ["#916a3d", "#e2b078", "#ffffff", "#fec859"];

const createParticle = (x, y, dirX) => {
	return k.add([
		k.circle(k.rand(4, 12)),
		k.pos(x, y),
		k.color(k.choose(colors)),
		k.opacity(1),
		k.anchor("center"),
		k.body(),
		k.area(),
		"impact-spark",
		{
			add() {
				// En lugar de k.move, les damos un "impulso" inicial aleatorio
				this.vel.x = dirX * k.rand(200, 600);
				this.vel.y = k.rand(-200, 200);
			},
			update() {
				this.opacity -= k.dt() * 1.5;
				if (this.opacity <= 0) k.destroy(this);
				this.scale = k.vec2(this.opacity);
			},
		},
	]);
};

export const createGoalExplosion = (hitPos, side) => {
	k.shake(20);

	const direccion = side === "left" ? 1 : -1;
	for (let i = 0; i < 30; i++) {
		createParticle(hitPos.x, hitPos.y, direccion);
	}
};
