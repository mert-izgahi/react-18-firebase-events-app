import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Logo() {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Flex align="center" gap="2" fontWeight="bold" fontSize="22">
            {!isMobile && (
                <Text color="primary.500">
                    <IoChatbubbleOutline />
                </Text>
            )}
            <Text as={Link} to={"/"} color="primary.500">
                MeetX
            </Text>
        </Flex>
    );
}

export default Logo;
