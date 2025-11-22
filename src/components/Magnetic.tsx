import React, { useRef, useState } from "react";

interface MagneticProps {
	children: React.ReactElement;
	strength?: number; // How strong the pull is (default 0.5)
}

export const Magnetic: React.FC<MagneticProps> = ({
	children,
	strength = 0.5,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		if (ref.current) {
			const { height, width, left, top } = ref.current.getBoundingClientRect();
			const middleX = clientX - (left + width / 2);
			const middleY = clientY - (top + height / 2);
			setPosition({ x: middleX * strength, y: middleY * strength });
		}
	};

	const handleMouseLeave = () => {
		setPosition({ x: 0, y: 0 });
	};

	const { x, y } = position;

	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transform: `translate(${x}px, ${y}px)`,
				transition: "transform 0.1s ease-out", // Quick response for magnetic feel
				display: "inline-block", // Ensure it doesn't break layout
			}}
		>
			{React.cloneElement(children, {
				// We don't need to pass anything down, the wrapper handles the movement
			})}
		</div>
	);
};
