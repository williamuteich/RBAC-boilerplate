export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-br"
        >
            <body className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
