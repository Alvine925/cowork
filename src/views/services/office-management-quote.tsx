'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ChevronDown, Check, Search, X, Shield, Clock, FileText } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { FACILITY_CATEGORIES, ALL_FACILITIES } from './office-management'

type FormErrors = Partial<Record<
  'businessName' | 'contactName' | 'email' | 'phone' | 'employees' | 'requirements' | 'facilities',
  string
>>

export default function OfficeManagementQuotePage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    'Private Executive Offices / Director Cabins',
    'Open Plan Team Space / Workstations',
    'Commercial Network Printers, Scanners & Copiers',
    'High-Speed Dedicated Fibre Internet (Dual-Carrier)',
    '24/7 Security, CCTV & Biometric Access Control',
    'Daily Office Cleaning & Janitorial Upkeep',
  ])
  const [facilitiesOpen, setFacilitiesOpen] = useState(false)
  const [facilitySearch, setFacilitySearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFacilitiesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleFacility(facility: string) {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    )
    if (errors.facilities) setErrors((e) => ({ ...e, facilities: undefined }))
  }

  function selectAll() {
    setSelectedFacilities([...ALL_FACILITIES])
    setErrors((e) => ({ ...e, facilities: undefined }))
  }

  function clearAll() {
    setSelectedFacilities([])
  }

  function selectStandard() {
    setSelectedFacilities([
      'Private Executive Offices / Director Cabins',
      'Open Plan Team Space / Workstations',
      'Commercial Network Printers, Scanners & Copiers',
      'High-Speed Dedicated Fibre Internet (Dual-Carrier)',
      '24/7 Security, CCTV & Biometric Access Control',
      'Daily Office Cleaning & Janitorial Upkeep',
      'Fully Stocked Kitchenette & Dining Area',
    ])
    setErrors((e) => ({ ...e, facilities: undefined }))
  }

  const filteredCategories = useMemo(() => {
    if (!facilitySearch.trim()) return FACILITY_CATEGORIES
    const query = facilitySearch.toLowerCase()
    return FACILITY_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.toLowerCase().includes(query)),
    })).filter((cat) => cat.items.length > 0)
  }, [facilitySearch])

  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {}
    if (!data.get('businessName')?.toString().trim()) {
      errs.businessName = 'Business name is required.'
    }
    if (!data.get('contactName')?.toString().trim()) {
      errs.contactName = 'Contact person name is required.'
    }
    const email = data.get('email')?.toString().trim()
    if (!email) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address.'
    }
    const phone = data.get('phone')?.toString().trim()
    if (!phone || phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'A valid phone number is required.'
    }
    if (!data.get('employees') || data.get('employees') === '') {
      errs.employees = 'Please select your team size.'
    }
    if (!data.get('requirements')?.toString().trim()) {
      errs.requirements = 'Please describe your office requirements.'
    }
    if (selectedFacilities.length === 0) {
      errs.facilities = 'Please select at least one required facility.'
    }
    return errs
  }

  function clearFieldError(field: keyof FormErrors) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('idle')
      // Scroll to the first error
      const firstErrorEl = form.querySelector('[data-error="true"]')
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setErrors({})

    const payload = {
      businessName: data.get('businessName') as string,
      contactName: data.get('contactName') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      location: data.get('location') as string,
      employees: data.get('employees') as string,
      requirements: data.get('requirements') as string,
      facilities: selectedFacilities.join(', '),
      startDate: (data.get('startDate') as string) || undefined,
      contractDuration: (data.get('contract') as string) || undefined,
      additionalInfo: (data.get('additional') as string) || undefined,
    }

    try {
      const res = await fetch('/api/office-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls = (hasError: boolean) =>
    'w-full border bg-white px-4 py-3 text-sm text-navy placeholder-navy/35 focus:outline-none transition-colors ' +
    (hasError ? 'border-red-400 focus:border-red-500' : 'border-navy/20 focus:border-navy')

  const labelCls = 'block text-[11px] uppercase tracking-wider text-navy/60 font-semibold mb-1.5'

  return (
    <>
      <PageHero
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&q=80"
        eyebrow="Proposal Request · Office Management"
        title="Request an Office Proposal"
        subtitle="Share your team size, layout preferences, and required facilities in Kisumu. We will source suitable premises, prepare a custom proposal, and our advisory team will contact you within 1 business day."
        align="left"
        height="h-[55vh] min-h-[420px]"
      >
        <div className="mt-6">
          <Link
            href="/office-management"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Office Management
          </Link>
        </div>
      </PageHero>

      <section className="bg-[#FBFAF7] py-20 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Form Column — no card, flat layout */}
            <div className="lg:col-span-8">
              <div className="mb-8 pb-6 border-b border-navy/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
                  Office Specifications Brief
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-light text-navy">
                  Your Requirements &amp; Commercial Terms
                </h2>
                <p className="text-xs sm:text-sm text-navy/65 mt-2 leading-relaxed">
                  Provide as much detail as possible so our team can present shortlisted commercial options that accurately match your business needs.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-16 text-center">
                  <CheckCircle2 className="w-12 h-12 text-navy mx-auto mb-4" />
                  <h3 className="font-heading text-2xl text-navy font-light mb-2">Proposal Request Received</h3>
                  <p className="text-sm text-navy/75 leading-relaxed max-w-md mx-auto mb-3">
                    Thank you! An official acknowledgement has been sent to your email address.
                  </p>
                  <p className="text-xs text-navy/60 leading-relaxed max-w-md mx-auto mb-6">
                    Our workspace advisory team will review your specifications and reach out to you directly with comprehensive details, shortlisted premises options, and next steps within 1 business day.
                  </p>
                  <Link
                    href="/office-management"
                    className="inline-block bg-navy text-white text-[11px] uppercase tracking-widest font-semibold px-6 py-3 hover:bg-navy/80 transition-colors"
                  >
                    Return to Office Management Overview
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  {/* Business Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div data-error={!!errors.businessName}>
                      <label htmlFor="businessName" className={labelCls}>Business Name *</label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        placeholder="Your company name"
                        className={inputCls(!!errors.businessName)}
                        onChange={() => clearFieldError('businessName')}
                        aria-invalid={!!errors.businessName}
                      />
                      {errors.businessName && (
                        <p className="text-red-600 text-xs mt-1" role="alert">{errors.businessName}</p>
                      )}
                    </div>
                    <div data-error={!!errors.contactName}>
                      <label htmlFor="contactName" className={labelCls}>Contact Person *</label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        placeholder="Your full name"
                        className={inputCls(!!errors.contactName)}
                        onChange={() => clearFieldError('contactName')}
                        aria-invalid={!!errors.contactName}
                      />
                      {errors.contactName && (
                        <p className="text-red-600 text-xs mt-1" role="alert">{errors.contactName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div data-error={!!errors.email}>
                      <label htmlFor="email" className={labelCls}>Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className={inputCls(!!errors.email)}
                        onChange={() => clearFieldError('email')}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1" role="alert">{errors.email}</p>
                      )}
                    </div>
                    <div data-error={!!errors.phone}>
                      <label htmlFor="phone" className={labelCls}>Phone Number *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        className={inputCls(!!errors.phone)}
                        onChange={() => clearFieldError('phone')}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-xs mt-1" role="alert">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Location (pre-selected Kisumu) & Team Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="location" className={labelCls}>Location *</label>
                      <select id="location" name="location" defaultValue="Kisumu CBD" className={inputCls(false)}>
                        <option value="Kisumu CBD">Kisumu CBD (Current Hub Area)</option>
                        <option value="Kisumu - Milimani">Kisumu - Milimani</option>
                        <option value="Kisumu - Other Areas">Kisumu - Other Areas</option>
                      </select>
                      <p className="text-[10px] text-navy/50 mt-1">
                        * Office Management is currently offered exclusively in Kisumu.
                      </p>
                    </div>
                    <div data-error={!!errors.employees}>
                      <label htmlFor="employees" className={labelCls}>Number of Employees *</label>
                      <select
                        id="employees"
                        name="employees"
                        defaultValue=""
                        className={inputCls(!!errors.employees)}
                        onChange={() => clearFieldError('employees')}
                        aria-invalid={!!errors.employees}
                      >
                        <option value="" disabled>Select range</option>
                        <option>1–5</option>
                        <option>6–15</option>
                        <option>16–30</option>
                        <option>31–50</option>
                        <option>50+</option>
                      </select>
                      {errors.employees && (
                        <p className="text-red-600 text-xs mt-1" role="alert">{errors.employees}</p>
                      )}
                    </div>
                  </div>

                  {/* Office Requirements */}
                  <div data-error={!!errors.requirements}>
                    <label htmlFor="requirements" className={labelCls}>Office Requirements *</label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={4}
                      placeholder="Describe your workspace requirements: private executive offices, open plan desks, manager cabins, meeting rooms, layout preferences, etc."
                      className={inputCls(!!errors.requirements)}
                      onChange={() => clearFieldError('requirements')}
                      aria-invalid={!!errors.requirements}
                    />
                    {errors.requirements && (
                      <p className="text-red-600 text-xs mt-1" role="alert">{errors.requirements}</p>
                    )}
                  </div>

                  {/* Required Facilities Dropdown */}
                  <div className="relative" ref={dropdownRef} data-error={!!errors.facilities}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className={labelCls + ' mb-0'}>Required Facilities (Select all that apply) *</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={selectStandard}
                          className="text-[10px] text-navy/60 hover:text-navy underline cursor-pointer"
                        >
                          Standard Setup
                        </button>
                        <span className="text-navy/30 text-[10px]">·</span>
                        <button
                          type="button"
                          onClick={selectAll}
                          className="text-[10px] text-navy/60 hover:text-navy underline cursor-pointer"
                        >
                          Select All
                        </button>
                        <span className="text-navy/30 text-[10px]">·</span>
                        <button
                          type="button"
                          onClick={clearAll}
                          className="text-[10px] text-navy/60 hover:text-navy underline cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFacilitiesOpen((v) => !v)}
                      className={
                        'w-full border bg-white px-4 py-3 text-sm text-left flex items-center justify-between cursor-pointer transition-colors ' +
                        (errors.facilities ? 'border-red-400' : 'border-navy/20 focus:border-navy')
                      }
                      aria-invalid={!!errors.facilities}
                    >
                      <span className="truncate text-navy">
                        {selectedFacilities.length === 0
                          ? 'Click to select facilities (private offices, open space, printers, security...)'
                          : `${selectedFacilities.length} facilities selected: ${selectedFacilities.slice(0, 3).join(', ')}${selectedFacilities.length > 3 ? '...' : ''}`}
                      </span>
                      <ChevronDown className={'w-4 h-4 text-navy/50 shrink-0 transition-transform ml-2 ' + (facilitiesOpen ? 'rotate-180' : '')} />
                    </button>

                    {facilitiesOpen && (
                      <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-white border border-navy/20 shadow-2xl max-h-80 overflow-y-auto p-3 flex flex-col gap-3">
                        {/* Search Input */}
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-navy/40 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={facilitySearch}
                            onChange={(e) => setFacilitySearch(e.target.value)}
                            placeholder="Search facilities (e.g. printer, security, private, kitchen)..."
                            className="w-full pl-8 pr-8 py-2 text-xs border border-navy/15 focus:outline-none focus:border-navy"
                            onClick={(e) => e.stopPropagation()}
                          />
                          {facilitySearch && (
                            <button
                              type="button"
                              onClick={() => setFacilitySearch('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Categorized Options */}
                        <div className="flex flex-col gap-3">
                          {filteredCategories.map((group) => (
                            <div key={group.category} className="border-t border-navy/10 pt-2 first:border-t-0 first:pt-0">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-navy/50 px-2 block mb-1">
                                {group.category}
                              </span>
                              <div className="flex flex-col gap-0.5">
                                {group.items.map((facility) => {
                                  const isChecked = selectedFacilities.includes(facility)
                                  return (
                                    <label
                                      key={facility}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        toggleFacility(facility)
                                      }}
                                      className="flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-navy hover:bg-navy/5 cursor-pointer rounded-xs transition-colors"
                                    >
                                      <div
                                        className={
                                          'w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ' +
                                          (isChecked ? 'bg-navy border-navy text-white' : 'border-navy/30 bg-white')
                                        }
                                      >
                                        {isChecked && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      <span className={isChecked ? 'font-medium text-navy' : 'text-navy/75'}>
                                        {facility}
                                      </span>
                                    </label>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                          {filteredCategories.length === 0 && (
                            <p className="text-xs text-navy/50 py-3 text-center">No facilities match your search.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Error message for facilities */}
                    {errors.facilities && (
                      <p className="text-red-600 text-xs mt-1" role="alert">{errors.facilities}</p>
                    )}

                    {/* Selected Facilities Pills */}
                    {selectedFacilities.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {selectedFacilities.map((f) => (
                          <span
                            key={f}
                            onClick={() => toggleFacility(f)}
                            className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-navy bg-navy/5 border border-navy/10 px-2 py-0.5 cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                            title="Click to remove"
                          >
                            {f} <X className="w-2.5 h-2.5 ml-0.5 shrink-0" />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Start Date & Contract Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="startDate" className={labelCls}>Expected Start Date</label>
                      <input id="startDate" name="startDate" type="text" placeholder="e.g. Next month, Q1 2027" className={inputCls(false)} />
                    </div>
                    <div>
                      <label htmlFor="contract" className={labelCls}>Preferred Contract Duration</label>
                      <select id="contract" name="contract" defaultValue="" className={inputCls(false)}>
                        <option value="">Select duration</option>
                        <option value="12 months">12 months</option>
                        <option value="24 months">24 months</option>
                        <option value="Undecided">Undecided</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label htmlFor="additional" className={labelCls}>Additional Information</label>
                    <textarea id="additional" name="additional" rows={3} placeholder="Any specific infrastructure requirements, cabling, access requirements, or timeline details." className={inputCls(false)} />
                  </div>

                  {/* Summary error banner */}
                  {Object.values(errors).some(Boolean) && (
                    <div className="border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 leading-relaxed" role="alert">
                      Please fill in the required fields highlighted above before submitting.
                    </div>
                  )}

                  {status === 'error' && (
                    <p className="text-red-600 text-xs" role="alert">
                      Something went wrong. Please try again or email us directly at{' '}
                      <a href="mailto:hello@paperstreet.co.ke" className="underline">hello@paperstreet.co.ke</a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-navy text-white text-[11px] uppercase tracking-widest font-semibold px-8 py-4 hover:bg-navy/80 transition-colors disabled:opacity-60 w-full"
                  >
                    {status === 'submitting' ? 'Submitting…' : 'Submit Proposal Request'}
                  </button>

                  <p className="text-[10px] text-navy/40 leading-relaxed text-center">
                    By submitting this form you agree to Paper Street contacting you regarding your office enquiry. We do not share your details with third parties.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar Column — flat, no card */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-4">
                  Service Framework
                </span>
                <div className="flex flex-col gap-5 border-t border-navy/10 pt-5">
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-navy mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-navy uppercase tracking-wider">Client-First Sourcing</h4>
                      <p className="text-xs text-navy/65 mt-1 leading-relaxed">
                        Premises are identified specifically around your location, team size, and commercial budget in Kisumu.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-navy mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-navy uppercase tracking-wider">12 &amp; 24-Month Agreements</h4>
                      <p className="text-xs text-navy/65 mt-1 leading-relaxed">
                        Structured annual and biannual service agreements covering all physical setup and day-to-day operations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-navy mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-navy uppercase tracking-wider">Quick Response</h4>
                      <p className="text-xs text-navy/65 mt-1 leading-relaxed">
                        Our workspace advisory team reviews your specifications and responds within 1 business day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-navy/10 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy font-bold block mb-2">
                  Direct Inquiries
                </span>
                <p className="text-xs text-navy/65 leading-relaxed mb-4">
                  Prefer to speak with our workspace director directly?
                </p>
                <p className="text-xs text-navy font-mono mb-1">
                  Phone: <a href="tel:0110486677" className="text-navy hover:underline font-bold">0110486677</a>
                </p>
                <p className="text-xs text-navy font-mono mb-4">
                  WhatsApp: <a href="https://wa.me/254110486677" target="_blank" rel="noopener noreferrer" className="text-navy hover:underline font-bold">+254 110 486 677</a>
                </p>
                <p className="text-xs text-navy/50 font-mono">
                  Email: hello@paperstreet.co.ke
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
