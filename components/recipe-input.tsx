import { Input } from "@heroui/input";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function RecipeInput({
	className,
	classNames,
	label,
	name,
	startContent,
	endContent,
	isRequired,
	variant = "bordered",
	size,
	value,
	onValueChange,
}: {
	className?: any;
	classNames?: any;
	label?: string;
	name?: string;
	startContent?: ReactNode;
	endContent?: ReactNode;
	isRequired?: boolean;
	variant?: any;
	size?: any;
	value?: string | undefined;
	onValueChange?: Dispatch<SetStateAction<string | undefined>>;
}) {
	return (
		<Input
			className={className}
			classNames={classNames}
			label={label}
			name={name}
			type="text"
			startContent={startContent}
			endContent={endContent}
			isRequired={isRequired}
			variant={variant}
			size={size}
			value={value}
			onValueChange={onValueChange}
		/>
	);
}
