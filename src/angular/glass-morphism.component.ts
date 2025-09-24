import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ElementRef, 
  OnInit, 
  OnDestroy, 
  OnChanges, 
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { GlassMorphismService } from './glass-morphism.service';
import { 
  GlassMorphismConfig, 
  GlassMorphismVariant,
  AngularGlassMorphismProps 
} from '../types';

@Component({
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
})
export class GlassMorphismComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('glassElement', { static: true }) glassElement!: ElementRef;

  // Core glass morphism properties
  @Input() config: GlassMorphismConfig = {};
  @Input() variant?: GlassMorphismVariant;
  @Input() preset?: string;
  @Input() useCSSVariables: boolean = false;
  @Input() enableHover: boolean = true;
  @Input() enableResponsive: boolean = true;

  // Angular-specific properties
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };

  // Standard HTML properties
  @Input() id?: string;
  @Input() role?: string;
  @Input() ariaLabel?: string;
  @Input() dataTestId?: string;

  // Event outputs
  @Output() onClick = new EventEmitter<Event>();
  @Output() onMouseEnter = new EventEmitter<Event>();
  @Output() onMouseLeave = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();
  @Output() onBlur = new EventEmitter<Event>();

  // Computed properties
  computedClassName: string = '';
  computedStyle: { [key: string]: any } = {};

  private hoverHandlers: { handleMouseEnter: () => void; handleMouseLeave: () => void } | null = null;
  private resizeListener?: () => void;

  constructor(
    private glassMorphismService: GlassMorphismService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.applyGlassMorphism();
    this.setupEventListeners();
    this.setupResizeListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['variant'] || changes['preset'] || changes['useCSSVariables']) {
      this.applyGlassMorphism();
    }
  }

  ngOnDestroy(): void {
    this.cleanupEventListeners();
    this.cleanupResizeListener();
  }

  private applyGlassMorphism(): void {
    if (!this.glassElement) return;

    // Apply glass morphism styles
    this.glassMorphismService.applyGlassMorphism(
      this.glassElement,
      this.config,
      this.variant,
      this.preset,
      this.useCSSVariables
    );

    // Setup hover effects if enabled
    if (this.enableHover) {
      this.setupHoverEffects();
    }

    // Update computed properties
    this.updateComputedProperties();
  }

  private setupHoverEffects(): void {
    if (!this.glassElement) return;

    this.hoverHandlers = this.glassMorphismService.createHoverHandlers(
      this.glassElement,
      this.config
    );

    const element = this.glassElement.nativeElement;
    element.addEventListener('mouseenter', this.hoverHandlers.handleMouseEnter);
    element.addEventListener('mouseleave', this.hoverHandlers.handleMouseLeave);
  }

  private setupEventListeners(): void {
    // Additional event listeners can be added here
  }

  private setupResizeListener(): void {
    if (this.enableResponsive) {
      this.resizeListener = () => {
        this.applyGlassMorphism();
        this.cdr.detectChanges();
      };
      window.addEventListener('resize', this.resizeListener);
    }
  }

  private cleanupEventListeners(): void {
    if (this.hoverHandlers && this.glassElement) {
      const element = this.glassElement.nativeElement;
      element.removeEventListener('mouseenter', this.hoverHandlers.handleMouseEnter);
      element.removeEventListener('mouseleave', this.hoverHandlers.handleMouseLeave);
    }
  }

  private cleanupResizeListener(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateComputedProperties(): void {
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
  updateConfig(newConfig: Partial<GlassMorphismConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.applyGlassMorphism();
  }

  updateVariant(newVariant: GlassMorphismVariant): void {
    this.variant = newVariant;
    this.applyGlassMorphism();
  }

  updatePreset(newPreset: string): void {
    this.preset = newPreset;
    this.applyGlassMorphism();
  }

  // Getter for current configuration
  get currentConfig(): GlassMorphismConfig {
    return this.config;
  }
}

// Pre-configured variant components
@Component({
  selector: 'glass-morphism-light',
  template: '<glass-morphism [variant]="\'light\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassMorphismLightComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}

@Component({
  selector: 'glass-morphism-medium',
  template: '<glass-morphism [variant]="\'medium\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassMorphismMediumComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}

@Component({
  selector: 'glass-morphism-heavy',
  template: '<glass-morphism [variant]="\'heavy\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassMorphismHeavyComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}

// Pre-configured preset components
@Component({
  selector: 'glass-card',
  template: '<glass-morphism [preset]="\'card\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassCardComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}

@Component({
  selector: 'glass-modal',
  template: '<glass-morphism [preset]="\'modal\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassModalComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}

@Component({
  selector: 'glass-button',
  template: '<glass-morphism [preset]="\'button\'" [config]="config" [ngClass]="ngClass" [ngStyle]="ngStyle"><ng-content></ng-content></glass-morphism>'
})
export class GlassButtonComponent {
  @Input() config: GlassMorphismConfig = {};
  @Input() ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  @Input() ngStyle?: { [klass: string]: any };
}
