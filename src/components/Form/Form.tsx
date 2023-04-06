import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress, Input, Textarea } from "@mui/joy";

import styles from "./Form.module.css";

type FormProps = {
  setDescription: (description: any) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
};

const Form = ({ setDescription, setIsSubmitted }: FormProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      bookmark: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      bookmark: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    setDescription("");
    setIsSubmitted(true);
    formik.setSubmitting(true);

    const { title, author, bookmark } = values;

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        bookmark,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setDescription((prev: string) => prev + chunkValue);
    }

    formik.setSubmitting(false);
  };

  return (
    <form className={styles.root} onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Book Title</label>
      <Input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.touched.title && Boolean(formik.errors.title)}
      />
      <label htmlFor="author">Author</label>
      <Input
        id="author"
        name="author"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.author}
        error={formik.touched.author && Boolean(formik.errors.author)}
      />
      <label htmlFor="bookmark">The Last Sentence Or Two You Read</label>
      <Textarea
        id="bookmark"
        name="bookmark"
        onChange={formik.handleChange}
        value={formik.values.bookmark}
        error={formik.touched.bookmark && Boolean(formik.errors.bookmark)}
        minRows={4}
      />
      <Button
        startDecorator={
          formik.isSubmitting ? (
            <CircularProgress
              variant="plain"
              thickness={2}
              sx={{ "--CircularProgress-size": "16px" }}
            />
          ) : null
        }
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Generating" : "Submit"}
      </Button>
    </form>
  );
};

export default Form;
