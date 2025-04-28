import { Dispatch, SetStateAction } from "react";

import { Input } from "@heroui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
	searchFilter,
	setSearchFilter,
}: {
	searchFilter: string;
	setSearchFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<Input
			variant="bordered"
			placeholder="Search..."
			startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
			value={searchFilter}
			onValueChange={setSearchFilter}
			onClear={() => setSearchFilter("")}
			isClearable
		/>
	);
}
