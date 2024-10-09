export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-darker-blue dark:bg-black">
      <body className="h-screen bg-darker-blue dark:bg-black">{children}</body>
    </html>
  );
}
