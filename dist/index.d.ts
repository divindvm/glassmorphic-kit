import React$1 from 'react';
import { RendererFactory2, ElementRef, OnInit, OnDestroy, OnChanges, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';

interface GlassMorphismConfig {
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
interface GlassMorphismProps extends GlassMorphismConfig {
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
interface GlassMorphismVariants {
    light: GlassMorphismConfig;
    medium: GlassMorphismConfig;
    heavy: GlassMorphismConfig;
    subtle: GlassMorphismConfig;
    dramatic: GlassMorphismConfig;
}
interface GlassMorphismTheme {
    variants: GlassMorphismVariants;
    breakpoints: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    defaultConfig: GlassMorphismConfig;
}
type GlassMorphismVariant = keyof GlassMorphismVariants;
interface GlassMorphismStyleProps {
    config: GlassMorphismConfig;
    isHovered: boolean;
    isMobile: boolean;
    variant?: GlassMorphismVariant;
}
interface AngularGlassMorphismConfig extends GlassMorphismConfig {
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
interface AngularGlassMorphismProps extends AngularGlassMorphismConfig {
    children?: any;
    (click: Event): void;
    (mouseenter: Event): void;
    (mouseleave: Event): void;
}
type GlassMorphismPreset = 'card' | 'modal' | 'sidebar' | 'tooltip' | 'button' | 'input';
interface GlassMorphismPresets {
    [key: string]: GlassMorphismConfig;
}
interface GlassMorphismEvents {
    onClick?: (event: Event) => void;
    onMouseEnter?: (event: Event) => void;
    onMouseLeave?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
interface GlassMorphismCSSVars {
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

interface GlassMorphismCoreProps extends GlassMorphismProps {
    variant?: GlassMorphismVariant;
    preset?: string;
    useCSSVariables?: boolean;
    enableHover?: boolean;
    enableResponsive?: boolean;
}
declare const GlassMorphismCore: React$1.FC<GlassMorphismCoreProps>;
declare const withGlassMorphism: <P extends object>(Component: React$1.ComponentType<P>, defaultGlassConfig?: Partial<GlassMorphismCoreProps>) => React$1.ForwardRefExoticComponent<React$1.PropsWithoutRef<P & Partial<GlassMorphismCoreProps>> & React$1.RefAttributes<any>>;
declare const useGlassMorphism: (config?: Partial<GlassMorphismCoreProps>, dependencies?: any[]) => {
    styles: React$1.CSSProperties;
    eventHandlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
    isHovered: boolean;
    isMobile: boolean;
};

declare const defaultTheme: {
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
declare const presets: Record<string, GlassMorphismConfig>;
declare const mergeConfig: (base: GlassMorphismConfig, override: Partial<GlassMorphismConfig>) => GlassMorphismConfig;
declare const getVariantConfig: (variant: GlassMorphismVariant) => GlassMorphismConfig;
declare const getPresetConfig: (preset: string) => GlassMorphismConfig;
declare const generateGlassMorphismStyles: (props: GlassMorphismStyleProps) => React.CSSProperties;
declare const generateCSSVariables: (config: GlassMorphismConfig) => Record<string, string>;
declare const isMobileDevice: () => boolean;
declare const getResponsiveBlur: (config: GlassMorphismConfig, isMobile: boolean) => number;
declare const getResponsiveOpacity: (config: GlassMorphismConfig, isMobile: boolean) => number;

declare const GlassMorphism: React$1.FC<GlassMorphismCoreProps>;
declare const GlassMorphismLight: React$1.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
declare const GlassMorphismMedium: React$1.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
declare const GlassMorphismHeavy: React$1.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
declare const GlassMorphismSubtle: React$1.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
declare const GlassMorphismDramatic: React$1.FC<Omit<GlassMorphismCoreProps, 'variant'>>;
declare const GlassCard: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
declare const GlassModal: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
declare const GlassSidebar: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
declare const GlassTooltip: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
declare const GlassButton: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;
declare const GlassInput: React$1.FC<Omit<GlassMorphismCoreProps, 'preset'>>;

declare class GlassMorphismService {
    private rendererFactory;
    private renderer;
    constructor(rendererFactory: RendererFactory2);
    /**
     * Apply glass morphism styles to an element
     */
    applyGlassMorphism(element: ElementRef | HTMLElement, config: GlassMorphismConfig, variant?: GlassMorphismVariant, preset?: string, useCSSVariables?: boolean): void;
    /**
     * Remove glass morphism styles from an element
     */
    removeGlassMorphism(element: ElementRef | HTMLElement): void;
    /**
     * Update glass morphism styles dynamically
     */
    updateGlassMorphism(element: ElementRef | HTMLElement, newConfig: Partial<GlassMorphismConfig>, variant?: GlassMorphismVariant, preset?: string): void;
    /**
     * Get current glass morphism configuration from element
     */
    getCurrentConfig(element: HTMLElement): GlassMorphismConfig;
    /**
     * Check if device is mobile
     */
    isMobileDevice(): boolean;
    /**
     * Get responsive configuration
     */
    getResponsiveConfig(config: GlassMorphismConfig): GlassMorphismConfig;
    /**
     * Create hover effect handlers
     */
    createHoverHandlers(element: ElementRef | HTMLElement, config: GlassMorphismConfig): {
        handleMouseEnter: () => void;
        handleMouseLeave: () => void;
    };
    /**
     * Parse blur value from backdrop-filter CSS
     */
    private parseBlurValue;
    /**
     * Parse opacity value from background-color CSS
     */
    private parseOpacityValue;
}

declare class GlassMorphismComponent implements OnInit, OnDestroy, OnChanges {
    private glassMorphismService;
    private cdr;
    glassElement: ElementRef;
    config: GlassMorphismConfig;
    variant?: GlassMorphismVariant;
    preset?: string;
    useCSSVariables: boolean;
    enableHover: boolean;
    enableResponsive: boolean;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
    id?: string;
    role?: string;
    ariaLabel?: string;
    dataTestId?: string;
    onClick: EventEmitter<Event>;
    onMouseEnter: EventEmitter<Event>;
    onMouseLeave: EventEmitter<Event>;
    onFocus: EventEmitter<Event>;
    onBlur: EventEmitter<Event>;
    computedClassName: string;
    computedStyle: {
        [key: string]: any;
    };
    private hoverHandlers;
    private resizeListener?;
    constructor(glassMorphismService: GlassMorphismService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private applyGlassMorphism;
    private setupHoverEffects;
    private setupEventListeners;
    private setupResizeListener;
    private cleanupEventListeners;
    private cleanupResizeListener;
    private updateComputedProperties;
    updateConfig(newConfig: Partial<GlassMorphismConfig>): void;
    updateVariant(newVariant: GlassMorphismVariant): void;
    updatePreset(newPreset: string): void;
    get currentConfig(): GlassMorphismConfig;
}
declare class GlassMorphismLightComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
declare class GlassMorphismMediumComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
declare class GlassMorphismHeavyComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
declare class GlassCardComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
declare class GlassModalComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
declare class GlassButtonComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}

declare class GlassMorphismModule {
}

export { GlassButton, GlassButtonComponent, GlassCard, GlassCardComponent, GlassInput, GlassModal, GlassModalComponent, GlassMorphism, GlassMorphismComponent, GlassMorphismCore, GlassMorphismDramatic, GlassMorphismHeavy, GlassMorphismHeavyComponent, GlassMorphismLight, GlassMorphismLightComponent, GlassMorphismMedium, GlassMorphismMediumComponent, GlassMorphismModule, GlassMorphismService, GlassMorphismSubtle, GlassSidebar, GlassTooltip, GlassMorphism as default, defaultTheme, generateCSSVariables, generateGlassMorphismStyles, getPresetConfig, getResponsiveBlur, getResponsiveOpacity, getVariantConfig, isMobileDevice, mergeConfig, presets, useGlassMorphism, withGlassMorphism };
export type { AngularGlassMorphismConfig, AngularGlassMorphismProps, GlassMorphismCSSVars, GlassMorphismConfig, GlassMorphismEvents, GlassMorphismPreset, GlassMorphismPresets, GlassMorphismProps, GlassMorphismStyleProps, GlassMorphismTheme, GlassMorphismVariant, GlassMorphismVariants };
