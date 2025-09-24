import React from 'react';
import { GlassMorphismProps, GlassMorphismVariant } from '../types';
export interface GlassMorphismCoreProps extends GlassMorphismProps {
    variant?: GlassMorphismVariant;
    preset?: string;
    useCSSVariables?: boolean;
    enableHover?: boolean;
    enableResponsive?: boolean;
}
export declare const GlassMorphismCore: React.FC<GlassMorphismCoreProps>;
export declare const withGlassMorphism: <P extends object>(Component: React.ComponentType<P>, defaultGlassConfig?: Partial<GlassMorphismCoreProps>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P & Partial<GlassMorphismCoreProps>> & React.RefAttributes<any>>;
export declare const useGlassMorphism: (config?: Partial<GlassMorphismCoreProps>, dependencies?: any[]) => {
    styles: React.CSSProperties;
    eventHandlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
    isHovered: boolean;
    isMobile: boolean;
};
export default GlassMorphismCore;
//# sourceMappingURL=GlassMorphismCore.d.ts.map