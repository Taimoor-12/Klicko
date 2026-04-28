export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-6 sm:mx-12 md:mx-16 lg:mx-28 xl:mx-36 mt-8">
      {children}
    </div>
  );
}
