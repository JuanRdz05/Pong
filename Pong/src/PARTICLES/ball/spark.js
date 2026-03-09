import k from "../../CANVAS/canvas";
import ballConfiguration from "../../BALL/ballConfiguration";

const createSpark = (x, y) => {
	return k.add([
		k.circle(k.rand(3, 7)),
		k.pos(x, y),
		k.color("#ffffff"),
		k.opacity(1),
		k.anchor("center"),
		k.move(k.rand(0, 360), k.rand(50, 150)),
		k.z(-1),
		k.offscreen({ destroy: true }),
		"impact-spark",
		{
			update() {
				this.opacity -= k.dt() * 3;
				if (this.opacity <= 0) k.destroy(this);
			},
		},
	]);
};

export const spawnSparks = (hitPos) => {
	for (let i = 0; i < 2; i++) {
		createSpark(hitPos.x, hitPos.y);
	}
};
