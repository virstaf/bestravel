export default function PostPageLayout({ children }) {
  return (
    <div className=" layout">
      <main className="min-h-screen mt-16">{children}</main>
    </div>
  );
}
