
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'league': ['"League Spartan"', 'sans-serif'],
				'intro': ['"Intro Rust"', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for dark mode data scientist portfolio
				gray: {
					50: '#f7f7f7',
					100: '#e3e3e3',
					200: '#c8c8c8',
					300: '#a4a4a4',
					400: '#818181',
					500: '#666666',
					600: '#515151',
					700: '#434343',
					800: '#383838',
					900: '#222222',
					950: '#141414',
				},
				amber: {
					light: '#ffd28a',
					DEFAULT: '#d4a257',
					dark: '#8c6931',
				},
				green: {
					100: '#e6f3e6',
					200: '#c2e0c2',
					300: '#9ec89e',
					400: '#7ab17a',
					500: '#569956',
					600: '#458a45',
					700: '#347834',
					800: '#236723',
					900: '#124b12',
				},
				teal: {
					100: '#e6f5f5',
					200: '#c1e3e3',
					300: '#9cd1d1',
					400: '#77bebe',
					500: '#52acac',
					600: '#429a9a',
					700: '#318686',
					800: '#217272',
					900: '#105151',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'rotate-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
				'morph': {
					'0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
					'50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
					'100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 15s linear infinite',
				'morph': 'morph 8s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'data-grid': 'linear-gradient(to right, rgba(65, 65, 65, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(65, 65, 65, 0.1) 1px, transparent 1px)',
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(8px)',
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
			perspective: {
				'none': 'none',
				'500': '500px',
				'1000': '1000px',
				'2000': '2000px',
			},
			rotate: {
				'y-180': 'rotateY(180deg)',
			},
			transformStyle: {
				'3d': 'preserve-3d',
				'flat': 'flat',
			},
			backfaceVisibility: {
				'visible': 'visible',
				'hidden': 'hidden',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities, theme, e }) {
			const perspectiveUtilities = Object.entries(theme('perspective', {})).map(([key, value]) => {
				return {
					[`.${e(`perspective-${key}`)}`]: { perspective: value }
				};
			});
			
			const transformUtilities = {
				'.transform-style-3d': {
					'transform-style': 'preserve-3d',
				},
				'.backface-visible': {
					'backface-visibility': 'visible',
				},
				'.backface-hidden': {
					'backface-visibility': 'hidden',
				},
				'.rotate-y-180': {
					'transform': 'rotateY(180deg)',
				},
			};
			
			addUtilities([...perspectiveUtilities, transformUtilities], ['responsive']);
		},
	],
} satisfies Config;
