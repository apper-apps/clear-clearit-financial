/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
colors: {
        // Dark Jungle Green Theme Colors
        primary: '#22F58A',          // Vibrant Green (Primary Accent & CTA)
        secondary: '#ffffff',        // White (surface)
        accent: '#A2FECD',          // Light Pastel Green (Headings)
        surface: '#ffffff',          // White (Pure white)
        background: '#111814',       // Dark Jungle Green (Main Background)
        
        // Header & Navigation
        'header-bg': '#111814',      // Dark Jungle Green
        'header-alt': '#0f1612',     // Darker variant
        
        // Buttons & Actions  
        'button-coral': '#ef4444',   // Coral/red for Clone button
        
        // Settlement Banner
        'settlement-start': '#22F58A', // Vibrant Green gradient start
        'settlement-end': '#A2FECD',   // Light Pastel Green gradient end
        
        // Typography
        'text-primary': '#FFFFFF',     // White (Body Text & Highlights)
        'text-secondary': '#E8E8E8',   // Light Grey (Secondary Text)
        
        // Status Colors
        success: '#22F58A',          // Vibrant Green
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}