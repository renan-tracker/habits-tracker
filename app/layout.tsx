// app/layout.tsx
export const metadata = {
  title: 'Habits Tracker',
  description: 'Acompanhamento de hábitos do Renan',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
