import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/button";

export default function AddRecipeButton({ onPress }: { onPress: () => void }) {
	return (
		<Button
			className="fixed bottom-4 right-4 z-40"
			isIconOnly
			aria-label="Add recipe"
			color="primary"
			size="lg"
			radius="full"
			variant="shadow"
			onPress={onPress}
		>
			<FontAwesomeIcon icon={faPlus} />
		</Button>
	);
}
