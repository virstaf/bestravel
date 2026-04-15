# Tutoring Panel Update

Based on the feedback, Tutoring should be an independent, modular panel on the left side that can be added to *any* service (e.g., Nannying + Tutoring), rather than just being a single dropdown option that replaces the service entirely.

## Proposed Changes

### 1. UI Layout Updates (`app/admin/pricing-calculator/page.tsx` & `tutoring-panel.tsx`)
- Keep `TutoringPanel` permanently on the left side (like `ClientDetailsPanel` and `AddOnsPanel`).
- Inside `TutoringPanel`, add a primary toggle checkbox: **"[ ] Include Tutoring Services"**.
- Only expose the Education Level, Mode, Subject Type, and Tutor Level settings if this checkbox is toggled ON.

### 2. State & Hook Logic (`hooks/use-pricing-calculator.ts`)
- Add a new state variable: `includeTutoring` (boolean).
- If `includeTutoring` is `true`:
  - Calculate the `tutoringBaseRate` from the `tutoringRates` data and `subjectAdjustments`.
  - Calculate `tutoringContractorPay` from the `tutorPay` data.
- **Merge Logic:** Add these tutoring rates *on top* of the standard service hourly rate. 

### 3. Receipt Updates (`live-quote-receipt.tsx`)
- Make the receipt display the standard "Base Rate" (e.g., for Nannying), and then show a separate line item for **"+ Tutoring Service"** indicating the added hourly cost of the tutor tier and subject.

## User Review Required / Open Questions
> [!IMPORTANT]
> **How should pricing merge if an Admin selects "Nannying" BUT ALSO checks "Add Tutoring"?**
> 1. **Additive:** We add the full Nannying Base Rate (e.g., $28/hr) + the Tutoring Base Rate (e.g., $40/hr) = **$68/hr total base rate**.
> 2. **Override (Higher Tier):** The higher Tutoring Rate completely *replaces* the Nannying base rate for the duration.
> 3. **Time Split (Not currently built):** The Admin specifies how many hours are Nannying vs how many hours are Tutoring.
> 
> *I intend to use Option 1 (Additive as a premium hourly markup) or Option 2. Please let me know what pricing behavior you expect!*
