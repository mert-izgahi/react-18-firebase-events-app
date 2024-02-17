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
import { Link } from "react-router-dom";
import { auth, db } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

const loginFormSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

function LoginForm() {
    const formik = useFormik<Yup.InferType<typeof loginFormSchema>>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginFormSchema,
        onSubmit: async (values) => {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

                const user = await userCredential.user;

                // check if user exists in the database
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    toast.error("User does not exist");
                }

                toast.success("Login successful");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
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
                        disabled={formik.isSubmitting}
                        isLoading={formik.isSubmitting}
                    >
                        Submit
                    </Button>
                </GridItem>

                <GridItem>
                    <Text>
                        Don't have an account?{" "}
                        <Text as={Link} to={"/register"} color="primary.500">
                            Create Account
                        </Text>
                    </Text>
                </GridItem>

                <GridItem>
                    <Text>
                        Forgot Password?{" "}
                        <Text
                            as={Link}
                            to={"/reset-password"}
                            color="primary.500"
                        >
                            Reset Password
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

export default LoginForm;
