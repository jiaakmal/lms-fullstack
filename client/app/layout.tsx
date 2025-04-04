import './globals.css';
import { Poppins ,Josefin_Sans} from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600' ,'700'], // Add weights as needed
  variable: '--font-Poppins', // Custom CSS variable for the font
});
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400','500','600' ,'700'], // Add weights as needed
  variable: '--font-Josefin', // Custom CSS variable for the font
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <ThemeProvider attribute='class' defaultTheme='system'  enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}