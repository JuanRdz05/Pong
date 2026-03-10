import k from "../CANVAS/canvas.js";
import winnerSound from "../SOUNDS/winner_sound.wav";
import click from "../SOUNDS/click_sound.wav";
//Música de fondo
k.loadSound("winner_sound", winnerSound);
//Sonido de los click
k.loadSound("click_sound", click);
let musicHandle = null;

k.scene("winner", (data) => {
	// 1. Título del Ganador (Lo subimos un poco: k.center().y - 120)
	k.add([
		k.text(`¡GANADOR: ${data.winnerName}!`, {
			font: "Press Start 2P",
			size: 40, // Bajamos un poco el tamaño para que quepa mejor
			width: 800, // Aumentamos el ancho para que no se amontone
			align: "center",
		}),
		k.pos(k.center().x, k.center().y - 120),
		k.anchor("center"),
	]);

	// 2. Contenedor del botón (Lo bajamos un poco: k.center().y + 100)
	const btn = k.add([
		k.rect(350, 80, { radius: 8 }),
		k.pos(k.center().x, k.center().y + 100),
		k.color(162, 119, 69),
		k.anchor("center"),
		k.scale(1),
		k.area(),
		"button",
	]);

	function tween_animations(btn) {
		k.tween(
			btn.scale, // Valor inicial
			k.vec2(1.2), // Valor final
			0.3, // Duración (0.3 seg)
			(v) => (btn.scale = v), // Qué propiedad vamos a cambiar
			k.easings.easeOutBack, // Estilo de suavizado
		);
		k.tween(
			btn.color,
			k.rgb(227, 136, 32),
			0.3,
			(v) => (btn.color = v),
			k.easings.easeInBounce,
		);
	}

	function tweenClick(btn) {
		k.tween(btn.scale, k.vec2(0.9), 0.1, (v) => (btn.scale = v)).onEnd(() => {
			k.wait(0.6, () => {
				k.go("game");
			});
		});
	}

	// Texto dentro del botón
	btn.add([
		k.text("Volver a jugar", {
			size: 16,
			font: "Press Start 2P",
		}),
		k.anchor("center"),
		k.color(255, 255, 255),
	]);

	// --- Lógica de los botones ---
	btn.onHoverUpdate(() => {
		btn.scale = k.vec2(1.1);
		btn.color = k.rgb(227, 136, 32);
		k.setCursor("pointer");
	});

	//Hover del botón
	btn.onHover(() => {
		tween_animations(btn);
	});

	btn.onHoverEnd(() => {
		btn.scale = k.vec2(1);
		btn.color = k.rgb(162, 119, 69);
		k.setCursor("default");
	});

	btn.onClick(() => {
		k.play("click_sound", {
			volume: 3,
			speed: 1.2,
		});
		tween_animations(btn);
		tweenClick(btn);
	});

	k.onKeyPress("enter", () => {
		k.play("click_sound", {
			volume: 3,
			speed: 1.2,
		});
		tween_animations(btn);
		tweenClick(btn);
	});

	musicHandle = k.play("winner_sound", {
		volume: 0.2,
		speed: 1.2,
		loop: true,
	});

	k.onSceneLeave(() => {
		if (musicHandle) {
			musicHandle.stop("winner_sound");
		}
	});

	k.onUpdate(() => {});
});
