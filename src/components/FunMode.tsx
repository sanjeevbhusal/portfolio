import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { FunCursor } from "./FunCursor";
import { Magnetic } from "./Magnetic";

const FunMode = () => {
	const [funMode, setFunMode] = useState(false);

	const theme =
		typeof window !== "undefined"
			? localStorage.getItem("theme") || "light"
			: "light";

	const toggleFunMode = () => {
		setFunMode(!funMode);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.getItem("theme") === "dark"
				? document.getElementById("fun-mode-icon")?.classList.add("text-white")
				: undefined;
		}
	}, []);

	return (
		<>
			{funMode && <FunCursor />}

			<div>
				{funMode && (
					<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
						{/* Gradient Blob 1 */}
						<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
						{/* Gradient Blob 2 */}
						<div className="absolute top-0 -right-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
						{/* Gradient Blob 3 */}
						<div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
					</div>
				)}

				<Magnetic strength={0.3}>
					<button
						type="button"
						onClick={toggleFunMode}
						className={`p-2 rounded-full transition-all duration-300 group relative ${funMode ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100 text-gray-500 cursor-pointer"}`}
						title="Toggle Fun Background"
					>
						<Palette
							size={20}
							id="fun-mode-icon"
							className="dark:text-white dark:group-hover:text-black"
						/>
						<span className="absolute top-full mt-2 right-0 w-32 p-2 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
							{funMode ? "Disable Fun Mode" : "Try Fun Background"}
						</span>
					</button>
				</Magnetic>
			</div>
		</>
	);
};

export default FunMode;
