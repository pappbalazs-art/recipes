import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button } from "@heroui/button";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { SetStateAction, useState } from "react";
import RecipeInput from "./recipe-input";
import RecipeNumberInput from "./recipe-number-input";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "@/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
	const [name, setName] = useState<string | undefined>(undefined);
	const [categoryValue, setCategoryValue] = useState<string | undefined>(
		undefined
	);
	const [categoryKey, setCategoryKey] = useState<string | undefined>(
		undefined
	);
	const [description, setDescription] = useState<string | undefined>(
		undefined
	);
	const [prepTime, setPrepTime] = useState<number | undefined>(undefined);
	const [cookTime, setCookTime] = useState<number | undefined>(undefined);
	const [servings, setServings] = useState<number | undefined>(undefined);
	const [ingredients, setIngredients] = useState<Array<any>>([
		{
			name: "",
			ingredients: [
				{
					measurement: "",
					unit: "",
					name: "",
				},
			],
		},
	]);
	const [instructions, setInstructions] = useState<Array<string>>([""]);
	const [tips, setTips] = useState<Array<string>>([""]);

	const handleAddElement = (): void => {
		setIngredients([
			...ingredients,
			{
				name: "",
				ingredients: [
					{
						measurement: "",
						unit: "",
						name: "",
					},
				],
			},
		]);
	};

	const handleAddIngredient = (elementKey: number): void => {
		setIngredients(
			ingredients.map((ingredient, key: number) => {
				if (key === elementKey) {
					return {
						...ingredient,
						ingredients: [
							...ingredient.ingredients,
							{
								measurement: "",
								unit: "",
								name: "",
							},
						],
					};
				}

				return ingredient;
			})
		);
	};

	const handleAddInstruction = (): void => {
		setInstructions([...instructions, ""]);
	};

	const handleAddTip = (): void => {
		setTips([...tips, ""]);
	};

	const handleRemoveElement = (elementKey: number): void => {
		setIngredients(
			ingredients.filter(
				(ingredient: any, key: number) => key !== elementKey
			)
		);
	};

	const handleRemoveIngredient = (
		elementKey: number,
		ingredientKey: number
	): void => {
		setIngredients(
			ingredients.map((element: any, key: number) => {
				if (key === elementKey) {
					return {
						...element,
						ingredients: element.ingredients.filter(
							(ingredient: any, key: number) =>
								key !== ingredientKey
						),
					};
				}

				return element;
			})
		);
	};

	const handleRemoveInstruction = (instructionKey: number): void => {
		setInstructions(
			instructions.filter(
				(instruction: any, key: number) => key !== instructionKey
			)
		);
	};

	const handleRemoveTip = (tipKey: number): void => {
		setTips(tips.filter((tip: any, key: number) => key !== tipKey));
	};

	const handleElementNameChange = (
		elementKey: any,
		value: SetStateAction<string | undefined>
	): void => {
		setIngredients(
			ingredients.map((element: any, key: number) => {
				if (key === elementKey) {
					return {
						...element,
						name: value,
					};
				}

				return element;
			})
		);
	};

	const handleIngredientInputChange = (
		elementKey: number,
		ingredientKey: number,
		input: string,
		value: SetStateAction<string | undefined>
	): void => {
		setIngredients(
			ingredients.map((element: any, key: number) => {
				if (key === elementKey) {
					return {
						...element,
						ingredients: element.ingredients.map(
							(ingredient: any, key: number) => {
								if (key === ingredientKey) {
									return {
										...ingredient,
										[input]: value,
									};
								}

								return ingredient;
							}
						),
					};
				}

				return element;
			})
		);
	};

	const handleInstructionInputChange = (
		instructionKey: number,
		value: SetStateAction<string | undefined>
	): void => {
		setInstructions(
			instructions.map((instruction: any, key: number) => {
				if (key === instructionKey) {
					return value;
				}

				return instruction;
			})
		);
	};

	const handleTipInputChange = (
		tipKey: number,
		value: SetStateAction<string | undefined>
	): void => {
		setTips(
			tips.map((tip: any, key: number) => {
				if (key === tipKey) {
					return value;
				}

				return tip;
			})
		);
	};

	const handleCreateRecipe = async () => {
		setLoading(true);

		await addDoc(collection(database, "recipes"), {
			name,
			category_uid: categoryKey,
			description,
			prep_time: prepTime,
			cook_time: cookTime,
			servings,
			ingredients,
			instructions,
			tips,
			date_added: Timestamp.now(),
		});
		await updateData();

		setLoading(false);
		onOpenChange();

		setName(undefined);
		setCategoryValue(undefined);
		setCategoryKey(undefined);
		setDescription(undefined);
		setPrepTime(undefined);
		setCookTime(undefined);
		setServings(undefined);
		setIngredients([
			{
				name: "",
				ingredients: [
					{
						measurement: "",
						unit: "",
						name: "",
					},
				],
			},
		]);
		setInstructions([""]);
		setTips([""]);
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
						<ModalBody className="w-full">
							<RecipeInput
								label="Recipe name"
								value={name}
								onValueChange={setName}
							/>
							<Autocomplete
								label="Category"
								name="category"
								variant="bordered"
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
								value={description}
								onValueChange={setDescription}
							/>
							<RecipeNumberInput
								label="Prep time"
								endContent={<p className="text-small">mins</p>}
								value={prepTime}
								onValueChange={setPrepTime}
							/>
							<RecipeNumberInput
								label="Cook Time"
								endContent={<p className="text-small">mins</p>}
								value={cookTime}
								onValueChange={setCookTime}
							/>
							<RecipeNumberInput
								label="Servings"
								value={servings}
								onValueChange={setServings}
							/>

							{ingredients.map(
								(element: any, elementKey: number) => (
									<div
										className="element-container flex flex-col gap-4 py-5"
										key={elementKey}
									>
										<RecipeInput
											label="Element name"
											value={element.name}
											onValueChange={(value) =>
												handleElementNameChange(
													elementKey,
													value
												)
											}
										/>

										{element.ingredients.map(
											(
												ingredient: any,
												ingredientKey: number
											) => (
												<div
													className="input-wrapper flex flex-row gap-2"
													key={ingredientKey}
												>
													<RecipeInput
														className="w-20"
														value={
															ingredient.measurement
														}
														onValueChange={(
															value
														) =>
															handleIngredientInputChange(
																elementKey,
																ingredientKey,
																"measurement",
																value
															)
														}
													/>
													<RecipeInput
														className="w-20"
														value={ingredient.unit}
														onValueChange={(
															value
														) =>
															handleIngredientInputChange(
																elementKey,
																ingredientKey,
																"unit",
																value
															)
														}
													/>
													<RecipeInput
														className="w-55"
														value={ingredient.name}
														onValueChange={(
															value
														) =>
															handleIngredientInputChange(
																elementKey,
																ingredientKey,
																"name",
																value
															)
														}
													/>

													<Button
														className="min-w-5"
														color="danger"
														variant="solid"
														onPress={() =>
															handleRemoveIngredient(
																elementKey,
																ingredientKey
															)
														}
													>
														<FontAwesomeIcon
															icon={faTrash}
															className="block"
														/>
													</Button>
												</div>
											)
										)}

										<Button
											className="w-full font-bold"
											color="primary"
											variant="bordered"
											onPress={() =>
												handleAddIngredient(elementKey)
											}
										>
											Add ingredient
										</Button>

										<Button
											className="w-full font-bold"
											color="danger"
											variant="solid"
											onPress={() =>
												handleRemoveElement(elementKey)
											}
										>
											Remove element
										</Button>
									</div>
								)
							)}

							<Button
								className="w-full font-bold"
								color="primary"
								variant="bordered"
								onPress={handleAddElement}
							>
								Add element
							</Button>

							<p className="text-lg font-bold uppercase pt-4">
								Instructions
							</p>

							{instructions.map((instruction: any, key: any) => (
								<div key={key} className="flex flex-grow gap-2">
									<RecipeInput
										value={instruction}
										onValueChange={(value) =>
											handleInstructionInputChange(
												key,
												value
											)
										}
									/>

									<Button
										className="min-w-5"
										color="danger"
										variant="solid"
										onPress={() =>
											handleRemoveInstruction(key)
										}
									>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</div>
							))}

							<Button
								className="w-full font-bold"
								color="primary"
								variant="bordered"
								onPress={handleAddInstruction}
							>
								Add instruction
							</Button>

							<p className="text-lg font-bold uppercase pt-4">
								Tips
							</p>

							{tips.map((tip: any, key: any) => (
								<div key={key} className="flex flex-grow gap-2">
									<RecipeInput
										value={tip}
										onValueChange={(value) =>
											handleTipInputChange(key, value)
										}
									/>

									<Button
										className="min-w-5"
										color="danger"
										variant="solid"
										onPress={() => handleRemoveTip(key)}
									>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</div>
							))}

							<Button
								className="w-full font-bold"
								color="primary"
								variant="bordered"
								onPress={handleAddTip}
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
								onPress={handleCreateRecipe}
							>
								Add recipe
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
