"use client";

import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type LinkItem = {
	icon: typeof Github | typeof Linkedin | typeof FileText | typeof Mail;
	href: string;
	label: string;
	isEmail?: boolean;
};

export function FloatingContactSidebar() {
	const [isExpanded, setIsExpanded] = useState(false);

	const links: LinkItem[] = [
		{
			icon: Github,
			href: "https://github.com/sanjeevbhusal",
			label: "GitHub",
		},
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/sanjeevbhusal",
			label: "LinkedIn",
		},
		{
			icon: FileText,
			href: "https://drive.google.com/file/d/1h8VkliYxgLv2IU9OnCw4eJNYC057MVUL/view?usp=sharing",
			label: "Resume",
		},
		{
			icon: Mail,
			href: "mailto:bhusalsanjeev23@example.com",
			label: "Email",
			isEmail: true,
		},
	];

	const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const email = "bhusalsanjeev23@gmail.com";
		navigator.clipboard.writeText(email).then(() => {
			toast.success("Email copied to clipboard!", {
				description: email,
				position: "bottom-left",
			});
		});
	};

	return (
		<div
			className="fixed bottom-0 left-14 z-50 flex flex-col gap-2 "
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
		>
			{links.map((link, index) => {
				const Icon = link.icon;
				return (
					<a
						key={link.label}
						href={link.href}
						target={link.href.startsWith("http") ? "_blank" : undefined}
						rel={
							link.href.startsWith("http") ? "noopener noreferrer" : undefined
						}
						onClick={link.isEmail ? handleEmailClick : undefined}
						className={`group relative flex items-center rounded-full bg-background/80 backdrop-blur-sm border border-border p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-accent/10 hover:text-accent ${isExpanded ? "gap-3" : "gap-0"}`}
						style={{
							animationDelay: `${index * 50}ms`,
						}}
					>
						<Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
						<span
							className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
								isExpanded ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
							}`}
						>
							{link.label}
						</span>
					</a>
				);
			})}

			<div className="w-full flex justify-center">
				<div className="w-0.5 h-[150px] bg-accent"></div>
			</div>
		</div>
	);
}
