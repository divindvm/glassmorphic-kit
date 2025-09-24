export interface GlassMorphismConfig {
    blur?: number;
    opacity?: number;
    backgroundColor?: string;
    backgroundGradient?: string;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
    borderRadius?: number | string;
    boxShadow?: string;
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    backdropFilter?: string;
    backdropBlur?: number;
    backdropSaturate?: number;
    backdropBrightness?: number;
    backdropContrast?: number;
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    padding?: number | string;
    margin?: number | string;
    transition?: string;
    animation?: string;
    hoverEffect?: boolean;
    hoverBlur?: number;
    hoverOpacity?: number;
    noiseTexture?: boolean;
    noiseOpacity?: number;
    reflection?: boolean;
    reflectionOpacity?: number;
    responsive?: boolean;
    mobileBlur?: number;
    mobileOpacity?: number;
}
export interface GlassMorphismProps extends GlassMorphismConfig {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
    id?: string;
    role?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export interface GlassMorphismVariants {
    light: GlassMorphismConfig;
    medium: GlassMorphismConfig;
    heavy: GlassMorphismConfig;
    subtle: GlassMorphismConfig;
    dramatic: GlassMorphismConfig;
}
export interface GlassMorphismTheme {
    variants: GlassMorphismVariants;
    breakpoints: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    defaultConfig: GlassMorphismConfig;
}
export type GlassMorphismVariant = keyof GlassMorphismVariants;
export interface GlassMorphismStyleProps {
    config: GlassMorphismConfig;
    isHovered: boolean;
    isMobile: boolean;
    variant?: GlassMorphismVariant;
}
export interface AngularGlassMorphismConfig extends GlassMorphismConfig {
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export interface AngularGlassMorphismProps extends AngularGlassMorphismConfig {
    children?: any;
    (click: Event): void;
    (mouseenter: Event): void;
    (mouseleave: Event): void;
}
export type GlassMorphismPreset = 'card' | 'modal' | 'sidebar' | 'tooltip' | 'button' | 'input';
export interface GlassMorphismPresets {
    [key: string]: GlassMorphismConfig;
}
export interface GlassMorphismEvents {
    onClick?: (event: Event) => void;
    onMouseEnter?: (event: Event) => void;
    onMouseLeave?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
export interface GlassMorphismCSSVars {
    '--glass-blur': string;
    '--glass-opacity': string;
    '--glass-bg': string;
    '--glass-border': string;
    '--glass-shadow': string;
    '--glass-backdrop-blur': string;
    '--glass-backdrop-saturate': string;
    '--glass-backdrop-brightness': string;
    '--glass-backdrop-contrast': string;
}
//# sourceMappingURL=index.d.ts.map