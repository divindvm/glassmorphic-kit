# glassmorphic-kit

A cross-framework glass morphism component library for React and Angular with Apple-inspired glass effects. This package provides beautiful, customizable glass morphism components that work seamlessly in both React (JSX/TSX) and Angular applications.

## Features

- **Apple-inspired glass morphism effects** with backdrop filters and transparency
- **React support** with full JSX/TSX compatibility
- **Angular support** with components and services
- **Responsive design** with mobile-optimized effects
- **Pre-configured variants** (light, medium, heavy, subtle, dramatic)
- **Pre-built presets** (card, modal, sidebar, tooltip, button, input)
- **Highly customizable** with extensive configuration options
- **Hover effects** and smooth animations
- **TypeScript support** with comprehensive type definitions
- **CSS-in-JS** and CSS variables support
- **Cross-browser compatibility**

## Installation

```bash
npm install glassmorphic-kit
```

### Peer Dependencies

For React:
```bash
npm install react react-dom
```

For Angular:
```bash
npm install @angular/core @angular/common
```

## Quick Start

### React Usage

#### Basic Usage

```tsx
import React from 'react';
import { GlassMorphism } from 'glassmorphic-kit';

function App() {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <GlassMorphism
        variant="medium"
        style={{ padding: '20px', borderRadius: '16px' }}
      >
        <h2>Glass Morphism Card</h2>
        <p>This is a beautiful glass morphism component!</p>
      </GlassMorphism>
    </div>
  );
}
```

#### Using Pre-configured Variants

```tsx
import React from 'react';
import { 
  GlassMorphismLight, 
  GlassMorphismMedium, 
  GlassMorphismHeavy 
} from 'glassmorphic-kit';

function App() {
  return (
    <div style={{ background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' }}>
      <GlassMorphismLight style={{ padding: '16px', margin: '10px' }}>
        Light glass effect
      </GlassMorphismLight>
      
      <GlassMorphismMedium style={{ padding: '16px', margin: '10px' }}>
        Medium glass effect
      </GlassMorphismMedium>
      
      <GlassMorphismHeavy style={{ padding: '16px', margin: '10px' }}>
        Heavy glass effect
      </GlassMorphismHeavy>
    </div>
  );
}
```

#### Using Pre-built Presets

```tsx
import React from 'react';
import { GlassCard, GlassModal, GlassButton } from 'glassmorphic-kit';

function App() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <GlassCard>
        <h3>Card Title</h3>
        <p>This is a pre-configured glass card component.</p>
      </GlassCard>
      
      <GlassButton onClick={() => alert('Clicked!')}>
        Glass Button
      </GlassButton>
    </div>
  );
}
```

#### Custom Configuration

```tsx
import React from 'react';
import { GlassMorphism } from 'glassmorphic-kit';

function App() {
  return (
    <GlassMorphism
      blur={20}
      opacity={0.2}
      backgroundColor="rgba(255, 255, 255, 0.2)"
      borderWidth={2}
      borderColor="rgba(255, 255, 255, 0.3)"
      borderRadius={24}
      backdropBlur={20}
      backdropSaturate={1.4}
      backdropBrightness={1.3}
      backdropContrast={1.3}
      boxShadow="0 20px 60px rgba(0, 0, 0, 0.2)"
      hoverEffect={true}
      hoverBlur={25}
      hoverOpacity={0.25}
      style={{ padding: '24px', width: '300px' }}
    >
      <h2>Custom Glass Effect</h2>
      <p>Fully customizable glass morphism component!</p>
    </GlassMorphism>
  );
}
```

#### Using the Hook

```tsx
import React from 'react';
import { useGlassMorphism } from 'glassmorphic-kit';

function CustomComponent() {
  const { styles, eventHandlers } = useGlassMorphism({
    variant: 'medium',
    hoverEffect: true,
  });

  return (
    <div 
      style={styles} 
      {...eventHandlers}
      className="glass-morphism"
    >
      <h3>Custom Component with Glass Effect</h3>
    </div>
  );
}
```

### Angular Usage

#### Module Setup

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlassMorphismModule } from 'glassmorphic-kit';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GlassMorphismModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### Basic Usage

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px;">
      <glass-morphism 
        [variant]="'medium'"
        [config]="glassConfig"
        [ngStyle]="{'padding': '20px', 'border-radius': '16px'}"
      >
        <h2>Glass Morphism Card</h2>
        <p>This is a beautiful glass morphism component!</p>
      </glass-morphism>
    </div>
  `
})
export class AppComponent {
  glassConfig = {
    blur: 12,
    opacity: 0.15,
    hoverEffect: true
  };
}
```

#### Using Pre-configured Components

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); padding: 20px;">
      <glass-morphism-light [ngStyle]="{'padding': '16px', 'margin': '10px'}">
        Light glass effect
      </glass-morphism-light>
      
      <glass-morphism-medium [ngStyle]="{'padding': '16px', 'margin': '10px'}">
        Medium glass effect
      </glass-morphism-medium>
      
      <glass-morphism-heavy [ngStyle]="{'padding': '16px', 'margin': '10px'}">
        Heavy glass effect
      </glass-morphism-heavy>
    </div>
  `
})
export class AppComponent { }
```

#### Using Pre-built Presets

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
      <glass-card>
        <h3>Card Title</h3>
        <p>This is a pre-configured glass card component.</p>
      </glass-card>
      
      <glass-button (click)="onButtonClick()">
        Glass Button
      </glass-button>
    </div>
  `
})
export class AppComponent {
  onButtonClick() {
    alert('Clicked!');
  }
}
```

#### Using the Service

```typescript
// app.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GlassMorphismService } from 'glassmorphic-kit';

@Component({
  selector: 'app-root',
  template: `
    <div 
      #glassElement
      style="padding: 20px; width: 300px;"
    >
      <h3>Custom Glass Element</h3>
      <p>Applied using the service!</p>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('glassElement') glassElement!: ElementRef;

  constructor(private glassMorphismService: GlassMorphismService) {}

  ngAfterViewInit() {
    this.glassMorphismService.applyGlassMorphism(
      this.glassElement,
      {
        variant: 'medium',
        blur: 15,
        opacity: 0.2,
        hoverEffect: true
      }
    );
  }
}
```

## Configuration Options

### GlassMorphismConfig Interface

```typescript
interface GlassMorphismConfig {
  // Blur and transparency
  blur?: number;                    // Backdrop blur amount (default: 12)
  opacity?: number;                 // Background opacity (default: 0.15)
  
  // Background
  backgroundColor?: string;         // Custom background color
  backgroundGradient?: string;      // CSS gradient string
  
  // Border
  borderWidth?: number;             // Border width (default: 1)
  borderColor?: string;             // Border color
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: number | string;   // Border radius (default: 16)
  
  // Shadow
  boxShadow?: string;               // Custom box shadow
  shadowColor?: string;             // Shadow color
  shadowBlur?: number;              // Shadow blur radius
  shadowOffsetX?: number;           // Shadow X offset
  shadowOffsetY?: number;           // Shadow Y offset
  
  // Backdrop filter
  backdropFilter?: string;          // Custom backdrop filter
  backdropBlur?: number;            // Backdrop blur amount
  backdropSaturate?: number;        // Backdrop saturation
  backdropBrightness?: number;      // Backdrop brightness
  backdropContrast?: number;        // Backdrop contrast
  
  // Size and positioning
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  // Spacing
  padding?: number | string;
  margin?: number | string;
  
  // Animation
  transition?: string;              // CSS transition
  animation?: string;               // CSS animation
  hoverEffect?: boolean;            // Enable hover effects
  hoverBlur?: number;               // Hover blur amount
  hoverOpacity?: number;            // Hover opacity
  
  // Advanced effects
  noiseTexture?: boolean;           // Add noise texture
  noiseOpacity?: number;            // Noise opacity
  reflection?: boolean;             // Add reflection effect
  reflectionOpacity?: number;       // Reflection opacity
  
  // Responsive
  responsive?: boolean;             // Enable responsive behavior
  mobileBlur?: number;              // Mobile blur amount
  mobileOpacity?: number;           // Mobile opacity
}
```

### Pre-configured Variants

- **light**: Subtle glass effect with minimal blur
- **medium**: Balanced glass effect (default)
- **heavy**: Strong glass effect with high blur
- **subtle**: Very light glass effect
- **dramatic**: Maximum glass effect with strong blur

### Pre-built Presets

- **card**: Optimized for content cards
- **modal**: Perfect for modal dialogs
- **sidebar**: Designed for navigation sidebars
- **tooltip**: Lightweight tooltip styling
- **button**: Interactive button styling
- **input**: Form input styling

## Advanced Usage

### Custom Theme

```typescript
import { defaultTheme, mergeConfig } from 'glassmorphic-kit';

const customTheme = {
  ...defaultTheme,
  variants: {
    ...defaultTheme.variants,
    custom: {
      blur: 25,
      opacity: 0.3,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 20,
      backdropBlur: 25,
      backdropSaturate: 1.5,
      backdropBrightness: 1.4,
      backdropContrast: 1.4,
      boxShadow: '0 25px 70px rgba(0, 0, 0, 0.3)',
    }
  }
};
```

### CSS Variables Support

```tsx
<GlassMorphism
  useCSSVariables={true}
  config={{
    blur: 15,
    opacity: 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }}
>
  <div style={{
    '--glass-blur': '20px',
    '--glass-opacity': '0.25'
  }}>
    Content with CSS variables
  </div>
</GlassMorphism>
```

### Higher-Order Component

```tsx
import { withGlassMorphism } from '@toast/glass-morphism';

const GlassCard = withGlassMorphism('div', {
  variant: 'medium',
  preset: 'card'
});

function App() {
  return (
    <GlassCard>
      <h3>Wrapped Component</h3>
      <p>This div is automatically wrapped with glass morphism!</p>
    </GlassCard>
  );
}
```

## Styling Tips

### Background Requirements

Glass morphism works best with colorful or textured backgrounds:

```css
/* Good backgrounds for glass morphism */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image-bg {
  background: url('your-image.jpg') center/cover;
}

.pattern-bg {
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}
```

### Performance Optimization

```tsx
// Use CSS variables for better performance
<GlassMorphism useCSSVariables={true} />

// Disable hover effects on mobile
<GlassMorphism 
  enableHover={!isMobile}
  responsive={true}
/>
```

## Browser Support

- Chrome 76+
- Firefox 103+
- Safari 9+
- Edge 79+

**Note**: Backdrop-filter support is required for glass morphism effects. Older browsers will fall back to basic transparency effects.

## Responsive Design

The library automatically detects mobile devices and applies optimized settings:

```tsx
<GlassMorphism
  responsive={true}
  mobileBlur={8}      // Lighter blur on mobile
  mobileOpacity={0.1} // Lower opacity on mobile
/>
```

## Animation and Hover Effects

```tsx
<GlassMorphism
  hoverEffect={true}
  hoverBlur={20}      // Increased blur on hover
  hoverOpacity={0.25} // Increased opacity on hover
  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
/>
```

## Testing

```tsx
import { render, screen } from '@testing-library/react';
import { GlassMorphism } from 'glassmorphic-kit';

test('renders glass morphism component', () => {
  render(
    <GlassMorphism data-testid="glass-component">
      <h1>Test Content</h1>
    </GlassMorphism>
  );
  
  expect(screen.getByTestId('glass-component')).toBeInTheDocument();
  expect(screen.getByText('Test Content')).toBeInTheDocument();
});
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- [Documentation](https://github.com/divindivakaran/glassmorphic-kit#readme)
- [Issue Tracker](https://github.com/divindivakaran/glassmorphic-kit/issues)
- [Discussions](https://github.com/divindivakaran/glassmorphic-kit/discussions)

## Acknowledgments

Inspired by Apple's design language and the glass morphism trend in modern UI design.
