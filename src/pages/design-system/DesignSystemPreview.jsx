import {
  Button,
  ButtonIcon,
  Text,
  Heading,
  FieldInput,
  FieldCount,
  Pagination,
  SignToggle,
  FieldTextarea,
} from "@components/ui";
import {
  FiHeart,
  FiTrash,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import {AreaSelect} from "@components/ui/Fields/FieldSelect/test.jsx";

const SignInForm = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: (values) => console.log(values),
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px 0",
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <Heading level={3} style={{ marginBottom: "16px" }}>
        Example of Using Inputs in Sign In Form
      </Heading>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <FieldInput
            style="rounded"
            name="email"
            type="email"
            placeholder="Email*"
          />
          <FieldInput
            style="rounded"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button variant={Button.variants.PRIMARY} type="submit">
            SIGN IN
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
};

const AddRecipeForm = () => {
  const formik = useFormik({
    initialValues: {
      ingredient: "",
      quantity: "",
      cookingTime: 20,
      preparation: "",
    },
    validationSchema: Yup.object({
      ingredient: Yup.string().required("Ingredient is required"),
      quantity: Yup.string().required("Quantity is required"),
      cookingTime: Yup.number().min(10).required("Cooking time is required"),
      preparation: Yup.string()
        .max(200)
        .required("Recipe preparation is required"),
    }),
    onSubmit: (values) => {
      console.log("Recipe submitted:", values);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const addIngredient = () => {
    console.log(
      "Add ingredient:",
      formik.values.ingredient,
      formik.values.quantity
    );
  };

  // Custom submit handler to mark all fields as touched
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.setTouched({
      ingredient: true,
      quantity: true,
      cookingTime: true,
      preparation: true,
    });
    formik.handleSubmit();
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px 0",
        padding: "24px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <Heading level={3} style={{ marginBottom: "24px" }}>
        Add Recipe Form Example
      </Heading>
      <FormikProvider value={formik}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Ingredients Section */}
          <div>
            <Heading
              level={4}
              style={{
                marginBottom: "16px",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Ingredients
            </Heading>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <div style={{ flex: 1 }}>
                <FieldInput
                  name="ingredient"
                  placeholder="Add the ingredient"
                />
              </div>
              <div style={{ flex: 1 }}>
                <FieldInput name="quantity" placeholder="Enter quantity" />
              </div>
            </div>
            <Button
              variant={Button.variants.SECONDARY}
              onClick={addIngredient}
              type="button"
              style={{ alignSelf: "flex-start" }}
            >
              ADD INGREDIENT
              <FiPlus />
            </Button>
          </div>

          {/* Cooking Time Section */}
          <div>
            <FieldCount
              label="Cooking Time"
              name="cookingTime"
              strong
              onChange={(value) => formik.setFieldValue("cookingTime", value)}
              value={formik.values.cookingTime}
              step={10}
              inputError={
                formik.touched.cookingTime && formik.errors.cookingTime
              }
            />
          </div>

          {/* Recipe Preparation Section */}
          <div>
            <Heading
              level={4}
              style={{
                marginBottom: "16px",
                textTransform: "uppercase",
                fontSize: "16px",
              }}
            >
              Recipe Preparation
            </Heading>
            <FieldTextarea
              name="preparation"
              label="Опис"
              placeholder="Enter your recipe preparation"
              maxLength={200}
              value={formik.values.preparation}
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "flex-start",
            }}
          >
            <ButtonIcon onClick={() => console.log("Delete recipe")}>
              <FiTrash />
            </ButtonIcon>
            <Button variant={Button.variants.PRIMARY} type="submit">
              PUBLISH
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

const DesignSystemPreview = () => {
  const handleClick = () => console.log("Button clicked!");

  return (
    <div style={{ padding: "20px" }}>
      <Heading level={1} style={{ marginBottom: "32px" }}>
        Design System Test
      </Heading>

      <h2>Primary Buttons</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button variant={Button.variants.PRIMARY} onClick={handleClick}>
          Primary Button
        </Button>
        <Button
          variant={Button.variants.PRIMARY}
          disabled
          onClick={handleClick}
        >
          Primary Disabled
        </Button>
        <Button
          variant={Button.variants.PRIMARY}
          isLoading
          onClick={handleClick}
        >
          Primary Loading
        </Button>
      </div>

      <h2>Secondary Buttons</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button variant={Button.variants.SECONDARY} onClick={handleClick}>
          Secondary Button
        </Button>
        <Button
          variant={Button.variants.SECONDARY}
          disabled
          onClick={handleClick}
        >
          Secondary Disabled
        </Button>
      </div>

      <h2>Secondary Reversed Buttons</h2>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Button
          variant={Button.variants.SECONDARY_REVERSED}
          onClick={handleClick}
        >
          Secondary Reversed
        </Button>
        <Button
          variant={Button.variants.SECONDARY_REVERSED}
          disabled
          onClick={handleClick}
        >
          Secondary Reversed Disabled
        </Button>
      </div>

      <h2>Submit Buttons (type=submit)</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button
          variant={Button.variants.PRIMARY}
          type="submit"
          onClick={handleClick}
        >
          Submit Form
        </Button>
        <Button
          variant={Button.variants.PRIMARY}
          type="submit"
          disabled
          onClick={handleClick}
        >
          Submit Disabled
        </Button>
      </div>

      <h2>Link Buttons</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button variant={Button.variants.PRIMARY} href="https://google.com">
          External Link
        </Button>
        <Button variant={Button.variants.SECONDARY} to="/">
          Internal Link
        </Button>
      </div>

      <h2>Icon Buttons</h2>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <ButtonIcon onClick={handleClick}>
          <FiHeart />
        </ButtonIcon>
        <ButtonIcon variant={ButtonIcon.variants.PRIMARY} onClick={handleClick}>
          <FiTrash />
        </ButtonIcon>
        <ButtonIcon disabled onClick={handleClick}>
          <FiEdit />
        </ButtonIcon>
        <ButtonIcon
          variant={ButtonIcon.variants.PRIMARY}
          disabled
          onClick={handleClick}
        >
          <FiEye />
        </ButtonIcon>
        <ButtonIcon onClick={handleClick}>
          <FiPlus />
        </ButtonIcon>
        <ButtonIcon
          loading={true}
          variant={ButtonIcon.variants.PRIMARY}
          onClick={handleClick}
        >
          <FiPlus />
        </ButtonIcon>
      </div>

      <h2>Buttons with Icons</h2>
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <Button variant={Button.variants.SECONDARY} onClick={handleClick}>
          Add Ingredient
          <FiPlus size="22px" />
        </Button>
      </div>

      {/* Form Examples */}
      <Heading level={2} style={{ marginBottom: "16px" }}>
        Form Examples
      </Heading>

      <SignInForm />
      <AddRecipeForm />

      <h2>Pagination Component (Custom)</h2>
      <div style={{ marginBottom: "24px" }}>
         <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={(page) => console.log("Go to page:", page)}
        />
      </div>

      <h2>Typography - Headings</h2>
      <div style={{ marginBottom: "24px" }}>
        <Heading level={1} size="2xl" color="primary">
          Main Page Title (H1)
        </Heading>
        <Heading level={2} size="lg">
          Section Heading (H2)
        </Heading>
        <Heading level={3} size="md" color="muted">
          Subsection (H3)
        </Heading>
        <Heading level={4} size="sm" weight="semibold">
          Card Title (H4)
        </Heading>
      </div>

      <h2>Typography - Text</h2>
      <div style={{ marginBottom: "24px" }}>
        <Text variant="body" size="lg" color="primary">
          Large body text for important content
        </Text>
        <Text variant="body" size="md">
          Regular body text for normal content
        </Text>
        <Text variant="body" size="sm" color="muted">
          Small body text for secondary information
        </Text>
        <Text variant="caption" size="xs" color="muted">
          Caption text for labels and hints
        </Text>
        <Text variant="label" size="sm" weight="semibold" color="primary">
          Form Label Text
        </Text>
      </div>

      <h2>Text Colors</h2>
      <div style={{ marginBottom: "24px" }}>
        <Text weight="semibold">Default text color (чорний #050505)</Text>
        <Text color="primary" weight="semibold">
          Primary text color (чорний #050505)
        </Text>
        <Text color="muted">Muted text color (світло-сірий #bfbebe)</Text>
        <Text color="success" weight="medium">
          Success message (зелений)
        </Text>
        <Text color="warning" weight="medium">
          Warning message (жовтий)
        </Text>
        <Text color="error" weight="medium">
          Error message (червоний)
        </Text>
      </div>

      <h2>Color Comparison</h2>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Text size="lg">Default</Text>
          <Text color="primary" size="lg">
            Primary
          </Text>
          <Text color="muted" size="lg">
            Muted
          </Text>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Text weight="bold">Default Bold</Text>
          <Text color="primary" weight="bold">
            Primary Bold
          </Text>
          <Text color="muted" weight="bold">
            Muted Bold
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "32px",
            marginTop: "32px",
          }}
        >
          <SignToggle />
        </div>
          <AreaSelect />
      </div>
    </div>
  );
};

export default DesignSystemPreview;
