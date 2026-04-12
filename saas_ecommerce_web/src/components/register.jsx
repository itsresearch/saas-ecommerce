import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaKey, FaGlobe, FaUser, FaBuilding } from "react-icons/fa";

const StepEmail = ({ formData, setFormData, nextStep, setOtpVerified, isLoading, setIsLoading }) => {
  const sendOTP = async () => {
    if (isLoading) return;
    const email = (formData.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/business/onboarding/email",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 201) {
        const onboarding_token = response?.data?.token || response?.data?.onboarding_token || "";
        setFormData((prev) => ({ ...prev, onboarding_token }));
        alert("OTP sent successfully!");
        nextStep();
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending the OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Verify your email</h2>
        <p className="mt-1 text-sm text-slate-600">
          We'll send you a verification code to confirm your email address.
        </p>
      </div>

      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
        Email address <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.email}
        onChange={(e) => {
          setOtpVerified(false);
          setFormData({ ...formData, email: e.target.value });
        }}
        required
      />
      <button
        type="button"
        disabled={isLoading}
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={sendOTP}
      >
        {isLoading ? "Sending..." : "Send Verification Code"}
      </button>
    </div>
  );
};

const StepOTP = ({ formData, setFormData, nextStep, prevStep, setOtpVerified, isLoading, setIsLoading }) => {
  const verifyOTP = async () => {
    if (isLoading) return;
    const onboarding_token = formData.onboarding_token || "";
    const otp = (formData.otp || "").trim();

    // Debug logging
    console.log("OTP Verification Debug:", {
      otp,
      otp_length: otp.length,
      onboarding_token: onboarding_token ? "Present" : "Missing",
      email: formData.email,
    });

    if (!onboarding_token) {
      alert("Session expired. Please verify your email again.");
      prevStep();
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter the 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        onboarding_token,
        verification_code: otp,  // API expects 'code' not 'otp'
      };
      const response = await axios.post(
        "/api/business/onboarding/email/verify",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 200 || response.status === 201) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
        nextStep();
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      console.error("Response status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);

      const errorMessage = error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.errors ||
        "An error occurred while verifying the OTP. Please try again.";

      // Show detailed error for 422
      if (error?.response?.status === 422) {
        console.error("Validation errors:", errorMessage);
        alert(`Validation Error: ${JSON.stringify(errorMessage)}`);
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/\d/.test(value) && value !== "") return; // Only allow digits

    const otpArray = formData.otp.split("");
    otpArray[index] = value;
    setFormData({ ...formData, otp: otpArray.join("") });

    // Move to the next input box if a digit is entered
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Enter OTP</h2>
        <p className="mt-1 text-sm text-slate-600">
          Please enter the 6-digit verification code sent to your email address.
        </p>
      </div>

      <div className="flex space-x-2">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center text-lg font-medium rounded-lg border border-slate-200 focus:ring-4 focus:ring-slate-100 focus:outline-none"
            value={formData.otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={verifyOTP}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

const StepSubdomain = ({ formData, setFormData, nextStep, prevStep, isLoading, setIsLoading }) => {
  const submitSubdomain = async () => {
    if (isLoading) return;

    const subdomain = (formData.subdomain || "").trim();
    const onboarding_token = formData.onboarding_token || "";

    if (!subdomain) {
      alert("Please enter a subdomain.");
      return;
    }

    if (!onboarding_token) {
      alert("Session expired. Please start over.");
      prevStep();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        onboarding_token,
        subdomain,
      };

      console.log("Setting subdomain with payload:", payload);

      const response = await axios.post(
        "/api/business/onboarding/subdomain",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Subdomain reserved successfully!");
        nextStep();
      } else {
        alert("Failed to set subdomain. Please try again.");
      }
    } catch (error) {
      console.error("Error setting subdomain:", error);
      const errorMessage = error?.response?.data?.message || "Failed to set subdomain.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">Choose your subdomain</h2>
      <label htmlFor="subdomain" className="block text-sm font-medium text-slate-700">
        Subdomain
      </label>
      <input
        type="text"
        id="subdomain"
        name="subdomain"
        placeholder="yourstore"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.subdomain}
        onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
        required
      />
      <div className="flex justify-between pt-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={submitSubdomain}
        >
          {isLoading ? "Reserving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

const StepPersonalDetails = ({ formData, setFormData, nextStep, prevStep, isLoading, setIsLoading }) => {
  const submitPersonalDetails = async () => {
    if (isLoading) return;

    const onboarding_token = formData.onboarding_token || "";
    const name = (formData.name || "").trim();
    const phone = (formData.phone || "").trim();
    const address = (formData.address || "").trim();
    const password = formData.password || "";
    const passwordConfirmation = formData.passwordConfirmation || "";

    if (!name || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    if (!onboarding_token) {
      alert("Session expired. Please start over.");
      prevStep();
      return;
    }

    setIsLoading(true);
    try {
      // Split name into first and last name
      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName;

      const payload = {
        onboarding_token,
        first_name: firstName,
        last_name: lastName,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      };

      console.log("Setting personal details with payload:", payload);

      const response = await axios.post(
        "/api/business/onboarding/personal",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Personal details saved successfully!");
        nextStep();
      } else {
        alert("Failed to save personal details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving personal details:", error);
      const errorMessage = error?.response?.data?.message || "Failed to save personal details.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">Personal details</h2>
      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
        Full name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="John Doe"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <label htmlFor="phone" className="block pt-2 text-sm font-medium text-slate-700">
        Phone number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="123-456-7890"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <label htmlFor="address" className="block pt-2 text-sm font-medium text-slate-700">
        Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="123 Main St"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />
      <label htmlFor="password" className="block pt-2 text-sm font-medium text-slate-700">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <label htmlFor="passwordConfirmation" className="block pt-2 text-sm font-medium text-slate-700">
        Confirm password
      </label>
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        placeholder="Confirm password"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.passwordConfirmation}
        onChange={(e) => setFormData({ ...formData, passwordConfirmation: e.target.value })}
        required
      />
      <div className="flex justify-between pt-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={submitPersonalDetails}
        >
          {isLoading ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
};

const StepBusinessInfo = ({ formData, setFormData, prevStep, isLoading, setIsLoading, onRegistrationComplete }) => {
  const submitBusinessInfo = async () => {
    if (isLoading) return;

    const onboarding_token = formData.onboarding_token || "";
    const businessName = (formData.businessName || "").trim();
    const businessAddress = (formData.businessAddress || "").trim();
    const registrationNumber = (formData.businessRegistrationNumber || "").trim();

    if (!businessName || !businessAddress || !registrationNumber) {
      alert("Please fill in all business fields.");
      return;
    }

    if (!onboarding_token) {
      alert("Session expired. Please start over.");
      prevStep();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        onboarding_token,
        business_name: businessName,
        address: businessAddress,
        registration_number: registrationNumber,
      };

      console.log("Completing business registration with payload:", payload);

      const response = await axios.post(
        "/api/business/onboarding/complete",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Business registered successfully!");
        console.log("Registration response:", response.data);
        if (onRegistrationComplete) {
          onRegistrationComplete(response.data);
        }
      } else {
        alert("Registration completed but unexpected response received.");
      }
    } catch (error) {
      console.error("Error completing registration:", error);
      const errorMessage = error?.response?.data?.message || "Failed to complete registration.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">Business info</h2>
      <label
        htmlFor="businessName"
        className="block text-sm font-medium text-slate-700"
      >
        Business name
      </label>
      <input
        type="text"
        id="businessName"
        name="businessName"
        placeholder="Your Business Name"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.businessName}
        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
        required
      />
      <label
        htmlFor="businessRegistrationNumber"
        className="block pt-2 text-sm font-medium text-slate-700"
      >
        Business registration number
      </label>
      <input
        type="text"
        id="businessRegistrationNumber"
        name="businessRegistrationNumber"
        placeholder="REG-1001"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.businessRegistrationNumber}
        onChange={(e) => setFormData({ ...formData, businessRegistrationNumber: e.target.value })}
        required
      />
      <label
        htmlFor="businessAddress"
        className="block pt-2 text-sm font-medium text-slate-700"
      >
        Business Address
      </label>
      <input
        type="text"
        id="businessAddress"
        name="businessAddress"
        placeholder="123 Business St"
        className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
        value={formData.businessAddress}
        onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
        required
      />

      <div className="flex justify-between pt-2">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={submitBusinessInfo}
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { icon: <FaEnvelope />, label: "Email" },
    { icon: <FaKey />, label: "Verify" },
    { icon: <FaGlobe />, label: "Subdomain" },
    { icon: <FaUser />, label: "Personal" },
    { icon: <FaBuilding />, label: "Business" },
  ];

  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-xl text-white ${index + 1 <= currentStep ? "bg-emerald-600" : "bg-slate-300"
              }`}
          >
            {step.icon}
          </div>
          <span
            className={`mt-2 text-sm font-medium ${index + 1 <= currentStep ? "text-emerald-600" : "text-slate-500"
              }`}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    onboarding_token: "",
    subdomain: "",
    name: "",
    phone: "",
    address: "",
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessRegistrationNumber: "",
    businessEmail: "",
    password: "",
    passwordConfirmation: "",
    deviceName: "friend-laptop",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleRegistrationComplete = (data) => {
    console.log("Registration completed successfully!", data);
    // You can redirect or show success message here
    // window.location.href = data.redirect_url;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <StepIndicator currentStep={step} totalSteps={5} />
      {step === 1 && <StepEmail formData={formData} setFormData={setFormData} nextStep={nextStep} setOtpVerified={setOtpVerified} isLoading={isLoading} setIsLoading={setIsLoading} />}
      {step === 2 && <StepOTP formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} setOtpVerified={setOtpVerified} isLoading={isLoading} setIsLoading={setIsLoading} />}
      {step === 3 && <StepSubdomain formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} isLoading={isLoading} setIsLoading={setIsLoading} />}
      {step === 4 && <StepPersonalDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} isLoading={isLoading} setIsLoading={setIsLoading} />}
      {step === 5 && <StepBusinessInfo formData={formData} setFormData={setFormData} prevStep={prevStep} isLoading={isLoading} setIsLoading={setIsLoading} onRegistrationComplete={handleRegistrationComplete} />}
    </div>
  );
};

export default Register;
