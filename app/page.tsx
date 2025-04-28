"use client";

import { SetStateAction, useEffect, useMemo, useState } from "react";
import { database } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { Spinner } from "@heroui/spinner";

import RecipesContainer from "@/components/recipes-container";
import Header from "@/components/header";
import { SharedSelection } from "@heroui/system";

export default function Home() {
	const [recipes, setRecipes] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const [searchFilter, setSearchFilter] = useState<string>("");
	const [recipesOrder, setRecipesOrder] = useState<SharedSelection>(
		new Set(["date-added-desc"])
	);

	const filteredRecipes = useMemo(() => {
		let filteredRecipes = [...recipes];

		if (searchFilter) {
			filteredRecipes = filteredRecipes.filter((recipe) =>
				recipe.name.toLowerCase().includes(searchFilter.toLowerCase())
			);
		}

		return filteredRecipes;
	}, [recipes, searchFilter]);

	const handleRecipesOrderSelection = (
		value: SetStateAction<SharedSelection>
	) => {
		setRecipesOrder(value);
		setLoading(true);
		updateRecipes();
	};

	const updateRecipes = async () => {
		let recipesQueryOrder;

		switch (recipesOrder.currentKey) {
			case "date-added-asc":
				recipesQueryOrder = orderBy("date_added", "asc");
				break;
			case "date-added-desc":
				recipesQueryOrder = orderBy("date_added", "desc");
				break;
			case "name-asc":
				recipesQueryOrder = orderBy("name", "asc");
				break;
			case "name-desc":
				recipesQueryOrder = orderBy("name", "desc");
				break;
			default:
				recipesQueryOrder = orderBy("date_added", "desc");
		}

		const recipesRef = collection(database, "recipes");
		const recipesQuery = query(recipesRef, recipesQueryOrder);
		const recipesSnapshot = await getDocs(recipesQuery);

		setRecipes(
			recipesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
		setLoading(false);
	};

	useEffect(() => {
		updateRecipes();
	}, []);

	return (
		<>
			<Header
				searchFilter={searchFilter}
				setSearchFilter={setSearchFilter}
				recipesOrder={recipesOrder}
				setRecipesOrder={handleRecipesOrderSelection}
			/>

			{loading && (
				<Spinner
					className="absolute inset-0 m-auto"
					color="primary"
					size="lg"
				/>
			)}

			{!loading && (
				<>
					<RecipesContainer recipes={filteredRecipes} />

					{filteredRecipes.length === 0 && (
						<span className="text-small text-default-500 text-center">
							Ilyet sajnos MÉG nem csináltál :(
						</span>
					)}
				</>
			)}
		</>
	);
}
