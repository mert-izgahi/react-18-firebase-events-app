import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    Select,
    SimpleGrid,
    Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { categories } from "../../constants/categories";
import { useState } from "react";

const eventFormSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().max(200, "Too long").required(),
    location: Yup.string().required(),
    date: Yup.date()
        .required("Required")
        .min(new Date(), "Cannot be in the past"),
    images: Yup.array().required(),
    category: Yup.string().required(),
    isFeatured: Yup.boolean().required(),
    organizer: Yup.string().required(),
    ticketLink: Yup.string().required(),
    ticketPrice: Yup.number().min(0, "Cannot be negative").required(),
    capacity: Yup.number().min(0, "Cannot be negative").required(),
});

function EventForm() {
    const formik = useFormik<Yup.InferType<typeof eventFormSchema>>({
        initialValues: {
            title: "",
            description: "",
            location: "",
            date: new Date(),
            images: [],
            category: "",
            isFeatured: false,
            organizer: "",
            ticketLink: "",
            ticketPrice: 0,
            capacity: 0,
        },
        validationSchema: eventFormSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const [images, setImages] = useState<string[]>([]);
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImages((old) => [...old, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });

            formik.setFieldValue("images", images);
        }
    };
    console.log(formik.errors);
    console.log(formik.values);

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <SimpleGrid columns={1} gap={6} maxW={"container.md"} m={"auto"}>
                <GridItem>
                    <FormControl
                        id="title"
                        isRequired
                        isInvalid={
                            (formik.errors.title && formik.touched.title) ||
                            false
                        }
                    >
                        <FormLabel>Title</FormLabel>
                        <Input type="text" {...formik.getFieldProps("title")} />
                        {formik.errors.title && formik.touched.title && (
                            <FormErrorMessage>
                                {formik.errors.title}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="category"
                        isRequired
                        isInvalid={
                            (formik.errors.category &&
                                formik.touched.category) ||
                            false
                        }
                    >
                        <FormLabel>Category</FormLabel>
                        <Select {...formik.getFieldProps("category")}>
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        {formik.errors.category && formik.touched.category && (
                            <FormErrorMessage>
                                {formik.errors.category}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="description"
                        isRequired
                        isInvalid={
                            (formik.errors.description &&
                                formik.touched.description) ||
                            false
                        }
                    >
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            rows={5}
                            {...formik.getFieldProps("description")}
                        />
                        {formik.errors.description &&
                            formik.touched.description && (
                                <FormErrorMessage>
                                    {formik.errors.description}
                                </FormErrorMessage>
                            )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="date"
                        isRequired
                        isInvalid={
                            formik.errors.date && formik.touched.date
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Date</FormLabel>
                        <Input
                            as="input"
                            type="date"
                            defaultValue={
                                new Date().toISOString().split("T")[0]
                            }
                            onChange={(e) =>
                                formik.setFieldValue("date", e.target.value)
                            }
                        />
                        {formik.errors.date && formik.touched.date && (
                            <FormErrorMessage>
                                {formik.errors.date as string}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="location"
                        isRequired
                        isInvalid={
                            formik.errors.location && formik.touched.location
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            {...formik.getFieldProps("location")}
                        />
                        {formik.errors.location && formik.touched.location && (
                            <FormErrorMessage>
                                {formik.errors.location as string}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="capacity"
                        isRequired
                        isInvalid={
                            formik.errors.capacity && formik.touched.capacity
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Capacity</FormLabel>
                        <Input
                            type="number"
                            {...formik.getFieldProps("capacity")}
                        />
                        {formik.errors.capacity && formik.touched.capacity && (
                            <FormErrorMessage>
                                {formik.errors.capacity as string}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="ticketLink"
                        isRequired
                        isInvalid={
                            formik.errors.ticketLink &&
                            formik.touched.ticketLink
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Ticket Link</FormLabel>
                        <Input
                            type="text"
                            {...formik.getFieldProps("ticketLink")}
                        />
                        {formik.errors.ticketLink &&
                            formik.touched.ticketLink && (
                                <FormErrorMessage>
                                    {formik.errors.ticketLink as string}
                                </FormErrorMessage>
                            )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="ticketPrice"
                        isRequired
                        isInvalid={
                            formik.errors.ticketPrice &&
                            formik.touched.ticketPrice
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Ticket Price</FormLabel>
                        <Input
                            type="number"
                            {...formik.getFieldProps("ticketPrice")}
                        />
                        {formik.errors.ticketPrice &&
                            formik.touched.ticketPrice && (
                                <FormErrorMessage>
                                    {formik.errors.ticketPrice as string}
                                </FormErrorMessage>
                            )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl
                        id="images"
                        isRequired
                        isInvalid={
                            formik.errors.images && formik.touched.images
                                ? true
                                : false
                        }
                    >
                        <FormLabel>Images</FormLabel>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            sx={{
                                padding: "3px",
                            }}
                            onChange={onImageChange}
                        />
                        {formik.errors.images && formik.touched.images && (
                            <FormErrorMessage>
                                {formik.errors.images as string}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <Button type="submit" mt={4} w="full">
                        Submit
                    </Button>
                </GridItem>
            </SimpleGrid>
        </form>
    );
}

export default EventForm;
