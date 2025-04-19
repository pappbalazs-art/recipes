import RecipeCard from "./recipe-card";

export default function RecipesContainer({ recipes }: { recipes: any }) {
	return (
		<div className="recipes-container z-0 animate-fade-in">
			{recipes.map((recipe: any) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</div>
	);
}
