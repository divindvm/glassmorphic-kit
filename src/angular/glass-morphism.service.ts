import { Injectable, Renderer2, RendererFactory2, ElementRef } from '@angular/core';
import { 
  GlassMorphismConfig, 
  GlassMorphismVariant,
  GlassMorphismStyleProps 
} from '../types';
import { 
  generateGlassMorphismStyles, 
  generateCSSVariables, 
  getVariantConfig,
  getPresetConfig,
  mergeConfig,
  defaultTheme 
} from '../styles/glassMorphismStyles';

@Injectable({
  providedIn: 'root'
})
export class GlassMorphismService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Apply glass morphism styles to an element
   */
  applyGlassMorphism(
    element: ElementRef | HTMLElement,
    config: GlassMorphismConfig,
    variant?: GlassMorphismVariant,
    preset?: string,
    useCSSVariables: boolean = false
  ): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    
    // Generate final configuration
    let finalConfig = { ...config };
    
    if (variant) {
      finalConfig = mergeConfig(getVariantConfig(variant), finalConfig);
    }
    
    if (preset) {
      finalConfig = mergeConfig(getPresetConfig(preset), finalConfig);
    }

    // Generate styles
    const styleProps: GlassMorphismStyleProps = {
      config: finalConfig,
      isHovered: false,
      isMobile: this.isMobileDevice(),
      variant,
    };

    const styles = generateGlassMorphismStyles(styleProps);

    // Apply styles
    Object.entries(styles).forEach(([property, value]) => {
      if (value !== undefined && value !== null) {
        this.renderer.setStyle(el, property, value);
      }
    });

    // Apply CSS variables if enabled
    if (useCSSVariables) {
      const cssVars = generateCSSVariables(finalConfig);
      Object.entries(cssVars).forEach(([property, value]) => {
        this.renderer.setStyle(el, property, value);
      });
    }

    // Add base class
    this.renderer.addClass(el, 'glass-morphism');
    
    if (variant) {
      this.renderer.addClass(el, `glass-morphism--${variant}`);
    }
    
    if (preset) {
      this.renderer.addClass(el, `glass-morphism--${preset}`);
    }
  }

  /**
   * Remove glass morphism styles from an element
   */
  removeGlassMorphism(element: ElementRef | HTMLElement): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    
    // Remove all glass morphism classes
    const classes = el.className.split(' ').filter((cls: string) => 
      !cls.startsWith('glass-morphism')
    );
    this.renderer.setAttribute(el, 'class', classes.join(' '));

    // Remove glass morphism styles
    const glassProperties = [
      'backdropFilter',
      'backgroundColor',
      'borderWidth',
      'borderColor',
      'borderStyle',
      'borderRadius',
      'boxShadow',
      'transition',
      'animation',
      'position',
      'overflow'
    ];

    glassProperties.forEach(property => {
      this.renderer.removeStyle(el, property);
    });

    // Remove CSS variables
    const cssVarProperties = [
      '--glass-blur',
      '--glass-opacity',
      '--glass-bg',
      '--glass-border',
      '--glass-shadow',
      '--glass-backdrop-blur',
      '--glass-backdrop-saturate',
      '--glass-backdrop-brightness',
      '--glass-backdrop-contrast'
    ];

    cssVarProperties.forEach(property => {
      this.renderer.removeStyle(el, property);
    });
  }

  /**
   * Update glass morphism styles dynamically
   */
  updateGlassMorphism(
    element: ElementRef | HTMLElement,
    newConfig: Partial<GlassMorphismConfig>,
    variant?: GlassMorphismVariant,
    preset?: string
  ): void {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    
    // Get current configuration and merge with new one
    const currentConfig = this.getCurrentConfig(el);
    const finalConfig = mergeConfig(currentConfig, newConfig);

    // Reapply styles
    this.applyGlassMorphism(el, finalConfig, variant, preset);
  }

  /**
   * Get current glass morphism configuration from element
   */
  getCurrentConfig(element: HTMLElement): GlassMorphismConfig {
    const computedStyle = window.getComputedStyle(element);
    
    return {
      blur: this.parseBlurValue(computedStyle.backdropFilter),
      opacity: this.parseOpacityValue(computedStyle.backgroundColor),
      backgroundColor: computedStyle.backgroundColor,
      borderWidth: parseInt(computedStyle.borderWidth) || 1,
      borderColor: computedStyle.borderColor,
      borderStyle: computedStyle.borderStyle as any,
      borderRadius: computedStyle.borderRadius,
      boxShadow: computedStyle.boxShadow,
      transition: computedStyle.transition,
      animation: computedStyle.animation,
    };
  }

  /**
   * Check if device is mobile
   */
  isMobileDevice(): boolean {
    return window.innerWidth <= 768;
  }

  /**
   * Get responsive configuration
   */
  getResponsiveConfig(config: GlassMorphismConfig): GlassMorphismConfig {
    if (this.isMobileDevice() && config.responsive) {
      return {
        ...config,
        blur: config.mobileBlur || config.blur,
        opacity: config.mobileOpacity || config.opacity,
      };
    }
    return config;
  }

  /**
   * Create hover effect handlers
   */
  createHoverHandlers(
    element: ElementRef | HTMLElement,
    config: GlassMorphismConfig
  ) {
    const el = element instanceof ElementRef ? element.nativeElement : element;
    
    const handleMouseEnter = () => {
      if (config.hoverEffect) {
        this.renderer.addClass(el, 'glass-morphism--hovered');
        
        if (config.hoverBlur) {
          this.renderer.setStyle(el, 'backdropFilter', 
            `blur(${config.hoverBlur}px) saturate(1.3) brightness(1.2) contrast(1.2)`);
        }
        
        if (config.hoverOpacity) {
          this.renderer.setStyle(el, 'backgroundColor', 
            `rgba(255, 255, 255, ${config.hoverOpacity})`);
        }
      }
    };

    const handleMouseLeave = () => {
      if (config.hoverEffect) {
        this.renderer.removeClass(el, 'glass-morphism--hovered');
        
        // Restore original values
        const originalConfig = this.getCurrentConfig(el);
        this.renderer.setStyle(el, 'backdropFilter', 
          `blur(${originalConfig.blur || 12}px) saturate(1.3) brightness(1.2) contrast(1.2)`);
        this.renderer.setStyle(el, 'backgroundColor', originalConfig.backgroundColor);
      }
    };

    return { handleMouseEnter, handleMouseLeave };
  }

  /**
   * Parse blur value from backdrop-filter CSS
   */
  private parseBlurValue(backdropFilter: string): number {
    const match = backdropFilter.match(/blur\((\d+(?:\.\d+)?)px\)/);
    return match ? parseFloat(match[1]) : 12;
  }

  /**
   * Parse opacity value from background-color CSS
   */
  private parseOpacityValue(backgroundColor: string): number {
    const match = backgroundColor.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
    return match ? parseFloat(match[1]) : 0.15;
  }
}
