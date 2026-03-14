import k from "../CANVAS/canvas.js";

export function boxes(targetScene) {
	const size = 100;
	const cols = Math.ceil(k.width() / size);
	const rows = Math.ceil(k.height() / size);
	const totalBoxes = cols * rows;
	let filledBoxes = 0;

	// CAPA 1: CUBRIR LA PANTALLA ACTUAL
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const delay = (x + y) * 0.05;

			k.wait(delay, () => {
				const b = k.add([
					k.rect(size, size),
					k.pos(x * size + size / 2, y * size + size / 2),
					k.anchor("center"),
					k.color(20, 20, 20),
					k.scale(0),
					k.z(1000), // Súper arriba
					k.fixed(),
				]);

				k.tween(
					0,
					1.1,
					0.2,
					(s) => (b.scale = k.vec2(s)),
					k.easings.easeOutQuad,
				).onEnd(() => {
					filledBoxes++;
					if (filledBoxes === totalBoxes) {
						performSwitch(targetScene, size, cols, rows);
					}
				});
			});
		}
	}
}

function performSwitch(targetScene, size, cols, rows) {
	// Cambiamos de escena AHORA que todo está negro
	k.go(targetScene);

	// CAPA 2: REVELAR (Dibujar cuadros en la nueva escena y encogerlos)
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const delay = (x + y) * 0.05;

			// En la nueva escena, los cuadros ya nacen grandes
			const b = k.add([
				k.rect(size, size),
				k.pos(x * size + size / 2, y * size + size / 2),
				k.anchor("center"),
				k.color(20, 20, 20),
				k.scale(1.1),
				k.z(1000),
				k.fixed(),
			]);

			// Y se encogen con el mismo patrón de "ola"
			k.wait(delay, () => {
				k.tween(
					1.1,
					0,
					0.3,
					(s) => (b.scale = k.vec2(s)),
					k.easings.easeInQuad,
				).onEnd(() => b.destroy());
			});
		}
	}
}

export function revealScene() {
	const size = 100;
	const cols = Math.ceil(k.width() / size);
	const rows = Math.ceil(k.height() / size);

	console.log("Iniciando revelado de escena..."); // Log en consola normal

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const delay = (x + y) * 0.05;

			// 1. Añadimos el cuadro
			const b = k.add([
				k.rect(size, size),
				k.pos(x * size + size / 2, y * size + size / 2),
				k.anchor("center"),
				k.color(20, 20, 20),
				k.scale(1.1),
				k.z(1000),
				k.fixed(),
			]);

			// 2. Le damos la orden de encogerse DESPUÉS del delay
			k.wait(delay, () => {
				k.tween(
					1.1,
					0,
					0.3,
					(s) => (b.scale = k.vec2(s)),
					k.easings.easeInQuad,
				).onEnd(() => b.destroy());
			});
		}
	}
}
