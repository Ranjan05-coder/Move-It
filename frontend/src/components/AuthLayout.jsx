export default function AuthLayout({ title, children }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3 className="mb-3 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
}
