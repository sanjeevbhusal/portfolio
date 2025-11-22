"use client";

import { Check, FileText, Github, Linkedin, Mail } from "lucide-react";
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

	const [copied, setCopied] = useState(false);

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault();
		navigator.clipboard.writeText("bhusalsanjeev23@gmail.com");
		setCopied(true);
		toast.success("Email copied to clipboard!", {
			duration: 5000,
			position: "top-center",
		});
		setTimeout(() => setCopied(false), 6000);
	};

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
			icon: copied ? Check : Mail,
			href: "mailto:bhusalsanjeev23@example.com",
			label: copied ? "Copied!" : "Email",
			isEmail: true,
		},
	];

	return (
		<div
			className="hidden md:flex fixed bottom-0 left-4 lg:left-14 z-50 flex-col gap-2 "
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
						onClick={link.isEmail ? handleCopyEmail : undefined}
						className={`group relative flex items-center rounded-full bg-background/80 backdrop-blur-sm border border-border p-2 lg:p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-accent/10 hover:text-accent ${isExpanded ? "gap-3" : "gap-0"} ${
							link.label === "Copied!"
								? "text-green-500 hover:text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800"
								: ""
						}`}
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
