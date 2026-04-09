import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const backendOrigin = (import.meta.env.VITE_BACKEND_ORIGIN || "http://192.168.1.82:8000").replace(/\/$/, "");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await axios.post("/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const token =
                response?.data?.data?.token ||
                response?.data?.token ||
                response?.data?.access_token;

            if (token) {
                localStorage.setItem("auth_token", token);
            }
            const tokenType = response?.data?.data?.token_type;
            if (tokenType) {
                localStorage.setItem("auth_token_type", tokenType);
            }

            const role = response?.data?.data?.role;
            if (role) {
                localStorage.setItem("auth_role", role);
            }

            const user = response?.data?.data?.user;
            if (user) {
                localStorage.setItem("auth_user", JSON.stringify(user));
            }

            const redirectTo = response?.data?.data?.redirect_to;

            if (redirectTo) {
                localStorage.setItem("auth_redirect_to", redirectTo);
                const serverPath = redirectTo || "/";
                const normalizedPath =
                    serverPath.startsWith("http://") || serverPath.startsWith("http://")
                        ? serverPath
                        : `${backendOrigin}${serverPath.startsWith("/") ? serverPath : `/${serverPath}`}`;

                const redirectUrl = new URL(normalizedPath);
                if (token) {
                    console.log(token);
                    
                    redirectUrl.searchParams.set("token", token);
                }
                if (tokenType) {
                    console.log(tokenType);
                    redirectUrl.searchParams.set("token_type", tokenType);
                }

                window.location.assign(redirectUrl.toString());
                return;
            }

            navigate("/");

        } catch (error) {
            const apiMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Unable to log in. Please check your credentials.";
            setErrorMessage(apiMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
                <section className="space-y-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Welcome back
                    </span>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                        Log in to manage your store
                    </h1>
                    <p className="text-sm text-slate-600 md:text-base">
                        Access your dashboard, orders, and business settings from one place.
                    </p>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        New here?{" "}
                        <Link to="/register" className="font-semibold text-slate-900 underline">
                            Create an account
                        </Link>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5" method="POST">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Sign in</h2>
                        <p className="mt-1 text-sm text-slate-600">Enter your account details below.</p>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                            required
                        />
                    </div>
                    {errorMessage ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
                    >
                        {isLoading ? "Signing in..." : "Log in"}
                    </button>
                </form>
            </div>
        </main>
    );
}
