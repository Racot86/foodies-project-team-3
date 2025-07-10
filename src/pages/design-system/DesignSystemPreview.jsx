import {
  Button,
  ButtonIcon,
  Text,
  Heading,
  FieldInput,
  FieldCount,
  SignToggle,
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

const DesignSystemPreview = () => {
  const handleClick = () => console.log("Button clicked!");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Design System Test</h1>

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
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button variant={Button.variants.SECONDARY} onClick={handleClick}>
          Add Ingredient
          <FiPlus size="22px" />
        </Button>
      </div>

      <FieldCount
        label="Count Field"
        name="count"
        strong
        onChange={(value) => console.log("Count changed:", value)}
        error="This field is required"
        value={0}
      />

      <h2>Field Input Components</h2>
      <div style={{ marginBottom: "24px", maxWidth: "400px" }}>
        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Basic Input"
            placeholder="Enter your text here..."
            helperText="This is a helper text"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Required Input"
            placeholder="Required field"
            required
            helperText="This field is required"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Input with Error"
            placeholder="Enter valid email"
            error="Please enter a valid email address"
            value="invalid-email"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
            value="Disabled value"
            helperText="This input cannot be edited"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            style="rounded"
            label="Password Input"
            type="password"
            placeholder="Enter your password"
            helperText="Must be at least 8 characters"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            style="rounded"
            label="Email Input"
            type="email"
            placeholder="user@example.com"
            helperText="We'll never share your email"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Password with Toggle Icon"
            type="password"
            placeholder="Enter your password"
            helperText="Click the eye icon to toggle visibility"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <FieldInput
            label="Input with Character Count"
            placeholder="Type something..."
            maxLength="50"
            helperText="Maximum 50 characters allowed"
          />
        </div>
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
      </div>
    </div>
  );
};

export default DesignSystemPreview;
