"use client";

import { database } from "@/firebase";
import { Spinner } from "@heroui/spinner";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Checkbox } from "@heroui/checkbox";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import RecipeDetailsDivider from "@/components/recipe-details-divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";

function Recipe() {
	const [recipe, setRecipe] = useState<any>(null);
	const [category, setCategory] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const searchParams = useSearchParams();

	const recipeId = searchParams.get("id");

	const updateData = async () => {
		if (!recipeId) return;

		const recipeRef = doc(database, "recipes", recipeId);
		const recipeSnapshot = await getDoc(recipeRef);

		const categoryRef = doc(
			database,
			"categories",
			recipeSnapshot.data()?.category_uid
		);
		const categorySnapshot = await getDoc(categoryRef);

		setRecipe(recipeSnapshot.data());
		setCategory(categorySnapshot.data());

		setLoading(false);
	};

	useEffect(() => {
		updateData();
	}, []);

	return (
		<>
			{loading && (
				<Spinner
					className="absolute inset-0 m-auto"
					color="primary"
					size="lg"
				/>
			)}

			{!loading && (
				<>
					<div className="container animate-fade-in">
						<Breadcrumbs className="pb-6">
							<BreadcrumbItem href="/">Recipes</BreadcrumbItem>
							<BreadcrumbItem
								href={"/category?id=" + recipe.category_uid}
							>
								{category.name}
							</BreadcrumbItem>
							<BreadcrumbItem>{recipe.name}</BreadcrumbItem>
						</Breadcrumbs>

						<header className="flex flex-col gap-2">
							<h1 className="tract-tight text-2xl uppercase font-extrabold">
								{recipe.name}
							</h1>
							{recipe.description && <p>{recipe.description}</p>}
						</header>

						<section className="flex flex-col gap-2 text-center mt-8 mb-5">
							<RecipeDetailsDivider>
								<FontAwesomeIcon
									className="text-primary"
									icon={faClock}
									size="lg"
								/>
							</RecipeDetailsDivider>

							<div className="flex flex-row justify-between px-8">
								<div className="prep-time">
									<p className="text-lg text-default-700 font-bold uppercase">
										Prep Time
									</p>
									<span className="text-small text-default-700">
										{recipe.prep_time} mins
									</span>
								</div>
								<div className="cook-time">
									<p className="text-lg text-default-700 font-bold uppercase">
										Cook Time
									</p>
									<span className="text-small text-default-700">
										{recipe.cook_time} mins
									</span>
								</div>
							</div>

							<div className="total-time pt-6">
								<p className="text-lg text-default-700 font-bold uppercase">
									Total Time
								</p>
								<span className="text-small text-default-700">
									{recipe.prep_time + recipe.cook_time} mins
								</span>
							</div>

							<RecipeDetailsDivider>
								<FontAwesomeIcon
									className="text-primary"
									icon={faUtensils}
									size="lg"
								/>
							</RecipeDetailsDivider>

							<div className="servings">
								<p className="text-lg text-default-700 font-bold uppercase">
									Servings
								</p>
								<span>{recipe.servings}</span>
							</div>
						</section>

						<section className="mt-10 mb-5">
							<h1 className="text-2xl font-bold uppercase pb-4">
								Ingredients
							</h1>
							{recipe.ingredients.map(
								(ingredientSection: any, key: number) => (
									<div className="pb-8 last:pb-0" key={key}>
										<h1 className="text-xl font-bold pb-3">
											{ingredientSection.name}
										</h1>
										<div className="flex flex-col gap-2">
											{ingredientSection.ingredients.map(
												(
													ingredient: any,
													key: number
												) => (
													<Checkbox
														lineThrough
														key={key}
													>
														{ingredient.measurement}{" "}
														{ingredient.unit}{" "}
														{ingredient.name}
													</Checkbox>
												)
											)}
										</div>
									</div>
								)
							)}
						</section>

						{recipe.instructions &&
							recipe.instructions.length > 0 && (
								<section className="mt-10 mb-5">
									<h1 className="text-2xl font-bold uppercase pb-4">
										Instructions
									</h1>
									<div className="flex flex-col gap-2">
										{recipe.instructions.map(
											(instruction: any, key: number) => (
												<div
													className="flex flex-row gap-2 items-center"
													key={key}
												>
													<span className="flex justify-center items-center text-tiny text-default-500 border-2 border-gray-300 rounded-[7px] w-[22px] h-[22px]">
														{(key + 1).toString()}
													</span>
													<span>{instruction}</span>
												</div>
											)
										)}
									</div>
								</section>
							)}

						{recipe.tips && recipe.tips.length > 0 && (
							<section className="mt-10 mb-5">
								<h1 className="text-2xl font-bold uppercase pb-4">
									Tips
								</h1>
								<div className="flex flex-col gap-2">
									{recipe.tips.map(
										(tip: any, key: number) => (
											<div
												className="flex flex-row gap-2 items-center"
												key={key}
											>
												<span className="flex justify-center items-center text-tiny text-default-500 border-2 border-gray-300 rounded-[7px] w-[22px] h-[22px]">
													{(key + 1).toString()}
												</span>
												<span>{tip}</span>
											</div>
										)
									)}
								</div>
							</section>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default function RecipePage() {
	return (
		<Suspense>
			<Recipe />
		</Suspense>
	);
}
