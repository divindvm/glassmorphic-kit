import { RendererFactory2, ElementRef } from '@angular/core';
import { GlassMorphismConfig, GlassMorphismVariant } from '../types';
export declare class GlassMorphismService {
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
//# sourceMappingURL=glass-morphism.service.d.ts.map