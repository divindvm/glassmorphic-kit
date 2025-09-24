import { Component, OnInit } from '@angular/core';
import { GlassMorphismService } from 'glassmorphic-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Glass Morphism Angular Demo';
  selectedVariant: 'light' | 'medium' | 'heavy' | 'subtle' | 'dramatic' = 'medium';
  showModal = false;
  inputValue = '';

  variants = [
    { name: 'Light', variant: 'light' as const },
    { name: 'Medium', variant: 'medium' as const },
    { name: 'Heavy', variant: 'heavy' as const },
    { name: 'Subtle', variant: 'subtle' as const },
    { name: 'Dramatic', variant: 'dramatic' as const },
  ];

  glassConfig = {
    blur: 12,
    opacity: 0.15,
    hoverEffect: true,
    responsive: true
  };

  customConfig = {
    blur: 20,
    opacity: 0.25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    hoverEffect: true,
    hoverBlur: 25,
    hoverOpacity: 0.3
  };

  constructor(private glassMorphismService: GlassMorphismService) {}

  ngOnInit(): void {
    // Component initialization
  }

  selectVariant(variant: 'light' | 'medium' | 'heavy' | 'subtle' | 'dramatic'): void {
    this.selectedVariant = variant;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
  }

  onSubmit(): void {
    console.log('Form submitted with value:', this.inputValue);
    // Handle form submission
  }
}
