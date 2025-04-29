import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { FormEvent, useState } from "react";
import RecipeInput from "./recipe-input";
import RecipeNumberInput from "./recipe-number-input";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "@/firebase";

export default function CreateRecipeModal({
	isOpen,
	onOpen,
	onOpenChange,
	categories,
	updateData,
}: {
	isOpen: boolean;
	onOpen: () => void;
	onOpenChange: () => void;
	categories: any[];
	updateData: Function;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const [categoryValue, setCategoryValue] = useState<string>("");
	const [categoryKey, setCategoryKey] = useState<any>(null);
	const [elements, setElements] = useState<Array<any>>([
		{
			key: "element_1",
			ingredients: ["element_1_ingredient_1"],
		},
	]);
	const [instructions, setInstructions] = useState<Array<any>>([
		"instruction_1",
	]);
	const [tips, setTips] = useState<Array<any>>(["tip_1"]);

	const handleCreateRecipe = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		const data = Object.fromEntries(new FormData(e.currentTarget));

		let category = categoryKey;
		let ingredientsArray: any[] = [];
		let instructionsArray: any[] = [];
		let tipsArray: any[] = [];

		elements.map((element) => {
			const ingredientsElement: any = {
				name: data[[element.key, "_name"].join("")],
				ingredients: [],
			};

			element.ingredients.map((ingredient: any) => {
				ingredientsElement.ingredients = [
					...ingredientsElement.ingredients,
					{
						measurement:
							data[[ingredient, "_measurement"].join("")],
						unit: data[[ingredient, "_unit"].join("")],
						name: data[[ingredient, "_name"].join("")],
					},
				];
			});

			ingredientsArray = [...ingredientsArray, ingredientsElement];
		});

		instructions.map((instruction) => {
			instructionsArray = [...instructionsArray, data[instruction]];
		});

		tips.map((tip) => {
			tipsArray = [...tipsArray, data[tip]];
		});

		if (categoryValue && !categoryKey) {
			const { id } = await addDoc(collection(database, "categories"), {
				name: categoryValue,
			});

			category = id;
		}

		const recipe: any = {
			name: data.name,
			prep_time: Number(data.prep_time),
			cook_time: Number(data.cook_time),
			servings: Number(data.servings),
			date_added: Timestamp.now(),
			ingredients: ingredientsArray,
			category_uid: category,
		};

		if (data.description) {
			recipe.description = data.description;
		}

		if (!(instructionsArray.length === 1 || instructionsArray[0] === "")) {
			recipe.instructions = instructionsArray.filter(
				(instruction) => instruction !== ""
			);
		}

		if (!(tipsArray.length === 1 || tipsArray[0] === "")) {
			recipe.tips = tipsArray.filter((tip) => tip !== "");
		}

		await addDoc(collection(database, "recipes"), recipe);
		await updateData();

		setCategoryValue("");
		setCategoryKey(null);
		setElements([
			{
				key: "element_1",
				ingredients: ["element_1_ingredient_1"],
			},
		]);
		setInstructions(["instruction_1"]);
		setTips(["tips_1"]);
		setLoading(false);
	};

	return (
		<Modal
			classNames={{
				header: "border-b-[1px] border-[#e5e7eb]",
				footer: "border-t-[1px] border-[#e5e7eb]",
				body: "py-6",
			}}
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="center"
			scrollBehavior="outside"
			isDismissable={false}
		>
			<ModalContent>
				{(onClose: any) => (
					<>
						<ModalHeader className="flex flex-col gap-2">
							Create new recipe
						</ModalHeader>
						<Form
							className="w-full"
							validationBehavior="aria"
							onSubmit={handleCreateRecipe}
						>
							<ModalBody className="w-full">
								<RecipeInput label="Recipe name" name="name" />
								<Autocomplete
									label="Category"
									name="category"
									variant="bordered"
									allowsCustomValue
									defaultItems={categories}
									onInputChange={(value: string) =>
										setCategoryValue(value)
									}
									onSelectionChange={(id: any) =>
										setCategoryKey(id)
									}
								>
									{(item: any) => (
										<AutocompleteItem key={item.id}>
											{item.name}
										</AutocompleteItem>
									)}
								</Autocomplete>
								<RecipeInput
									label="Description"
									name="description"
								/>
								<RecipeNumberInput
									label="Prep time"
									name="prep_time"
									endContent={
										<p className="text-small">mins</p>
									}
								/>
								<RecipeNumberInput
									label="Cook Time"
									name="cook_time"
									endContent={
										<p className="text-small">mins</p>
									}
								/>
								<RecipeNumberInput
									label="Servings"
									name="servings"
								/>

								{elements.map((element: any, key: number) => (
									<div
										className="element-container flex flex-col gap-4 py-5"
										key={key}
									>
										<RecipeInput
											label="Element name"
											name={[element.key, "_name"].join(
												""
											)}
										/>

										{element.ingredients.map(
											(ingredient: any, key: number) => (
												<div
													className="input-wrapper flex flex-row gap-2"
													key={key}
												>
													<RecipeInput
														className="w-20"
														name={[
															ingredient,
															"_measurement",
														].join("")}
													/>
													<RecipeInput
														className="w-20"
														name={[
															ingredient,
															"_unit",
														].join("")}
													/>
													<RecipeInput
														className="w-55"
														name={[
															ingredient,
															"_name",
														].join("")}
													/>
												</div>
											)
										)}

										<Button
											className="w-full font-bold"
											color="primary"
											variant="bordered"
											onPress={() =>
												setElements(
													elements.map((p) =>
														p.key === element.key
															? {
																	...p,
																	ingredients:
																		[
																			...p.ingredients,
																			[
																				element.key,
																				"_ingredient_",
																				element
																					.ingredients
																					.length +
																					1,
																			].join(
																				""
																			),
																		],
																}
															: p
													)
												)
											}
										>
											Add ingredient
										</Button>
									</div>
								))}

								<Button
									className="w-full font-bold"
									color="primary"
									variant="bordered"
									onPress={() =>
										setElements([
											...elements,
											{
												key: [
													"element_",
													elements.length + 1,
												].join(""),
												ingredients: [
													[
														"element_",
														elements.length + 1,
														"_ingredient_1",
													].join(""),
												],
											},
										])
									}
								>
									Add element
								</Button>

								<p className="text-lg font-bold uppercase pt-4">
									Instructions
								</p>

								{instructions.map(
									(instruction: any, key: any) => (
										<RecipeInput
											name={instruction}
											key={key}
										/>
									)
								)}

								<Button
									className="w-full font-bold"
									color="primary"
									variant="bordered"
									onPress={() =>
										setInstructions([
											...instructions,

											[
												"instruction_",
												instructions.length + 1,
											].join(""),
										])
									}
								>
									Add instruction
								</Button>

								<p className="text-lg font-bold uppercase pt-4">
									Tips
								</p>

								{tips.map((tip: any, key: any) => (
									<RecipeInput name={tip} key={key} />
								))}

								<Button
									className="w-full font-bold"
									color="primary"
									variant="bordered"
									onPress={() =>
										setTips([
											...tips,

											["tip_", tips.length + 1].join(""),
										])
									}
								>
									Add tip
								</Button>
							</ModalBody>
							<ModalFooter className="w-full">
								<Button
									className="w-full"
									color="primary"
									type="submit"
									/*isDisabled={
										!(
											name &&
											prepTime &&
											cookTime &&
											servings
										)
									}*/
									isLoading={loading}
								>
									Add recipe
								</Button>
							</ModalFooter>
						</Form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
