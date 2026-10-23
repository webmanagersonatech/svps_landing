import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Country, State, City } from 'country-state-city';
import Select, { SingleValue } from 'react-select';

/* ---------- Types ---------- */
interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    programId: string;
}

interface AdmissionEnquiryFormProps {
    title?: string;
    subtitle?: string;
    onSuccess?: (data: FormData) => void;
    className?: string;
}

interface SelectOption {
    value: string;
    label: string;
}

/* ---------- Constants ---------- */
const DEFAULT_COUNTRY_CODE = 'IN';
const DEFAULT_STATE_CODE = 'TN';
const INSTITUTE_ID = 'INS-3-ZXYXKM';

const CLASS_OPTIONS: SelectOption[] = [
    { value: 'PREKG00001', label: 'Pre-KG' },
    { value: 'LKG0000002', label: 'LKG' },
    { value: 'UKG0000003', label: 'UKG' },
    { value: 'STD0000001', label: 'I - Std' },
    { value: 'STD0000002', label: 'II - Std' },
    { value: 'STD0000003', label: 'III - Std' },
    { value: 'STD0000004', label: 'IV - Std' },
    { value: 'STD0000005', label: 'V - Std' },
    { value: 'STD0000006', label: 'VI - Std' },
    { value: 'STD0000007', label: 'VII - Std' },
    { value: 'STD0000008', label: 'VIII - Std' },
    { value: 'STD0000009', label: 'IX - Std' },
];

const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    country: DEFAULT_COUNTRY_CODE,
    state: DEFAULT_STATE_CODE,
    city: '',
    programId: '',
};

/* ---------- Simple char captcha ---------- */
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CAPTCHA_LENGTH = 5;
const generateCaptcha = (len = CAPTCHA_LENGTH): string =>
    Array.from(
        { length: len },
        () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
    ).join('');

/* ---------- Custom react-select styles (glass theme) ---------- */
const selectStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px)',
        borderColor: state.isFocused
            ? 'var(--primary, #3b82f6)'
            : 'rgba(255,255,255,0.2)',
        borderRadius: '0.75rem',
        padding: '2px 4px',
        minHeight: '42px',
        boxShadow: 'none',
        transition: 'all 0.2s',
        '&:hover': { borderColor: 'rgba(255,255,255,0.4)' },
    }),
    valueContainer: (base: any) => ({ ...base, padding: '0 8px' }),
    singleValue: (base: any) => ({ ...base, color: '#fff', fontSize: '0.875rem' }),
    placeholder: (base: any) => ({ ...base, color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem' }),
    input: (base: any) => ({ ...base, color: '#fff', fontSize: '0.875rem' }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#111827',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        zIndex: 50,
    }),
    menuList: (base: any) => ({ ...base, maxHeight: 220 }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused
            ? 'rgba(59,130,246,0.25)'
            : state.isSelected
                ? 'rgba(59,130,246,0.4)'
                : 'transparent',
        color: '#fff',
        fontSize: '0.875rem',
        cursor: 'pointer',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: 'rgba(255,255,255,0.5)',
        '&:hover': { color: '#fff' },
    }),
    clearIndicator: (base: any) => ({ ...base, color: 'rgba(255,255,255,0.5)' }),
    noOptionsMessage: (base: any) => ({
        ...base,
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.8rem',
    }),
};

/* ---------- Validators ---------- */
const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is required';
    if (!/^[A-Za-z\s.'-]+$/.test(name.trim()))
        return 'Only letters and spaces allowed';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    if (name.trim().length > 60) return 'Name is too long';
    return '';
};

const validatePhone = (phone: string): string => {
    const cleaned = phone.replace(/[\s+()-]/g, '');
    if (!cleaned) return 'Phone number is required';
    if (!/^\d+$/.test(cleaned)) return 'Only digits allowed';
    if (cleaned.length !== 10) return 'Phone must be exactly 10 digits';
    if (!/^[6-9]/.test(cleaned)) return 'Must start with 6, 7, 8, or 9';
    if (/^(\d)\1{9}$/.test(cleaned)) return 'Invalid phone number';
    if (cleaned === '1234567890' || cleaned === '0123456789')
        return 'Invalid phone number';
    if (/^(0123456789|1234567890|9876543210|5432109876)$/.test(cleaned))
        return 'Invalid phone number';
    return '';
};

const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
        return 'Enter a valid email address';
    return '';
};

/* ---------- Component ---------- */
export default function AdmissionEnquiryForm({
    title = 'Admissions Enquiry',
    subtitle = "Fill the details below and we'll get back to you",
    onSuccess,
    className = '',
}: AdmissionEnquiryFormProps) {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitStatus, setSubmitStatus] = useState<
        'idle' | 'success' | 'error'
    >('idle');

    /* --- Captcha state --- */
    const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');

    /* --- Consent checkbox state --- */
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    /* --- Data sources --- */
    const countries = useMemo(() => Country.getAllCountries(), []);
    const states = useMemo(
        () => State.getStatesOfCountry(formData.country),
        [formData.country]
    );
    const cities = useMemo(
        () => City.getCitiesOfState(formData.country, formData.state),
        [formData.country, formData.state]
    );

    /* --- react-select options --- */
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
        () =>
            cities.map((ct) => ({
                value: ct.name,
                label: ct.name,
            })),
        [cities]
    );

    /* --- Live field validators (run on every change) --- */
    const liveNameError = validateName(formData.name);
    const liveEmailError = validateEmail(formData.email);
    const livePhoneError = validatePhone(formData.phone);

    /* --- Generic input handler --- */
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const sanitizedValue =
            name === 'name' ? value.replace(/[^A-Za-z\s.'-]/g, '') : value;

        const finalValue =
            name === 'phone'
                ? sanitizedValue.replace(/\D/g, '').slice(0, 10)
                : sanitizedValue;

        setFormData((prev) => ({ ...prev, [name]: finalValue }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Re-run validation for this field immediately
        let err = '';
        if (name === 'name') err = validateName(finalValue);
        if (name === 'email') err = validateEmail(finalValue);
        if (name === 'phone') err = validatePhone(finalValue);

        setErrors((prev) => ({ ...prev, [name]: err, submit: '' }));
    };

    /* --- react-select change handlers --- */
    const handleCountryChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({
            ...prev,
            country: opt?.value || '',
            state: '',
            city: '',
        }));
        setErrors((prev) => ({
            ...prev,
            country: opt?.value ? '' : 'Country is required',
            state: '',
            city: '',
        }));
        setTouched((prev) => ({ ...prev, country: true }));
    };

    const handleStateChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({ ...prev, state: opt?.value || '', city: '' }));
        setErrors((prev) => ({
            ...prev,
            state: opt?.value ? '' : 'State is required',
            city: '',
        }));
        setTouched((prev) => ({ ...prev, state: true }));
    };

    const handleCityChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({ ...prev, city: opt?.value || '' }));
        setErrors((prev) => ({
            ...prev,
            city: opt?.value ? '' : 'City is required',
        }));
        setTouched((prev) => ({ ...prev, city: true }));
    };

    const handleClassChange = (opt: SingleValue<SelectOption>) => {
        setFormData((prev) => ({ ...prev, programId: opt?.value || '' }));
        setErrors((prev) => ({
            ...prev,
            programId: opt?.value ? '' : 'Please select a class',
        }));
        setTouched((prev) => ({ ...prev, programId: true }));
    };

    /* --- Captcha handlers --- */
    const refreshCaptcha = () => {
        setCaptchaText(generateCaptcha());
        setCaptchaInput('');
        setErrors((prev) => ({ ...prev, captcha: '' }));
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setCaptchaInput(value);
        setTouched((prev) => ({ ...prev, captcha: true }));

        let err = '';
        if (!value.trim()) {
            err = 'Please enter the captcha';
        } else if (value.trim() !== captchaText) {
            err = 'Captcha does not match';
        }
        setErrors((prev) => ({ ...prev, captcha: err, submit: '' }));
    };

    /* --- Consent handler --- */
    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreedToTerms(e.target.checked);
        setErrors((prev) => ({
            ...prev,
            consent: e.target.checked
                ? ''
                : 'Please agree to the Terms & Privacy Policy to continue',
        }));
        setTouched((prev) => ({ ...prev, consent: true }));
    };

    /* --- Step 1: are all detail fields valid? --- */
    const isDetailsComplete = useMemo(() => {
        return (
            validateName(formData.name) === '' &&
            validateEmail(formData.email) === '' &&
            validatePhone(formData.phone) === '' &&
            formData.country !== '' &&
            formData.state !== '' &&
            formData.city !== '' &&
            formData.programId !== ''
        );
    }, [formData]);

    /* --- Step 2: has the user typed the correct captcha? --- */
    const isCaptchaValid = useMemo(() => {
        return (
            captchaInput.trim().length > 0 &&
            captchaInput.trim().toUpperCase() === captchaText
        );
    }, [captchaInput, captchaText]);

    /* --- Full validation (incl. captcha + consent) --- */
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const newTouched: Record<string, boolean> = {};

        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;
        newTouched.name = true;

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        newTouched.email = true;

        const phoneError = validatePhone(formData.phone);
        if (phoneError) newErrors.phone = phoneError;
        newTouched.phone = true;

        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.programId) newErrors.programId = 'Please select a class';
        newTouched.country = true;
        newTouched.state = true;
        newTouched.city = true;
        newTouched.programId = true;

        if (!captchaInput.trim()) {
            newErrors.captcha = 'Please enter the captcha';
        } else if (captchaInput.trim().toUpperCase() !== captchaText) {
            newErrors.captcha = 'Captcha does not match';
        }
        newTouched.captcha = true;

        if (!agreedToTerms) {
            newErrors.consent =
                'Please agree to the Terms & Privacy Policy to continue';
        }
        newTouched.consent = true;

        setErrors(newErrors);
        setTouched(newTouched);
        return Object.keys(newErrors).length === 0;
    };

    /* --- Submit --- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        const countryName =
            countries.find((c) => c.isoCode === formData.country)?.name || '';
        const stateName =
            states.find((s) => s.isoCode === formData.state)?.name || '';

        const payload = {
            instituteId: INSTITUTE_ID,
            programId: formData.programId,
            candidateName: formData.name.trim(),
            phoneNumber: formData.phone.trim(),
            email: formData.email.trim(),
            country: countryName,
            state: stateName,
            city: formData.city,
            status: 'New',
            communication: 'Online',
            followUpDate: new Date().toISOString().split('T')[0],
            description: 'This lead enquiry has come from online',
            leadSource: 'online',
        };

        try {
            const response = await fetch(
                'https://hikabackend.sonastar.com/api/leads/enquiry',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setIsSubmitted(true);
                onSuccess?.(formData);
                console.log('Enquiry submitted successfully:', responseData);

                setTimeout(() => {
                    setIsSubmitted(false);
                    setSubmitStatus('idle');
                    setFormData(initialFormData);
                    setCaptchaInput('');
                    setCaptchaText(generateCaptcha());
                    setAgreedToTerms(false);
                    setTouched({});
                    setErrors({});
                }, 3000);
            } else {
                setSubmitStatus('error');
                setErrors((prev) => ({
                    ...prev,
                    submit:
                        responseData?.message ||
                        'Something went wrong. Please try again.',
                }));
                console.error('Submission failed:', responseData);
            }
        } catch (err) {
            setSubmitStatus('error');
            setErrors((prev) => ({
                ...prev,
                submit: 'Network error. Please try again.',
            }));
            console.error('Network error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    /* --- Class helpers --- */
    const inputBaseClass =
        'w-full px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border text-white placeholder-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all duration-200 text-sm shadow-inner';
    const inputBorderClass = (field: string) =>
        errors[field] ? 'border-red-400' : 'border-white/20 group-hover:border-white/40';

    const currentCountryOption = countryOptions.find(
        (o) => o.value === formData.country
    );
    const currentStateOption = stateOptions.find(
        (o) => o.value === formData.state
    );
    const currentCityOption = cityOptions.find(
        (o) => o.value === formData.city
    );
    const currentClassOption = CLASS_OPTIONS.find(
        (o) => o.value === formData.programId
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`w-full max-w-md mx-auto lg:ml-auto relative ${className}`}
        >
            {/* Foldable Corner Accent - Top Left */}
            <div className="absolute -top-2 -left-2 w-8 h-8 z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-white/10 backdrop-blur-sm border-r border-b border-white/20 rounded-br-lg" />
            </div>

            {/* Foldable Corner Accent - Top Right */}
            <div className="absolute -top-2 -right-2 w-8 h-8 z-10">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 to-transparent rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/10 backdrop-blur-sm border-l border-b border-white/20 rounded-bl-lg" />
            </div>

            {/* Fold Line Effect */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-12 z-10 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full blur-sm" />
            </div>

            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

                <div className="relative p-5 md:p-6 backdrop-blur-sm">
                    <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-white/5 to-transparent rounded-tr-xl border-t border-r border-white/10" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-tl from-white/5 to-transparent rounded-bl-xl border-b border-l border-white/10" />

                    {/* Form Header */}
                    <div className="text-center mb-6 relative">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-full mb-3 shadow-lg">
                            <Send className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl md:text-2xl text-white mb-1 font-semibold tracking-tight">
                            {title}
                        </h3>
                        <p className="text-white/60 italic text-sm">{subtitle}</p>
                    </div>

                    {/* Success Message */}
                    <AnimatePresence>
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mb-4 p-3 bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded-xl flex items-center gap-3 text-green-300 text-sm"
                            >
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                <span>Thank you! Our team will contact you soon.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error Message */}
                    <AnimatePresence>
                        {errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mb-4 p-3 bg-red-500/20 backdrop-blur-md border border-red-500/40 rounded-xl text-red-300 text-sm"
                            >
                                {errors.submit}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4 relative" noValidate>
                        {/* Row 1: Name + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="xxxx xx"
                                    autoComplete="name"
                                    className={`${inputBaseClass} ${inputBorderClass('name')}`}
                                />
                                {touched.name && errors.name && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>
                                )}
                            </div>

                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="xxxx@example.com"
                                    autoComplete="email"
                                    className={`${inputBaseClass} ${inputBorderClass('email')}`}
                                />
                                {touched.email && errors.email && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Row 2: Phone */}
                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="phone number"
                                    inputMode="numeric"
                                    maxLength={10}
                                    autoComplete="tel"
                                    className={`${inputBaseClass} ${inputBorderClass('phone')}`}
                                />
                                {touched.phone && errors.phone && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Row 3: Class */}
                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    Class / Program *
                                </label>
                                <Select<SelectOption>
                                    options={CLASS_OPTIONS}
                                    value={currentClassOption || null}
                                    onChange={handleClassChange}
                                    placeholder=" select class..."
                                    isSearchable
                                    styles={selectStyles}
                                    classNamePrefix="class-select"
                                />
                                {touched.programId && errors.programId && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">
                                        {errors.programId}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Country + State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    Country *
                                </label>
                                <Select<SelectOption>
                                    options={countryOptions}
                                    value={currentCountryOption || null}
                                    onChange={handleCountryChange}
                                    placeholder="Search country..."
                                    isSearchable
                                    styles={selectStyles}
                                    classNamePrefix="country-select"
                                />
                                {touched.country && errors.country && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            <div className="relative group">
                                <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                    State *
                                </label>
                                <Select<SelectOption>
                                    options={stateOptions}
                                    value={currentStateOption || null}
                                    onChange={handleStateChange}
                                    placeholder="Search state..."
                                    isSearchable
                                    isDisabled={!formData.country}
                                    styles={selectStyles}
                                    classNamePrefix="state-select"
                                />
                                {touched.state && errors.state && (
                                    <p className="text-red-400 text-xs mt-1 ml-1">{errors.state}</p>
                                )}
                            </div>
                        </div>

                        {/* Row 5: City */}
                        <div className="relative group">
                            <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                City *
                            </label>
                            <Select<SelectOption>
                                options={cityOptions}
                                value={currentCityOption || null}
                                onChange={handleCityChange}
                                placeholder="Search city..."
                                isSearchable
                                isDisabled={!formData.state}
                                styles={selectStyles}
                                classNamePrefix="city-select"
                            />
                            {touched.city && errors.city && (
                                <p className="text-red-400 text-xs mt-1 ml-1">{errors.city}</p>
                            )}
                        </div>

                        {/* Row 6: Captcha — appears only when all details are valid */}
                        <AnimatePresence>
                            {isDetailsComplete && (
                                <motion.div
                                    key="captcha-section"
                                    initial={{ opacity: 0, height: 0, y: -8 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -8 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative group pt-1">
                                        <label className="block text-white/70 text-xs font-medium mb-1 ml-1 backdrop-blur-sm">
                                            Captcha *
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 flex items-center justify-center h-[42px] rounded-xl bg-white/10 border border-white/20 select-none overflow-hidden">
                                                <span
                                                    className="text-white text-lg font-bold tracking-[0.35em] italic"
                                                    style={{
                                                        textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                                                    }}
                                                >
                                                    {captchaText}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={refreshCaptcha}
                                                className="px-3 h-[42px] rounded-xl bg-white/5 border border-white/20 text-white/70 text-base hover:bg-white/10 hover:text-white transition"
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
                                            className={`${inputBaseClass} ${inputBorderClass(
                                                'captcha'
                                            )} mt-2 tracking-widest uppercase`}
                                        />
                                        {touched.captcha && errors.captcha && (
                                            <p className="text-red-400 text-xs mt-1 ml-1">
                                                {errors.captcha}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Row 7: Consent Checkbox — appears only after captcha is entered correctly */}
                        <AnimatePresence>
                            {isDetailsComplete && isCaptchaValid && (
                                <motion.div
                                    key="consent-section"
                                    initial={{ opacity: 0, height: 0, y: -8 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -8 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative pt-1">
                                        <label
                                            htmlFor="agree-terms"
                                            className={`flex items-start gap-2 cursor-pointer select-none rounded-xl p-2 -mx-2 transition-colors ${
                                                touched.consent && errors.consent
                                                    ? 'bg-red-500/10 border border-red-500/40'
                                                    : 'hover:bg-white/5'
                                            }`}
                                        >
                                            <input
                                                id="agree-terms"
                                                type="checkbox"
                                                checked={agreedToTerms}
                                                onChange={handleConsentChange}
                                                className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-white/30 bg-white/5 text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer accent-[var(--primary,#3b82f6)]"
                                            />
                                            <span className="text-white/50 text-xs leading-relaxed">
                                                I agree to the{' '}
                                                <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">
                                                    Terms
                                                </span>{' '}
                                                &{' '}
                                                <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">
                                                    Privacy Policy
                                                </span>{' '}
                                                and consent to being contacted regarding my
                                                enquiry. <span className="text-red-400">*</span>
                                            </span>
                                        </label>
                                        {touched.consent && errors.consent && (
                                            <p className="text-red-400 text-xs mt-1 ml-1">
                                                {errors.consent}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                !isDetailsComplete ||
                                !isCaptchaValid
                            }
                            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm mt-2 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send Enquiry
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}