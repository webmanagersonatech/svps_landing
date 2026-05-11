import Head from "next/head";
import { PageHeader } from "../../components/PageHeader";
import { useState } from "react";
import { Reveal } from "../../components/Reveal";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Actual contact details from the school
    const phoneNumbers = [
  
        "+91 9442592157",
      
    ];
    const landline = "+91 427 2912160";
    const email = "svpschool@sonatech.ac.in";
    const address = "Junction Main Road, Salem – 636005";
    const whatsappNumber = "919442592156"; // using first mobile for WhatsApp

    return (
        <>
            <Head>
                <title>Contact Us | Sona Valliappa Public School</title>
            </Head>

            <main className="bg-white">
                {/* HEADER */}
                <PageHeader
                    title="Contact Us"
                    subtitle="We’re here to help you. Reach out anytime."
                    breadcrumbs={["Home", "Contact"]}
                />

                {/* MAIN SECTION – NO CARDS, FLAT DESIGN */}
              {/* MAIN SECTION – NO CARDS, FLAT DESIGN */}
<section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* LEFT – FORM SECTION */}
        <Reveal>
            <div className="h-full">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">
                    Let's Get In Touch
                </h2>
                <p className="text-gray-500 mt-2 mb-8 border-b border-gray-100 pb-4">
                    Fill out the form and we'll get back to you shortly.
                </p>

                <form className="space-y-6">
                    {/* NAME – underline style, no border box */}
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <div className="flex items-center border-b border-gray-200 focus-within:border-primary py-2 transition">
                            <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Your name"
                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                        <div className="flex items-center border-b border-gray-200 focus-within:border-primary py-2 transition">
                            <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm"
                            />
                        </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                        <div className="border-b border-gray-200 focus-within:border-primary py-2 transition">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Write your message..."
                                className="w-full outline-none bg-transparent text-gray-800 placeholder:text-gray-400 text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* BUTTON – flat, no gradient */}
                    <button
                        type="submit"
                        className="mt-4 bg-primary text-white px-8 py-2.5 hover:bg-primary/90 transition font-medium"
                    >
                        Send Message →
                    </button>
                </form>

                {/* CONTACT INFO – clean list, no background/borders */}
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

        {/* RIGHT – IMAGE (clean, no rounded corners, matches left column height) */}
        <Reveal>
            <div className="h-full">
                <div className="h-full overflow-hidden rounded-tl-[80px] rounded-br-[20px] shadow-lg">
                    <img
                        src="https://img.magnific.com/premium-photo/content-indian-schoolgirls-modern-rural-areas-pose-with-books-bags-school-uniform-agai_1007204-28283.jpg"
                        alt="Contact"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </Reveal>
    </div>
</section>
            </main>
        </>
    );
}