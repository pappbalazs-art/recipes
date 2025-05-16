"use client";

import RecipesContainer from "@/components/recipes-container";
import { database } from "@/firebase";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Spinner } from "@heroui/spinner";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Category() {
	const [category, setCategory] = useState<any>(null);
	const [recipes, setRecipes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const searchParams = useSearchParams();

	const categoryId = searchParams.get("id");

	const updateData = async () => {
		if (!categoryId) {
			return;
		}

		const categoryRef = doc(database, "categories", categoryId);
		const categorySnapshot = await getDoc(categoryRef);

		const recipesRef = collection(database, "recipes");
		const recipesQuery = query(
			recipesRef,
			where("category_uid", "==", categoryId)
		);
		const recipesSnapshot = await getDocs(recipesQuery);

		setCategory(categorySnapshot.data());
		setRecipes(
			recipesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
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
							<BreadcrumbItem href={"/category?id=" + categoryId}>
								{category.name}
							</BreadcrumbItem>
						</Breadcrumbs>
					</div>

					<header className="pb-6 animate-fade-in">
						<h1 className="tract-tight text-2xl uppercase font-extrabold">
							{category.name}
						</h1>
					</header>

					<RecipesContainer recipes={recipes} />
				</>
			)}
		</>
	);
}

export default function RecipePage() {
	return (
		<Suspense>
			<Category />
		</Suspense>
	);
}
