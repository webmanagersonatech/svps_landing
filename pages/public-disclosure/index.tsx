import Head from "next/head";
import { PageHeader } from "../../components/PageHeader";
import { useEffect, useRef, useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  EyeIcon,
  ChartBarIcon,
  CalendarIcon,
  UsersIcon,
  ComputerDesktopIcon,
  BeakerIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { BriefcaseIcon } from "@heroicons/react/24/solid";

/* =========================
   REVEAL ANIMATION
========================= */
function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================
   MODERN UI COMPONENTS
========================= */

// Card wrapper with gradient border
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0b3a6a] via-[#1d5a8b] to-[#0b3a6a] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      {children}
    </div>
  );
}

// Section header with icon
function SectionHeader({ title, icon: Icon, subtitle }: { title: string; icon: React.ElementType; subtitle?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#0b3a6a]/10 rounded-xl">
          <Icon className="h-5 w-5 text-[#0b3a6a]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// Document row with preview link
function DocumentRow({ title, documentUrl, isAvailable = true }: { title: string; documentUrl?: string; isAvailable?: boolean }) {
  const handlePreview = () => {
    if (documentUrl) {
      window.open(documentUrl, "_blank");
    } else {
      alert(`Preview for "${title}" will be available soon.`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/30 px-6 transition-colors">
      <div className="flex items-center gap-2">
        <DocumentTextIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
        <span className="text-sm text-gray-700">{title}</span>
      </div>
      <div className="mt-2 sm:mt-0">
        <button
          onClick={handlePreview}
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
            documentUrl
              ? "text-[#0b3a6a] hover:bg-[#0b3a6a]/10 border border-[#0b3a6a]/20"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
          }`}
          disabled={!documentUrl}
        >
          <EyeIcon className="h-3.5 w-3.5" />
          Preview
        </button>
      </div>
    </div>
  );
}

// Info row for general information
function InfoRow({ label, value, icon: Icon, isLink = false, href }: { label: string; value: React.ReactNode; icon?: React.ElementType; isLink?: boolean; href?: string }) {
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="sm:w-1/3 px-6 py-3.5 bg-gray-50/80">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-3.5 w-3.5 text-gray-400" />}
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        </div>
      </div>
      <div className="sm:w-2/3 px-6 py-3.5">
        {isLink && href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#0b3a6a] hover:text-[#1d5a8b] font-medium transition-colors group">
            {value}
            <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <span className="text-gray-700 text-sm">{value}</span>
        )}
      </div>
    </div>
  );
}

// Result table component
function ResultTable({ year, registered, passed, percentage, remarks }: { year: string; registered: number; passed: number; percentage: string; remarks: string }) {
  return (
    <div className="grid grid-cols-5 gap-2 text-sm border-b border-gray-100 py-3 hover:bg-gray-50/50 transition-colors">
      <div className="px-2 font-medium text-gray-700">{year}</div>
      <div className="px-2 text-gray-600">{registered}</div>
      <div className="px-2 text-gray-600">{passed}</div>
      <div className="px-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${percentage === "New School" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"}`}>
          {percentage}
        </span>
      </div>
      <div className="px-2 text-gray-500 text-xs">{remarks}</div>
    </div>
  );
}

// Stats card for numbers
function StatCard({ number, label }: { number: string | number; label: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-2xl font-bold text-[#0b3a6a]">{number}</div>
      <div className="text-xs text-gray-500 mt-1.5">{label}</div>
    </div>
  );
}

// Infrastructure stat card with icon
function InfraStatCard({ number, label, icon: Icon }: { number: string | number; label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
      <div className="p-2 bg-[#0b3a6a]/10 rounded-lg">
        <Icon className="h-5 w-5 text-[#0b3a6a]" />
      </div>
      <div>
        <div className="text-lg font-bold text-gray-800">{number}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default function PublicDisclosurePage() {
  const printRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadPDF = async () => {
    if (!isClient) return;

    const element = printRef.current;
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .set({
        margin: 0.5,
        filename: "sona-valliappa-public-disclosure.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  // ==================== DATA FROM IMAGES ====================

  // A. General Information (Updated from image)
  const generalInfo = [
    { label: "Name of the School", value: "SONA VALLIAPPA PUBLIC SCHOOL", icon: BuildingOfficeIcon },
    { label: "Affiliation No.", value: "1931692", icon: DocumentTextIcon },
    { label: "School Code", value: "56948", icon: DocumentTextIcon },
    { label: "Complete Address", value: "Sona Valliappa Public School Junction Main Road, Salem - 636005, Tamil Nadu", icon: MapPinIcon },
    { label: "Principal Name & Qualification", value: "Ms. E.J. Kavitha M.A, M.Phil, B.Ed", icon: UserGroupIcon },
    { label: "School Email ID", value: "svpschool@sonatech.ac.in", icon: EnvelopeIcon, isLink: true, href: "mailto:svpschool@sonatech.ac.in" },
    { label: "Contact Details", value: "0427 - 2912160 / 9442592160", icon: PhoneIcon },
  ];

  // B. Documents & Information (Full list from image)
  const documentsList = [
    { title: "Copies of Affiliation/Upgradation Letter and Recent Extension of Affiliation", documentUrl: "/documents/affiliation-letter.pdf" },
    { title: "Copies of Societies/Trust/Company Registration/Renewal Certificate", documentUrl: "/documents/trust-registration.pdf" },
    { title: "Copy of No Objection Certificate (NOC) issued by State Govt./UT", documentUrl: "/documents/noc-certificate.pdf" },
    { title: "Copies of Recognition Certificate under RTE Act, 2009 and its Renewal", documentUrl: "/documents/rte-certificate.pdf" },
    { title: "Copy of Valid Building Safety Certificate as per National Building Code", documentUrl: "/documents/building-safety.pdf" },
    { title: "Copy of Valid Fire Safety Certificate issued by Competent Authority", documentUrl: "/documents/fire-safety.pdf" },
    { title: "Copy of DEO Certificate submitted for Affiliation/Upgradation", documentUrl: "/documents/deo-certificate.pdf" },
    { title: "Copies of Valid Water, Health and Sanitation Certificates", documentUrl: "/documents/water-health-certificate.pdf" },
    { title: "Certificate of Land and Lease Deed", documentUrl: "/documents/land-lease-deed.pdf" },
  ];

  // C. Result and Academics Documents
  const academicsDocuments = [
    { title: "Fee Structure of the School", documentUrl: "/documents/fee-structure.pdf" },
    { title: "Annual Academic Calendar", documentUrl: "/documents/academic-calendar.pdf" },
    { title: "List of School Management Committee (SMC)", documentUrl: "/documents/smc-list.pdf" },
    { title: "List of Parents Teachers' Association (PTA) Members", documentUrl: "/documents/pta-list.pdf" },
  ];

  // Result Data (from image)
  const resultData = {
    classX: { year: "2024-25", registered: 0, passed: 0, percentage: "New School", remarks: "New School" },
    classXII: { year: "2024-25", registered: 0, passed: 0, percentage: "New School", remarks: "New School" },
  };

  // D. Staff (Teaching) from image
  const staffStats = [
    { number: "1", label: "Principal" },
    { number: "22", label: "Total Teachers" },
    { number: "NIL", label: "PGT" },
    { number: "11", label: "TGT" },
    { number: "11", label: "PRT" },
    { number: "1 : 1.5", label: "Teacher Section Ratio" },
    { number: "1", label: "Special Educator" },
    { number: "1", label: "Counsellor & Wellness Teacher" },
  ];

  // E. School Infrastructure from image
  const infraStats = [
    { number: "10841 sq.m", label: "Total Campus Area", icon: BuildingOfficeIcon },
    { number: "13 nos. (500 sq.ft each)", label: "Classrooms", icon: ComputerDesktopIcon },
    { number: "3 nos. (600 sq.ft each)", label: "Laboratories", icon: BeakerIcon },
    { number: "Yes", label: "Internet Facility", icon: WifiIcon },
    { number: "10 nos.", label: "Girls Toilets", icon: BuildingOfficeIcon },
    { number: "10 nos.", label: "Boys Toilets", icon: BuildingOfficeIcon },
  ];

  return (
    <>
      <Head>
        <title>Public Mandatory Disclosure | Sona Valliappa Public School</title>
        <meta
          name="description"
          content="Official CBSE mandatory disclosure for Sona Valliappa Public School - Affiliation, results, staff, infrastructure and regulatory documents."
        />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        <PageHeader
          title="Public Mandatory Disclosure"
          subtitle="Complete information as per CBSE and regulatory requirements"
          breadcrumbs={["Home", "Public Disclosure"]}
        />


        {/* MAIN CONTENT */}
        <div ref={printRef} className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          
          {/* ==================== A. GENERAL INFORMATION ==================== */}
          <Reveal>
            <Card>
              <SectionHeader title="A. General Information" icon={BuildingOfficeIcon} />
              <div className="divide-y divide-gray-100">
                {generalInfo.map((item, idx) => (
                  <InfoRow
                    key={idx}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                    isLink={item.isLink}
                    href={item.href}
                  />
                ))}
              </div>
            </Card>
          </Reveal>

          {/* ==================== B. DOCUMENTS & INFORMATION ==================== */}
          <Reveal delay={100}>
            <Card>
              <SectionHeader 
                title="B. Documents & Information" 
                icon={DocumentTextIcon}
                subtitle="Click 'Preview' to view any document"
              />
              <div className="py-2">
                {documentsList.map((doc, idx) => (
                  <DocumentRow key={idx} title={doc.title} documentUrl={doc.documentUrl} />
                ))}
              </div>
            </Card>
          </Reveal>

          {/* ==================== C. RESULT AND ACADEMICS ==================== */}
          <Reveal delay={200}>
            <Card>
              <SectionHeader title="C. Result and Academics" icon={AcademicCapIcon} />
              
              {/* Academics Documents Section */}
              <div className="border-b border-gray-100">
                <div className="px-6 py-3 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DocumentTextIcon className="h-4 w-4" />
                    Academic Documents
                  </h3>
                </div>
                {academicsDocuments.map((doc, idx) => (
                  <DocumentRow key={idx} title={doc.title} documentUrl={doc.documentUrl} />
                ))}
              </div>

              {/* Result Section */}
              <div className="pt-2">
                <div className="px-6 py-3 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ChartBarIcon className="h-4 w-4" />
                    Board Examination Results
                  </h3>
                </div>
                
                {/* Class X Result */}
                <div className="px-6 py-3">
                  <h4 className="text-sm font-medium text-[#0b3a6a] mb-2">Result Class: X</h4>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-2">
                      <div className="px-2">YEAR</div>
                      <div className="px-2">REGISTERED</div>
                      <div className="px-2">PASSED</div>
                      <div className="px-2">PASS %</div>
                      <div className="px-2">REMARKS</div>
                    </div>
                    <ResultTable 
                      year={resultData.classX.year}
                      registered={resultData.classX.registered}
                      passed={resultData.classX.passed}
                      percentage={resultData.classX.percentage}
                      remarks={resultData.classX.remarks}
                    />
                  </div>
                </div>

                {/* Class XII Result */}
                <div className="px-6 py-3 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-[#0b3a6a] mb-2">Result Class: XII</h4>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-2">
                      <div className="px-2">YEAR</div>
                      <div className="px-2">REGISTERED</div>
                      <div className="px-2">PASSED</div>
                      <div className="px-2">PASS %</div>
                      <div className="px-2">REMARKS</div>
                    </div>
                    <ResultTable 
                      year={resultData.classXII.year}
                      registered={resultData.classXII.registered}
                      passed={resultData.classXII.passed}
                      percentage={resultData.classXII.percentage}
                      remarks={resultData.classXII.remarks}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* ==================== D. STAFF (TEACHING) ==================== */}
          <Reveal delay={300}>
            <Card>
              <SectionHeader title="D. Staff (Teaching)" icon={UserGroupIcon} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6">
                {staffStats.map((stat, idx) => (
                  <StatCard key={idx} number={stat.number} label={stat.label} />
                ))}
              </div>
            </Card>
          </Reveal>

          {/* ==================== E. SCHOOL INFRASTRUCTURE ==================== */}
          <Reveal delay={400}>
            <Card>
              <SectionHeader title="E. School Infrastructure" icon={BriefcaseIcon} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6">
                {infraStats.map((stat, idx) => (
                  <InfraStatCard key={idx} number={stat.number} label={stat.label} icon={stat.icon} />
                ))}
              </div>
              
              {/* YouTube Video Link */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-2">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.016 3.016 0 0 0 .502 6.186C0 8.066 0 12 0 12s0 3.934.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.934 24 12 24 12s0-3.934-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">School Infrastructure Video</p>
                      <p className="text-xs text-gray-500">YouTube video of school inspection covering infrastructure</p>
                    </div>
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert("Video link will be added soon."); }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <LinkIcon className="h-3.5 w-3.5" />
                    Watch Video
                  </a>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* FOOTER NOTE */}
          <div className="text-center text-xs text-gray-400 pt-6 pb-10 border-t border-gray-200 mt-4">
            Last updated as per official school records • For any queries, please contact the school office
          </div>
        </div>
      </main>
    </>
  );
}