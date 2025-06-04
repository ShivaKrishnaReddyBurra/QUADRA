import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head 
        title="SK Stories"
      />
      <body className="bg-gradient-to-r from-orange-400 to-amber-300 text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}