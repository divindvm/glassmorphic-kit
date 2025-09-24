import { EventEmitter, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { GlassMorphismService } from './glass-morphism.service';
import { GlassMorphismConfig, GlassMorphismVariant } from '../types';
export declare class GlassMorphismComponent implements OnInit, OnDestroy, OnChanges {
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
export declare class GlassMorphismLightComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export declare class GlassMorphismMediumComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export declare class GlassMorphismHeavyComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export declare class GlassCardComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export declare class GlassModalComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
export declare class GlassButtonComponent {
    config: GlassMorphismConfig;
    ngClass?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    ngStyle?: {
        [klass: string]: any;
    };
}
//# sourceMappingURL=glass-morphism.component.d.ts.map