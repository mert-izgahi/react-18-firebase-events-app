import * as Yup from "yup";
import { useFormik } from "formik";
import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { IoLogoGoogle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

const registerFormSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

function RegisterForm() {
    const navigate = useNavigate();
    const formik = useFormik<Yup.InferType<typeof registerFormSchema>>({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
        },
        validationSchema: registerFormSchema,
        onSubmit: async (values) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

                const user = await userCredential.user;

                // update user profile
                await updateProfile(user, {
                    displayName: values.fullName,
                });

                // check if user exists in the database
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    await setDoc(docRef, {
                        fullName: values.fullName,
                        email: values.email,
                        uid: user.uid,
                        createdAt: serverTimestamp(),
                    });

                    toast.success("Account created successfully");
                    navigate("/profile");
                } else {
                    toast.error("User already exists");
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="w-full" noValidate>
            <SimpleGrid
                maxW={"container.md"}
                columns={1}
                m={"auto"}
                mb={36}
                gap={6}
                p={12}
            >
                <GridItem>
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.touched.fullName && formik.errors.fullName
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Full Name</FormLabel>
                        <Input
                            type="text"
                            {...formik.getFieldProps("fullName")}
                        />

                        {formik.touched.fullName && formik.errors.fullName ? (
                            <FormErrorMessage>
                                {formik.errors.fullName as string}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.touched.email && formik.errors.email
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            {...formik.getFieldProps("email")}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <FormErrorMessage>
                                {formik.errors.email as string}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        isRequired
                        isInvalid={
                            formik.touched.password && formik.errors.password
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            {...formik.getFieldProps("password")}
                        />

                        {formik.touched.password && formik.errors.password ? (
                            <FormErrorMessage>
                                {formik.errors.password as string}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <Button
                        type="submit"
                        w="full"
                        isDisabled={formik.isSubmitting}
                        isLoading={formik.isSubmitting}
                    >
                        Create Account
                    </Button>
                </GridItem>

                <GridItem>
                    <Text>
                        Do you have an account?{" "}
                        <Text as={Link} to={"/login"} color="primary.500">
                            Login
                        </Text>
                    </Text>
                </GridItem>

                <GridItem>
                    <Flex align="center">
                        <Divider />
                        <Text mx={2}>OR</Text>
                        <Divider />
                    </Flex>
                </GridItem>

                <GridItem>
                    <Button
                        w="full"
                        variant="outline"
                        leftIcon={<IoLogoGoogle />}
                    >
                        Continue with Google
                    </Button>
                </GridItem>
            </SimpleGrid>
        </form>
    );
}

export default RegisterForm;
