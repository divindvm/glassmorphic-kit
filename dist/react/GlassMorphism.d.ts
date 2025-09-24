import React from 'react';
import { GlassMorphismCoreProps } from '../core/GlassMorphismCore';
export declare const GlassMorphism: React.FC<GlassMorphismCoreProps>;
export declare const GlassMorphismLight: React.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
export declare const GlassMorphismMedium: React.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
export declare const GlassMorphismHeavy: React.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
export declare const GlassMorphismSubtle: React.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
export declare const GlassMorphismDramatic: React.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
export declare const GlassCard: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export declare const GlassModal: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export declare const GlassSidebar: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export declare const GlassTooltip: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export declare const GlassButton: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export declare const GlassInput: React.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
export { GlassMorphismCore, useGlassMorphism, withGlassMorphism } from '../core/GlassMorphismCore';
export type { GlassMorphismProps, GlassMorphismConfig, GlassMorphismVariant } from '../types';
export { defaultTheme, presets, generateGlassMorphismStyles, generateCSSVariables, getVariantConfig, getPresetConfig, mergeConfig } from '../styles/glassMorphismStyles';
export default GlassMorphism;
//# sourceMappingURL=GlassMorphism.d.ts.map