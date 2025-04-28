import { Dispatch, SetStateAction } from "react";
import { SharedSelection } from "@heroui/system";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";

export default function OrderSelect({
	recipesOrder,
	setRecipesOrder,
}: {
	recipesOrder: SharedSelection;
	setRecipesOrder: Dispatch<SetStateAction<SharedSelection>>;
}) {
	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Button isIconOnly size="sm" variant="light">
					<FontAwesomeIcon icon={faArrowUpWideShort} size="xl" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={recipesOrder}
				onSelectionChange={setRecipesOrder}
				variant="flat"
			>
				<DropdownItem key="date-added-desc">
					Date: Latest First
				</DropdownItem>
				<DropdownItem key="date-added-asc">
					Date: Oldest First
				</DropdownItem>
				<DropdownItem key="name-asc">Name: A-Z</DropdownItem>
				<DropdownItem key="name-desc">Name: Z-A</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
