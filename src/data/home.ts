export const painPoints = [
	{
		title: "Missed Follow-ups",
		text: "Leads, patients, clients, or customers are not followed up consistently.",
		icon: "↗",
	},
	{
		title: "Manual Admin Work",
		text: "Staff spend hours copying, checking, updating, and chasing information.",
		icon: "⌘",
	},
	{
		title: "Document Chaos",
		text: "Forms, files, and approvals are scattered across emails, folders, and spreadsheets.",
		icon: "▧",
	},
	{
		title: "Disconnected Tools",
		text: "Your team uses multiple systems, but the workflow still depends on manual handoffs.",
		icon: "⛓",
	},
	{
		title: "Poor Visibility",
		text: "Owners and managers do not have a clear view of work, delays, or missed steps.",
		icon: "◌",
	},
	{
		title: "Staff Overload",
		text: "Good employees spend too much time on repetitive tasks instead of higher-value work.",
		icon: "♙",
	},
] as const;

export const auditItems = [
	"Workflow map",
	"Revenue and cost leak analysis",
	"AI and automation opportunity matrix",
	"ROI estimate",
	"Build vs buy recommendation",
	"Risk review",
	"30-day implementation roadmap",
] as const;

export const processSteps = [
	{
		number: "01",
		title: "Understand the Workflow",
		text: "We review how the work currently moves through your team, documents, and customers.",
	},
	{
		number: "02",
		title: "Find the Leaks",
		text: "We identify missed follow-ups, delays, duplicate work, manual admin effort, and visibility gaps.",
	},
	{
		number: "03",
		title: "Recommend the Right Fix",
		text: "We compare existing tools, automation, AI-assisted workflows, and custom systems where needed.",
	},
	{
		number: "04",
		title: "Implement What Makes Sense",
		text: "We help build or connect the system only where there is a clear business case.",
	},
] as const;

export const industries = [
	{
		title: "Healthcare Clinics",
		text: "For physiotherapy clinics, dental clinics, and allied health offices. Improve intake, reminders, forms, follow-up, review requests, and admin workflows.",
	},
	{
		title: "Accounting & CPA Firms",
		text: "Improve client intake, document collection, missing document reminders, folder organization, status tracking, and tax season capacity.",
	},
	{
		title: "Field & Industrial Operations",
		text: "Improve quote-to-job workflows, dispatch coordination, inspection logs, maintenance reminders, job costing visibility, and field-to-office communication.",
	},
	{
		title: "Other Growing Service Businesses",
		text: "For businesses with repeated workflows, staff overload, manual follow-up, and disconnected systems.",
	},
] as const;

export const principles = [
	{
		title: "Business-first",
		text: "We start with the workflow problem, not the technology.",
		icon: "♘",
	},
	{
		title: "Build vs Buy",
		text: "We recommend existing tools when they solve the problem well.",
		icon: "▱",
	},
	{
		title: "Human Review",
		text: "High-risk workflows should keep human judgment and oversight.",
		icon: "☑",
	},
] as const;
