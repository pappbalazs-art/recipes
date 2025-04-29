import { NumberInput } from "@heroui/number-input";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function RecipeNumberInput({
	className,
	classNames,
	label,
	name,
	startContent,
	endContent,
	isRequired,
	variant = "bordered",
	size,
	formatOptions,
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
	formatOptions?: Intl.NumberFormatOptions;
	value?: number | undefined;
	onValueChange?: Dispatch<SetStateAction<number | undefined>>;
}) {
	return (
		<NumberInput
			className={className}
			classNames={classNames}
			label={label}
			name={name}
			type="text"
			labelPlacement={label ? "inside" : "outside"}
			variant={variant}
			size={size}
			startContent={startContent}
			endContent={endContent}
			isRequired={isRequired}
			formatOptions={formatOptions}
			hideStepper
			value={value}
			onValueChange={onValueChange}
		/>
	);
}
