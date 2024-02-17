import { Container } from "@chakra-ui/react";
import { auth } from "../lib/firebase";
import ProfileForm from "../components/forms/ProfileForm";

function ProfilePage() {
    const user = auth.currentUser;

    return (
        <Container maxW="container.xl">
            <ProfileForm />
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Container>
    );
}

export default ProfilePage;
