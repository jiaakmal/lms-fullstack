'use client'
import './globals.css';
import { Poppins, Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from './utils/theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from "./Provider";
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add weights as needed
  variable: '--font-Poppins', // Custom CSS variable for the font
});
const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add weights as needed
  variable: '--font-Josefin', // Custom CSS variable for the font
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${josefin.variable}  dark suppressHydrationWarning`} >
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900  dark:to-black duration-300`}>

        <Providers>
          <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Custom>{children}</Custom>
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
        </SessionProvider>
        </Providers>

      </body>
    </html>
  );
}

const  Custom = ({children}:{children:React.ReactNode}) =>  {
  const {isLoading} = useLoadUserQuery({})

return(
  <>
  {
    isLoading ? <Loader/> : <>{children}</>
  }
  </>
)

}
