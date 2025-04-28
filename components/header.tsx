import { Dispatch, SetStateAction } from "react";
import { SharedSelection } from "@heroui/system";

import SearchBar from "./search-bar";
import OrderSelect from "./order-select";

export default function Header({
	searchFilter,
	setSearchFilter,
	recipesOrder,
	setRecipesOrder,
}: {
	searchFilter: string;
	setSearchFilter: Dispatch<SetStateAction<string>>;
	recipesOrder: SharedSelection;
	setRecipesOrder: Dispatch<SetStateAction<SharedSelection>>;
}) {
	return (
		<header className="pb-6 flex flex-row gap-3 items-center justify-between">
			<SearchBar
				searchFilter={searchFilter}
				setSearchFilter={setSearchFilter}
			/>

			<OrderSelect
				recipesOrder={recipesOrder}
				setRecipesOrder={setRecipesOrder}
			/>
		</header>
	);
}
