import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaKey, FaGlobe, FaUser, FaBuilding } from "react-icons/fa";

const StepEmail = ({ formData, setFormData, nextStep, setOtpVerified }) => {
  const sendOTP = async () => {
    const email = (formData.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/auth/email-otp/send",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 200) {
        alert("OTP sent successfully!");
        nextStep();
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending the OTP. Please try again.");
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
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        onClick={sendOTP}
      >
        Send Verification Code
      </button>
    </div>
  );
};

const StepOTP = ({ formData, setFormData, nextStep, prevStep, setOtpVerified }) => {
  const verifyOTP = async () => {
    const email = (formData.email || "").trim();
    const otp = (formData.otp || "").trim();
    if (otp.length !== 6) {
      alert("Please enter the 6-digit code.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/auth/email-otp/verify",
        { email, otp },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 200) {
        setOtpVerified(true);
        alert("OTP verified successfully!");
        nextStep();
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying the OTP. Please try again.");
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
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={verifyOTP}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

const StepSubdomain = ({ formData, setFormData, nextStep, prevStep }) => (
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
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  </div>
);

const StepPersonalDetails = ({ formData, setFormData, nextStep, prevStep }) => (
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
    <label htmlFor="phone" className="block pt-2 text-sm font-medium text-slate-700">
      Address
    </label>
    <input
      type="tel"
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
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  </div>
);

const StepBusinessInfo = ({ formData, setFormData, prevStep }) => (
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
      htmlFor="businessType"
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
    <label
      htmlFor="businessType"
      className="block pt-2 text-sm font-medium text-slate-700"
    >
      Business Phone Number
    </label>
    <input
      type="tel"
      id="businessPhone"
      name="businessPhone"
      placeholder="e.g., (123) 456-7890"
      className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
      value={formData.businessPhone}
      onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
      required
    />
    <label
      htmlFor="businessEmail"
      className="block pt-2 text-sm font-medium text-slate-700"
    >
      Business email
    </label>
    <input
      type="email"
      id="businessEmail"
      name="businessEmail"
      placeholder="shop@example.com"
      className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
      value={formData.businessEmail}
      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
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
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Submit
      </button>
    </div>
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { icon: <FaEnvelope />},
    { icon: <FaKey />},
    { icon: <FaGlobe /> },
    { icon: <FaUser /> },
    { icon: <FaBuilding /> },
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
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify your OTP before registering.");
      setStep(2);
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      alert("Password and confirmation do not match.");
      return;
    }

    try {
      const registerPayload = {
        full_name: formData.name,
        email: formData.email,
        address: formData.address,
        phone_no: formData.phone,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        device_name: formData.deviceName || "friend-laptop",
      };

      const registerResponse = await axios.post('/api/auth/register', registerPayload);

      const token =
        registerResponse?.data?.data?.token ||
        registerResponse?.data?.token ||
        registerResponse?.data?.access_token;

      const businessPayload = {
        business_name: formData.businessName,
        desired_url_name: formData.subdomain,
        business_location: formData.businessAddress,
        business_registration_number: formData.businessRegistrationNumber,
        business_email: formData.businessEmail,
        business_phone: formData.businessPhone,
      };

      const businessHeaders = token
        ? { Authorization: `Bearer ${token}` }
        : undefined;

      await axios.post('/api/businesses', businessPayload, {
        headers: businessHeaders,
      });

      if (registerResponse.status === 200 || registerResponse.status === 201) {
        alert('Account and business created successfully!');
      } else {
        alert('Registration completed, but unexpected response received.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'An error occurred during registration. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <StepIndicator currentStep={step} totalSteps={5} />
      {step === 1 && <StepEmail formData={formData} setFormData={setFormData} nextStep={nextStep} setOtpVerified={setOtpVerified} />}
      {step === 2 && <StepOTP formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} setOtpVerified={setOtpVerified} />}
      {step === 3 && <StepSubdomain formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <StepPersonalDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <StepBusinessInfo formData={formData} setFormData={setFormData} prevStep={prevStep} />}
    </form>
  );
};

export default Register;
