import Head from "next/head";
import { PageHeader } from "../../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
    DocumentTextIcon,
    ClipboardDocumentCheckIcon,
    UserPlusIcon,
    AcademicCapIcon,
    PhoneIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/outline";

/* =========================
   REVEAL (same as yours)
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
   MAIN PAGE
========================= */
export default function AdmissionProcedurePage() {
    const steps = [
        {
            icon: DocumentTextIcon,
            title: "Application Form",
            desc: "Collect or fill the admission form online with accurate details.",
        },
        {
            icon: ClipboardDocumentCheckIcon,
            title: "Submission of Documents",
            desc: "Submit required academic records, ID proof, and certificates.",
        },
        {
            icon: AcademicCapIcon,
            title: "Entrance Assessment",
            desc: "Students may undergo a basic assessment or interaction session.",
        },
        {
            icon: UserPlusIcon,
            title: "Interaction Session",
            desc: "Parent-student interaction with the admission committee.",
        },
        {
            icon: CheckBadgeIcon,
            title: "Admission Confirmation",
            desc: "Selected students receive confirmation and fee details.",
        },
        {
            icon: PhoneIcon,
            title: "Final Enrollment",
            desc: "Complete fee payment and finalize enrollment process.",
        },
    ];

    return (
        <>
            <Head>
                <title>Admission Procedure | School</title>
            </Head>

            <main className="bg-gradient-to-b from-slate-50 to-white">

                {/* HEADER */}
                <PageHeader
                    title="Admission Procedure"
                    subtitle="Simple, transparent and student-friendly admission process."
                    breadcrumbs={["Home", "Admissions", "Procedure"]}
                />

                {/* INTRO SECTION */}
                <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">



                    <Reveal>
                        <div className="relative">

                            {/* BACK DESIGN */}
                            <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl  rounded-tl-[80px] rounded-br-[20px]" />
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-2xl" />

                            {/* IMAGE CARD */}
                            <div className="relative  overflow-hidden shadow-xl group  rounded-tl-[80px] rounded-br-[20px]">

                                <img
                                    src="https://img.magnific.com/premium-psd/happy-young-college-student-smiling-looking-into-camera-isolated-background_920413-1568.jpg?ga=GA1.1.1847424523.1777460742&semt=ais_hybrid&w=740&q=80"
                                    alt="Admission"
                                    className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105 "
                                />

                                {/* DARK OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                                {/* ========== ADDED SHAPES FOR ADMISSION DESIGN ========== */}

                                {/* Large circular blur shape - bottom left */}
                                <div className="absolute w-72 h-72 rounded-full bg-yellow-400/10 -bottom-20 -left-20 blur-2xl z-0" />

                                {/* Outline ring shape - top right */}
                                <div className="absolute w-56 h-56 rounded-full border-2 border-yellow-400/30 top-16 -right-20 z-0" />

                                {/* Small solid circle accent */}
                                <div className="absolute w-12 h-12 rounded-full bg-yellow-400/40 bottom-24 right-12 z-0" />

                                {/* Rotated diamond shape */}
                                <div className="absolute w-28 h-28 rotate-45 bg-white/5 border border-white/20 top-1/3 left-8 z-0" />

                                {/* Abstract wave/line shape */}
                                <div className="absolute w-64 h-32 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full -bottom-8 -left-16 blur-xl z-0" />

                                {/* Multiple floating dots */}
                                <div className="absolute w-2 h-2 rounded-full bg-yellow-400 top-32 right-28 z-0" />
                                <div className="absolute w-3 h-3 rounded-full bg-yellow-300/60 bottom-32 left-20 z-0" />
                                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/50 top-48 right-16 z-0" />
                                <div className="absolute w-4 h-4 rounded-full bg-yellow-400/20 bottom-44 right-40 z-0" />

                                {/* Plus shape (cross) */}
                                <div className="absolute top-24 left-12 text-yellow-400/30 text-4xl font-thin z-0">+</div>
                                <div className="absolute bottom-20 right-20 text-yellow-400/20 text-3xl font-thin z-0">+</div>

                                {/* TOP BADGE - enhanced with shape bg */}
                                <div className="absolute top-5 left-8 flex items-center gap-2 bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm border border-yellow-400/40 shadow-lg z-10">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                    2026 Admission Open
                                </div>

                                {/* MAIN TEXT CONTENT */}
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white max-w-md z-10">

                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                        Your Kids Deserve The <span className="text-yellow-400 relative inline-block">
                                            Best Education
                                            {/* Underline shape */}
                                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400/50 rounded-full"></span>
                                        </span>
                                    </h2>

                                    <p className="mt-3 text-white/80 text-sm md:text-base">
                                        Now Open For Registration. Start your journey with modern learning,
                                        smart classrooms, and expert teaching.
                                    </p>

                                    {/* BUTTON with shape accent */}
                                    <div className="relative inline-block mt-5">
                                        <div className="absolute inset-0 bg-yellow-400/20 blur-md rounded-lg -z-10"></div>
                                        <a
                                            href="https://hikabackend.sonastar.com/api/institutions/enquiry/INS-3-ZXYXKM"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-yellow-400 text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg inline-block"
                                        >
                                            ENROL NOW →
                                        </a>
                                    </div>

                                </div>

                                {/* FEATURES - redesigned with shape badges */}
                                <div className="absolute bottom-5 left-6 text-white text-sm space-y-2 z-10">
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">
                                        <span className="w-5 h-5 rounded-full bg-yellow-400/30 flex items-center justify-center text-xs">✓</span>
                                        Best Teaching
                                    </div>
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">
                                        <span className="w-5 h-5 rounded-full bg-yellow-400/30 flex items-center justify-center text-xs">✓</span>
                                        Smart Class Size
                                    </div>
                                    <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">
                                        <span className="w-5 h-5 rounded-full bg-yellow-400/30 flex items-center justify-center text-xs">✓</span>
                                        Advanced Programs
                                    </div>
                                </div>

                                {/* Corner geometric accent */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-400/10 to-transparent rounded-tl-3xl z-0"></div>

                            </div>
                        </div>
                    </Reveal>

                    {/* CONTENT */}
                    <Reveal>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary font-serif mb-4">
                                Easy & Transparent Admission
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-5">
                                Our admission process is designed to be simple and smooth for all parents and students.
                                We ensure clarity at every step with proper guidance from our admission team.
                            </p>

                            <div className="space-y-3 mb-5 text-gray-700">
                                <p>• Fill the application form with required details</p>
                                <p>• Submit necessary academic documents</p>
                                <p>• Attend interaction / assessment session</p>
                                <p>• Receive admission confirmation</p>
                                <p>• Complete fee payment and enrollment</p>
                            </div>

                            <p className="text-gray-600">
                                We are committed to providing a stress-free admission experience for every family.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* ADMISSION INFO SECTION - MODERN SIMPLIFIED DESIGN */}
                <div className="max-w-7xl mx-auto px-4 pb-20">
                    {/* Section header with academic year badge - cleaner & minimal */}
                    <div className="text-center mb-8">
                        <span className="inline-block bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4 tracking-wide">
                            Admissions 2026-2027
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                            Begin Your Child's Journey With Us
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
                            Sona Valliappa Public School is currently offering Admissions from <strong className="text-gray-800">Pre-KG to Grade VIII</strong> subject to eligibility and availability of seats.
                        </p>
                    </div>

                    {/* Age Criteria - Minimal Chip Design */}
                    <Reveal>
                        <div className="bg-white  p-6 md:p-8 shadow-sm border border-gray-100 mb-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                                Age Criteria <span className="font-normal text-gray-500">(as on June 1st, 2025)</span>
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    { grade: "Pre-KG", age: "3+" },
                                    { grade: "LKG", age: "4+" },
                                    { grade: "UKG", age: "5+" },
                                    { grade: "I - Std", age: "6+" },
                                    { grade: "II - Std", age: "7+" },
                                    { grade: "III - Std", age: "8+" },
                                    { grade: "IV - Std", age: "9+" },
                                    { grade: "V - Std", age: "10+" },
                                    { grade: "VI - Std", age: "11+" },
                                    { grade: "VII - Std", age: "12+" },
                                    { grade: "VIII - Std", age: "13+" },
                                    { grade: "IX - Std", age: "14+" },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full text-sm"
                                    >
                                        <span className="font-medium text-gray-800">{item.grade}</span>
                                        <span className="text-gray-400 text-xs">•</span>
                                        <span className="text-gray-500">{item.age} years</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-400 mt-5 border-t border-gray-50 pt-3">
                                *Age limit as determined by the local State/U.T Government.
                            </p>
                        </div>
                    </Reveal>

                    {/* Process Steps + Required Documents - Clean Two Column Layout */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* How to Obtain Application Form - Streamlined Steps */}
                        <Reveal>
                            <div className="bg-white  p-6 md:p-7 shadow-sm border border-gray-100 h-full">
                                <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    How to Obtain Application Form
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center justify-center text-sm">1</div>
                                        <div>
                                            <p className="font-medium text-gray-800">Pay ₹500 (Non-refundable)</p>
                                            <p className="text-sm text-gray-500 mt-0.5">Via online mode (UPI / Net banking / Card)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center justify-center text-sm">2</div>
                                        <div>
                                            <p className="font-medium text-gray-800">Collect the application form</p>
                                            <p className="text-sm text-gray-500 mt-0.5">From school office or download from website</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center justify-center text-sm">3</div>
                                        <div>
                                            <p className="font-medium text-gray-800">Submit filled form before due date</p>
                                            <p className="text-sm text-gray-500 mt-0.5">At the school office along with required documents</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Attested Copies Required - Clean & Minimal */}
                        <Reveal>
                            <div className="bg-white  p-6 md:p-7 shadow-sm border border-gray-100 h-full">
                                <h3 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"></path>
                                    </svg>
                                    Required Documents
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2 text-sm uppercase tracking-wide">Student</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-500">
                                            <li className="flex items-center gap-2">• Birth Certificate</li>
                                            <li className="flex items-center gap-2">• Report card (if any)</li>
                                            <li className="flex items-center gap-2">• Aadhar card</li>
                                            <li className="flex items-center gap-2">• Community certificate</li>
                                            <li className="flex items-center gap-2">• 2 passport size photos</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-2 text-sm uppercase tracking-wide">Parent</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-500">
                                            <li className="flex items-center gap-2">• PAN card</li>
                                            <li className="flex items-center gap-2">• Aadhar card</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Confirmation of Admission - Clean Call to Action */}
                    <Reveal>
                        <div className="bg-white border border-gray-200 shadow-sm p-6 md:p-7 flex flex-col md:flex-row justify-between items-center gap-5 transition-all">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">Confirm Your Seat</h3>
                                <p className="text-gray-500 text-sm max-w-xl">Upon acceptance, please complete the enrollment process within the stipulated date to secure your child's seat.</p>
                            </div>
                            <a
                                href="https://hikabackend.sonastar.com/api/institutions/enquiry/INS-3-ZXYXKM"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-white px-8 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-[0.98] font-medium whitespace-nowrap inline-block"
                            >
                                Confirm Enrollment →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </main>
        </>
    );
}

