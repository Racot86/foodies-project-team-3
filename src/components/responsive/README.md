# Responsive Design Implementation

This document explains the responsive design implementation for the project, including breakpoints, container classes, and responsive hooks.

## Breakpoints

The project uses the following breakpoints:

- **Mobile Small**: Up to 374px (gummy stretching)
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px and above

## ResponsiveContainer Component

The `ResponsiveContainer` component provides consistent padding and width constraints across different screen sizes. It's used as a wrapper for content in various components like `Layout`.

### Usage

```jsx
import { ResponsiveContainer } from '../container/ResponsiveContainer';

const MyComponent = () => {
  return (
    <ResponsiveContainer>
      {/* Your content here */}
    </ResponsiveContainer>
  );
};
```

### CSS Implementation

The container has the following properties at different breakpoints:

- **Mobile Small (up to 374px)**: Full width with 20px padding on both sides (gummy stretching)
- **Mobile (375px)**: Fixed width of 375px with 20px padding on both sides
- **Tablet (768px)**: Fixed width of 768px with 32px padding on both sides
- **Desktop (1440px)**: Fixed width of 1440px with 100px padding on both sides

## useBreakpoint Hook

The `useBreakpoint` hook allows components to respond to different screen sizes by providing the current breakpoint and window width.

### Usage

```jsx
import { useBreakpoint } from '../../hooks/useBreakpoint';

const MyComponent = () => {
  const { breakpoint, windowWidth } = useBreakpoint();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Window width: {windowWidth}px</p>

      {/* Conditional rendering based on breakpoint */}
      {breakpoint === 'mobile' && <MobileContent />}
      {breakpoint === 'tablet' && <TabletContent />}
      {breakpoint === 'desktop' && <DesktopContent />}
    </div>
  );
};
```

### Available Breakpoints

- `mobile-small`: Window width less than 375px
- `mobile`: Window width between 375px and 767px
- `tablet`: Window width between 768px and 1439px
- `desktop`: Window width 1440px or greater

## Example Component

The `ResponsiveExample` component demonstrates how to use the `useBreakpoint` hook for conditional rendering based on the current breakpoint. It's included in the HomePage for demonstration purposes.

## Implementation in Layout

The `Layout` component uses the `ResponsiveContainer` component to ensure consistent padding and width constraints across different screen sizes.
