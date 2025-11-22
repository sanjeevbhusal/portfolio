import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "./Magnetic";

// Create audio elements for theme switching sounds
const sound =
	typeof window !== "undefined"
		? new Audio(
				"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
			)
		: undefined; // Night cricket sounds

// Set volume to be subtle
if (sound) {
	sound.volume = 0.3;
}

export const ThemeSelector = () => {
	const [theme, setTheme] = useState(
		typeof window !== "undefined"
			? localStorage.getItem("theme") || "light"
			: "light",
	);

	const changeTheme = (theme: string) => {
		setTheme(theme);
		localStorage.setItem("theme", theme);
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.getElementById("fun-mode-icon")?.classList.add("text-white");
			document
				.getElementById("fun-mode-icon")
				?.classList.add("hover:text-black");
		} else {
			document.documentElement.classList.remove("dark");
			document.getElementById("fun-mode-icon")?.classList.remove("text-white");
		}
		playThemeSound();
	};

	// Function to play sound effect
	const playThemeSound = () => {
		try {
			(sound as HTMLAudioElement).currentTime = 0;
			(sound as HTMLAudioElement).play().catch(() => {
				// Silently fail if autoplay is blocked
			});
		} catch (error) {
			// Silently handle any audio errors
		}
	};

	return (
		<Magnetic strength={0.3}>
			<button
				onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
				className={`p-1 rounded-full relative w-14 h-8 flex items-center transition-colors duration-300 cursor-pointer ${theme === "dark" ? "bg-slate-700 hover:text-black" : "bg-slate-200 "}`}
				type="button"
			>
				<div
					className={`absolute left-1 w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-300 flex items-center justify-center ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
				>
					{theme === "dark" ? (
						<Moon size={14} className="text-slate-900" />
					) : (
						<Sun size={14} className="text-orange-500" />
					)}
				</div>
			</button>
		</Magnetic>
	);
};
