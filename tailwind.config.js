/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
colors: {
        // Theme Colors (Updated)
        primary: '#5BF297',      // New primary theme color
        secondary: '#f8fafc',    // Very light gray
        accent: '#22C55E',       // Darker shade for gradients
        surface: '#ffffff',      // Pure white
        background: '#f8fafc',   // Very light gray
        
        // Header & Navigation
        'header-bg': '#1e293b',  // Dark navy blue
        'header-alt': '#1a365d', // Alternative navy
        
        // Buttons & Actions  
        'button-coral': '#ef4444', // Coral/red for Clone button
        
        // Settlement Banner
        'settlement-start': '#5BF297', // New theme color gradient start
        'settlement-end': '#22C55E',   // New theme color gradient end
        
        // Typography
        'text-primary': '#1f2937',     // Dark gray
        'text-secondary': '#6b7280',   // Medium gray
        
        // Status Colors
        success: '#5BF297',
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