import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassMorphismService } from './glass-morphism.service';
import { 
  GlassMorphismComponent,
  GlassMorphismLightComponent,
  GlassMorphismMediumComponent,
  GlassMorphismHeavyComponent,
  GlassCardComponent,
  GlassModalComponent,
  GlassButtonComponent
} from './glass-morphism.component';

const COMPONENTS = [
  GlassMorphismComponent,
  GlassMorphismLightComponent,
  GlassMorphismMediumComponent,
  GlassMorphismHeavyComponent,
  GlassCardComponent,
  GlassModalComponent,
  GlassButtonComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule],
  providers: [GlassMorphismService],
  exports: COMPONENTS
})
export class GlassMorphismModule { }
