import * as Yup from "yup";
import { useFormik } from "formik";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    SimpleGrid,
} from "@chakra-ui/react";
import { auth } from "../../lib/firebase";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const profileFormSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
});

function ProfileForm() {
    const user = auth.currentUser;

    const formik = useFormik({
        initialValues: {
            fullName: user?.displayName || "",
        },
        validationSchema: profileFormSchema,
        onSubmit: async (values) => {
            try {
                await updateProfile(user!, {
                    displayName: values.fullName,
                });

                toast.success("Profile updated successfully");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <SimpleGrid maxW={"container.md"} m={"auto"} p={4}>
                <GridItem>
                    <FormControl
                        isInvalid={
                            formik.touched.fullName && formik.errors.fullName
                                ? true
                                : false
                        }
                    >
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <FormErrorMessage>
                                {formik.errors.fullName}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <Button
                        mt={4}
                        isLoading={formik.isSubmitting}
                        type="submit"
                    >
                        Save
                    </Button>
                </GridItem>
            </SimpleGrid>
        </form>
    );
}

export default ProfileForm;
