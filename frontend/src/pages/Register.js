import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import axios from "axios";
import { ChevronRight, User, Mail, Lock, MapPin, ChevronDown, Check } from "lucide-react";
import NavBar from "../components/utility/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    address: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validation for step 1
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill all required fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      setError("");
      setStep(2);
      return;
    }

    // If on last step, submit the form
    handleSignup(e);
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.address
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };



  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all"
        />
      </div>

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

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-nomnom focus:border-transparent transition-all appearance-none text-gray-700"
        >
          <option value="customer">Customer</option>
          <option value="restaurant-admin">Restaurant Admin</option>
          <option value="restaurant-staff">Restaurant Staff</option>
          <option value="system-admin">System Admin</option>
          <option value="delivery-personnel">Delivery Personnel</option>
        </select>
      </div>


      <div className="mt-4">
        <label className="flex items-center text-gray-600">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
            className="mr-2 h-5 w-5 rounded border-gray-300 text-nomnom focus:ring-nomnom"
          />
          <span className="text-sm">
            I agree to the{" "}
            <Link to="/terms" className="text-nomnom hover:text-nomnom/80 font-medium transition-colors">
              Terms & Privacy Policy
            </Link>
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-1">
              <div
                className="bg-gradient-to-r from-nomnom to-nomnom/80 h-1 transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-cursive text-teal-800 pb-4">Join us today !</h1>
                <p className="text-gray-500 mt-2">
                  {step === 1
                    ? "Let's get started with your personal information"
                    : "Just a few more details to complete your profile"}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleNextStep}>
                {step === 1 ? renderStep1() : renderStep2()}

                <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-all duration-200 font-medium flex-1 text-center"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 px-4 bg-gradient-to-r from-nomnom to-nomnom/90 text-white rounded-full hover:from-nomnom/90 hover:to-nomnom focus:outline-none focus:ring-2 focus:ring-nomnom focus:ring-offset-1 transition-all duration-200 font-medium flex-1 flex items-center justify-center ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        {step === 1 ? "Continue" : "Create Account"}
                        <ChevronRight className="ml-1 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-nomnom hover:text-nomnom/80 font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  step >= 1 ? "bg-nomnom" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-2 w-2 rounded-full ${
                  step >= 2 ? "bg-nomnom" : "bg-gray-300"
                }`}
              ></div>
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

export default Signup;
