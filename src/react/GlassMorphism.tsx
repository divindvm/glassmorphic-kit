import React from 'react';
import { GlassMorphismCore, GlassMorphismCoreProps } from '../core/GlassMorphismCore';

// Main React component
export const GlassMorphism: React.FC<GlassMorphismCoreProps> = (props) => {
  return <GlassMorphismCore {...props} />;
};

// Pre-configured variants
export const GlassMorphismLight: React.FC<Omit<GlassMorphismCoreProps, 'variant'>> = (props) => {
  return <GlassMorphismCore variant="light" {...props} />;
};

export const GlassMorphismMedium: React.FC<Omit<GlassMorphismCoreProps, 'variant'>> = (props) => {
  return <GlassMorphismCore variant="medium" {...props} />;
};

export const GlassMorphismHeavy: React.FC<Omit<GlassMorphismCoreProps, 'variant'>> = (props) => {
  return <GlassMorphismCore variant="heavy" {...props} />;
};

export const GlassMorphismSubtle: React.FC<Omit<GlassMorphismCoreProps, 'variant'>> = (props) => {
  return <GlassMorphismCore variant="subtle" {...props} />;
};

export const GlassMorphismDramatic: React.FC<Omit<GlassMorphismCoreProps, 'variant'>> = (props) => {
  return <GlassMorphismCore variant="dramatic" {...props} />;
};

// Pre-configured presets
export const GlassCard: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="card" {...props} />;
};

export const GlassModal: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="modal" {...props} />;
};

export const GlassSidebar: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="sidebar" {...props} />;
};

export const GlassTooltip: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="tooltip" {...props} />;
};

export const GlassButton: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="button" {...props} />;
};

export const GlassInput: React.FC<Omit<GlassMorphismCoreProps, 'preset'>> = (props) => {
  return <GlassMorphismCore preset="input" {...props} />;
};

// Export the core component and hook
export { GlassMorphismCore, useGlassMorphism, withGlassMorphism } from '../core/GlassMorphismCore';

// Export types
export type { 
  GlassMorphismProps, 
  GlassMorphismConfig, 
  GlassMorphismVariant
} from '../types';

// Export styles and utilities
export { 
  defaultTheme, 
  presets, 
  generateGlassMorphismStyles, 
  generateCSSVariables,
  getVariantConfig,
  getPresetConfig,
  mergeConfig 
} from '../styles/glassMorphismStyles';

export default GlassMorphism;
