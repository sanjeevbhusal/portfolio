import { Palette } from "lucide-react";
import { useState } from "react";

const FunMode = () => {
	const [funMode, setFunMode] = useState(false);

	const toggleFunMode = () => {
		setFunMode(!funMode);
	};

	return (
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

			<button
				type="button"
				onClick={toggleFunMode}
				className={`p-2 rounded-full transition-all duration-300 group relative ${funMode ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-100 text-gray-500 cursor-pointer"}`}
				title="Toggle Fun Background"
			>
				<Palette size={20} />
				<span className="absolute top-full mt-2 right-0 w-32 p-2 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
					{funMode ? "Disable Fun Mode" : "Try Fun Background"}
				</span>
			</button>
		</div>
	);
};

export default FunMode;
