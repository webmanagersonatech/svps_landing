import SEO from "../../../components/SEO";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Country, State, City } from "country-state-city";
import Select, { SingleValue } from "react-select";
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL ANIMATION
========================= */
function useReveal() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

function Reveal({ children }: { children: React.ReactNode }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
        >
            {children}
        </div>
    );
}

/* =========================
   FORM TYPES + CONSTANTS
========================= */
interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    programId: string;
}

interface SelectOption {
    value: string;
    label: string;
}

const INSTITUTE_ID = "INS-3-ZXYXKM";
const DEFAULT_COUNTRY_CODE = "IN";
const DEFAULT_STATE_CODE = "TN";

const CLASS_OPTIONS: SelectOption[] = [
    { value: "PREKG00001", label: "Pre-KG" },
    { value: "LKG0000002", label: "LKG" },
    { value: "UKG0000003", label: "UKG" },
    { value: "STD0000001", label: "I - Std" },
    { value: "STD0000002", label: "II - Std" },
    { value: "STD0000003", label: "III - Std" },
    { value: "STD0000004", label: "IV - Std" },
    { value: "STD0000005", label: "V - Std" },
    { value: "STD0000006", label: "VI - Std" },
    { value: "STD0000007", label: "VII - Std" },
    { value: "STD0000008", label: "VIII - Std" },
    { value: "STD0000009", label: "IX - Std" },
];

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
    country: DEFAULT_COUNTRY_CODE,
    state: DEFAULT_STATE_CODE,
    city: "",
    programId: "",
};

/* =========================
   SIMPLE CHAR CAPTCHA
========================= */
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const CAPTCHA_LENGTH = 5;
const generateCaptcha = (len = CAPTCHA_LENGTH): string =>
    Array.from(
        { length: len },
        () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
    ).join("");

/* =========================
   REACT-SELECT UNDERLINE STYLES
========================= */
const underlineSelectStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "1px solid #d1d5db",
        borderRadius: 0,
        minHeight: "38px",
        boxShadow: "none",
        paddingLeft: 4,
        paddingRight: 0,
        transition: "border-color 0.2s",
        "&:hover": { borderBottomColor: "#9ca3af" },
    }),
    valueContainer: (base: any) => ({ ...base, padding: "0 4px" }),
    singleValue: (base: any) => ({
        ...base,
        color: "#1f2937",
        fontSize: "0.875rem",
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "#9ca3af",
        fontSize: "0.875rem",
    }),
    input: (base: any) => ({ ...base, color: "#1f2937", fontSize: "0.875rem" }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        overflow: "hidden",
        zIndex: 50,
    }),
    menuList: (base: any) => ({ ...base, maxHeight: 220 }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused
            ? "rgba(59,130,246,0.1)"
            : state.isSelected
                ? "rgba(59,130,246,0.2)"
                : "transparent",
        color: "#1f2937",
        fontSize: "0.875rem",
        cursor: "pointer",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: "#9ca3af",
        padding: 4,
        "&:hover": { color: "#4b5563" },
    }),
    noOptionsMessage: (base: any) => ({
        ...base,
        color: "#9ca3af",
        fontSize: "0.8rem",
    }),
};

/* =========================
   VALIDATORS
========================= */
const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (!/^[A-Za-z\s.'-]+$/.test(name.trim()))
        return "Only letters and spaces allowed";
    if (name.trim().length < 3) return "Name must be at least 3 characters";
    if (name.trim().length > 60) return "Name is too long";
    return "";
};

const validatePhone = (phone: string): string => {
    const cleaned = phone.replace(/[\s+()-]/g, "");
    if (!cleaned) return "Phone number is required";
    if (!/^\d+$/.test(cleaned)) return "Only digits allowed";
    if (cleaned.length !== 10) return "Phone must be exactly 10 digits";
    if (!/^[6-9]/.test(cleaned)) return "Must start with 6, 7, 8, or 9";
    if (/^(\d)\1{9}$/.test(cleaned)) return "Invalid phone number";
    if (cleaned === "1234567890" || cleaned === "0123456789")
        return "Invalid phone number";
    return "";
};

const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
        return "Enter a valid email address";
    return "";
};

/* =========================
   MAIN PAGE
========================= */
export default function AdmissionContactPage() {
    const phoneNumbers = [
        "+91 9442592156",
        "+91 9442592157",
        "+91 9442592158",
        "+91 9442592159",
        "+91 9442592160",
    ];
    const landline = "+91 427 2912160";
    const email = "info@sonavalliappapublicschool.com";
    const addressLines = [
        "The Principal,",
        "Sona Valliappa Public School,",
        "Junction Main Road,",
        "Salem – 636005.",
    ];

    /* ---- Form state ---- */
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    /* ---- Captcha state ---- */
    const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaError, setCaptchaError] = useState("");
    const [captchaTouched, setCaptchaTouched] = useState(false);

    /* ---- Consent state ---- */
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    /* ---- Location data ---- */
    const countries = useMemo(() => Country.getAllCountries(), []);
    const states = useMemo(
        () => State.getStatesOfCountry(formData.country),
        [formData.country]
    );
    const cities = useMemo(
        () => City.getCitiesOfState(formData.country, formData.state),
        [formData.country, formData.state]
    );

    const countryOptions: SelectOption[] = useMemo(
        () =>
            countries.map((c) => ({
                value: c.isoCode,
                label: `${c.flag} ${c.name}`,
            })),
        [countries]
    );

    const stateOptions: SelectOption[] = useMemo(
        () => states.map((s) => ({ value: s.isoCode, label: s.name })),
        [states]
    );

    const cityOptions: SelectOption[] = useMemo(
        () => cities.map((ct) => ({ value: ct.name, label: ct.name })),
        [cities]
    );

    /* ---- Live field errors ---- */
    const liveErrors = useMemo(
        () => ({
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            country: formData.country ? "" : "Country is required",
            state: formData.state ? "" : "State is required",
            city: formData.city ? "" : "City is required",
            programId: formData.programId ? "" : "Please select a class",
        }),
        [formData]
    );

    const isDetailsComplete = useMemo(
        () =>
            !liveErrors.name &&
            !liveErrors.email &&
            !liveErrors.phone &&
            !liveErrors.country &&
            !liveErrors.state &&
            !liveErrors.city &&
            !liveErrors.programId,
        [liveErrors]
    );

    const isCaptchaValid = useMemo(
        () =>
            captchaInput.trim().length > 0 &&
            captchaInput.trim().toUpperCase() === captchaText,
        [captchaInput, captchaText]
    );

    /* ---- Handlers ---- */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const sanitizedValue =
            name === "name" ? value.replace(/[^A-Za-z\s.'-]/g, "") : value;
        const finalValue =
            name === "phone"
                ? sanitizedValue.replace(/\D/g, "").slice(0, 10)
                : sanitizedValue;

        setFormData((prev) => ({ ...prev, [name]: finalValue }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        let err = "";
        if (name === "name") err = validateName(finalValue);
        if (name === "email") err = validateEmail(finalValue);
        if (name === "phone") err = validatePhone(finalValue);
        if (name === "programId") err = finalValue ? "" : "Please select a class";

        setErrors((prev) => ({ ...prev, [name]: err, submit: "" }));
    };

    const handleCountryChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({
            ...prev,
            country: opt?.value || "",
            state: "",
            city: "",
        }));
        setErrors((prev) => ({
            ...prev,
            country: opt?.value ? "" : "Country is required",
            state: "",
            city: "",
        }));
        setTouched((prev) => ({ ...prev, country: true }));
    };

    const handleStateChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({ ...prev, state: opt?.value || "", city: "" }));
        setErrors((prev) => ({
            ...prev,
            state: opt?.value ? "" : "State is required",
            city: "",
        }));
        setTouched((prev) => ({ ...prev, state: true }));
    };

    const handleCityChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({ ...prev, city: opt?.value || "" }));
        setErrors((prev) => ({
            ...prev,
            city: opt?.value ? "" : "City is required",
        }));
        setTouched((prev) => ({ ...prev, city: true }));
    };

    const refreshCaptcha = () => {
        setCaptchaText(generateCaptcha());
        setCaptchaInput("");
        setCaptchaError("");
        setCaptchaTouched(false);
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setCaptchaInput(value);
        setCaptchaTouched(true);
        if (!value.trim()) {
            setCaptchaError("Please enter the captcha");
        } else if (value.trim() !== captchaText) {
            setCaptchaError("Captcha does not match");
        } else {
            setCaptchaError("");
        }
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreedToTerms(e.target.checked);
        setErrors((prev) => ({
            ...prev,
            consent: e.target.checked
                ? ""
                : "Please agree to the Terms & Privacy Policy to continue",
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        const phoneError = validatePhone(formData.phone);
        if (phoneError) newErrors.phone = phoneError;
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.programId) newErrors.programId = "Please select a class";

        if (!captchaInput.trim()) {
            newErrors.captcha = "Please enter the captcha";
            setCaptchaError("Please enter the captcha");
        } else if (captchaInput.trim().toUpperCase() !== captchaText) {
            newErrors.captcha = "Captcha does not match";
            setCaptchaError("Captcha does not match");
        }

        if (!agreedToTerms) {
            newErrors.consent =
                "Please agree to the Terms & Privacy Policy to continue";
        }

        setErrors(newErrors);
        setTouched({
            name: true,
            email: true,
            phone: true,
            country: true,
            state: true,
            city: true,
            programId: true,
        });
        setCaptchaTouched(true);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors((prev) => ({ ...prev, submit: "" }));

        const countryName =
            countries.find((c) => c.isoCode === formData.country)?.name || "";
        const stateName =
            states.find((s) => s.isoCode === formData.state)?.name || "";

        const payload = {
            instituteId: INSTITUTE_ID,
            programId: formData.programId,
            candidateName: formData.name.trim(),
            phoneNumber: formData.phone.trim(),
            email: formData.email.trim(),
            country: countryName,
            state: stateName,
            city: formData.city,
            status: "New",
            communication: "Online",
            followUpDate: new Date().toISOString().split("T")[0],
            description: "This lead enquiry has come from online",
            leadSource: "online",
        };

        try {
            const response = await fetch(
                "https://hikabackend.sonastar.com/api/leads/enquiry",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData(initialFormData);
                    setCaptchaInput("");
                    setCaptchaText(generateCaptcha());
                    setCaptchaError("");
                    setCaptchaTouched(false);
                    setAgreedToTerms(false);
                    setTouched({});
                    setErrors({});
                }, 3000);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    submit:
                        responseData?.message ||
                        "Something went wrong. Please try again.",
                }));
            }
        } catch {
            setErrors((prev) => ({
                ...prev,
                submit: "Network error. Please try again.",
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ---- Select current values ---- */
    const currentCountryOption = countryOptions.find(
        (o) => o.value === formData.country
    );
    const currentStateOption = stateOptions.find(
        (o) => o.value === formData.state
    );
    const currentCityOption = cityOptions.find(
        (o) => o.value === formData.city
    );

    return (
        <>
            <SEO
                title="Admission Contact"
                description="Contact the admission office of Sona Valliappa Public School, Salem for enquiries, campus visits and application support."
                path="/admission/admission-contact"
            />

            <main className="bg-white">
                <PageHeader
                    title="Admission Contact"
                    subtitle="We are here to help you with admissions and inquiries."
                    breadcrumbs={["Home", "Admissions", "Contact"]}
                />

                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* LEFT COLUMN */}
                        <Reveal>
                            <div className="space-y-8">
                                {/* Address */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <MapPinIcon className="w-5 h-5 text-primary" />
                                        <h3 className=" font-semibold text-gray-900">
                                            Visit Us
                                        </h3>
                                    </div>
                                    <div className="pl-8 border-l-2 border-primary/20 text-gray-700 leading-relaxed">
                                        {addressLines.map((line, idx) => (
                                            <p
                                                key={idx}
                                                className={idx === 0 ? "font-medium" : ""}
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <PhoneIcon className="w-5 h-5 text-primary" />
                                        <h3 className=" font-semibold text-gray-900">
                                            Call Us
                                        </h3>
                                    </div>
                                    <div className="pl-8 space-y-2 border-l-2 border-primary/20">
                                        <div>
                                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                                                Mobile
                                            </p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                {phoneNumbers.map((num, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={`tel:${num.replace(/\s/g, "")}`}
                                                        className="text-gray-800 hover:text-primary transition block text-sm"
                                                    >
                                                        {num}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                                                Landline
                                            </p>
                                            <a
                                                href={`tel:${landline.replace(/\s/g, "")}`}
                                                className="text-gray-800 hover:text-primary transition text-sm"
                                            >
                                                {landline}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <EnvelopeIcon className="w-5 h-5 text-primary" />
                                        <h3 className=" font-semibold text-gray-900">
                                            Email Us
                                        </h3>
                                    </div>
                                    <div className="pl-8 border-l-2 border-primary/20">
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-gray-800 hover:text-primary transition text-sm break-all"
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                {/* Office Hours */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <ClockIcon className="w-5 h-5 text-primary" />
                                        <h3 className=" font-semibold text-gray-900">
                                            Office Hours
                                        </h3>
                                    </div>
                                    <div className="pl-8 border-l-2 border-primary/20 text-gray-700 text-sm">
                                        <p>Monday – Saturday: 9:00 AM – 4:00 PM</p>
                                        <p className="text-gray-500 mt-1">
                                            Sunday & Public Holidays: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* RIGHT COLUMN – FORM WITH LOCATION */}
                        <Reveal>
                            <div className="bg-gray-50/80 p-6 md:p-8 border border-gray-100">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
                                    Admissions Enquiry
                                </h2>
                                <p className="text-gray-500 text-sm mb-6 pb-1 border-b border-gray-200 inline-block">
                                    Fill the form – we&apos;ll get back to you shortly
                                </p>

                                <AnimatePresence>
                                    {isSubmitted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="mb-4 p-3 bg-green-50 border border-green-200 rounded flex items-center gap-2 text-green-700 text-sm"
                                        >
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            <span>
                                                Thank you! Our team will contact you soon.
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {errors.submit && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
                                        >
                                            {errors.submit}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    {/* Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                                            placeholder="Full Name *"
                                            autoComplete="name"
                                            className={`w-full border-b bg-transparent py-2 px-1 focus:outline-none transition text-gray-800 placeholder:text-gray-400 ${
                                                touched.name && errors.name
                                                    ? "border-red-400"
                                                    : "border-gray-300 focus:border-primary"
                                            }`}
                                        />
                                        {touched.name && errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                                            placeholder="Phone Number *"
                                            inputMode="numeric"
                                            maxLength={10}
                                            autoComplete="tel"
                                            className={`w-full border-b bg-transparent py-2 px-1 focus:outline-none transition text-gray-800 placeholder:text-gray-400 ${
                                                touched.phone && errors.phone
                                                    ? "border-red-400"
                                                    : "border-gray-300 focus:border-primary"
                                            }`}
                                        />
                                        {touched.phone && errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                            placeholder="Email Address"
                                            autoComplete="email"
                                            className={`w-full border-b bg-transparent py-2 px-1 focus:outline-none transition text-gray-800 placeholder:text-gray-400 ${
                                                touched.email && errors.email
                                                    ? "border-red-400"
                                                    : "border-gray-300 focus:border-primary"
                                            }`}
                                        />
                                        {touched.email && errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Class */}
                                    <div>
                                        <select
                                            name="programId"
                                            value={formData.programId}
                                            onChange={handleInputChange}
                                            onBlur={() => setTouched((prev) => ({ ...prev, programId: true }))}
                                            className={`w-full border-b bg-transparent py-2 px-1 focus:outline-none transition text-gray-800 ${
                                                touched.programId && errors.programId
                                                    ? "border-red-400"
                                                    : "border-gray-300 focus:border-primary"
                                            }`}
                                        >
                                            <option value="">Select Grade / Class *</option>
                                            {CLASS_OPTIONS.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        {touched.programId && errors.programId && (
                                            <p className="text-red-500 text-xs mt-1">{errors.programId}</p>
                                        )}
                                    </div>

                                    {/* Country + State */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Select<SelectOption>
                                                options={countryOptions}
                                                value={currentCountryOption || null}
                                                onChange={handleCountryChange}
                                                placeholder="Country *"
                                                isSearchable
                                                styles={underlineSelectStyles}
                                                classNamePrefix="country-select"
                                            />
                                            {touched.country && errors.country && (
                                                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Select<SelectOption>
                                                options={stateOptions}
                                                value={currentStateOption || null}
                                                onChange={handleStateChange}
                                                placeholder="State *"
                                                isSearchable
                                                isDisabled={!formData.country}
                                                styles={underlineSelectStyles}
                                                classNamePrefix="state-select"
                                            />
                                            {touched.state && errors.state && (
                                                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div>
                                        <Select<SelectOption>
                                            options={cityOptions}
                                            value={currentCityOption || null}
                                            onChange={handleCityChange}
                                            placeholder="City *"
                                            isSearchable
                                            isDisabled={!formData.state}
                                            styles={underlineSelectStyles}
                                            classNamePrefix="city-select"
                                        />
                                        {touched.city && errors.city && (
                                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                    {/* CAPTCHA – appears only when all details are valid */}
                                    <AnimatePresence>
                                        {isDetailsComplete && (
                                            <motion.div
                                                key="captcha-section"
                                                initial={{ opacity: 0, height: 0, y: -8 }}
                                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -8 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-1">
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                                        Captcha *
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 flex items-center justify-center border-b border-gray-300 py-2 select-none">
                                                            <span
                                                                className="text-gray-800 text-lg font-bold tracking-[0.35em] italic"
                                                                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.15)" }}
                                                            >
                                                                {captchaText}
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={refreshCaptcha}
                                                            className="px-3 py-2 text-gray-500 hover:text-primary border-b border-gray-300 transition"
                                                            title="Refresh captcha"
                                                            aria-label="Refresh captcha"
                                                        >
                                                            ↻
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={captchaInput}
                                                        onChange={handleCaptchaChange}
                                                        placeholder="Enter captcha"
                                                        maxLength={CAPTCHA_LENGTH}
                                                        autoComplete="off"
                                                        spellCheck={false}
                                                        className={`w-full border-b bg-transparent py-2 px-1 focus:outline-none transition text-gray-800 placeholder:text-gray-400 mt-2 tracking-widest uppercase ${
                                                            captchaTouched && captchaError
                                                                ? "border-red-400"
                                                                : "border-gray-300 focus:border-primary"
                                                        }`}
                                                    />
                                                    {captchaTouched && captchaError && (
                                                        <p className="text-red-500 text-xs mt-1">{captchaError}</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* CONSENT CHECKBOX – appears only after captcha is valid */}
                                    <AnimatePresence>
                                        {isDetailsComplete && isCaptchaValid && (
                                            <motion.div
                                                key="consent-section"
                                                initial={{ opacity: 0, height: 0, y: -8 }}
                                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                                exit={{ opacity: 0, height: 0, y: -8 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-1">
                                                    <label
                                                        htmlFor="agree-terms"
                                                        className={`flex items-start gap-2 cursor-pointer select-none rounded p-2 -mx-2 transition-colors ${
                                                            errors.consent
                                                                ? "bg-red-50 border border-red-200"
                                                                : "hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <input
                                                            id="agree-terms"
                                                            type="checkbox"
                                                            checked={agreedToTerms}
                                                            onChange={handleConsentChange}
                                                            className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
                                                        />
                                                        <span className="text-gray-500 text-xs leading-relaxed">
                                                            I agree to the{" "}
                                                            <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">
                                                                Terms
                                                            </span>{" "}
                                                            &{" "}
                                                            <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">
                                                                Privacy Policy
                                                            </span>{" "}
                                                            and consent to being contacted regarding my enquiry.{" "}
                                                            <span className="text-red-400">*</span>
                                                        </span>
                                                    </label>
                                                    {errors.consent && (
                                                        <p className="text-red-500 text-xs mt-1 ml-1">
                                                            {errors.consent}
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !isDetailsComplete || !isCaptchaValid}
                                        className="mt-4 bg-primary text-white px-6 py-2.5 w-full hover:bg-primary/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Enquiry →"}
                                    </button>
                                </form>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal>
                        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                            <p>
                                For urgent admission assistance, please call our admission
                                helpline during office hours.
                            </p>
                            <p className="mt-1">
                                You can also visit the school campus from 10 AM – 3 PM on
                                weekdays.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </main>
        </>
    );
}