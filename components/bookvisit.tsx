import React, { useState, useEffect, useRef, useMemo } from 'react';
  import { submitVisit } from '../lib/formsApi';
  import { XMarkIcon, CheckBadgeIcon, CalendarIcon, UserIcon, EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
  import { motion, AnimatePresence } from 'framer-motion';

  /* =========================
    SIMPLE CHAR CAPTCHA
    ========================= */
  const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
  const CAPTCHA_LENGTH = 5;
  const generateCaptcha = (len = CAPTCHA_LENGTH): string =>
    Array.from(
      { length: len },
      () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
    ).join('');

  /* =========================
    REUSABLE POPUP FORM COMPONENT - MODERN SIMPLE DESIGN
    ========================= */
  interface PopupFormProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    onSubmit?: (formData: FormData) => void;
  }

  interface FormData {
    name: string;
    email: string;
    phone: string;
    preferredDate: string;
    message: string;
  }

  /* =========================
    VALIDATORS
    ========================= */
  const validateName = (name: string): string => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email';
    return '';
  };

  const validatePhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned) return 'Phone is required';
    if (cleaned.length !== 10) return 'Phone must be exactly 10 digits';
    if (!/^[6-9]/.test(cleaned)) return 'Must start with 6, 7, 8, or 9';
    if (/^(\d)\1{9}$/.test(cleaned)) return 'Invalid phone number';
    return '';
  };

  export const PopupForm: React.FC<PopupFormProps> = ({
    isOpen,
    onClose,
    title = "Book a Visit",
    subtitle = "Fill in your details and we'll get back to you.",
    onSubmit
  }) => {
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitError, setSubmitError] = useState('');
    const [honeypot, setHoneypot] = useState(''); // hidden anti-spam field, real users never fill it

    /* --- Captcha state --- */
    const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [captchaTouched, setCaptchaTouched] = useState(false);

    /* --- Consent state --- */
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    /* --- Live field errors --- */
    const liveErrors = useMemo(
      () => ({
        name: validateName(formData.name),
        email: validateEmail(formData.email),
        phone: validatePhone(formData.phone),
        preferredDate: formData.preferredDate ? '' : 'Select a date',
      }),
      [formData]
    );

    const isDetailsComplete =
      !liveErrors.name &&
      !liveErrors.email &&
      !liveErrors.phone &&
      !liveErrors.preferredDate;

    const isCaptchaValid =
      captchaInput.trim().length > 0 &&
      captchaInput.trim().toUpperCase() === captchaText;

    // Handle escape key press
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    // Reset everything when the modal closes
    useEffect(() => {
      if (!isOpen) {
        setFormData({ name: '', email: '', phone: '', preferredDate: '', message: '' });
        setErrors({});
        setTouched({});
        setSubmitError('');
        setCaptchaInput('');
        setCaptchaText(generateCaptcha());
        setCaptchaError('');
        setCaptchaTouched(false);
        setAgreedToTerms(false);
      }
    }, [isOpen]);

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};

      const nameError = validateName(formData.name);
      if (nameError) newErrors.name = nameError;

      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;

      const phoneError = validatePhone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;

      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Select a date';
      }

      if (!captchaInput.trim()) {
        newErrors.captcha = 'Please enter the captcha';
        setCaptchaError('Please enter the captcha');
      } else if (captchaInput.trim().toUpperCase() !== captchaText) {
        newErrors.captcha = 'Captcha does not match';
        setCaptchaError('Captcha does not match');
      }

      if (!agreedToTerms) {
        newErrors.consent =
          'Please agree to the Terms & Privacy Policy to continue';
      }

      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        preferredDate: true,
      });
      setCaptchaTouched(true);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // Phone: digits only, max 10
      const finalValue =
        name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

      setFormData(prev => ({ ...prev, [name]: finalValue }));
      setTouched(prev => ({ ...prev, [name]: true }));

      let err = '';
      if (name === 'name') err = validateName(finalValue);
      if (name === 'email') err = validateEmail(finalValue);
      if (name === 'phone') err = validatePhone(finalValue);
      if (name === 'preferredDate')
        err = finalValue ? '' : 'Select a date';

      setErrors(prev => ({ ...prev, [name]: err }));
    };

    const refreshCaptcha = () => {
      setCaptchaText(generateCaptcha());
      setCaptchaInput('');
      setCaptchaError('');
      setCaptchaTouched(false);
    };

    const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      setCaptchaInput(value);
      setCaptchaTouched(true);
      if (!value.trim()) {
        setCaptchaError('Please enter the captcha');
      } else if (value.trim() !== captchaText) {
        setCaptchaError('Captcha does not match');
      } else {
        setCaptchaError('');
      }
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAgreedToTerms(e.target.checked);
      setErrors(prev => ({
        ...prev,
        consent: e.target.checked
          ? ''
          : 'Please agree to the Terms & Privacy Policy to continue',
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);
      setSubmitError('');

      try {
        await submitVisit({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          preferredDate: formData.preferredDate,
          message: formData.message.trim(),
          purpose: title, // tells the admin which button / page the request came from
          website: honeypot,
        });
      } catch (err: any) {
        setSubmitError(err.message || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      if (onSubmit) {
        onSubmit(formData);
      }

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          message: ''
        });
        setTouched({});
        setErrors({});
        setCaptchaInput('');
        setCaptchaText(generateCaptcha());
        setCaptchaError('');
        setCaptchaTouched(false);
        setAgreedToTerms(false);
        onClose();
      }, 2000);
    };

    if (!isOpen) return null;

    const inputBase =
      'w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-1 transition-all';
    const inputNormal =
      'border-gray-200 focus:ring-[#18596d] focus:border-[#18596d]';
    const inputError =
      'border-red-300 focus:ring-red-500 focus:border-red-500';

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* Header - Simple */}
          <div className="px-6 pt-6 pb-2 text-center">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>

          {/* Form Body */}
          <div className="px-6 py-4">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                  <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Request Sent!</h4>
                <p className="text-gray-500 text-sm mt-1">
                  We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot – hidden from people, bots fill it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Name Field */}
                <div>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                      className={`${inputBase} ${touched.name && errors.name ? inputError : inputNormal}`}
                      placeholder="Full name"
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                      className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                      placeholder="Email address"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                      inputMode="numeric"
                      maxLength={10}
                      className={`${inputBase} ${touched.phone && errors.phone ? inputError : inputNormal}`}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Preferred Date Field */}
                <div>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      onBlur={() => setTouched(prev => ({ ...prev, preferredDate: true }))}
                      min={new Date().toISOString().split('T')[0]}
                      className={`${inputBase} ${touched.preferredDate && errors.preferredDate ? inputError : inputNormal}`}
                    />
                  </div>
                  {touched.preferredDate && errors.preferredDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <div className="relative">
                    <ChatBubbleLeftRightIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#18596d] focus:border-[#18596d] transition-all resize-none"
                      placeholder="Additional message (optional)"
                    />
                  </div>
                </div>

                {/* CAPTCHA – appears only when all details are valid */}
                <AnimatePresence>
                  {isDetailsComplete && (
                    <motion.div
                      key="captcha-section"
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Captcha *
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 flex items-center justify-center h-[42px] rounded-xl border border-gray-200 bg-gray-50 select-none overflow-hidden">
                            <span
                              className="text-gray-800 text-lg font-bold tracking-[0.35em] italic"
                              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.15)' }}
                            >
                              {captchaText}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={refreshCaptcha}
                            className="px-3 h-[42px] rounded-xl border border-gray-200 text-gray-500 hover:text-[#18596d] hover:bg-gray-50 transition"
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
                          className={`${inputBase} mt-2 tracking-widest uppercase ${
                            captchaTouched && captchaError ? inputError : inputNormal
                          }`}
                        />
                        {captchaTouched && captchaError && (
                          <p className="mt-1 text-xs text-red-500">{captchaError}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CONSENT – appears only after captcha is valid */}
                <AnimatePresence>
                  {isDetailsComplete && isCaptchaValid && (
                    <motion.div
                      key="consent-section"
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1">
                        <label
                          htmlFor="popup-agree-terms"
                          className={`flex items-start gap-2 cursor-pointer select-none rounded-lg p-2 -mx-2 transition-colors ${
                            errors.consent
                              ? 'bg-red-50 border border-red-200'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <input
                            id="popup-agree-terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={handleConsentChange}
                            className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300 text-[#18596d] focus:ring-2 focus:ring-[#18596d]/50 cursor-pointer"
                          />
                          <span className="text-gray-500 text-xs leading-relaxed">
                            I agree to the{' '}
                            <span className="text-[#18596d]/80 hover:text-[#18596d] cursor-pointer transition-colors">
                              Terms
                            </span>{' '}
                            &{' '}
                            <span className="text-[#18596d]/80 hover:text-[#18596d] cursor-pointer transition-colors">
                              Privacy Policy
                            </span>{' '}
                            and consent to being contacted regarding my enquiry.{' '}
                            <span className="text-red-400">*</span>
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="mt-1 text-xs text-red-500 ml-1">
                            {errors.consent}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !isDetailsComplete || !isCaptchaValid}
                  className="w-full bg-[#18596d] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#134b5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default PopupForm;