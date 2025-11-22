import type React from "react";
import { useEffect, useRef } from "react";

// Particle class to manage individual dots
class Particle {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	color: string;
	life: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 8 + 2; // Random size between 2 and 10
		this.speedX = Math.random() * 2 - 1;
		this.speedY = Math.random() * 2 - 1;
		// Fun colors matching the theme
		const colors = ["#F97316", "#8B5CF6", "#FBBF24", "#EC4899"];
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.life = 1.0; // Life starts at 100%
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1; // Shrink over time
		this.life -= 0.02; // Fade out
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.globalAlpha = Math.max(0, this.life);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1.0;
	}
}

export const FunCursor: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const mouseRef = useRef({ x: 0, y: 0, active: false });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Resize canvas to full screen
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);
		handleResize();

		// Track mouse
		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current.x = e.clientX;
			mouseRef.current.y = e.clientY;
			mouseRef.current.active = true;

			// Add particles on move
			for (let i = 0; i < 2; i++) {
				particlesRef.current.push(new Particle(e.clientX, e.clientY));
			}
		};
		window.addEventListener("mousemove", handleMouseMove);

		// Animation Loop
		let animationFrameId: number;
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw particles
			for (let i = 0; i < particlesRef.current.length; i++) {
				particlesRef.current[i].update();
				particlesRef.current[i].draw(ctx);

				// Remove dead particles
				if (
					particlesRef.current[i].life <= 0 ||
					particlesRef.current[i].size <= 0.2
				) {
					particlesRef.current.splice(i, 1);
					i--;
				}
			}

			animationFrameId = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-50"
			style={{ mixBlendMode: "multiply" }}
		/>
	);
};
