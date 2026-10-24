import Image from "next/image";
import SEO from "../../components/SEO";
import { PageHeader } from "../../components/PageHeader";
import { useState, useMemo } from "react";
import { Reveal } from "../../components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { submitContact } from "../../lib/formsApi";

/* ---------- Simple char captcha ---------- */
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
const CAPTCHA_LENGTH = 5;
const generateCaptcha = (len = CAPTCHA_LENGTH): string =>
    Array.from(
        { length: len },
        () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
    ).join("");

/* ---------- Validators ---------- */
const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
};

const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address";
    return "";
};

/* Phone: optional, but if filled must be exactly 10 digits starting with 6/7/8/9 */
const validatePhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, ""); // strip everything except digits
    if (!cleaned) return ""; // optional
    if (!/^\d+$/.test(cleaned)) return "Only digits allowed";
    if (cleaned.length !== 10) return "Phone must be exactly 10 digits";
    if (!/^[6-9]/.test(cleaned)) return "Must start with 6, 7, 8, or 9";
    if (/^(\d)\1{9}$/.test(cleaned)) return "Invalid phone number"; // 9999999999
    if (/^(0123456789|1234567890|9876543210|5432109876)$/.test(cleaned))
        return "Invalid phone number";
    return "";
};

const validateMessage = (message: string): string => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 5) return "Please write a short message";
    return "";
};

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [honeypot, setHoneypot] = useState(""); // hidden anti-spam field
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

    /* --- Captcha state --- */
    const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaError, setCaptchaError] = useState("");
    const [captchaTouched, setCaptchaTouched] = useState(false);

    /* --- Live field errors (computed on every render) --- */
    const errors = useMemo(
        () => ({
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            message: validateMessage(formData.message),
        }),
        [formData]
    );

    /* --- Live check: are all fields valid? --- */
    const isDetailsComplete =
        !errors.name && !errors.email && !errors.phone && !errors.message;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;
        setStatus(null);

        // Mark all fields touched so any remaining errors show up
        setTouched({ name: true, email: true, phone: true, message: true });
        setCaptchaTouched(true);

        if (errors.name || errors.email || errors.phone || errors.message) {
            return setStatus({ type: "error", text: "Please fix the highlighted fields." });
        }

        // Captcha check
        if (!captchaInput.trim()) {
            setCaptchaError("Please enter the captcha");
            return setStatus({ type: "error", text: "Please complete the captcha." });
        }
        if (captchaInput.trim().toUpperCase() !== captchaText) {
            setCaptchaError("Captcha does not match");
            return setStatus({ type: "error", text: "Captcha does not match." });
        }

        setSending(true);
        try {
            const text = await submitContact({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.replace(/\D/g, ""), // send digits only
                message: formData.message.trim(),
                website: honeypot,
            });
            setStatus({ type: "success", text });
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTouched({});
            // Reset captcha after success
            setCaptchaInput("");
            setCaptchaText(generateCaptcha());
            setCaptchaError("");
            setCaptchaTouched(false);
        } catch (err: any) {
            setStatus({ type: "error", text: err.message });
        } finally {
            setSending(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Phone: keep digits only, max 10
        const finalValue =
            name === "phone"
                ? value.replace(/\D/g, "").slice(0, 10)
                : value;

        setFormData({ ...formData, [name]: finalValue });
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    // Actual contact details from the school
    const phoneNumbers = [
        "+91 9442592157",
    ];
    const landline = "+91 427 2912160";
    const email = "info@sonavalliappapublicschool.com";
    const address = "Junction Main Road, Salem – 636005";
    const whatsappNumber = "919442592156"; // using first mobile for WhatsApp

    // Map coordinates – Sona Valliappa Public School, Junction Main Road, Salem
    const latitude = 11.67608006271925;
    const longitude = 78.12427177116459;
    const mapQuery = encodeURIComponent("Sona Valliappa Public School, Junction Main Road, Salem 636005");
    const mapEmbedSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Sona Valliappa Public School, Junction Main Road, Salem – 636005, Tamil Nadu. Call, email or visit us for admissions and enquiries."
                path="/contact-us"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "School",
                    name: "Sona Valliappa Public School",
                    telephone: "+91 427 2912160",
                    email: "info@sonavalliappapublicschool.com",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "Junction Main Road",
                        addressLocality: "Salem",
                        postalCode: "636005",
                        addressRegion: "Tamil Nadu",
                        addressCountry: "IN",
                    },
                }}
            />

            <main className="bg-white">
                {/* HEADER */}
                <PageHeader
                    title="Contact Us"
                    subtitle="We’re here to help you. Reach out anytime."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Contact Us", href: "/contact-us" },
                    ]}
                />

                {/* MAIN SECTION – NO CARDS, FLAT DESIGN */}
                <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
                        {/* LEFT – FORM SECTION */}
                        <Reveal>
                            <div className="h-full">
                                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900">
                                    Let's Get In Touch
                                </h2>
                                <p className="text-gray-500 mt-2 mb-8 border-b border-gray-100 pb-4">
                                    Fill out the form and we'll get back to you shortly.
                                </p>

                                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                    {/* Honeypot – hidden from people, bots fill it */}
                                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                                    {/* NAME */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                        <div className={`flex items-center border-b py-2 transition ${touched.name && errors.name ? "border-red-400" : "border-gray-200 focus-within:border-primary"}`}>
                                            <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                                                type="text"
                                                placeholder="xxx xxx"
                                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm"
                                            />
                                        </div>
                                        {touched.name && errors.name && (
                                            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* EMAIL */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                        <div className={`flex items-center border-b py-2 transition ${touched.email && errors.email ? "border-red-400" : "border-gray-200 focus-within:border-primary"}`}>
                                            <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                                type="email"
                                                placeholder="xxxx@example.com"
                                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm"
                                            />
                                        </div>
                                        {touched.email && errors.email && (
                                            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* PHONE (optional) – digits only, 10 digits, starts 6-9 */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                                        <div className={`flex items-center border-b py-2 transition ${touched.phone && errors.phone ? "border-red-400" : "border-gray-200 focus-within:border-primary"}`}>
                                            <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                                                type="tel"
                                                inputMode="numeric"
                                                maxLength={10}
                                                placeholder="10-digit mobile number"
                                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm"
                                            />
                                        </div>
                                        {touched.phone && errors.phone && (
                                            <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* MESSAGE */}
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                                        <div className={`border-b py-2 transition ${touched.message && errors.message ? "border-red-400" : "border-gray-200 focus-within:border-primary"}`}>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                                                rows={4}
                                                placeholder="Write your message..."
                                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm resize-none"
                                            />
                                        </div>
                                        {touched.message && errors.message && (
                                            <p className="text-red-600 text-xs mt-1">{errors.message}</p>
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
                                                <div className="group pt-1">
                                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                                        Captcha
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-2 select-none">
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
                                                            className="px-3 py-2 text-gray-500 hover:text-primary border-b border-gray-200 transition"
                                                            title="Refresh captcha"
                                                            aria-label="Refresh captcha"
                                                        >
                                                            ↻
                                                        </button>
                                                    </div>
                                                    <div className={`flex items-center border-b py-2 transition mt-2 ${captchaTouched && captchaError ? "border-red-400" : "border-gray-200 focus-within:border-primary"}`}>
                                                        <input
                                                            type="text"
                                                            value={captchaInput}
                                                            onChange={handleCaptchaChange}
                                                            placeholder="Enter captcha"
                                                            maxLength={CAPTCHA_LENGTH}
                                                            autoComplete="off"
                                                            spellCheck={false}
                                                            className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm tracking-widest uppercase"
                                                        />
                                                    </div>
                                                    {captchaTouched && captchaError && (
                                                        <p className="text-red-600 text-xs mt-1">{captchaError}</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* BUTTON */}
                                    {status && (
                                        <p role="alert" className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                                            {status.text}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={sending || !isDetailsComplete}
                                        className="mt-4 bg-primary text-white px-8 py-2.5 hover:bg-primary/90 transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending ? "Sending..." : "Send Message →"}
                                    </button>
                                </form>

                                {/* CONTACT INFO */}
                                <div className="mt-16">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-1 border-b border-gray-100 inline-block">
                                        Contact Information
                                    </h3>

                                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-sm mt-6">
                                        {/* EMAIL */}
                                        <div className="flex gap-4 items-start">
                                            <EnvelopeIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">Email</p>
                                                <a href={`mailto:${email}`} className="text-gray-500 hover:text-primary transition">
                                                    {email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* PHONE – multiple numbers */}
                                        <div className="flex gap-4 items-start">
                                            <PhoneIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">Phone</p>
                                                <div className="text-gray-500 space-y-0.5">
                                                    {phoneNumbers.map((num, idx) => (
                                                        <a key={idx} href={`tel:${num.replace(/\s/g, "")}`} className="block hover:text-primary text-sm">
                                                            {num}
                                                        </a>
                                                    ))}
                                                    <a href={`tel:${landline.replace(/\s/g, "")}`} className="block hover:text-primary text-sm">
                                                        {landline} (Landline)
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* WHATSAPP */}
                                        <div className="flex gap-4 items-start">
                                            <FaWhatsapp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">WhatsApp</p>
                                                <a
                                                    href={`https://wa.me/${whatsappNumber}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-primary transition"
                                                >
                                                    Chat with us →
                                                </a>
                                            </div>
                                        </div>

                                        {/* LOCATION */}
                                        <div className="flex gap-4 items-start">
                                            <MapPinIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">Address</p>
                                                <p className="text-gray-500">
                                                    Sona Valliappa Public School<br />
                                                    {address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* RIGHT – MAP */}
                        <Reveal>
                            <div className="h-full">
                                <div className="h-full overflow-hidden rounded-tl-[80px] rounded-br-[20px] shadow-lg relative min-h-[400px] lg:min-h-full bg-gray-100">
                                    <iframe
                                        title="Sona Valliappa Public School location map"
                                        src={mapEmbedSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, position: "absolute", inset: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                                    <div className="flex items-start gap-2 text-gray-600">
                                        <MapPinIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span>Sona Valliappa Public School, {address}</span>
                                    </div>
                                    <a
                                        href={mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Get Directions →
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
        </>
    );
}