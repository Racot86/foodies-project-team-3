import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "@routes/AppRoutes";
import { Button } from "@components/ui";

export const App = () => {
  const handleClick = () => console.log("Button clicked!");

  return (
    <BrowserRouter>
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
      </div>
      <AppRoutes />
    </BrowserRouter>
  );
};
