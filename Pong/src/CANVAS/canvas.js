import kaplay from "kaplay";

const k = kaplay({
	width: window.innerWidth,
	height: window.innerHeight,
	font: "sans-serif",
	canvas: document.querySelector("#mycanvas"),
	background: "#fae293",
});

export default k;
