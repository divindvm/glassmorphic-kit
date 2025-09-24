// Core exports
export { GlassMorphismCore, useGlassMorphism, withGlassMorphism } from './core/GlassMorphismCore';

// React exports
export {
  GlassMorphism,
  GlassMorphismLight,
  GlassMorphismMedium,
  GlassMorphismHeavy,
  GlassMorphismSubtle,
  GlassMorphismDramatic,
  GlassCard,
  GlassModal,
  GlassSidebar,
  GlassTooltip,
  GlassButton,
  GlassInput
} from './react/GlassMorphism';

// Angular exports
export { GlassMorphismService } from './angular/glass-morphism.service';
export {
  GlassMorphismComponent,
  GlassMorphismLightComponent,
  GlassMorphismMediumComponent,
  GlassMorphismHeavyComponent,
  GlassCardComponent,
  GlassModalComponent,
  GlassButtonComponent
} from './angular/glass-morphism.component';
export { GlassMorphismModule } from './angular/glass-morphism.module';

// Type exports
export type {
  GlassMorphismProps,
  GlassMorphismConfig,
  GlassMorphismVariant,
  GlassMorphismVariants,
  GlassMorphismTheme,
  GlassMorphismStyleProps,
  AngularGlassMorphismConfig,
  AngularGlassMorphismProps,
  GlassMorphismPreset,
  GlassMorphismPresets,
  GlassMorphismEvents,
  GlassMorphismCSSVars
} from './types';

// Style and utility exports
export {
  defaultTheme,
  presets,
  generateGlassMorphismStyles,
  generateCSSVariables,
  getVariantConfig,
  getPresetConfig,
  mergeConfig,
  isMobileDevice,
  getResponsiveBlur,
  getResponsiveOpacity
} from './styles/glassMorphismStyles';

// Default export for React
export { default } from './react/GlassMorphism';
