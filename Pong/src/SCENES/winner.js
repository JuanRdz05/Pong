import k from "../CANVAS/canvas.js";
import winnerSound from "../SOUNDS/winner_sound.wav";
import click from "../SOUNDS/click_sound.wav";
import { boxes } from "../TWEENS/transition.js";

k.loadSound("winner_sound", winnerSound);
k.loadSound("click_sound", click);

let musicHandle = null;

k.scene("winner", (data) => {
	// Título
	k.add([
		k.text(`¡GANADOR: ${data.winnerName}!`, {
			font: "Press Start 2P",
			size: 40,
			width: 800,
			align: "center",
		}),
		k.pos(k.center().x, k.center().y - 120),
		k.anchor("center"),
	]);

	// Botón
	const btn = k.add([
		k.rect(350, 80, { radius: 8 }),
		k.pos(k.center().x, k.center().y + 100),
		k.color(162, 119, 69),
		k.anchor("center"),
		k.area(),
		k.scale(1),
		"button",
	]);

	btn.add([
		k.text("Volver a jugar", { size: 16, font: "Press Start 2P" }),
		k.anchor("center"),
		k.color(255, 255, 255),
	]);

	// --- LÓGICA DE SALIDA ---
	let isTransitioning = false;

	function finishScene() {
		if (isTransitioning) return; // Evita clics dobles
		isTransitioning = true;

		k.play("click_sound", { volume: 0.5 });

		// Pequeño feedback visual de "click" en el botón
		k.tween(btn.scale, k.vec2(0.9), 0.1, (v) => (btn.scale = v)).onEnd(() => {
			// Llamamos a boxes que maneja la transición
			boxes("game");
		});
	}

	// --- EVENTOS ---
	btn.onHover(() => {
		if (isTransitioning) return;
		k.setCursor("pointer");
		k.tween(
			btn.scale,
			k.vec2(1.1),
			0.2,
			(v) => (btn.scale = v),
			k.easings.easeOutBack,
		);
		k.tween(btn.color, k.rgb(227, 136, 32), 0.2, (v) => (btn.color = v));
	});

	btn.onHoverEnd(() => {
		if (isTransitioning) return;
		k.setCursor("default");
		k.tween(btn.scale, k.vec2(1), 0.2, (v) => (btn.scale = v));
		k.tween(btn.color, k.rgb(162, 119, 69), 0.2, (v) => (btn.color = v));
	});

	btn.onClick(finishScene);
	k.onKeyPress("enter", finishScene);

	// Música
	musicHandle = k.play("winner_sound", { volume: 0.2, speed: 1.2, loop: true });

	k.onSceneLeave(() => {
		if (musicHandle) musicHandle.stop();
	});
});
