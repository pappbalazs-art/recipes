"use client";

import { useEffect, useState } from "react";
import { database } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { Spinner } from "@heroui/spinner";

import RecipesContainer from "@/components/recipes-container";

export default function Home() {
	const [recipes, setRecipes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const updateRecipes = async () => {
		const recipesRef = collection(database, "recipes");
		const recipesQuery = query(recipesRef, orderBy("date_added", "desc"));
		const recipesSnapshot = await getDocs(recipesQuery);

		setRecipes(
			recipesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
	};

	const fetchData = async () => {
		await updateRecipes();

		setLoading(false);
	};

	useEffect(() => {
		fetchData();
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
					<RecipesContainer recipes={recipes} />
				</>
			)}
		</>
	);
}
