import { GlassMorphismConfig, GlassMorphismStyleProps, GlassMorphismVariant } from '../types';

// Default theme configuration
export const defaultTheme = {
  variants: {
    light: {
      blur: 8,
      opacity: 0.1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      backdropBlur: 8,
      backdropSaturate: 1.2,
      backdropBrightness: 1.1,
      backdropContrast: 1.1,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    medium: {
      blur: 12,
      opacity: 0.15,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 16,
      backdropBlur: 12,
      backdropSaturate: 1.3,
      backdropBrightness: 1.2,
      backdropContrast: 1.2,
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
    heavy: {
      blur: 20,
      opacity: 0.2,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 20,
      backdropBlur: 20,
      backdropSaturate: 1.4,
      backdropBrightness: 1.3,
      backdropContrast: 1.3,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    },
    subtle: {
      blur: 4,
      opacity: 0.05,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 8,
      backdropBlur: 4,
      backdropSaturate: 1.1,
      backdropBrightness: 1.05,
      backdropContrast: 1.05,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
    dramatic: {
      blur: 30,
      opacity: 0.25,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 24,
      backdropBlur: 30,
      backdropSaturate: 1.5,
      backdropBrightness: 1.4,
      backdropContrast: 1.4,
      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
    },
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  },
  defaultConfig: {
    blur: 12,
    opacity: 0.15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    backdropBlur: 12,
    backdropSaturate: 1.3,
    backdropBrightness: 1.2,
    backdropContrast: 1.2,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hoverEffect: true,
    hoverBlur: 16,
    hoverOpacity: 0.2,
  },
};

// Preset configurations for common use cases
export const presets: Record<string, GlassMorphismConfig> = {
  card: {
    ...defaultTheme.variants.medium,
    padding: '24px',
    width: '100%',
    minHeight: '200px',
  },
  modal: {
    ...defaultTheme.variants.heavy,
    padding: '32px',
    width: '90%',
    maxWidth: '500px',
    minHeight: '300px',
  },
  sidebar: {
    ...defaultTheme.variants.medium,
    padding: '20px',
    width: '300px',
    height: '100vh',
    borderRadius: '0 20px 20px 0',
  },
  tooltip: {
    ...defaultTheme.variants.light,
    padding: '12px 16px',
    borderRadius: 8,
    maxWidth: '250px',
  },
  button: {
    ...defaultTheme.variants.light,
    padding: '12px 24px',
    borderRadius: 8,
    transition: 'all 0.2s ease',
    hoverEffect: true,
    hoverBlur: 16,
    hoverOpacity: 0.2,
  },
  input: {
    ...defaultTheme.variants.subtle,
    padding: '12px 16px',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    minHeight: '44px',
  },
};

// Utility function to merge configurations
export const mergeConfig = (
  base: GlassMorphismConfig,
  override: Partial<GlassMorphismConfig>
): GlassMorphismConfig => {
  return { ...base, ...override };
};

// Utility function to get variant configuration
export const getVariantConfig = (variant: GlassMorphismVariant): GlassMorphismConfig => {
  return defaultTheme.variants[variant];
};

// Utility function to get preset configuration
export const getPresetConfig = (preset: string): GlassMorphismConfig => {
  return presets[preset] || defaultTheme.defaultConfig;
};

// CSS-in-JS style generator
export const generateGlassMorphismStyles = (props: GlassMorphismStyleProps): React.CSSProperties => {
  const { config, isHovered, isMobile, variant } = props;
  
  // Get base configuration
  let baseConfig = config;
  if (variant && !config.blur) {
    baseConfig = mergeConfig(getVariantConfig(variant), config);
  }
  
  // Apply responsive adjustments
  if (isMobile && config.responsive) {
    baseConfig = {
      ...baseConfig,
      blur: config.mobileBlur || baseConfig.blur,
      opacity: config.mobileOpacity || baseConfig.opacity,
    };
  }
  
  // Apply hover effects
  if (isHovered && baseConfig.hoverEffect) {
    baseConfig = {
      ...baseConfig,
      blur: baseConfig.hoverBlur || baseConfig.blur,
      opacity: baseConfig.hoverOpacity || baseConfig.opacity,
    };
  }
  
  // Generate CSS properties
  const styles: React.CSSProperties = {
    // Backdrop filter
    backdropFilter: baseConfig.backdropFilter || 
      `blur(${baseConfig.backdropBlur || baseConfig.blur || 12}px) 
       saturate(${baseConfig.backdropSaturate || 1.3}) 
       brightness(${baseConfig.backdropBrightness || 1.2}) 
       contrast(${baseConfig.backdropContrast || 1.2})`,
    
    // Background
    backgroundColor: baseConfig.backgroundColor || 
      `rgba(255, 255, 255, ${baseConfig.opacity || 0.15})`,
    
    // Border
    borderWidth: baseConfig.borderWidth || 1,
    borderColor: baseConfig.borderColor || 'rgba(255, 255, 255, 0.25)',
    borderStyle: baseConfig.borderStyle || 'solid',
    borderRadius: baseConfig.borderRadius || 16,
    
    // Shadow
    boxShadow: baseConfig.boxShadow || 
      `0 ${baseConfig.shadowBlur || 12}px ${baseConfig.shadowOffsetY || 40}px 
       ${baseConfig.shadowColor || 'rgba(0, 0, 0, 0.15)'}`,
    
    // Size
    width: baseConfig.width,
    height: baseConfig.height,
    minWidth: baseConfig.minWidth,
    minHeight: baseConfig.minHeight,
    maxWidth: baseConfig.maxWidth,
    maxHeight: baseConfig.maxHeight,
    
    // Spacing
    padding: baseConfig.padding,
    margin: baseConfig.margin,
    
    // Animation
    transition: baseConfig.transition || 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: baseConfig.animation,
    
    // Additional effects
    position: 'relative',
    overflow: 'hidden',
  };
  
  // Add noise texture if enabled
  if (baseConfig.noiseTexture) {
    styles.backgroundImage = `
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='${baseConfig.noiseOpacity || 0.1}'/%3E%3C/svg%3E"),
      ${styles.backgroundColor}
    `;
  }
  
  return styles;
};

// CSS custom properties generator for dynamic theming
export const generateCSSVariables = (config: GlassMorphismConfig): Record<string, string> => {
  return {
    '--glass-blur': `${config.blur || 12}px`,
    '--glass-opacity': `${config.opacity || 0.15}`,
    '--glass-bg': config.backgroundColor || 'rgba(255, 255, 255, 0.15)',
    '--glass-border': config.borderColor || 'rgba(255, 255, 255, 0.25)',
    '--glass-shadow': config.boxShadow || '0 12px 40px rgba(0, 0, 0, 0.15)',
    '--glass-backdrop-blur': `${config.backdropBlur || config.blur || 12}px`,
    '--glass-backdrop-saturate': `${config.backdropSaturate || 1.3}`,
    '--glass-backdrop-brightness': `${config.backdropBrightness || 1.2}`,
    '--glass-backdrop-contrast': `${config.backdropContrast || 1.2}`,
  };
};

// Utility to detect mobile devices
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

// Utility to get responsive blur value
export const getResponsiveBlur = (config: GlassMorphismConfig, isMobile: boolean): number => {
  if (isMobile && config.responsive && config.mobileBlur) {
    return config.mobileBlur;
  }
  return config.blur || 12;
};

// Utility to get responsive opacity value
export const getResponsiveOpacity = (config: GlassMorphismConfig, isMobile: boolean): number => {
  if (isMobile && config.responsive && config.mobileOpacity) {
    return config.mobileOpacity;
  }
  return config.opacity || 0.15;
};
