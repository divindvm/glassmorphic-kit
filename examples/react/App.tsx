import React, { useState } from 'react';
import {
  GlassMorphism,
  GlassMorphismLight,
  GlassMorphismMedium,
  GlassMorphismHeavy,
  GlassMorphismSubtle,
  GlassMorphismDramatic,
  GlassCard,
  GlassModal,
  GlassButton,
  GlassInput,
  useGlassMorphism
} from 'glassmorphic-kit';
import './App.css';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<'light' | 'medium' | 'heavy' | 'subtle' | 'dramatic'>('medium');

  // Custom hook example
  const { styles: customStyles, eventHandlers } = useGlassMorphism({
    variant: 'medium',
    hoverEffect: true,
    blur: 15,
    opacity: 0.2,
  });

  const variants = [
    { name: 'Light', component: GlassMorphismLight, variant: 'light' as const },
    { name: 'Medium', component: GlassMorphismMedium, variant: 'medium' as const },
    { name: 'Heavy', component: GlassMorphismHeavy, variant: 'heavy' as const },
    { name: 'Subtle', component: GlassMorphismSubtle, variant: 'subtle' as const },
    { name: 'Dramatic', component: GlassMorphismDramatic, variant: 'dramatic' as const },
  ];

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <GlassMorphism
            variant="dramatic"
            style={{
              padding: '40px',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <h1>Glass Morphism Showcase</h1>
            <p>Beautiful Apple-inspired glass effects for React and Angular</p>
            <GlassButton
              onClick={() => setShowModal(true)}
              style={{ marginTop: '20px' }}
            >
              Open Modal
            </GlassButton>
          </GlassMorphism>
        </div>
      </section>

      {/* Variants Section */}
      <section className="variants-section">
        <div className="container">
          <h2>Pre-configured Variants</h2>
          <div className="variants-grid">
            {variants.map(({ name, component: Component, variant }) => (
              <Component
                key={variant}
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onClick={() => setSelectedVariant(variant)}
                className={selectedVariant === variant ? 'selected' : ''}
              >
                <h3>{name}</h3>
                <p>Click to select this variant</p>
              </Component>
            ))}
          </div>
        </div>
      </section>

      {/* Presets Section */}
      <section className="presets-section">
        <div className="container">
          <h2>Pre-built Presets</h2>
          <div className="presets-grid">
            <GlassCard>
              <h3>Glass Card</h3>
              <p>Perfect for content cards with glass morphism effects.</p>
              <GlassButton style={{ marginTop: '16px' }}>
                Action Button
              </GlassButton>
            </GlassCard>

            <GlassMorphism
              preset="modal"
              style={{ maxWidth: '400px', margin: '0 auto' }}
            >
              <h3>Modal Preset</h3>
              <p>Ready-to-use modal styling with glass effects.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <GlassButton>Cancel</GlassButton>
                <GlassButton>Confirm</GlassButton>
              </div>
            </GlassMorphism>

            <GlassMorphism
              preset="tooltip"
              style={{ maxWidth: '250px', margin: '0 auto' }}
            >
              <h4>Tooltip Preset</h4>
              <p>Lightweight tooltip with subtle glass effects.</p>
            </GlassMorphism>
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="interactive-section">
        <div className="container">
          <h2>Interactive Examples</h2>
          <div className="interactive-grid">
            <GlassMorphism
              variant={selectedVariant}
              style={{ padding: '24px' }}
            >
              <h3>Dynamic Variant</h3>
              <p>This component changes based on the selected variant above.</p>
              <p>Current variant: <strong>{selectedVariant}</strong></p>
            </GlassMorphism>

            <GlassMorphism
              style={{
                padding: '24px',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))'
              }}
              hoverEffect={true}
              hoverBlur={20}
              hoverOpacity={0.3}
            >
              <h3>Custom Hover Effects</h3>
              <p>Hover over this card to see enhanced glass effects!</p>
            </GlassMorphism>

            <div style={customStyles} {...eventHandlers}>
              <h3>Custom Hook Example</h3>
              <p>This card uses the useGlassMorphism hook for styling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="container">
          <h2>Form Elements</h2>
          <GlassMorphism
            style={{
              padding: '32px',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <h3>Contact Form</h3>
            <form>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  Name
                </label>
                <GlassInput
                  type="text"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  Email
                </label>
                <GlassInput
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  Message
                </label>
                <GlassInput
                  as="textarea"
                  placeholder="Enter your message"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
              </div>
              <GlassButton type="submit">
                Send Message
              </GlassButton>
            </form>
          </GlassMorphism>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <GlassModal
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '500px', margin: '50px auto' }}
          >
            <h2>Glass Modal</h2>
            <p>This is a beautiful glass morphism modal dialog!</p>
            <p>Click outside to close or use the button below.</p>
            <GlassButton
              onClick={() => setShowModal(false)}
              style={{ marginTop: '20px' }}
            >
              Close Modal
            </GlassButton>
          </GlassModal>
        </div>
      )}
    </div>
  );
};

export default App;
