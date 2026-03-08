import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-8 text-center">Admin login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
