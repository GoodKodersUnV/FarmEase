import "@/styles/globals.css";
import type { Metadata } from "next";
import Provider from "@/providers/Provider";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import GoogleTranslate from "../components/Translator";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmSense",
  description: "FarmSense",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider
      refetchInterval={5 * 60} // 5 minutes
      session={session}
    >
      <html lang="en" className="bg-background text-foreground">
        <body className={inter.className}>
          {/* <GoogleTranslate/> */}
          <Provider>{children}</Provider>
        </body>
      </html>
      <Script> (
        function(){ 
          var s = document.createElement('script');
          var h = document.querySelector('head') || document.body;
          s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
          s.async = true; s.onload = function(){ 
          acsbJS.init({ statementLink : '', footerHtml : '', hideMobile : false, hideTrigger : false, disableBgProcess : false, language : 'en', position : 'right', leadColor : '#146FF8', triggerColor : '#146FF8', triggerRadius : '50%', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerIcon : 'people', triggerSize : 'bottom', triggerOffsetX : 20, triggerOffsetY : 20, mobile : { triggerSize : 'small', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerOffsetX : 10, triggerOffsetY : 10, triggerRadius : '20' } }); }; h.appendChild(s); 
          })(); 
        </Script>

    </SessionProvider>
  );
}
