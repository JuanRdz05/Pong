import kaplay from "kaplay";

const k = kaplay({
	width: window.innerWidth,
	height: window.innerHeight,
	font: "sans-serif",
	canvas: document.querySelector("#mycanvas"),
	background: "#fae293",
});

k.scene("game", () => {
	k.setGravity(1000);
});

export default k;
