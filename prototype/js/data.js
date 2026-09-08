// Single source of truth. Each screen reads a DIFFERENT slice of this —
// no figure is repeated verbatim across two screens.

export const user = { name: 'Ayesha Raza', initials: 'AR', ntn: '4210198-3', status: 'Filer' };

export const categories = [
  {
    slug: 'income-tax', name: 'Income Tax', icon: 'landmark', tone: '',
    rate: 'Progressive · 0–35%',
    blurb: 'What you owe on salary, business income and other earnings, and how the slabs stack up.',
    lede: 'Income tax is charged on your total taxable income for the tax year under the Income Tax Ordinance, 2001. Salaried individuals are taxed on a separate, gentler slab table than business income.',
    updated: '12 Aug 2025',
    read: '7 min',
    facts: [
      { k: 'Tax-free threshold', v: 'PKR 600,000', s: '/ year' },
      { k: 'Top marginal rate', v: '35%', s: 'above 4.1M' },
      { k: 'Return deadline', v: '30 Sep', s: 'individuals', gold: true },
    ],
    factNote: 'Salaried individuals, Tax Year 2026.',
    sections: [
      { id: 'who', t: 'Who has to file', h: `
        <p>You are required to file an annual return if any of the following applies to you in the tax year:</p>
        <ul>
          <li>Your <strong>taxable income exceeds PKR 600,000</strong>, whether from salary, business or property.</li>
          <li>You own <strong>immovable property of 250 sq yards or more</strong> in a municipal area, or any flat.</li>
          <li>You own a <strong>motor vehicle above 1000cc</strong>.</li>
          <li>You hold a <strong>commercial or industrial electricity connection</strong> with annual billing above PKR 500,000.</li>
          <li>You are registered with a chamber of commerce, a professional body, or a trade association.</li>
        </ul>
        <p>Filing when you are not strictly required to is still usually worth it — it puts you on the Active Taxpayers List, which halves most withholding rates you pay elsewhere.</p>` },
      { id: 'slabs', t: 'Salary slabs for Tax Year 2026', h: `
        <p>Tax is charged only on the portion of income that falls inside each slab — not on your whole salary at the top rate. This is the single most common misunderstanding.</p>
        <div class="tablewrap"><table class="ratetable">
          <thead><tr><th>Taxable income</th><th>Tax payable</th></tr></thead>
          <tbody>
            <tr><td>Up to 600,000</td><td>Nil</td></tr>
            <tr><td>600,001 – 1,200,000</td><td>1% of amount over 600,000</td></tr>
            <tr><td>1,200,001 – 2,200,000</td><td>6,000 + 11% of amount over 1,200,000</td></tr>
            <tr><td>2,200,001 – 3,200,000</td><td>116,000 + 23% of amount over 2,200,000</td></tr>
            <tr><td>3,200,001 – 4,100,000</td><td>346,000 + 30% of amount over 3,200,000</td></tr>
            <tr><td>Above 4,100,000</td><td>616,000 + 35% of amount over 4,100,000</td></tr>
          </tbody>
        </table></div>
        <div class="callout callout--note"><div class="callout__ico">__ICO_bulb__</div><div><div class="callout__t">Worked example</div><div class="callout__b">On a salary of <strong>PKR 2,400,000</strong> you pay nothing on the first 600,000, 1% on the next 600,000 (6,000), 11% on the next million (110,000), and 23% on the remaining 200,000 (46,000) — <strong>PKR 162,000</strong> for the year, an effective rate of 6.75%.</div></div></div>
        <p>A <strong>surcharge of 9%</strong> of the tax payable applies on top where taxable income exceeds PKR 10 million.</p>` },
      { id: 'deductions', t: 'Credits and deductible allowances', h: `
        <p>These reduce what you owe, but each is capped. Claim them in the deductions step of your return, with proof retained for six years.</p>
        <ul>
          <li><strong>Zakat</strong> paid under the Zakat and Ushr Ordinance — deductible in full from taxable income.</li>
          <li><strong>Charitable donations</strong> to approved institutions under Section 61 — a tax credit, capped at 30% of taxable income for individuals.</li>
          <li><strong>Pension fund contributions</strong> to an approved fund under Section 63 — capped at 20% of taxable income.</li>
          <li><strong>Education expenses</strong> under Section 60D where taxable income is below PKR 1.5 million — the lesser of 5% of fees, 25% of taxable income, or 60,000 per child.</li>
        </ul>` },
      { id: 'deadlines', t: 'Deadlines and what late filing costs', h: `
        <p>The return for a tax year ending 30 June is due by <strong>30 September</strong> for individuals and associations of persons. Companies with a December year-end file by 31 December.</p>
        <div class="callout callout--warn"><div class="callout__ico">__ICO_alert__</div><div><div class="callout__t">Missing the date has two separate costs</div><div class="callout__b">A late-filing penalty under Section 182 of 0.1% of tax payable per day, minimum PKR 1,000 for salaried individuals — <strong>and</strong> removal from the Active Taxpayers List, which roughly doubles the withholding tax you pay on banking, property and vehicle transactions until you are restored.</div></div></div>
        <p>You can request an extension under Section 119 before the due date. It has to be applied for, not assumed.</p>` },
    ],
    related: ['withholding-tax', 'property-tax'],
  },
  {
    slug: 'sales-tax', name: 'Sales Tax', icon: 'receipt', tone: '',
    rate: 'Standard 18%',
    blurb: 'The tax added at each stage of supply, who must register, and how input tax is adjusted.',
    lede: 'Sales tax on goods is a federal levy collected by FBR under the Sales Tax Act, 1990. Sales tax on services is provincial — a different authority, a different rate, a different return.',
    updated: '04 Sep 2025', read: '6 min',
    facts: [
      { k: 'Standard rate (goods)', v: '18%', s: 'federal' },
      { k: 'Monthly return due', v: '18th', s: 'of next month', gold: true },
      { k: 'Registration threshold', v: 'PKR 10M', s: 'retail turnover' },
    ],
    factNote: 'Goods — federal. Services rates differ by province.',
    sections: [
      { id: 'how', t: 'How the tax actually moves', h: `
        <p>Sales tax is charged at every stage of supply, but each registered business only hands over the difference between what it collected and what it paid. That difference is the value it added.</p>
        <ul>
          <li><strong>Output tax</strong> — what you charged your customers on taxable supplies.</li>
          <li><strong>Input tax</strong> — what your suppliers charged you, provided you hold a valid tax invoice.</li>
          <li>You pay <strong>output minus input</strong>. If input exceeds output, the excess carries forward or is refunded.</li>
        </ul>
        <div class="callout callout--note"><div class="callout__ico">__ICO_bulb__</div><div><div class="callout__t">The 90% cap</div><div class="callout__b">Input tax adjustment is generally restricted to <strong>90% of output tax</strong> for the month. The remaining balance carries forward rather than being lost.</div></div></div>` },
      { id: 'register', t: 'Who must register', h: `
        <p>Registration is compulsory for manufacturers above the cottage-industry limit, importers, wholesalers and distributors, and retailers whose supplies exceed the turnover threshold. Exporters register voluntarily to claim refunds on zero-rated supplies.</p>
        <p>Registration is done through IRIS and requires a bank account certificate, proof of business premises, and utility bill evidence.</p>` },
      { id: 'provincial', t: 'Services: which authority you deal with', h: `
        <p>If you supply services rather than goods, you do not deal with FBR at all — you register with your provincial revenue authority.</p>
        <div class="tablewrap"><table class="ratetable">
          <thead><tr><th>Authority</th><th>Standard rate</th></tr></thead>
          <tbody>
            <tr><td>Sindh Revenue Board (SRB)</td><td>15%</td></tr>
            <tr><td>Punjab Revenue Authority (PRA)</td><td>16%</td></tr>
            <tr><td>KP Revenue Authority (KPRA)</td><td>15%</td></tr>
            <tr><td>Balochistan Revenue Authority (BRA)</td><td>15%</td></tr>
          </tbody>
        </table></div>
        <p>Reduced rates apply to specific service categories in each province — IT services and restaurants using card payments are the common examples.</p>` },
    ],
    related: ['customs-duty', 'corporate-tax'],
  },
  {
    slug: 'property-tax', name: 'Property Tax', icon: 'building', tone: 'gold',
    rate: 'Varies · federal + provincial',
    blurb: 'Advance tax on buying and selling, capital gains on disposal, and the annual provincial levy.',
    lede: 'Property is taxed in three separate places: when you buy, when you sell, and every year you hold it. The first two are federal, the third is provincial.',
    updated: '21 Jul 2025', read: '8 min',
    facts: [
      { k: 'Advance tax on purchase', v: '3%', s: 'filer, §236K' },
      { k: 'Advance tax on sale', v: '4.5%', s: 'filer, §236C' },
      { k: 'Non-filer premium', v: 'Up to 3×', s: 'the filer rate', gold: true },
    ],
    factNote: 'Rates step up with property value; non-filer rates are substantially higher.',
    sections: [
      { id: 'buying', t: 'When you buy', h: `
        <p>Advance tax under <strong>Section 236K</strong> is collected by the registering authority at the time of transfer, calculated on the fair market value or the recorded consideration, whichever is higher.</p>
        <ul>
          <li>Filers pay a tiered rate that rises with the property value.</li>
          <li>Non-filers pay a materially higher rate, and late filers sit at a third tier in between.</li>
          <li>This is <strong>advance tax, not a final charge</strong> — it is adjustable against your annual liability when you file.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__ico">__ICO_alert__</div><div><div class="callout__t">Keep the CPR challan</div><div class="callout__b">You cannot claim the adjustment without the Computerised Payment Receipt showing the tax deposited against your CNIC. Registry offices do not reissue them.</div></div></div>` },
      { id: 'selling', t: 'When you sell', h: `
        <p>Two things happen at disposal. The registering authority collects advance tax under <strong>Section 236C</strong>, and separately you may owe <strong>capital gains tax</strong> under Section 37 on the gain itself.</p>
        <p>For property acquired on or after 1 July 2024, the gain is taxed at a flat rate for filers regardless of holding period. For older acquisitions, the rate tapers with each year held.</p>` },
      { id: 'annual', t: 'The annual provincial levy', h: `
        <p>Every province charges an annual property tax on the <strong>Annual Rental Value</strong> of urban immovable property, assessed by the local Excise and Taxation department. Rates and exemptions are set provincially, so a house in Lahore and an identical one in Karachi are not billed the same way.</p>
        <p>Self-occupied residential properties below a size threshold are commonly exempt. Rented property is assessed at a higher rate than owner-occupied.</p>` },
    ],
    related: ['income-tax', 'withholding-tax'],
  },
  {
    slug: 'withholding-tax', name: 'Withholding Tax', icon: 'percent', tone: '',
    rate: 'Deducted at source',
    blurb: 'Tax taken before the money reaches you, and how to get it back against your annual bill.',
    lede: 'Withholding is not a separate tax. It is the same income tax, collected early by whoever pays you or serves you — an employer, a bank, a telecom operator, a registry office.',
    updated: '30 Aug 2025', read: '5 min',
    facts: [
      { k: 'On salary', v: '§149', s: 'employer deducts' },
      { k: 'Statement filing', v: 'Quarterly', s: 'by agents' },
      { k: 'Non-filer rates', v: 'Doubled', s: 'in most heads', gold: true },
    ],
    factNote: 'Rates vary by transaction type and filer status.',
    sections: [
      { id: 'common', t: 'Where it hits most people', h: `
        <ul>
          <li><strong>Salary (§149)</strong> — your employer estimates your annual liability and deducts a twelfth each month.</li>
          <li><strong>Profit on debt (§151)</strong> — banks deduct on savings account and term deposit profit.</li>
          <li><strong>Services and contracts (§153)</strong> — withheld by the payer when a business pays a vendor.</li>
          <li><strong>Cash withdrawal, vehicle registration, utility bills</strong> — collected under the §231–§236 series.</li>
        </ul>` },
      { id: 'adjustable', t: 'Adjustable versus final', h: `
        <p>This distinction decides whether you get the money back.</p>
        <p><strong>Adjustable</strong> withholding is a prepayment. You add it up, enter the total in your return, and it reduces the tax you owe — or generates a refund if it exceeds your liability. Salary and most §236 collections are adjustable.</p>
        <p><strong>Final</strong> tax discharges the liability on that income entirely. You neither pay more nor reclaim it, and the income is not added to your normal taxable income.</p>
        <div class="callout callout--note"><div class="callout__ico">__ICO_bulb__</div><div><div class="callout__t">Where to find your totals</div><div class="callout__b">Your annual withholding is visible in the FBR <strong>Maloomat</strong> portal, and banks issue a withholding certificate on request. Reconcile both before filing — they occasionally disagree.</div></div></div>` },
      { id: 'atl', t: 'Why filer status changes the number', h: `
        <p>Most withholding rates carry a penal rate for people not on the Active Taxpayers List. The ATL is published weekly and reflects the previous tax year's return.</p>
        <p>A late filer is restored to the list on payment of the surcharge under Section 182A, but not retroactively — transactions completed while you were off the list stay taxed at the higher rate.</p>` },
    ],
    related: ['income-tax', 'property-tax'],
  },
  {
    slug: 'customs-duty', name: 'Customs Duty', icon: 'package', tone: '',
    rate: 'Tariff slabs 0–20%',
    blurb: 'What imports cost at the port: tariff slabs, additional duties and the levies stacked on top.',
    lede: 'Customs duty is assessed under the Customs Act, 1969 against the HS code of the goods. The headline slab is rarely the full cost — several levies stack on the same value.',
    updated: '01 Jul 2025', read: '6 min',
    facts: [
      { k: 'Tariff slabs', v: '0/3/11/16/20%', s: 'by HS code' },
      { k: 'Valuation basis', v: 'CIF', s: 'cost + insurance + freight' },
      { k: 'Filed through', v: 'WeBOC / PSW', s: 'goods declaration' },
    ],
    factNote: 'Additional and regulatory duties apply on specified items.',
    sections: [
      { id: 'stack', t: 'What actually gets charged', h: `
        <p>On a single consignment you can face four or five separate charges, each computed on a slightly different base:</p>
        <ul>
          <li><strong>Customs duty</strong> — the tariff slab for the HS code, applied to the CIF value.</li>
          <li><strong>Additional customs duty</strong> — a flat uplift on most dutiable items.</li>
          <li><strong>Regulatory duty</strong> — applied selectively to discourage import of specified goods.</li>
          <li><strong>Sales tax at import</strong> — 18% on the duty-inclusive value.</li>
          <li><strong>Advance income tax</strong> — collected under Section 148, adjustable against your annual return.</li>
        </ul>
        <div class="callout callout--warn"><div class="callout__ico">__ICO_alert__</div><div><div class="callout__t">The HS code is the whole decision</div><div class="callout__b">Classification determines every rate above. A misdeclared code is treated as an offence under the Customs Act, not a clerical error — get it confirmed before the goods declaration is filed.</div></div></div>` },
      { id: 'process', t: 'Clearing a consignment', h: `
        <p>Declarations are filed electronically through the Pakistan Single Window. The system assigns a channel — green for release without check, yellow for document scrutiny, red for physical examination.</p>
        <p>Duty is payable before release. Demurrage at the terminal accrues from the day of arrival regardless of which channel you land in, so document readiness matters more than duty rates for total landed cost.</p>` },
    ],
    related: ['sales-tax', 'corporate-tax'],
  },
  {
    slug: 'corporate-tax', name: 'Corporate Tax', icon: 'briefcase', tone: 'gold',
    rate: '29% standard',
    blurb: 'Company rates, minimum turnover tax, super tax and what a company files each year.',
    lede: 'A company is taxed on its own income separately from its shareholders. It is also subject to floors — minimum tax and alternative corporate tax — that apply even in a loss year.',
    updated: '15 Aug 2025', read: '7 min',
    facts: [
      { k: 'Standard company rate', v: '29%', s: 'of taxable income' },
      { k: 'Small company rate', v: '20%', s: 'if qualifying' },
      { k: 'Minimum turnover tax', v: '1.25%', s: '§113', gold: true },
    ],
    factNote: 'Banking companies and specified sectors are rated separately.',
    sections: [
      { id: 'rates', t: 'The rate that applies to you', h: `
        <ul>
          <li><strong>Standard company</strong> — 29% of taxable income.</li>
          <li><strong>Small company</strong> — 20%, subject to conditions on paid-up capital, turnover, employee count and not being formed by splitting an existing business.</li>
          <li><strong>Banking company</strong> — taxed under a separate, higher schedule.</li>
        </ul>` },
      { id: 'floors', t: 'The floors: minimum and alternative tax', h: `
        <p>A company pays the <strong>highest</strong> of three computations, not the one it prefers:</p>
        <ul>
          <li>Normal tax on taxable income at the applicable rate.</li>
          <li><strong>Minimum tax under Section 113</strong> — 1.25% of turnover, payable even where the company made a loss.</li>
          <li><strong>Alternative Corporate Tax under Section 113C</strong> — 17% of accounting income.</li>
        </ul>
        <p>Minimum tax paid in excess of normal tax can be carried forward and adjusted for a limited number of years.</p>` },
      { id: 'super', t: 'Super tax on high earners', h: `
        <p><strong>Section 4C</strong> imposes an additional tax on companies whose income exceeds specified thresholds, on a graduated scale. It sits on top of the corporate rate rather than replacing it.</p>
        <div class="callout callout--legal"><div class="callout__ico">__ICO_scale__</div><div><div class="callout__t">Filing obligations beyond the return</div><div class="callout__b">A company also files monthly sales tax returns where registered, quarterly withholding statements under Section 165, and quarterly advance tax instalments under Section 147.</div></div></div>` },
    ],
    related: ['sales-tax', 'withholding-tax'],
  },
];

export const byslug = Object.fromEntries(categories.map(c => [c.slug, c]));

/* --------------------------- form wizard schema --------------------------- */
export const steps = [
  {
    key: 'personal', title: 'Personal Info', kicker: 'Step 1',
    heading: 'Who is filing',
    desc: 'Taken from your NADRA and FBR registration. These must match your IRIS profile exactly or the return will be rejected at submission.',
    fields: [
      { n: 'name', l: 'Full name (as on CNIC)', req: true, ph: 'Ayesha Raza', span: 1 },
      { n: 'cnic', l: 'CNIC', req: true, ph: '4210198765432', span: 1, pattern: '^\\d{13}$',
        err: 'Enter your 13-digit CNIC without dashes.',
        tip: 'The 13 digits printed on the front of your CNIC, no dashes. Your NTN for an individual is the first 7 digits.' },
      { n: 'ntn', l: 'NTN', span: 1, ph: '4210198', hint: 'Auto-derived from CNIC for individuals.' },
      { n: 'year', l: 'Tax year', req: true, type: 'select', span: 1, opts: ['2026', '2025', '2024'] },
      { n: 'status', l: 'Residential status', req: true, type: 'select', span: 1, opts: ['Resident', 'Non-resident'],
        tip: 'You are resident if you were in Pakistan for 183 days or more during the tax year, counting part days.' },
      { n: 'email', l: 'Email', req: true, type: 'email', ph: 'you@example.com', span: 1,
        err: 'Enter a valid email — this is where your acknowledgement is sent.' },
      { n: 'address', l: 'Residential address', req: true, span: 2, ph: 'House, street, city' },
    ],
  },
  {
    key: 'income', title: 'Income Details', kicker: 'Step 2',
    heading: 'What you earned',
    desc: 'Enter gross figures for the year ended 30 June. Leave a field at zero if it does not apply to you.',
    fields: [
      { n: 'salary', l: 'Gross salary', req: true, money: true, span: 1,
        err: 'Enter your gross annual salary. Enter 0 if you had none.',
        tip: 'Your total gross pay for the year before any deduction. You can find this on your salary certificate, line 4. For more help, chat with the AI Guide.' },
      { n: 'allowances', l: 'Taxable allowances and perquisites', money: true, span: 1,
        tip: 'House rent, conveyance, utilities and bonuses that your employer has treated as taxable. Usually lines 5–9 of the salary certificate.' },
      { n: 'wht', l: 'Tax already deducted by employer', money: true, span: 1,
        tip: 'Total income tax withheld under Section 149 across the twelve months. It appears as a single figure at the foot of your salary certificate.' },
      { n: 'business', l: 'Business or professional income', money: true, span: 1 },
      { n: 'rent', l: 'Rental income from property', money: true, span: 1 },
      { n: 'profit', l: 'Profit on bank deposits', money: true, span: 1,
        tip: 'Your bank issues a withholding certificate showing profit credited and tax deducted under Section 151. Request it from your branch or download it from internet banking.' },
    ],
  },
  {
    key: 'deductions', title: 'Deductions', kicker: 'Step 3',
    heading: 'What reduces the bill',
    desc: 'Only claim amounts you can evidence. FBR can ask for proof for six years after filing.',
    fields: [
      { n: 'zakat', l: 'Zakat paid', money: true, span: 1,
        tip: 'Deductible in full where paid under the Zakat and Ushr Ordinance. Bank-deducted zakat appears on your annual bank statement.' },
      { n: 'donation', l: 'Donations to approved institutions', money: true, span: 1,
        tip: 'Only donations to institutions listed in the Thirteenth Schedule qualify. The credit is capped at 30% of taxable income.' },
      { n: 'pension', l: 'Approved pension fund contribution', money: true, span: 1 },
      { n: 'education', l: 'Children’s education expenses', money: true, span: 1,
        tip: 'Available under Section 60D only where your taxable income is below PKR 1.5 million. Capped at PKR 60,000 per child.' },
      { n: 'insurance', l: 'Life insurance premium', money: true, span: 1 },
      { n: 'declare', l: 'I have retained evidence for every amount above', req: true, type: 'checkbox', span: 2,
        err: 'You must confirm you hold evidence before continuing.' },
    ],
  },
  { key: 'review', title: 'Review', kicker: 'Step 4', heading: 'Check before you generate', desc: '', fields: [] },
];

/* --------------------------- library --------------------------- */
export const folders = [
  { n: 'Tax Year 2026', c: 4, tone: '' },
  { n: 'Tax Year 2025', c: 9, tone: '' },
  { n: 'Salary Certificates', c: 6, tone: 'gold' },
  { n: 'Property & CPR', c: 3, tone: '' },
];

export const files = [
  { n: 'Income Tax Return — TY 2026 (draft).pdf', t: 'pdf', m: 'Draft · not submitted', d: '8 Sep 2025', s: 'Draft' },
  { n: 'Wealth Statement — TY 2026.pdf', t: 'pdf', m: 'Draft · 2 sections incomplete', d: '8 Sep 2025', s: 'Draft' },
  { n: 'Salary Certificate — FY 2024-25.pdf', t: 'pdf', m: 'Uploaded from Systems Ltd', d: '2 Sep 2025', s: 'Reference' },
  { n: 'Withholding summary (Maloomat).xlsx', t: 'xls', m: 'Exported from FBR portal', d: '29 Aug 2025', s: 'Reference' },
  { n: 'Income Tax Return — TY 2025.pdf', t: 'pdf', m: 'Submitted 26 Sep 2024 · acknowledged', d: '26 Sep 2024', s: 'Filed' },
  { n: 'CPR — Advance tax on property §236K.pdf', t: 'pdf', m: 'Challan 4210198-236K-0021', d: '14 Mar 2024', s: 'Reference' },
];

/* --------------------------- assistants --------------------------- */
export const aiChips = [
  'What is my filing deadline?',
  'Explain the 11% slab',
  'Which allowances are taxable?',
  'Am I on the ATL?',
];

// Keyword-matched canned replies. `ref` renders the "View the full guide" card.
export const aiReplies = [
  { k: ['deadline', 'due date', 'when', 'last date'], ref: 'income-tax',
    a: `For individuals and associations of persons, the return for the year ended 30 June is due by <strong>30 September</strong>. Companies with a December year-end file by 31 December.<br><br>Missing it triggers a penalty under <code>§182</code> of 0.1% of tax payable per day, and removes you from the Active Taxpayers List.` },
  { k: ['slab', '11%', 'rate', 'how much tax', 'bracket'], ref: 'income-tax',
    a: `Slabs are marginal — each rate applies only to the income inside that band.<br><br>On <strong>PKR 2,400,000</strong> of salary you would pay:<ul><li>Nil on the first 600,000</li><li>1% on the next 600,000 → 6,000</li><li>11% on the next 1,000,000 → 110,000</li><li>23% on the last 200,000 → 46,000</li></ul>Total <strong>PKR 162,000</strong> — an effective rate of 6.75%, not 23%.` },
  { k: ['allowance', 'perquisite', 'bonus', 'house rent', 'taxable'], ref: 'income-tax',
    a: `House rent, conveyance, utilities and bonuses are generally <strong>taxable perquisites</strong> and form part of your gross salary.<br><br>Medical reimbursement against actual bills is exempt up to 10% of basic salary. Your salary certificate separates the two — taxable allowances sit in lines 5 to 9.` },
  { k: ['atl', 'filer', 'active taxpayer', 'non-filer'], ref: 'withholding-tax',
    a: `The Active Taxpayers List is republished every <strong>Sunday</strong> and reflects the previous tax year's return. Your profile shows <code>Filer</code> as of the current list.<br><br>Being on it roughly halves withholding on banking, property and vehicle transactions.` },
  { k: ['property', 'plot', '236k', '236c', 'buy', 'sell'], ref: 'property-tax',
    a: `Property is taxed at three separate moments: <strong>on purchase</strong> under <code>§236K</code>, <strong>on sale</strong> under <code>§236C</code> plus capital gains under <code>§37</code>, and <strong>annually</strong> by your provincial Excise and Taxation department.<br><br>The first two are adjustable against your annual return if you keep the CPR challan.` },
  { k: ['sales tax', 'gst', 'input', 'output', '18'], ref: 'sales-tax',
    a: `Standard sales tax on goods is <strong>18%</strong>, federal. You remit output tax minus input tax, with input adjustment capped at 90% of output for the month.<br><br>If you supply <em>services</em> rather than goods, you deal with your provincial authority instead — SRB, PRA, KPRA or BRA.` },
  { k: ['zakat', 'donation', 'deduction', 'credit', 'pension'], ref: 'income-tax',
    a: `Zakat paid under the Zakat and Ushr Ordinance is deductible <strong>in full</strong>.<br><br>Donations to approved institutions are a credit capped at 30% of taxable income; approved pension fund contributions are capped at 20%. Keep receipts for six years.` },
  { k: ['customs', 'import', 'hs code', 'duty'], ref: 'customs-duty',
    a: `Landed cost stacks several charges on the CIF value: customs duty by HS code, additional customs duty, any regulatory duty, 18% sales tax at import, and advance income tax under <code>§148</code>.<br><br>The HS classification determines all of them, so confirm it before filing the goods declaration.` },
  { k: ['company', 'corporate', '29', 'minimum tax'], ref: 'corporate-tax',
    a: `The standard company rate is <strong>29%</strong>, or 20% for a qualifying small company.<br><br>A company pays the highest of normal tax, minimum turnover tax at 1.25% under <code>§113</code>, or alternative corporate tax at 17% of accounting income — the floors apply even in a loss year.` },
];

export const aiFallback = {
  a: `I can help with rates, deadlines, deductions and which section applies to a transaction. Try naming the tax head — for example <em>“withholding on bank profit”</em> or <em>“advance tax when buying a plot”</em>.<br><br>For anything account-specific, Support can put you through to a person.`,
  ref: null,
};

export const faqs = [
  { q: 'How do I check if I am on the Active Taxpayers List?',
    a: 'Send your 13-digit CNIC to <strong>9966</strong> by SMS, or search the ATL on the FBR website. The list is republished every Sunday and reflects the previous tax year’s return.' },
  { q: 'I filed late. How do I get back on the ATL?',
    a: 'File the pending return, then pay the surcharge under <code>§182A</code> — PKR 1,000 for a salaried individual, 10,000 for an AOP, 20,000 for a company. Restoration takes effect from the next weekly list, not retroactively.' },
  { q: 'Can I edit a return after submitting it?',
    a: 'Yes. A revised return can be filed under <code>§114(6)</code> within five years, but if it reduces your liability it needs Commissioner approval. Revising within 60 days of the original filing does not require approval.' },
  { q: 'My employer already deducts tax. Do I still file?',
    a: 'Yes. Deduction under <code>§149</code> is a prepayment, not a substitute for filing. Filing is what puts you on the ATL and lets you reclaim any excess withheld elsewhere.' },
  { q: 'How long should I keep my records?',
    a: 'Six years from the end of the tax year to which they relate, under <code>§174</code>. Keep salary certificates, CPR challans, bank withholding certificates and donation receipts.' },
  { q: 'Does TaxIt submit my return to FBR for me?',
    a: 'No. TaxIt prepares and formats your documents. You review, download, and file them yourself through IRIS — you stay in control of what is submitted in your name.' },
];
