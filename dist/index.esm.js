import { jsx } from 'react/jsx-runtime';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Injectable, ElementRef, Component, ViewChild, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Default theme configuration
const defaultTheme = {
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
const presets = {
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
const mergeConfig = (base, override) => {
    return { ...base, ...override };
};
// Utility function to get variant configuration
const getVariantConfig = (variant) => {
    return defaultTheme.variants[variant];
};
// Utility function to get preset configuration
const getPresetConfig = (preset) => {
    return presets[preset] || defaultTheme.defaultConfig;
};
// CSS-in-JS style generator
const generateGlassMorphismStyles = (props) => {
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
    const styles = {
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
const generateCSSVariables = (config) => {
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
const isMobileDevice = () => {
    if (typeof window === 'undefined')
        return false;
    return window.innerWidth <= 768;
};
// Utility to get responsive blur value
const getResponsiveBlur = (config, isMobile) => {
    if (isMobile && config.responsive && config.mobileBlur) {
        return config.mobileBlur;
    }
    return config.blur || 12;
};
// Utility to get responsive opacity value
const getResponsiveOpacity = (config, isMobile) => {
    if (isMobile && config.responsive && config.mobileOpacity) {
        return config.mobileOpacity;
    }
    return config.opacity || 0.15;
};

const GlassMorphismCore = ({ children, className = '', style = {}, onClick, onMouseEnter, onMouseLeave, id, role, 'aria-label': ariaLabel, 'data-testid': dataTestId, variant, preset, useCSSVariables = false, enableHover = true, enableResponsive = true, ...config }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // Detect mobile device and handle resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(isMobileDevice());
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    // Generate final configuration
    const finalConfig = useMemo(() => {
        let baseConfig = { ...config };
        // Apply variant if specified
        if (variant) {
            baseConfig = mergeConfig(getVariantConfig(variant), baseConfig);
        }
        // Apply preset if specified
        if (preset) {
            baseConfig = mergeConfig(getPresetConfig(preset), baseConfig);
        }
        // Apply responsive settings
        if (enableResponsive) {
            baseConfig.responsive = true;
        }
        // Apply hover settings
        if (enableHover) {
            baseConfig.hoverEffect = true;
        }
        return baseConfig;
    }, [config, variant, preset, enableResponsive, enableHover]);
    // Generate styles
    const glassStyles = useMemo(() => {
        const styleProps = {
            config: finalConfig,
            isHovered,
            isMobile,
            variant,
        };
        return generateGlassMorphismStyles(styleProps);
    }, [finalConfig, isHovered, isMobile, variant]);
    // Generate CSS variables if enabled
    const cssVariables = useMemo(() => {
        if (!useCSSVariables)
            return {};
        return generateCSSVariables(finalConfig);
    }, [finalConfig, useCSSVariables]);
    // Event handlers
    const handleMouseEnter = useCallback((event) => {
        if (enableHover) {
            setIsHovered(true);
        }
        onMouseEnter?.(event);
    }, [enableHover, onMouseEnter]);
    const handleMouseLeave = useCallback((event) => {
        if (enableHover) {
            setIsHovered(false);
        }
        onMouseLeave?.(event);
    }, [enableHover, onMouseLeave]);
    const handleClick = useCallback((event) => {
        onClick?.(event);
    }, [onClick]);
    // Combine all styles
    const combinedStyles = {
        ...cssVariables,
        ...glassStyles,
        ...style,
    };
    // Generate class names
    const classNames = [
        'glass-morphism',
        className,
        variant && `glass-morphism--${variant}`,
        preset && `glass-morphism--${preset}`,
        isHovered && 'glass-morphism--hovered',
        isMobile && 'glass-morphism--mobile',
        useCSSVariables && 'glass-morphism--css-vars',
    ].filter(Boolean).join(' ');
    return (jsx("div", { id: id, className: classNames, style: combinedStyles, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, role: role, "aria-label": ariaLabel, "data-testid": dataTestId, children: children }));
};
// Higher-order component for easy customization
const withGlassMorphism = (Component, defaultGlassConfig) => {
    return React.forwardRef((props, ref) => {
        const { children, ...glassProps } = props;
        const mergedProps = { ...defaultGlassConfig, ...glassProps };
        return (jsx(GlassMorphismCore, { ...mergedProps, children: jsx(Component, { ref: ref, ...props, children: children }) }));
    });
};
// Hook for using glass morphism styles
const useGlassMorphism = (config = {}, dependencies = []) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(isMobileDevice());
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const styles = useMemo(() => {
        const finalConfig = mergeConfig(defaultTheme.defaultConfig, config);
        const styleProps = {
            config: finalConfig,
            isHovered,
            isMobile,
            variant: config.variant,
        };
        return generateGlassMorphismStyles(styleProps);
    }, [config, isHovered, isMobile, ...dependencies]);
    const eventHandlers = useMemo(() => ({
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    }), []);
    return {
        styles,
        eventHandlers,
        isHovered,
        isMobile,
    };
};

// Main React component
const GlassMorphism = (props) => {
    return jsx(GlassMorphismCore, { ...props });
};
// Pre-configured variants
const GlassMorphismLight = (props) => {
    return jsx(GlassMorphismCore, { variant: "light", ...props });
};
const GlassMorphismMedium = (props) => {
    return jsx(GlassMorphismCore, { variant: "medium", ...props });
};
const GlassMorphismHeavy = (props) => {
    return jsx(GlassMorphismCore, { variant: "heavy", ...props });
};
const GlassMorphismSubtle = (props) => {
    return jsx(GlassMorphismCore, { variant: "subtle", ...props });
};
const GlassMorphismDramatic = (props) => {
    return jsx(GlassMorphismCore, { variant: "dramatic", ...props });
};
// Pre-configured presets
const GlassCard = (props) => {
    return jsx(GlassMorphismCore, { preset: "card", ...props });
};
const GlassModal = (props) => {
    return jsx(GlassMorphismCore, { preset: "modal", ...props });
};
const GlassSidebar = (props) => {
    return jsx(GlassMorphismCore, { preset: "sidebar", ...props });
};
const GlassTooltip = (props) => {
    return jsx(GlassMorphismCore, { preset: "tooltip", ...props });
};
const GlassButton = (props) => {
    return jsx(GlassMorphismCore, { preset: "button", ...props });
};
const GlassInput = (props) => {
    return jsx(GlassMorphismCore, { preset: "input", ...props });
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

let GlassMorphismService = (() => {
    let _classDecorators = [Injectable({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    _classThis = class {
        constructor(rendererFactory) {
            this.rendererFactory = rendererFactory;
            this.renderer = this.rendererFactory.createRenderer(null, null);
        }
        /**
         * Apply glass morphism styles to an element
         */
        applyGlassMorphism(element, config, variant, preset, useCSSVariables = false) {
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
            const styleProps = {
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
        removeGlassMorphism(element) {
            const el = element instanceof ElementRef ? element.nativeElement : element;
            // Remove all glass morphism classes
            const classes = el.className.split(' ').filter((cls) => !cls.startsWith('glass-morphism'));
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
        updateGlassMorphism(element, newConfig, variant, preset) {
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
        getCurrentConfig(element) {
            const computedStyle = window.getComputedStyle(element);
            return {
                blur: this.parseBlurValue(computedStyle.backdropFilter),
                opacity: this.parseOpacityValue(computedStyle.backgroundColor),
                backgroundColor: computedStyle.backgroundColor,
                borderWidth: parseInt(computedStyle.borderWidth) || 1,
                borderColor: computedStyle.borderColor,
                borderStyle: computedStyle.borderStyle,
                borderRadius: computedStyle.borderRadius,
                boxShadow: computedStyle.boxShadow,
                transition: computedStyle.transition,
                animation: computedStyle.animation,
            };
        }
        /**
         * Check if device is mobile
         */
        isMobileDevice() {
            return window.innerWidth <= 768;
        }
        /**
         * Get responsive configuration
         */
        getResponsiveConfig(config) {
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
        createHoverHandlers(element, config) {
            const el = element instanceof ElementRef ? element.nativeElement : element;
            const handleMouseEnter = () => {
                if (config.hoverEffect) {
                    this.renderer.addClass(el, 'glass-morphism--hovered');
                    if (config.hoverBlur) {
                        this.renderer.setStyle(el, 'backdropFilter', `blur(${config.hoverBlur}px) saturate(1.3) brightness(1.2) contrast(1.2)`);
                    }
                    if (config.hoverOpacity) {
                        this.renderer.setStyle(el, 'backgroundColor', `rgba(255, 255, 255, ${config.hoverOpacity})`);
                    }
                }
            };
            const handleMouseLeave = () => {
                if (config.hoverEffect) {
                    this.renderer.removeClass(el, 'glass-morphism--hovered');
                    // Restore original values
                    const originalConfig = this.getCurrentConfig(el);
                    this.renderer.setStyle(el, 'backdropFilter', `blur(${originalConfig.blur || 12}px) saturate(1.3) brightness(1.2) contrast(1.2)`);
                    this.renderer.setStyle(el, 'backgroundColor', originalConfig.backgroundColor);
                }
            };
            return { handleMouseEnter, handleMouseLeave };
        }
        /**
         * Parse blur value from backdrop-filter CSS
         */
        parseBlurValue(backdropFilter) {
            const match = backdropFilter.match(/blur\((\d+(?:\.\d+)?)px\)/);
            return match ? parseFloat(match[1]) : 12;
        }
        /**
         * Parse opacity value from background-color CSS
         */
        parseOpacityValue(backgroundColor) {
            const match = backgroundColor.match(/rgba?\([^)]+,\s*([\d.]+)\)/);
            return match ? parseFloat(match[1]) : 0.15;
        }
    };
    __setFunctionName(_classThis, "GlassMorphismService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();

let GlassMorphismComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-morphism',
            template: `
    <div 
      #glassElement
      [ngClass]="ngClass"
      [ngStyle]="ngStyle"
      [class]="computedClassName"
      [style]="computedStyle"
      (click)="onClick.emit($event)"
      (mouseenter)="onMouseEnter.emit($event)"
      (mouseleave)="onMouseLeave.emit($event)"
      (focus)="onFocus.emit($event)"
      (blur)="onBlur.emit($event)"
      [attr.id]="id"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.data-testid]="dataTestId"
    >
      <ng-content></ng-content>
    </div>
  `,
            styles: [`
    :host {
      display: block;
    }
    
    .glass-morphism {
      position: relative;
      overflow: hidden;
    }
    
    .glass-morphism--hovered {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .glass-morphism--mobile {
      /* Mobile-specific styles */
    }
    
    .glass-morphism--css-vars {
      /* CSS variables support */
    }
  `]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _glassElement_decorators;
    let _glassElement_initializers = [];
    let _glassElement_extraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _variant_decorators;
    let _variant_initializers = [];
    let _variant_extraInitializers = [];
    let _preset_decorators;
    let _preset_initializers = [];
    let _preset_extraInitializers = [];
    let _useCSSVariables_decorators;
    let _useCSSVariables_initializers = [];
    let _useCSSVariables_extraInitializers = [];
    let _enableHover_decorators;
    let _enableHover_initializers = [];
    let _enableHover_extraInitializers = [];
    let _enableResponsive_decorators;
    let _enableResponsive_initializers = [];
    let _enableResponsive_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _ariaLabel_decorators;
    let _ariaLabel_initializers = [];
    let _ariaLabel_extraInitializers = [];
    let _dataTestId_decorators;
    let _dataTestId_initializers = [];
    let _dataTestId_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    let _onMouseEnter_decorators;
    let _onMouseEnter_initializers = [];
    let _onMouseEnter_extraInitializers = [];
    let _onMouseLeave_decorators;
    let _onMouseLeave_initializers = [];
    let _onMouseLeave_extraInitializers = [];
    let _onFocus_decorators;
    let _onFocus_initializers = [];
    let _onFocus_extraInitializers = [];
    let _onBlur_decorators;
    let _onBlur_initializers = [];
    let _onBlur_extraInitializers = [];
    _classThis = class {
        constructor(glassMorphismService, cdr) {
            this.glassMorphismService = glassMorphismService;
            this.cdr = cdr;
            this.glassElement = __runInitializers(this, _glassElement_initializers, void 0);
            // Core glass morphism properties
            this.config = (__runInitializers(this, _glassElement_extraInitializers), __runInitializers(this, _config_initializers, {}));
            this.variant = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _variant_initializers, void 0));
            this.preset = (__runInitializers(this, _variant_extraInitializers), __runInitializers(this, _preset_initializers, void 0));
            this.useCSSVariables = (__runInitializers(this, _preset_extraInitializers), __runInitializers(this, _useCSSVariables_initializers, false));
            this.enableHover = (__runInitializers(this, _useCSSVariables_extraInitializers), __runInitializers(this, _enableHover_initializers, true));
            this.enableResponsive = (__runInitializers(this, _enableHover_extraInitializers), __runInitializers(this, _enableResponsive_initializers, true));
            // Angular-specific properties
            this.ngClass = (__runInitializers(this, _enableResponsive_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            // Standard HTML properties
            this.id = (__runInitializers(this, _ngStyle_extraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.role = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.ariaLabel = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _ariaLabel_initializers, void 0));
            this.dataTestId = (__runInitializers(this, _ariaLabel_extraInitializers), __runInitializers(this, _dataTestId_initializers, void 0));
            // Event outputs
            this.onClick = (__runInitializers(this, _dataTestId_extraInitializers), __runInitializers(this, _onClick_initializers, new EventEmitter()));
            this.onMouseEnter = (__runInitializers(this, _onClick_extraInitializers), __runInitializers(this, _onMouseEnter_initializers, new EventEmitter()));
            this.onMouseLeave = (__runInitializers(this, _onMouseEnter_extraInitializers), __runInitializers(this, _onMouseLeave_initializers, new EventEmitter()));
            this.onFocus = (__runInitializers(this, _onMouseLeave_extraInitializers), __runInitializers(this, _onFocus_initializers, new EventEmitter()));
            this.onBlur = (__runInitializers(this, _onFocus_extraInitializers), __runInitializers(this, _onBlur_initializers, new EventEmitter()));
            // Computed properties
            this.computedClassName = (__runInitializers(this, _onBlur_extraInitializers), '');
            this.computedStyle = {};
            this.hoverHandlers = null;
        }
        ngOnInit() {
            this.applyGlassMorphism();
            this.setupEventListeners();
            this.setupResizeListener();
        }
        ngOnChanges(changes) {
            if (changes['config'] || changes['variant'] || changes['preset'] || changes['useCSSVariables']) {
                this.applyGlassMorphism();
            }
        }
        ngOnDestroy() {
            this.cleanupEventListeners();
            this.cleanupResizeListener();
        }
        applyGlassMorphism() {
            if (!this.glassElement)
                return;
            // Apply glass morphism styles
            this.glassMorphismService.applyGlassMorphism(this.glassElement, this.config, this.variant, this.preset, this.useCSSVariables);
            // Setup hover effects if enabled
            if (this.enableHover) {
                this.setupHoverEffects();
            }
            // Update computed properties
            this.updateComputedProperties();
        }
        setupHoverEffects() {
            if (!this.glassElement)
                return;
            this.hoverHandlers = this.glassMorphismService.createHoverHandlers(this.glassElement, this.config);
            const element = this.glassElement.nativeElement;
            element.addEventListener('mouseenter', this.hoverHandlers.handleMouseEnter);
            element.addEventListener('mouseleave', this.hoverHandlers.handleMouseLeave);
        }
        setupEventListeners() {
            // Additional event listeners can be added here
        }
        setupResizeListener() {
            if (this.enableResponsive) {
                this.resizeListener = () => {
                    this.applyGlassMorphism();
                    this.cdr.detectChanges();
                };
                window.addEventListener('resize', this.resizeListener);
            }
        }
        cleanupEventListeners() {
            if (this.hoverHandlers && this.glassElement) {
                const element = this.glassElement.nativeElement;
                element.removeEventListener('mouseenter', this.hoverHandlers.handleMouseEnter);
                element.removeEventListener('mouseleave', this.hoverHandlers.handleMouseLeave);
            }
        }
        cleanupResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
            }
        }
        updateComputedProperties() {
            // Update computed class name
            const classes = ['glass-morphism'];
            if (this.variant) {
                classes.push(`glass-morphism--${this.variant}`);
            }
            if (this.preset) {
                classes.push(`glass-morphism--${this.preset}`);
            }
            if (this.useCSSVariables) {
                classes.push('glass-morphism--css-vars');
            }
            if (this.glassMorphismService.isMobileDevice()) {
                classes.push('glass-morphism--mobile');
            }
            this.computedClassName = classes.join(' ');
            // Update computed style
            this.computedStyle = {
                ...this.ngStyle,
            };
        }
        // Public methods for dynamic updates
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.applyGlassMorphism();
        }
        updateVariant(newVariant) {
            this.variant = newVariant;
            this.applyGlassMorphism();
        }
        updatePreset(newPreset) {
            this.preset = newPreset;
            this.applyGlassMorphism();
        }
        // Getter for current configuration
        get currentConfig() {
            return this.config;
        }
    };
    __setFunctionName(_classThis, "GlassMorphismComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _glassElement_decorators = [ViewChild('glassElement', { static: true })];
        _config_decorators = [Input()];
        _variant_decorators = [Input()];
        _preset_decorators = [Input()];
        _useCSSVariables_decorators = [Input()];
        _enableHover_decorators = [Input()];
        _enableResponsive_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        _id_decorators = [Input()];
        _role_decorators = [Input()];
        _ariaLabel_decorators = [Input()];
        _dataTestId_decorators = [Input()];
        _onClick_decorators = [Output()];
        _onMouseEnter_decorators = [Output()];
        _onMouseLeave_decorators = [Output()];
        _onFocus_decorators = [Output()];
        _onBlur_decorators = [Output()];
        __esDecorate(null, null, _glassElement_decorators, { kind: "field", name: "glassElement", static: false, private: false, access: { has: obj => "glassElement" in obj, get: obj => obj.glassElement, set: (obj, value) => { obj.glassElement = value; } }, metadata: _metadata }, _glassElement_initializers, _glassElement_extraInitializers);
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _variant_decorators, { kind: "field", name: "variant", static: false, private: false, access: { has: obj => "variant" in obj, get: obj => obj.variant, set: (obj, value) => { obj.variant = value; } }, metadata: _metadata }, _variant_initializers, _variant_extraInitializers);
        __esDecorate(null, null, _preset_decorators, { kind: "field", name: "preset", static: false, private: false, access: { has: obj => "preset" in obj, get: obj => obj.preset, set: (obj, value) => { obj.preset = value; } }, metadata: _metadata }, _preset_initializers, _preset_extraInitializers);
        __esDecorate(null, null, _useCSSVariables_decorators, { kind: "field", name: "useCSSVariables", static: false, private: false, access: { has: obj => "useCSSVariables" in obj, get: obj => obj.useCSSVariables, set: (obj, value) => { obj.useCSSVariables = value; } }, metadata: _metadata }, _useCSSVariables_initializers, _useCSSVariables_extraInitializers);
        __esDecorate(null, null, _enableHover_decorators, { kind: "field", name: "enableHover", static: false, private: false, access: { has: obj => "enableHover" in obj, get: obj => obj.enableHover, set: (obj, value) => { obj.enableHover = value; } }, metadata: _metadata }, _enableHover_initializers, _enableHover_extraInitializers);
        __esDecorate(null, null, _enableResponsive_decorators, { kind: "field", name: "enableResponsive", static: false, private: false, access: { has: obj => "enableResponsive" in obj, get: obj => obj.enableResponsive, set: (obj, value) => { obj.enableResponsive = value; } }, metadata: _metadata }, _enableResponsive_initializers, _enableResponsive_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _ariaLabel_decorators, { kind: "field", name: "ariaLabel", static: false, private: false, access: { has: obj => "ariaLabel" in obj, get: obj => obj.ariaLabel, set: (obj, value) => { obj.ariaLabel = value; } }, metadata: _metadata }, _ariaLabel_initializers, _ariaLabel_extraInitializers);
        __esDecorate(null, null, _dataTestId_decorators, { kind: "field", name: "dataTestId", static: false, private: false, access: { has: obj => "dataTestId" in obj, get: obj => obj.dataTestId, set: (obj, value) => { obj.dataTestId = value; } }, metadata: _metadata }, _dataTestId_initializers, _dataTestId_extraInitializers);
        __esDecorate(null, null, _onClick_decorators, { kind: "field", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
        __esDecorate(null, null, _onMouseEnter_decorators, { kind: "field", name: "onMouseEnter", static: false, private: false, access: { has: obj => "onMouseEnter" in obj, get: obj => obj.onMouseEnter, set: (obj, value) => { obj.onMouseEnter = value; } }, metadata: _metadata }, _onMouseEnter_initializers, _onMouseEnter_extraInitializers);
        __esDecorate(null, null, _onMouseLeave_decorators, { kind: "field", name: "onMouseLeave", static: false, private: false, access: { has: obj => "onMouseLeave" in obj, get: obj => obj.onMouseLeave, set: (obj, value) => { obj.onMouseLeave = value; } }, metadata: _metadata }, _onMouseLeave_initializers, _onMouseLeave_extraInitializers);
        __esDecorate(null, null, _onFocus_decorators, { kind: "field", name: "onFocus", static: false, private: false, access: { has: obj => "onFocus" in obj, get: obj => obj.onFocus, set: (obj, value) => { obj.onFocus = value; } }, metadata: _metadata }, _onFocus_initializers, _onFocus_extraInitializers);
        __esDecorate(null, null, _onBlur_decorators, { kind: "field", name: "onBlur", static: false, private: false, access: { has: obj => "onBlur" in obj, get: obj => obj.onBlur, set: (obj, value) => { obj.onBlur = value; } }, metadata: _metadata }, _onBlur_initializers, _onBlur_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
// Pre-configured variant components
let GlassMorphismLightComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-morphism-light',
            template: '<glass-morphism [variant]="\'light\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassMorphismLightComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
let GlassMorphismMediumComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-morphism-medium',
            template: '<glass-morphism [variant]="\'medium\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassMorphismMediumComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
let GlassMorphismHeavyComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-morphism-heavy',
            template: '<glass-morphism [variant]="\'heavy\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassMorphismHeavyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
// Pre-configured preset components
let GlassCardComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-card',
            template: '<glass-morphism [preset]="\'card\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassCardComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
let GlassModalComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-modal',
            template: '<glass-morphism [preset]="\'modal\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassModalComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();
let GlassButtonComponent = (() => {
    let _classDecorators = [Component({
            selector: 'glass-button',
            template: '<glass-morphism [preset]="\'button\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _ngClass_decorators;
    let _ngClass_initializers = [];
    let _ngClass_extraInitializers = [];
    let _ngStyle_decorators;
    let _ngStyle_initializers = [];
    let _ngStyle_extraInitializers = [];
    _classThis = class {
        constructor() {
            this.config = __runInitializers(this, _config_initializers, {});
            this.ngClass = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _ngClass_initializers, void 0));
            this.ngStyle = (__runInitializers(this, _ngClass_extraInitializers), __runInitializers(this, _ngStyle_initializers, void 0));
            __runInitializers(this, _ngStyle_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "GlassButtonComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _config_decorators = [Input()];
        _ngClass_decorators = [Input()];
        _ngStyle_decorators = [Input()];
        __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
        __esDecorate(null, null, _ngClass_decorators, { kind: "field", name: "ngClass", static: false, private: false, access: { has: obj => "ngClass" in obj, get: obj => obj.ngClass, set: (obj, value) => { obj.ngClass = value; } }, metadata: _metadata }, _ngClass_initializers, _ngClass_extraInitializers);
        __esDecorate(null, null, _ngStyle_decorators, { kind: "field", name: "ngStyle", static: false, private: false, access: { has: obj => "ngStyle" in obj, get: obj => obj.ngStyle, set: (obj, value) => { obj.ngStyle = value; } }, metadata: _metadata }, _ngStyle_initializers, _ngStyle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();

const COMPONENTS = [
    GlassMorphismComponent,
    GlassMorphismLightComponent,
    GlassMorphismMediumComponent,
    GlassMorphismHeavyComponent,
    GlassCardComponent,
    GlassModalComponent,
    GlassButtonComponent
];
let GlassMorphismModule = (() => {
    let _classDecorators = [NgModule({
            declarations: COMPONENTS,
            imports: [CommonModule],
            providers: [GlassMorphismService],
            exports: COMPONENTS
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    _classThis = class {
    };
    __setFunctionName(_classThis, "GlassMorphismModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return _classThis;
})();

export { GlassButton, GlassButtonComponent, GlassCard, GlassCardComponent, GlassInput, GlassModal, GlassModalComponent, GlassMorphism, GlassMorphismComponent, GlassMorphismCore, GlassMorphismDramatic, GlassMorphismHeavy, GlassMorphismHeavyComponent, GlassMorphismLight, GlassMorphismLightComponent, GlassMorphismMedium, GlassMorphismMediumComponent, GlassMorphismModule, GlassMorphismService, GlassMorphismSubtle, GlassSidebar, GlassTooltip, GlassMorphism as default, defaultTheme, generateCSSVariables, generateGlassMorphismStyles, getPresetConfig, getResponsiveBlur, getResponsiveOpacity, getVariantConfig, isMobileDevice, mergeConfig, presets, useGlassMorphism, withGlassMorphism };
//# sourceMappingURL=index.esm.js.map
