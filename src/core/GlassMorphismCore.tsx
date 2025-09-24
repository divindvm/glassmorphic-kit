import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  GlassMorphismProps, 
  GlassMorphismVariant, 
  GlassMorphismStyleProps 
} from '../types';
import { 
  generateGlassMorphismStyles, 
  generateCSSVariables, 
  isMobileDevice,
  getVariantConfig,
  getPresetConfig,
  mergeConfig,
  defaultTheme 
} from '../styles/glassMorphismStyles';

export interface GlassMorphismCoreProps extends GlassMorphismProps {
  variant?: GlassMorphismVariant;
  preset?: string;
  useCSSVariables?: boolean;
  enableHover?: boolean;
  enableResponsive?: boolean;
}

export const GlassMorphismCore: React.FC<GlassMorphismCoreProps> = ({
  children,
  className = '',
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  id,
  role,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  variant,
  preset,
  useCSSVariables = false,
  enableHover = true,
  enableResponsive = true,
  ...config
}) => {
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
    const styleProps: GlassMorphismStyleProps = {
      config: finalConfig,
      isHovered,
      isMobile,
      variant,
    };

    return generateGlassMorphismStyles(styleProps);
  }, [finalConfig, isHovered, isMobile, variant]);

  // Generate CSS variables if enabled
  const cssVariables = useMemo(() => {
    if (!useCSSVariables) return {};
    return generateCSSVariables(finalConfig);
  }, [finalConfig, useCSSVariables]);

  // Event handlers
  const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (enableHover) {
      setIsHovered(true);
    }
    onMouseEnter?.(event);
  }, [enableHover, onMouseEnter]);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (enableHover) {
      setIsHovered(false);
    }
    onMouseLeave?.(event);
  }, [enableHover, onMouseLeave]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
  }, [onClick]);

  // Combine all styles
  const combinedStyles: React.CSSProperties = {
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

  return (
    <div
      id={id}
      className={classNames}
      style={combinedStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={role}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

// Higher-order component for easy customization
export const withGlassMorphism = <P extends object>(
  Component: React.ComponentType<P>,
  defaultGlassConfig?: Partial<GlassMorphismCoreProps>
) => {
  return React.forwardRef<any, P & Partial<GlassMorphismCoreProps>>((props, ref) => {
    const { children, ...glassProps } = props;
    const mergedProps = { ...defaultGlassConfig, ...glassProps };

    return (
      <GlassMorphismCore {...mergedProps}>
        <Component ref={ref} {...(props as P)}>
          {children}
        </Component>
      </GlassMorphismCore>
    );
  });
};

// Hook for using glass morphism styles
export const useGlassMorphism = (
  config: Partial<GlassMorphismCoreProps> = {},
  dependencies: any[] = []
) => {
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
    const styleProps: GlassMorphismStyleProps = {
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

export default GlassMorphismCore;
