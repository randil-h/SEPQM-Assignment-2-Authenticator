import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import NavBar from "../components/utility/Navbar";
import { Mail, Lock, ChevronRight, Check } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/resops-dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-cursive text-teal-800">Welcome back !</h1>
                <p className="text-gray-500 mt-2">Sign in to your account</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-nomnom hover:text-nomnom/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 bg-gradient-to-r from-nomnom to-nomnom/90 text-white rounded-lg hover:from-nomnom/90 hover:to-nomnom focus:outline-none focus:ring-2 focus:ring-nomnom focus:ring-offset-1 transition-all duration-200 font-medium flex items-center justify-center ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign in
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-nomnom hover:text-nomnom/80 font-medium transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Steps Indicator (for visual consistency with signup) */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-nomnom"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="rounded-full bg-nomnom/10 p-3 inline-flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-nomnom" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Easy Ordering</h3>
              <p className="mt-2 text-sm text-gray-500">
                Order your favorite meals with just a few clicks
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-nomnom/10 p-3 inline-flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-nomnom" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-sm text-gray-500">
                Get your food delivered quickly to your doorstep
              </p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-nomnom/10 p-3 inline-flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-nomnom" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Quality Restaurants</h3>
              <p className="mt-2 text-sm text-gray-500">
                Partner with the best restaurants in your area
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
