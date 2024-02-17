import { Button } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => navigate(-1)}
            colorScheme="primary"
            size="sm"
            leftIcon={<IoChevronBack />}
        >
            Back
        </Button>
    );
}

export default BackButton;
