import { GlassMorphismConfig, GlassMorphismStyleProps, GlassMorphismVariant } from '../types';
export declare const defaultTheme: {
    variants: {
        light: {
            blur: number;
            opacity: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            backdropBlur: number;
            backdropSaturate: number;
            backdropBrightness: number;
            backdropContrast: number;
            boxShadow: string;
        };
        medium: {
            blur: number;
            opacity: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            backdropBlur: number;
            backdropSaturate: number;
            backdropBrightness: number;
            backdropContrast: number;
            boxShadow: string;
        };
        heavy: {
            blur: number;
            opacity: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            backdropBlur: number;
            backdropSaturate: number;
            backdropBrightness: number;
            backdropContrast: number;
            boxShadow: string;
        };
        subtle: {
            blur: number;
            opacity: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            backdropBlur: number;
            backdropSaturate: number;
            backdropBrightness: number;
            backdropContrast: number;
            boxShadow: string;
        };
        dramatic: {
            blur: number;
            opacity: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderRadius: number;
            backdropBlur: number;
            backdropSaturate: number;
            backdropBrightness: number;
            backdropContrast: number;
            boxShadow: string;
        };
    };
    breakpoints: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    defaultConfig: {
        blur: number;
        opacity: number;
        backgroundColor: string;
        borderWidth: number;
        borderColor: string;
        borderRadius: number;
        backdropBlur: number;
        backdropSaturate: number;
        backdropBrightness: number;
        backdropContrast: number;
        boxShadow: string;
        transition: string;
        hoverEffect: boolean;
        hoverBlur: number;
        hoverOpacity: number;
    };
};
export declare const presets: Record<string, GlassMorphismConfig>;
export declare const mergeConfig: (base: GlassMorphismConfig, override: Partial<GlassMorphismConfig>) => GlassMorphismConfig;
export declare const getVariantConfig: (variant: GlassMorphismVariant) => GlassMorphismConfig;
export declare const getPresetConfig: (preset: string) => GlassMorphismConfig;
export declare const generateGlassMorphismStyles: (props: GlassMorphismStyleProps) => React.CSSProperties;
export declare const generateCSSVariables: (config: GlassMorphismConfig) => Record<string, string>;
export declare const isMobileDevice: () => boolean;
export declare const getResponsiveBlur: (config: GlassMorphismConfig, isMobile: boolean) => number;
export declare const getResponsiveOpacity: (config: GlassMorphismConfig, isMobile: boolean) => number;
//# sourceMappingURL=glassMorphismStyles.d.ts.map