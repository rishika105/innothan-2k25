/** @type {import('tailwindcss').Config} */
export default {
 
    theme: {
      extend: {
        colors: {
          // Primary Colors (Blue)
          primary: {
            DEFAULT: '#2563EB', // Vibrant blue for primary actions
            dark: '#1E40AF', // Darker blue for hover states
          },
  
          // Secondary Colors (Green)
          secondary: {
            DEFAULT: '#10B981', // Fresh green for secondary actions
            dark: '#059669', // Darker green for hover states
          },
  
          // Neutral Colors (Gray Scale)
          neutral: {
            100: '#F3F4F6', // Light gray for backgrounds
            200: '#E5E7EB', // Slightly darker gray for borders
            300: '#D1D5DB', // Medium gray for dividers
            500: '#6B7280', // Gray for secondary text
            700: '#374151', // Dark gray for primary text
            900: '#111827', // Almost black for headings
          },
  
          // Traffic Status Colors
          traffic: {
            low: '#10B981', // Green for low congestion
            medium: '#F59E0B', // Yellow for medium congestion
            high: '#EF4444', // Red for high congestion
          },
  
          // Alert Colors
          alert: {
            info: '#3B82F6', // Blue for informational alerts
            warning: '#F59E0B', // Yellow for warning alerts
            error: '#EF4444', // Red for error alerts
            success: '#10B981', // Green for success alerts
          },
        },
      },
    },

}