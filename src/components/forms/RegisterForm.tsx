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

const registerFormSchema = Yup.object().shape({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});

function RegisterForm() {
    const formik = useFormik<Yup.InferType<typeof registerFormSchema>>({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
        },
        validationSchema: registerFormSchema,
        onSubmit: (values) => {
            console.log(values);
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
                    <Button type="submit" w="full">
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
