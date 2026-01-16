/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#000000',
  			border: '#1F1F1F',
  			slate: '#1F1F1F',
  			accent: '#5E5CE6',
  			indigo: {
  				glow: '#5E5CE6',
  				DEFAULT: '#5E5CE6'
  			},
  			text: {
  				primary: '#FAFAFA',
  				secondary: '#A1A1AA'
  			},
  			foreground: '#FAFAFA',
  			muted: {
  				DEFAULT: '#A1A1AA',
  				foreground: '#A1A1AA'
  			},
  			card: {
  				DEFAULT: '#000000',
  				foreground: '#FAFAFA'
  			},
  			popover: {
  				DEFAULT: '#000000',
  				foreground: '#FAFAFA'
  			},
  			primary: {
  				DEFAULT: '#5E5CE6',
  				foreground: '#FAFAFA'
  			},
  			secondary: {
  				DEFAULT: '#1F1F1F',
  				foreground: '#FAFAFA'
  			},
  			destructive: {
  				DEFAULT: '#EF4444',
  				foreground: '#FAFAFA'
  			},
  			ring: '#5E5CE6',
  			input: '#1F1F1F'
  		},
  		spacing: {
  			'1': '4px',
  			'2': '8px',
  			'3': '12px',
  			'4': '16px',
  			'6': '24px',
  			'8': '32px',
  			'12': '48px',
  			'16': '64px',
  			'24': '96px'
  		},
  		borderRadius: {
  			card: '8px',
  			button: '6px',
  			small: '4px',
  			lg: '8px',
  			md: '6px',
  			sm: '4px'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			marquee: 'marquee 30s linear infinite',
  			shimmer: 'shimmer 2s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'pulse-glow': {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(94, 92, 230, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(94, 92, 230, 0.6)'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-50%)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		transitionDuration: {
  			DEFAULT: '200ms'
  		},
  		transitionTimingFunction: {
  			DEFAULT: 'ease-out'
  		},
  		maxWidth: {
  			container: '1280px'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
}
