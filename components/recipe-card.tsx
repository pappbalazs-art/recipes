import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";

export default function RecipeCard({ recipe }: { recipe: any }) {
	return (
		<Card
			className="px-2 pt-3 mb-10 last:mb-0"
			as={Link}
			href={"/recipe?id=" + recipe.id}
		>
			<CardHeader className="pb-0 pt-2 px-4">
				<p className="uppercase font-bold">{recipe.name}</p>
			</CardHeader>
			<CardBody></CardBody>
		</Card>
	);
}
