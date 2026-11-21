# Salary-source audit — 16 November 2026

9 distinct Principal iOS/Mobile roles, one per employer. Exact annual USD employee base bands are stored in the model; display rounds to the nearest USD 1,000. Every upper bound is at least USD 200,000; none are strictly below USD 220,000, within the requested cap of five. Bonus and equity are excluded. Employer-hosted and preserved adverts are labelled separately. A successful HTTP response alone is not proof of retained job text.

## Salary evidence

| Company / Principal role | Exact USD base band | Linked evidence | Context |
| --- | --- | --- | --- |
| Snap — Principal Software Engineer, iOS | 276,000–414,000 | [Preserved advert](https://www.builtinsf.com/job/principal-software-engineer-ios/4750752) | 2025 · Zone A: CA, WA, NYC; lower bands in other zones. |
| Reddit — Principal Engineer, iOS Performance | 232,500–325,500 | [Preserved advert](https://remotestake.com/jobs/principal-engineer-ios-performance-9850301c46) | 2026 · US remote. |
| Consensys / MetaMask — Principal Mobile Engineer, Platform | 227,000–272,000 | [Preserved advert](https://jobs.electriccapital.com/companies/consensys-2-33323f7e-0ce6-439f-89d6-30a145d8d69c/jobs/85611542-principal-mobile-engineer-platform-metamask) | 2026 · US-specific band; React Native and native mobile. |
| Google — Principal Engineer, iOS Search App | 307,000–427,000 | [Preserved salary record](https://stanforiosdevelopers.substack.com/p/new-ios-hiring-activity-204) | June 2026 · CA / NYC. Dated newsletter record; original advert expired. |
| ServiceTitan — Principal Software Engineer, Mobile | 263,800–395,600 | [Employer advert](https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/principal-software-engineer--mobile_jr115706) | 2026 · iOS and Android platform. US Zone 1; Zone 2: $246,500–$369,700. |
| Slate Auto — Principal Engineer, Mobile | 202,610–337,684 | [Employer advert](https://recar.wd108.myworkdayjobs.com/en-US/SLATEcareers/job/Remote-WA/Principal-Engineer--Mobile_JR101381-1) | September 2026 · Remote WA. React Native/C++, vehicle communications and mobile security. |
| MiniMed — Principal Mobile Engineer | 153,000–261,000 | [Employer advert](https://mdtkangaroo.wd108.myworkdayjobs.com/en-US/MiniMedCareers/job/Principal-Mobile-Engineer_R-801938-1) | November 2026 · Northridge, CA band. iOS/Android medical devices; other US band $138,000–$234,000. |
| Walmart — Principal Software Engineer, Frontend (Mobile) | 110,000–220,000 | [Employer advert](https://careers.walmart.com/us/en/jobs/R-2492379) | 2026 · Bentonville, AR. React Native/Expo, iOS/Android architecture. R-2492379. |
| Zillow — Principal Software Development Engineer, iOS Mobile | 186,700–298,300 | [Preserved investor-hosted advert](https://portfoliojobs.tcv.com/companies/zillow/jobs/43993671-principal-software-development-engineer-ios-mobile) | December 2024–January 2025 · Closed US-remote advert; listed states including CA/NY/WA. Native Swift/Objective-C. |

Original five retained from the previous audit: Snap full preserved ad; Reddit Remotestake mirror replacing a rate-limited Employbl link; MetaMask closed employer text on investor board; Google dated newsletter salary record (weaker than a surviving advert); ServiceTitan employer Workday JobPosting schema. Google's original Principal advert is expired; do not combine its preserved USD 427,000 maximum with differing cached values.

New-source checks: ION, Green Dot, Slate, MiniMed, SharkNinja and Zillow returned direct HTTP 200 with retained full advert text and JobPosting data. Walmart R-2492379 retains the full employer ad with the USD 110,000–220,000 range; the different R-2628780 mobile posting is expired and its cached higher band was not used. NBCUniversal's WayUp mirror returned HTTP 200 with full employer ad text and USD 185,000–215,000 salary paragraph; the compensation widget incorrectly repeats only the lower endpoint, so use the full employer salary paragraph. The Built In copy is web-readable but direct retrieval encountered a challenge, so WayUp is linked. Zillow is explicitly historical (posted 20 December 2024, expired 16 January 2025). MiniMed's premium California band is used, with its lower US band noted. ION states it hires across levels; that weakens precision of its Principal comparison.

## Paid time off evidence

Vacation and freely usable personal days are combined in `paidLeaveDays`; company holidays remain separate. Sick, parental, caregiving, bereavement and volunteer leave are not assumed to be annual vacation. No double deductions. Unknown or unlimited counts are not zero.

| Company | Evidence / treatment | Source |
| --- | --- | --- |
| Snap | US profile: flexible vacation (exempt); 12 paid holidays. Numeric leave: unknown; holidays: 12. | [US company benefits profile](https://www.builtinnyc.com/company/snap-inc/benefits) |
| Reddit | US: flexible vacation and global days off; no counts. Ireland’s historical 25 days excluded. Numeric leave: unknown; holidays: unknown. | [Company careers](https://redditinc.com/careers) |
| Consensys / MetaMask | Company profile: unlimited vacation/holidays; recharge days not quantified annually. Numeric leave: unknown; holidays: unknown. | [Company benefits profile](https://wellfound.com/company/consensys/culture_and_benefits) |
| Google | Other US engineering ad: 20 vacation days (first five years) + 13 paid holidays. Company-policy proxy. Numeric leave: 20; holidays: 13. | [Employer US benefits disclosure](https://www.google.com/about/careers/applications/jobs/results/113654329000239814-staff-software-engineer-infrastructure-google-cloud-runtimes) |
| ServiceTitan | Employer ads: flexible time off; no recurring annual counts. Numeric leave: unknown; holidays: unknown. | [Other employer advert](https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/senior-analyst--business-operations---strategy_jr116409) |
| Slate Auto | Vacation offered; annual counts not stated. Numeric leave: unknown; holidays: unknown. | [Advert benefits](https://recar.wd108.myworkdayjobs.com/en-US/SLATEcareers/job/Remote-WA/Principal-Engineer--Mobile_JR101381-1) |
| MiniMed | PTO and holidays offered; annual counts not stated. Numeric leave: unknown; holidays: unknown. | [Advert benefits](https://mdtkangaroo.wd108.myworkdayjobs.com/en-US/MiniMedCareers/job/Principal-Mobile-Engineer_R-801938-1) |
| Walmart | Global Tech FlexTO has no fixed annual allowance; facility-staff accrual tables excluded. Numeric leave: unknown; holidays: unknown. | [Employer salaried PTO policy](https://one.walmart.com/content/dam/themepage/pdfs/PTO-Accrual-Chart-Above-Facility-Level-Salary.pdf) |
| Zillow | US benefits do not quantify annual counts. Six-year sabbatical and India allowances excluded. Numeric leave: unknown; holidays: unknown. | [Employer benefits](https://www.zillow.com/careers/benefits/) |

Google's other US engineering ad explicitly makes its benefits disclosure for eligible US employees: 20 vacation days during the first five years and 13 paid holidays. This is a current company-policy proxy for the historical Principal ad. Snap's company benefits profile on Built In supplies 12 paid holidays; its up-to-three-week non-exempt vacation bank does not apply to the exempt engineering comparison. NBCUniversal’s formerly used policy is excluded together with its salary advert.

Walmart's official salaried policy identifies Global Tech FlexTO without a set annual bank, covering vacation/personal/holidays: do not import the facility-employee accrual table. MiniMed's ad does not quantify annual allowances; do not automatically borrow former Medtronic policies. SharkNinja's ESG report mentions two floating days, one tied to volunteering, but does not establish the complete US holiday/vacation total; no partial total substituted. Zillow's six-week R&R after six years is not recurring annual leave; India-specific allowances are excluded. Reddit Ireland's historical 25 days are excluded from this US comparison. Consensys quarterly recharge wording does not establish annual days or non-overlap.

## Hourly-first calculation

Resolve each allowance from the salary ad, then applicable US company evidence, then the mean of known company counts; a last-resort fallback applies only if no count is known. Imputed values never contribute to the means. Current means: Google alone supplies 20 leave days; (12 + 13) / 2 = 12.5 holidays from Snap and Google. This sparse imputation does not establish actual time off taken at flexible-PTO employers.

Each hourly rate = upper annual base / (8 × (261 − resolved leave − resolved holidays)). Mean those 9 hourly rates equally. Apply the resulting rate to Alex's 221 eight-hour billed days.

| Company | Reference days | Upper-band hourly USD |
| --- | --- | --- |
| Snap | 229.00 | 225.98 |
| Reddit | 228.50 | 178.06 |
| Consensys / MetaMask | 228.50 | 148.80 |
| Google | 228.00 | 234.10 |
| ServiceTitan | 228.50 | 216.41 |
| Slate Auto | 228.50 | 184.73 |
| MiniMed | 228.50 | 142.78 |
| Walmart | 228.50 | 120.35 |
| Zillow | 228.50 | 163.18 |

Exact mean upper annual band: USD 327,898.22. Mean hourly: USD 179.37736891. At 221 × 8 hours: USD 317,139.19, rounded to USD 317,000 PA. Preferred SEK anchor 3,186,000, using the dated 13 November 2026 FX snapshot. This supersedes the ten-ad USD 306,000 result.

At the user’s request, removed ION/Lab49 (upper USD 200,000), SharkNinja (USD 210,000), Green Dot (USD 214,300), then NBCUniversal (USD 215,000). Their adverts no longer contribute to the table, means or target; NBCUniversal’s numeric PTO evidence is also excluded from the imputation means. These exclusions deliberately select a higher-paying sample.

## Limits and exclusions

Selected publicly advertised US bands across different employers, scopes, locations and years are market context, not a salary survey, a guaranteed offer or Aave's budget. Native iOS and cross-platform roles are distinguished in context. Geographic differences are retained, without claiming the highest local band is globally available. Company policy proxies are not proof of the historical role's exact contract. Paid holidays are treated as annual paid-workday allowances; actual employer 2027 calendars were not verified.

Excluded: Lumeris (upper USD 194,467.50 below requested floor); Procore's expired employer page without retained JobPosting; cached-only Walmart R-2628780; Staff/Senior Staff roles; aggregator-estimated salaries; RecWorks band including bonus; adjacent Salesforce iOS design/prototyping and Roblox multi-platform identity roles. Toast Android-only role remains excluded. Links and policies may change.

## Republication — 21 November 2026

Restored Walmart and MiniMed at Alex’s request, returning to nine employers and the USD 317,000 rounded target. Both linked employer pages were rechecked: Walmart retains USD 110,000–220,000, and MiniMed’s JobPosting description retains USD 153,000–261,000 for its higher-paying locations. Other salary/PTO evidence and FX remain the dated snapshots above; this is not a fresh audit of every source.
