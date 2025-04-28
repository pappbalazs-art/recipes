export default function RecipeDetailsDivider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex py-5 items-center">
			<div className="flex-grow border-1 border-primary"></div>
			<span className="flex-shrink mx-4">{children}</span>
			<div className="flex-grow border-1 border-primary"></div>
		</div>
	);
}
