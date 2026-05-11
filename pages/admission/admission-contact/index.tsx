import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import { NewsOrEvent } from "../../../data/newsandevents";
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
    BuildingOfficeIcon,
    UserIcon,
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
   MAIN PAGE – NO CARDS, MODERN SIMPLE
========================= */
export default function AdmissionContactPage() {
    // Phone numbers array for easy mapping
    const phoneNumbers = [
        "+91 9442592156",
        "+91 9442592157",
        "+91 9442592158",
        "+91 9442592159",
        "+91 9442592160",
    ];
    const landline = "+91 427 2912160";
    const email = "svpschool@sonatech.ac.in";
    const addressLines = [
        "The Principal,",
        "Sona Valliappa Public School,",
        "Junction Main Road,",
        "Salem – 636005.",
    ];

    return (
        <>
            <Head>
                <title>Admission Contact | Sona Valliappa Public School</title>
                <meta name="description" content="Contact our admission office for inquiries and support" />
            </Head>

            <main className="bg-white">

                {/* HEADER */}
                <PageHeader
                    title="Admission Contact"
                    subtitle="We are here to help you with admissions and inquiries."
                    breadcrumbs={["Home", "Admissions", "Contact"]}
                />

                {/* ========== CONTACT INFO – FLAT, MINIMAL ========== */}
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
                    {/* Two column layout: Left (contact details) + Right (form) */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

                        {/* LEFT COLUMN – CONTACT DETAILS */}
                        <Reveal>
                            <div className="space-y-8">
                                {/* Address block */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <MapPinIcon className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                                    </div>
                                    <div className="pl-8 border-l-2 border-primary/20 text-gray-700 leading-relaxed">
                                        {addressLines.map((line, idx) => (
                                            <p key={idx} className={idx === 0 ? "font-medium" : ""}>
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Phone numbers */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <PhoneIcon className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                    </div>
                                    <div className="pl-8 space-y-2 border-l-2 border-primary/20">
                                        <div>
                                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Mobile</p>
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
                                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Landline</p>
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
                                        <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
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

                                {/* Office Hours – simple addition */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <ClockIcon className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                                    </div>
                                    <div className="pl-8 border-l-2 border-primary/20 text-gray-700 text-sm">
                                        <p>Monday – Saturday: 9:00 AM – 4:00 PM</p>
                                        <p className="text-gray-500 mt-1">Sunday & Public Holidays: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* RIGHT COLUMN – ENQUIRY FORM (NO CARD) */}
                        <Reveal>
                            <div className="bg-gray-50/80 p-6 md:p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-2">Admission Enquiry</h2>
                                <p className="text-gray-500 text-sm mb-6 pb-1 border-b border-gray-200 inline-block">
                                    Fill the form – we'll get back to you shortly
                                </p>

                                <form className="space-y-5">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-primary transition text-gray-800 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-primary transition text-gray-800 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-primary transition text-gray-800 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <select className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-primary transition text-gray-800">
                                            <option>Select Grade / Class</option>
                                            <option>Pre-KG</option>
                                            <option>LKG</option>
                                            <option>UKG</option>
                                            <option>I - Std</option>
                                            <option>II - Std</option>
                                            <option>III - Std</option>
                                            <option>IV - Std</option>
                                            <option>V - Std</option>
                                            <option>VI - Std</option>
                                            <option>VII - Std</option>
                                            <option>VIII - Std</option>
                                        </select>
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Your message / query"
                                            rows={4}
                                            className="w-full border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-primary transition text-gray-800 placeholder:text-gray-400 resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-4 bg-primary text-white px-6 py-2.5 w-full md:w-auto hover:bg-primary/90 transition-all font-medium"
                                    >
                                        Submit Inquiry →
                                    </button>
                                </form>
                            </div>
                        </Reveal>
                    </div>

                    {/* Optional: Additional note or map – kept minimal, no card */}
                    <Reveal>
                        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                            <p>For urgent admission assistance, please call our admission helpline during office hours.</p>
                            <p className="mt-1">You can also visit the school campus from 10 AM – 3 PM on weekdays.</p>
                        </div>
                    </Reveal>
                </div>

            </main>
        </>
    );
}