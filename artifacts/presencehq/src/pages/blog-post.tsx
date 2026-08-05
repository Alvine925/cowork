import { Link } from 'wouter'
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react'
import { blogPosts } from './blog'

// Full article content keyed by slug
const articleContent: Record<string, React.ReactNode> = {
  'virtual-office-vs-physical-office-kenya': (
    <>
      <p>
        The decision between a virtual office and a physical office is one of the most consequential financial choices a Kenyan entrepreneur or startup will make. On the surface, the question seems simple: do you pay for a desk, or do you not? In practice, the full cost comparison is far more nuanced, and most business owners underestimate the hidden costs on both sides.
      </p>
      <p>
        This guide lays out every cost line by line so you can make an informed decision based on your actual situation, not industry folklore.
      </p>

      <h2>The True Cost of a Physical Office in Nairobi</h2>
      <p>
        Let us start with the most visible cost: rent. Prime commercial space in Westlands runs between KES 120 and KES 180 per square foot per month. A modest 500 square foot office, which fits roughly four to six people comfortably, therefore costs between KES 60,000 and KES 90,000 per month before a single utility is switched on.
      </p>
      <p>Here is a realistic monthly cost breakdown for a small physical office in Nairobi:</p>
      <ul>
        <li><strong>Rent (500 sq ft, Westlands):</strong> KES 75,000</li>
        <li><strong>Service charge (building levy):</strong> KES 12,000</li>
        <li><strong>Electricity:</strong> KES 8,000</li>
        <li><strong>Water:</strong> KES 1,500</li>
        <li><strong>Internet (dedicated 10 Mbps fibre):</strong> KES 15,000</li>
        <li><strong>Security (if not included in service charge):</strong> KES 6,000</li>
        <li><strong>Cleaning (three days per week):</strong> KES 8,000</li>
        <li><strong>Office furniture amortised over three years:</strong> KES 7,500</li>
        <li><strong>Stationery, consumables:</strong> KES 3,000</li>
        <li><strong>Reception or front desk staff:</strong> KES 35,000</li>
      </ul>
      <p>
        That totals approximately KES 171,000 per month. Annualised, you are spending over KES 2 million per year simply to maintain an office that may sit empty much of the time. Add a 12-month rent deposit (KES 900,000 tied up on day one) and fit-out costs, and the first year of a physical office can cost well over KES 3 million for a small team.
      </p>

      <h2>What a Virtual Office Actually Costs</h2>
      <p>
        A PresenceHQ virtual office package starts from KES 4,500 per month and includes a prestigious business address, mail handling, a dedicated phone number with call answering, and access to meeting rooms on a pay-per-use basis. The premium package, which includes more meeting room hours and priority mail handling, is KES 12,000 per month.
      </p>
      <p>
        Even at the premium tier, the annual cost is KES 144,000. That is a saving of over KES 1.85 million per year compared with a modest physical office in the same area.
      </p>

      <h2>When a Physical Office Still Makes Sense</h2>
      <p>
        A virtual office is not the right answer for every business. There are legitimate cases where a physical space is necessary or strategically important:
      </p>
      <ul>
        <li>Businesses that require daily in-person collaboration between a large team, such as law firms, medical practices, or manufacturing operations.</li>
        <li>Companies that are legally required to maintain a staffed, accessible office, such as certain financial services licensees under the CBK or IRA.</li>
        <li>Retail operations where walk-in clients are central to the business model.</li>
        <li>Businesses where physical proximity to equipment or inventory is essential.</li>
      </ul>
      <p>
        For every other business, including professional services, consulting, technology companies, NGOs, and startups, a virtual office provides everything a physical office provides at a fraction of the cost.
      </p>

      <h2>The Verdict</h2>
      <p>
        If your team can work productively from home, from coffee shops, or from a coworking environment, and if your clients do not need to physically visit you every day, a virtual office is the financially superior choice by a wide margin. The money saved is capital that can be deployed into sales, product development, or talent, all of which create more value than square footage.
      </p>
      <p>
        Start with a virtual office. Graduate to a physical space when your revenue and team size genuinely demand it, not because of social pressure or the assumption that a real office signals credibility. In 2025, a Westlands address on your letterhead signals just as much credibility as four walls and a reception desk.
      </p>
    </>
  ),

  'register-company-kenya-2025': (
    <>
      <p>
        Registering a business in Kenya has become significantly more accessible in recent years, largely thanks to the eCitizen portal and the Business Registration Service (BRS). What once required multiple physical visits to Sheria House can now be completed almost entirely online. This guide walks you through every step clearly and in order, with notes on common mistakes and realistic timelines.
      </p>

      <h2>Step 1: Choose Your Business Structure</h2>
      <p>Before you file anything, you need to decide which legal structure suits your business:</p>
      <ul>
        <li><strong>Sole Proprietorship:</strong> The simplest structure. You and the business are legally the same entity. Suitable for individual traders and freelancers. Lower registration cost but offers no liability protection.</li>
        <li><strong>Partnership:</strong> Two or more individuals operating together. Governed by the Partnership Act. Each partner is personally liable for the business debts.</li>
        <li><strong>Private Limited Company (Ltd):</strong> A separate legal entity from its shareholders. Offers limited liability protection. Most suitable for businesses seeking investment, opening bank accounts, or tendering for government contracts.</li>
        <li><strong>Non-Governmental Organisation (NGO) or Community Based Organisation (CBO):</strong> For non-profit activities. Requires registration with the NGO Coordination Board or the relevant county authority.</li>
      </ul>
      <p>
        For most serious businesses, a private limited company is the preferred structure because of the liability protection and the credibility it confers with banks, clients, and regulators.
      </p>

      <h2>Step 2: Search and Reserve Your Company Name</h2>
      <p>
        Log in to eCitizen at ecitizen.go.ke and navigate to the Business Registration Service. Under "Company Registration," select "Name Search." You can search for up to three alternative names in a single application. The search fee is KES 150 per name.
      </p>
      <p>
        Your chosen name must not be identical or confusingly similar to an existing registered company. Avoid names that are too generic (e.g., "Kenya Business Services Ltd") or that imply a government connection (e.g., "National Authority for..."). Reserved names are held for 30 days, so begin the next step immediately.
      </p>

      <h2>Step 3: Prepare Your Documents</h2>
      <p>For a private limited company, you will need:</p>
      <ul>
        <li>Copies of the national ID or passport for each director and shareholder.</li>
        <li>KRA PIN certificates for each director and shareholder (if they do not have a PIN, they must register at iTax before proceeding).</li>
        <li>A memorandum and articles of association (the BRS portal provides a standard template that covers most businesses).</li>
        <li>The proposed share structure: how many shares, at what nominal value, and who holds what percentage.</li>
        <li>Details of the registered office address (this is where PresenceHQ can help, as our addresses are accepted as registered office addresses by the BRS).</li>
      </ul>

      <h2>Step 4: Submit the Application Online</h2>
      <p>
        Return to the BRS portal and complete the company registration form. You will enter the director and shareholder details, upload the scanned documents, and select your share structure. The government registration fee for a private limited company is KES 10,650. Payment is made via M-Pesa through the eCitizen platform.
      </p>

      <h2>Step 5: Receive Your Certificate of Incorporation</h2>
      <p>
        Once payment is confirmed and your application reviewed, the Certificate of Incorporation is issued digitally and can be downloaded from your eCitizen account. The typical processing time is 3 to 7 business days, though straightforward applications are sometimes processed within 24 hours.
      </p>

      <h2>Step 6: Obtain a Company KRA PIN</h2>
      <p>
        After incorporation, you must register the company for tax on the iTax portal. Navigate to New PIN Registration, select "Non-Individual," and enter your company details including the Certificate of Incorporation number. The company PIN is issued instantly and is required to open a business bank account, file tax returns, and complete most government transactions.
      </p>

      <h2>Step 7: Open a Business Bank Account</h2>
      <p>
        Armed with your Certificate of Incorporation, CR12 (the official register of directors, obtained from the BRS portal), KRA PIN certificate, and ID documents for all directors, you can now open a business current account. Most Kenyan banks process this within 5 to 10 business days.
      </p>

      <h2>Step 8: Obtain Any Sector-Specific Licences</h2>
      <p>
        Depending on your industry, you may need additional licences from bodies such as the Central Bank of Kenya, the Capital Markets Authority, the Insurance Regulatory Authority, the Kenya Revenue Authority, or the relevant county government. A business permit from your county of operation (typically KES 10,000 to KES 30,000 per year) is required for most businesses.
      </p>

      <h2>How Long Does the Whole Process Take?</h2>
      <p>
        If your documents are in order and you work through the process efficiently, a private limited company can be fully registered and operational in 7 to 14 days. The most common delays are caused by mismatches between the name on an ID and the name on a KRA PIN, or missing director information.
      </p>
      <p>
        PresenceHQ's company registration assistance service handles all document preparation and eCitizen submissions on your behalf, including follow-up with the BRS on your application status. Contact us to get started.
      </p>
    </>
  ),

  'professional-business-address-kenya': (
    <>
      <p>
        Remote work and distributed teams have fundamentally changed where people work. But they have not changed where people judge you. The address on your business card, your letterhead, and your email signature still communicates something to every person who reads it. In Kenya, that signal is often louder than you think.
      </p>

      <h2>The Psychology of Address Perception</h2>
      <p>
        When a potential client, banker, or government official sees "P.O. Box 12345, Nairobi" or a residential address in Ruiru or Rongai, they make an instant inference about the size, stability, and seriousness of your business. Whether that inference is fair is irrelevant. It happens, and it affects decisions.
      </p>
      <p>
        Contrast that with "Suite 400, Westlands Business Park, Waiyaki Way, Nairobi." The same mental process fires in the opposite direction. The business appears established, professional, and worth engaging with seriously.
      </p>
      <p>
        This is not a minor effect. PresenceHQ clients regularly report that upgrading to a professional address accelerated their ability to get meetings with larger companies, pass supplier vetting processes, and open bank accounts without being asked to justify their business legitimacy at length.
      </p>

      <h2>What a Business Address Actually Unlocks</h2>

      <h3>Banking</h3>
      <p>
        Kenya's commercial banks require a business address for account opening. A residential address often triggers additional scrutiny. A recognised commercial address in a known business park or office building typically passes without issue.
      </p>

      <h3>Government Tenders and Procurement</h3>
      <p>
        The Public Procurement and Asset Disposal Act requires that businesses tendering for government contracts have a verifiable physical address. A professional business address satisfies this requirement. For tenders above certain thresholds, site visits may be conducted, and PresenceHQ provides a staffed reception to receive visitors.
      </p>

      <h3>Company Registration</h3>
      <p>
        The Business Registration Service requires a registered office address for all limited companies. PresenceHQ addresses are accepted as registered office addresses by the BRS.
      </p>

      <h3>Regulatory Licences</h3>
      <p>
        Sector regulators including the CBK, CMA, and IRA require companies to have a verifiable business address. Some licences specifically require an address in a commercial building, which a PresenceHQ address satisfies.
      </p>

      <h2>Five Cities, One Professional Standard</h2>
      <p>
        PresenceHQ provides professional business addresses in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. Each address is in a recognised commercial area, not in a residential estate or a shared co-working space that is listed at a different name. When someone searches the address, they find a real commercial building with professional staff.
      </p>
      <p>
        This matters particularly for businesses expanding beyond Nairobi. Having an address in Mombasa signals to coastal clients and partners that you are present in their market, not just emailing from Nairobi.
      </p>

      <h2>What Is Included with a PresenceHQ Business Address</h2>
      <p>A business address subscription includes:</p>
      <ul>
        <li>Use of the PresenceHQ address as your official business address for all correspondence, banking, government filings, and marketing materials.</li>
        <li>Mail receipt, notification within one business day, and storage for up to 30 days.</li>
        <li>Access to a staffed reception to receive visitors and parcels on your behalf.</li>
        <li>Option to add mail scanning and forwarding, phone answering, and meeting room access.</li>
      </ul>
    </>
  ),

  'expand-business-mombasa-kisumu-nakuru': (
    <>
      <p>
        Kenya's economy is not concentrated in Nairobi alone. Mombasa is East Africa's largest port city and a gateway to regional trade. Kisumu is the economic hub of the Lake Victoria basin and increasingly a tech and innovation centre. Nakuru is one of Kenya's fastest-growing cities, driven by agriculture, manufacturing, and an expanding middle class. Eldoret is the agricultural and logistics capital of the Rift Valley.
      </p>
      <p>
        For businesses based in Nairobi looking to grow, expanding to these cities is often the next logical step. But each city has its own commercial culture, regulatory environment, and business dynamics that require preparation. This guide covers what you need to know before setting up in each.
      </p>

      <h2>Mombasa: Trade, Tourism, and the Coastal Economy</h2>
      <p>
        Mombasa's economy is anchored by the port, tourism, manufacturing in the port industrial zone, and a growing financial services sector. If your business involves import or export, logistics, shipping, hospitality, or services to coastal tourism operators, Mombasa is a high-priority expansion market.
      </p>
      <p>
        Key considerations for Mombasa:
      </p>
      <ul>
        <li><strong>Business culture:</strong> Relationships take longer to build in Mombasa. Decision-making is less transactional than in Nairobi. Expect more face time before contracts are signed.</li>
        <li><strong>Languages:</strong> Kiswahili is dominant in business settings and basic proficiency is a significant advantage. English is universally understood in professional contexts.</li>
        <li><strong>Regulation:</strong> Businesses operating in the port sector deal with the Kenya Ports Authority, Kenya Revenue Authority customs division, and the Kenya Bureau of Standards. For tourism, the Tourism Regulatory Authority has jurisdiction.</li>
        <li><strong>Connectivity:</strong> The Standard Gauge Railway connects Mombasa to Nairobi in under five hours, improving logistics significantly compared to the old rail line.</li>
      </ul>

      <h2>Kisumu: The Western Hub and the Innovation Scene</h2>
      <p>
        Kisumu has undergone a significant transformation over the past decade. The Kisumu Business and Innovation Centre, the expansion of the Kisumu International Airport, and heavy investment in the lakeside waterfront have made the city genuinely attractive for businesses beyond the traditional trade and fishing sectors.
      </p>
      <p>
        Key considerations for Kisumu:
      </p>
      <ul>
        <li><strong>Growth sectors:</strong> Agritech, health technology, logistics, and financial services are all growing rapidly. The proximity to the Lake Victoria fisheries also opens opportunities in food processing and aquaculture.</li>
        <li><strong>Regional market:</strong> Kisumu serves as a gateway not just to Western Kenya but to Uganda and Tanzania. Businesses with a regional East African ambition often use Kisumu as a second base.</li>
        <li><strong>Infrastructure:</strong> Reliable fibre internet is available in commercial areas. Power supply has improved with the expansion of the grid but backup power remains advisable.</li>
      </ul>

      <h2>Nakuru: Kenya's Fastest-Growing City</h2>
      <p>
        Nakuru was elevated to city status in 2021 and has since seen accelerating investment in retail, real estate, and services. The agricultural hinterland of the Rift Valley means there is substantial demand for agribusiness services, input supply, and food processing. A large and growing middle-income population makes Nakuru attractive for retail and consumer services businesses.
      </p>
      <p>
        Key considerations for Nakuru:
      </p>
      <ul>
        <li><strong>Real estate:</strong> Commercial property is significantly cheaper than Nairobi. A physical office that would cost KES 150,000 per month in Westlands might cost KES 40,000 in Nakuru's CBD.</li>
        <li><strong>Competition:</strong> Nakuru's professional services market is less saturated than Nairobi's, which creates an early mover advantage for businesses willing to establish a presence now.</li>
        <li><strong>Connectivity:</strong> The Nakuru-Nairobi expressway significantly reduces travel time. The city is well-served by road and rail.</li>
      </ul>

      <h2>Eldoret: The Agricultural and Logistics Capital</h2>
      <p>
        Eldoret is the commercial heart of the North Rift and a major hub for grain trading, dairy, and the flower farming industry that feeds Nairobi's export markets. The Eldoret International Airport operates direct cargo flights to Europe, making it strategically important for horticultural exporters.
      </p>
      <p>
        Key considerations for Eldoret:
      </p>
      <ul>
        <li><strong>Agribusiness opportunities:</strong> Grain trading, dairy processing, cold chain logistics, and input supply chains are all active and growing sectors.</li>
        <li><strong>Regional significance:</strong> Eldoret serves as a supply hub for much of the North Rift and parts of Uganda. Cross-border trade is a meaningful opportunity for the right businesses.</li>
        <li><strong>Talent:</strong> Moi University and a growing technical and vocational training sector produce graduates in engineering, agriculture, and business. Talent costs are lower than Nairobi.</li>
      </ul>

      <h2>How PresenceHQ Supports Your Expansion</h2>
      <p>
        Rather than committing to a physical lease in a city you are still exploring, a PresenceHQ address in Mombasa, Kisumu, Nakuru, or Eldoret lets you establish a credible local presence immediately. You get a local address for government filings and banking, a local phone number answered in your company name, and meeting room access for when you are in town. As your revenue from that market grows, the decision to invest in a physical office becomes data-driven rather than speculative.
      </p>
    </>
  ),

  'mail-handling-business-kenya': (
    <>
      <p>
        It sounds mundane. Mail. Paper. Envelopes. In an era of email and messaging apps, the physical postal system can seem like a relic. But for Kenyan businesses, physical mail remains the official channel for a surprisingly large number of high-stakes communications: court summonses, KRA assessments, government tender award letters, regulatory notices, banking correspondence, and supplier invoices.
      </p>
      <p>
        Missed or delayed physical mail can result in default judgements, lapsed licences, forfeited tenders, and banking disputes. This guide explains the risks and how a professional mail handling service mitigates them.
      </p>

      <h2>What Gets Sent by Post in Kenya (And Why It Matters)</h2>
      <p>
        Despite the prevalence of digital communication, many official and legal communications in Kenya are still issued in physical form as a matter of law or institutional practice. These include:
      </p>
      <ul>
        <li><strong>Court summonses and pleadings:</strong> Service of court process by post is legally recognised in Kenya. A summons delivered to your registered address that you fail to respond to can result in a default judgement against you.</li>
        <li><strong>Kenya Revenue Authority notices:</strong> Tax assessments, audit notices, and demands for payment are frequently issued by post to the registered business address.</li>
        <li><strong>Company Registry correspondence:</strong> Annual return reminders, compliance notices, and de-registration warnings are sent to the registered office address.</li>
        <li><strong>Bank statements and correspondence:</strong> Despite online banking, many banks still send physical account statements and formal correspondence.</li>
        <li><strong>Regulatory renewal notices:</strong> Business permit renewal reminders from county governments are typically sent by post.</li>
        <li><strong>Supplier and customer invoices:</strong> In certain industries, particularly construction, manufacturing, and government supply, invoices are still issued in physical form.</li>
      </ul>

      <h2>The Hidden Risks of No Formal Mail Handling</h2>
      <p>
        Businesses that use a residential address, a P.O. Box they check infrequently, or no formal address at all face compounding risks:
      </p>
      <ul>
        <li>Critical legal notices are delivered to an address no one checks regularly.</li>
        <li>Staff changes mean no one knows where correspondence is being delivered or how to access it.</li>
        <li>P.O. Boxes fill up and return mail to sender, including time-sensitive government correspondence.</li>
        <li>Physical distance from the P.O. Box means infrequent collection, causing delays of weeks or months.</li>
      </ul>

      <h2>What Professional Mail Handling Provides</h2>
      <p>
        A PresenceHQ mail handling service provides the following for all mail received at your registered address:
      </p>
      <ul>
        <li><strong>Same-day notification:</strong> You receive an email or SMS notification within one business day of any mail arriving, including the sender name and a brief description.</li>
        <li><strong>Secure storage:</strong> Mail is held in a secure, locked area at our premises for up to 30 days, ensuring it is not misplaced or accessed by unauthorised parties.</li>
        <li><strong>Mail scanning:</strong> Optional mail scanning allows you to receive a digital copy of the contents of your mail within hours of it arriving, without needing to collect physically.</li>
        <li><strong>Mail forwarding:</strong> We can forward your physical mail to any address in Kenya or internationally, using reputable couriers. Forwarding is invoiced at cost.</li>
        <li><strong>Parcel handling:</strong> We accept parcels of all sizes from all carriers, log them, and store them securely. You are notified immediately upon receipt.</li>
      </ul>

      <h2>Who Needs Mail Handling Most</h2>
      <p>
        Professional mail handling is particularly valuable for:
      </p>
      <ul>
        <li>Businesses with a registered address that differs from where founders or management are based day-to-day.</li>
        <li>Foreign companies with a Kenyan subsidiary or branch office where local management is limited.</li>
        <li>Businesses expanding to new cities where they do not have permanent on-site staff.</li>
        <li>Sole proprietors and freelancers who work from home and do not want to use a residential address for official correspondence.</li>
        <li>Businesses that have experienced staff turnover and want to ensure continuity of mail receipt regardless of personnel changes.</li>
      </ul>
    </>
  ),

  'meeting-room-tips-nairobi': (
    <>
      <p>
        The venue and quality of a meeting send a signal before a word is spoken. In Nairobi's professional landscape, where relationships and first impressions carry significant weight, the environment you choose for a client meeting, investor pitch, or partnership discussion shapes the outcome more than many people realise. Here are ten practical steps to ensure your next meeting is remarkable.
      </p>

      <h2>1. Choose the Right Location for Your Guest, Not for Yourself</h2>
      <p>
        Select a meeting location that is convenient for your client or investor, not the one closest to your home or favourite coffee shop. A client coming from Karen should not have to cross the city to get to Gigiri. PresenceHQ has meeting rooms in multiple Nairobi locations, so you can match the venue to where your guest is coming from.
      </p>

      <h2>2. Book in Advance and Confirm the Day Before</h2>
      <p>
        Send a calendar invitation immediately after agreeing on the meeting, including the full address, floor, and room name. Send a confirmation message the day before with any parking instructions. Cancellations and no-shows are significantly reduced when the logistical path is frictionless.
      </p>

      <h2>3. Arrive Twenty Minutes Early</h2>
      <p>
        Arriving early lets you set up the room, test the projector or screen, arrange seating, and be at the reception when your guest arrives. Being greeted personally by the host, rather than handed off to a receptionist to wait, sets a dramatically different tone.
      </p>

      <h2>4. Get the Technology Right Before Anyone Arrives</h2>
      <p>
        Nothing undermines a professional meeting faster than fumbling with HDMI adapters or waiting for a Teams link to load. Connect your laptop, test the display, start the video call if remote participants are joining, and have your presentation open before the first guest walks in. Bring your own adapter, charger cable, and a printed backup if the presentation is critical.
      </p>

      <h2>5. Personalise the Room Setup</h2>
      <p>
        A small gesture of preparation communicates that you have thought about the meeting specifically. Place branded notepads and pens at each seat. Print a simple agenda. If the room has a whiteboard, write the meeting title or the client's company name at the top. These are thirty-second actions that leave a lasting impression.
      </p>

      <h2>6. Arrange Refreshments Thoughtfully</h2>
      <p>
        Water on the table is the baseline. Coffee or tea signals a longer, more substantive engagement. Ask in advance if any guests have dietary requirements or preferences. In Nairobi's cultural context, offering tea is a universally appreciated gesture of hospitality.
      </p>

      <h2>7. Keep the Agenda Visible Throughout the Meeting</h2>
      <p>
        Share a printed or displayed agenda at the start of the meeting. Reference it when transitioning between topics. An agenda-driven meeting respects everyone's time and ensures key points are not skipped. It also positions you as someone who plans and executes with discipline, a quality clients and investors value.
      </p>

      <h2>8. Manage Time Visibly</h2>
      <p>
        Let your guests know at the start how long the meeting is scheduled for. When you approach the end of your time, flag it explicitly: "We have about ten minutes left. Let's make sure we cover the next steps." This shows respect and professionalism. Never run over without asking permission.
      </p>

      <h2>9. Summarise and Confirm Next Steps Before Anyone Leaves</h2>
      <p>
        The most effective meetings end with a clear list of agreed actions, owners, and deadlines spoken aloud before anyone stands up. Follow this within two hours with a brief email summarising the decisions and next steps. Most meetings lose momentum because the handoff from conversation to action is poorly managed.
      </p>

      <h2>10. Follow Up Within 24 Hours</h2>
      <p>
        A brief, specific follow-up email the same day or the morning after keeps the relationship warm and the momentum alive. Reference something personal or specific from the conversation to show you were genuinely engaged. This simple habit differentiates the professionals who close deals from those who have great meetings but nothing to show for them.
      </p>
    </>
  ),

  'kyc-compliance-kenya-businesses': (
    <>
      <p>
        Know Your Customer (KYC) compliance is not optional for Kenyan businesses. The Proceeds of Crime and Anti-Money Laundering Act (POCAMLA) and the regulations issued under it impose specific obligations on a wide range of businesses, not just banks. Failure to comply carries serious penalties including fines of up to KES 5 million and criminal liability for directors. This guide explains what the law requires in plain language.
      </p>

      <h2>Who Does KYC Compliance Apply To?</h2>
      <p>
        POCAMLA designates certain categories of businesses as "reporting institutions" that are subject to the most rigorous KYC requirements. These include:
      </p>
      <ul>
        <li>Banks and financial institutions licensed by the Central Bank of Kenya.</li>
        <li>Insurance companies and brokers licensed by the IRA.</li>
        <li>Capital markets intermediaries licensed by the CMA.</li>
        <li>Savings and credit cooperatives (SACCOs).</li>
        <li>Money remittance providers and mobile money operators.</li>
        <li>Real estate agents handling property transactions above a specified threshold.</li>
        <li>Lawyers and accountants handling client funds or real estate transactions.</li>
        <li>Dealers in precious metals and stones.</li>
        <li>Virtual asset service providers.</li>
      </ul>
      <p>
        Beyond this list, all businesses have basic obligations to verify the identity of their clients, particularly for cash transactions above KES 1 million or any transaction that appears suspicious regardless of amount.
      </p>

      <h2>The Core KYC Requirements</h2>

      <h3>Customer Due Diligence (CDD)</h3>
      <p>Before entering into a business relationship with a new client, you must:</p>
      <ul>
        <li>Identify the client and verify their identity using reliable, independent documents.</li>
        <li>For individuals: national ID, passport, or alien ID card. Supplement with a utility bill or bank statement to verify address.</li>
        <li>For companies: Certificate of Incorporation, CR12 (current register of directors and shareholders), KRA PIN certificate, and ID documents for all directors and beneficial owners holding more than 25% of shares.</li>
        <li>Understand the nature and purpose of the business relationship.</li>
        <li>Conduct ongoing monitoring of the relationship to ensure transactions are consistent with your understanding of the client's business.</li>
      </ul>

      <h3>Enhanced Due Diligence (EDD)</h3>
      <p>
        Enhanced Due Diligence is required for clients who present a higher risk of money laundering or terrorism financing. This includes:
      </p>
      <ul>
        <li>Politically exposed persons (PEPs): current or former senior government officials, senior executives of state corporations, and their immediate family members.</li>
        <li>Clients from high-risk jurisdictions as designated by the Financial Action Task Force (FATF).</li>
        <li>Non-face-to-face business relationships where identity cannot be verified in person.</li>
        <li>Clients whose transaction patterns are unusual or inconsistent with their stated business.</li>
      </ul>
      <p>
        EDD requires obtaining additional information about the client, the source of their funds, and the purpose of specific transactions. It may also require senior management approval before onboarding.
      </p>

      <h2>Record Keeping Requirements</h2>
      <p>
        All KYC records must be retained for a minimum of five years from the end of the business relationship. This includes:
      </p>
      <ul>
        <li>All identity verification documents.</li>
        <li>Records of all transactions above the applicable threshold.</li>
        <li>Copies of all suspicious transaction reports filed with the Financial Reporting Centre.</li>
        <li>Records of all risk assessments conducted on clients.</li>
      </ul>
      <p>
        Records must be kept in a format that allows them to be retrieved quickly in response to a request from the Financial Reporting Centre, the Kenya Revenue Authority, or law enforcement.
      </p>

      <h2>Suspicious Transaction Reporting</h2>
      <p>
        If you have reason to suspect that a transaction involves money laundering, terrorism financing, or the proceeds of crime, you have a legal obligation to file a Suspicious Transaction Report (STR) with the Financial Reporting Centre (FRC) within three business days of forming that suspicion. Tipping off the client about the STR is a criminal offence.
      </p>

      <h2>Penalties for Non-Compliance</h2>
      <p>
        The Financial Reporting Centre has enforcement powers including the ability to conduct audits, issue compliance notices, and impose financial penalties. Penalties for failure to conduct customer due diligence can reach KES 5 million for companies. Individuals, including directors, can face criminal prosecution and imprisonment.
      </p>

      <h2>Practical Steps for Compliance</h2>
      <ul>
        <li>Develop a written Anti-Money Laundering (AML) policy that covers your customer due diligence procedures, record-keeping obligations, and suspicious transaction reporting process.</li>
        <li>Designate a compliance officer responsible for AML/KYC obligations.</li>
        <li>Train all staff who interact with clients on KYC requirements and suspicious transaction indicators.</li>
        <li>Review your client base periodically and update KYC information, particularly for high-risk clients.</li>
        <li>Register with the Financial Reporting Centre if you are a reporting institution.</li>
      </ul>
    </>
  ),

  'hot-desk-dedicated-desk-difference': (
    <>
      <p>
        The traditional office lease is a five-year commitment with a rent deposit, fit-out costs, and the anxiety of a fixed overhead that does not flex with your revenue. For most businesses today, particularly those that operate with hybrid or remote teams, there is a better option: flexible workspace. But within flexible workspace, the choice between a hot desk and a dedicated desk is a decision worth thinking through carefully. Here is a clear breakdown of both.
      </p>

      <h2>What Is a Hot Desk?</h2>
      <p>
        A hot desk is an unassigned workstation that you use on a first-come, first-served basis within a coworking environment. You arrive, find an available desk, set up for the day, and pack up when you leave. Your belongings do not have a permanent home in the space.
      </p>
      <p>
        Hot desks are ideal for:
      </p>
      <ul>
        <li>Individuals or very small teams who only need workspace two to three days per week.</li>
        <li>Businesses that want to provide occasional workspace for remote employees without committing to a full desk for each person.</li>
        <li>Freelancers and consultants who need a professional environment on client meeting days or when working from home is not productive.</li>
        <li>Businesses that are exploring a new city before committing to more permanent infrastructure.</li>
      </ul>

      <h2>What Is a Dedicated Desk?</h2>
      <p>
        A dedicated desk is a specific, assigned workstation in a coworking environment that is exclusively yours. You can leave your equipment, personalise the space, and return to the same desk every day. You have a locked drawer or cabinet for personal items. The desk is yours and only yours during your subscription period.
      </p>
      <p>
        Dedicated desks are ideal for:
      </p>
      <ul>
        <li>Individuals or small teams that work in-person four or more days per week.</li>
        <li>People whose work requires multiple monitors, specialised equipment, or a consistently organised desk setup.</li>
        <li>Businesses where arriving to find no available workspace would disrupt operations or client meetings.</li>
        <li>Team members who benefit from the psychological anchor of having a fixed work location.</li>
      </ul>

      <h2>The Cost Difference</h2>
      <p>
        Hot desks are priced lower, typically 30 to 50 percent less than dedicated desks. At PresenceHQ, hot desk access is available from KES 2,500 per day or on a monthly pass basis. Dedicated desks are priced as a monthly subscription with priority access guaranteed.
      </p>
      <p>
        The cost-effectiveness calculation depends on frequency of use. If you need workspace fewer than 15 days per month, a hot desk day pass or a flexible monthly pass will almost always be cheaper than a dedicated desk. Beyond 20 days per month, a dedicated desk becomes more economical and operationally simpler.
      </p>

      <h2>Practical Considerations Often Overlooked</h2>
      <ul>
        <li><strong>Security of equipment:</strong> If you leave a desktop monitor, high-value peripherals, or confidential documents at your workspace, a hot desk is not appropriate. Dedicated desks come with secure storage.</li>
        <li><strong>Team cohesion:</strong> If you have multiple team members using a coworking space, adjacent dedicated desks ensure the team sits together every day, preserving collaboration. Hot desks scatter a team unpredictably.</li>
        <li><strong>Client perception:</strong> Meetings conducted at a dedicated desk area look different from a hot desk area. If clients visit your workspace, a dedicated setup presents more professionally.</li>
        <li><strong>Availability anxiety:</strong> During busy periods, hot desks at popular locations fill up quickly. If arriving to find no space would be a problem, a dedicated desk eliminates the risk entirely.</li>
      </ul>

      <h2>The Right Choice for Most Kenyan SMEs</h2>
      <p>
        For solo founders and small teams in their first year who are still calibrating how often they need shared workspace, start with a hot desk. It preserves cash, gives you flexibility, and lets you evaluate which days and locations suit your work style. As your team grows and your routine solidifies, transitioning to dedicated desks for key team members is a natural and cost-justified step.
      </p>
    </>
  ),

  'freelancer-professional-presence-kenya': (
    <>
      <p>
        Going independent is one of the best decisions a talented professional can make. But it comes with a perception problem that most freelancers and consultants underestimate until they lose a contract because of it. Clients, particularly corporate clients and NGOs, often apply different standards to individual contractors than to incorporated businesses. They want to see a professional setup before they commit to meaningful work.
      </p>
      <p>
        The good news is that building a credible professional presence in 2025 is genuinely affordable. Here is how to do it without burning your first three invoices on overhead.
      </p>

      <h2>1. Incorporate a Limited Company</h2>
      <p>
        This is the single most impactful step. Operating as a sole proprietor signals to corporate procurement teams that you are a freelancer. Operating as a limited company signals that you are a business. The difference in how you are treated in vendor vetting processes, negotiations, and payment terms is significant.
      </p>
      <p>
        Company registration in Kenya costs approximately KES 10,650 in government fees. PresenceHQ's company registration assistance handles the paperwork for a flat fee. The psychological and commercial return on this investment is disproportionate.
      </p>

      <h2>2. Get a Professional Business Address</h2>
      <p>
        Your company's registered address is publicly visible via the Business Registration Service. If it is your home address in a residential estate, anyone who looks up your company sees it. A PresenceHQ address in Westlands, Kilimani, or another recognised commercial area changes the profile of your company immediately.
      </p>
      <p>
        This also allows you to separate your personal residential address from your business operations entirely, which is good for privacy and professionalism.
      </p>

      <h2>3. Use a Professional Email Domain</h2>
      <p>
        "yourname@gmail.com" on an invoice or proposal to a corporate client is a red flag that signals you are operating informally. "yourname@yourcompany.co.ke" is the standard. Google Workspace and Microsoft 365 both offer business email for under KES 1,500 per user per month. This is a non-negotiable investment.
      </p>

      <h2>4. Set Up a Phone Number That Answers Professionally</h2>
      <p>
        If a procurement officer calls your number and reaches a personal voicemail greeting with your first name, that is another signal that you are not operating at a business level. A PresenceHQ dedicated business line, answered with your company name by a trained receptionist, changes that signal entirely. Calls are taken during business hours and messages are relayed to you via email or WhatsApp.
      </p>

      <h2>5. Build a Simple, Professional Website</h2>
      <p>
        A website does not need to be elaborate. A clean, well-written site with your services, credentials, and a contact form is sufficient. Include your PresenceHQ address in the footer. List your company registration number. Link to your LinkedIn profile. These small details signal legitimacy to anyone evaluating you as a supplier.
      </p>

      <h2>6. Use a Contract Template for Every Engagement</h2>
      <p>
        Issuing a formal written contract for every engagement, even small ones, positions you as a business professional rather than an informal vendor. Templates from the Law Society of Kenya or standard consultancy agreement templates adapted by a Kenyan lawyer are a worthwhile one-time cost. Once you have a template, it costs you nothing to use it repeatedly.
      </p>

      <h2>7. Invoice Professionally with Tax Compliance</h2>
      <p>
        Your invoices should include your company name, registration number, KRA PIN, the client's details, a clear description of services, payment terms, and your bank account details. Invoices should be issued in PDF format from accounting software, not handwritten or typed in Word. If you are VAT-registered, include the VAT computation clearly.
      </p>

      <h2>8. Book Meeting Rooms for Client Meetings</h2>
      <p>
        When a client wants to meet, book a PresenceHQ meeting room rather than proposing a coffee shop. A boardroom meeting signals seriousness. It also gives you a neutral, professional venue where you control the environment and the equipment. The per-hour cost of a meeting room is negligible against the value of the impression it creates.
      </p>
    </>
  ),

  'kenya-data-protection-act-smes': (
    <>
      <p>
        The Kenya Data Protection Act (DPA) came into force in 2019, and the Office of the Data Protection Commissioner (ODPC) has been building enforcement capacity steadily since then. In 2024, the ODPC began issuing formal compliance notices and fines. For small and medium businesses that have been waiting to see whether the law would actually be enforced before taking action, the answer is now clear: it is.
      </p>
      <p>
        The maximum penalty under the DPA is KES 5 million or imprisonment of up to ten years for criminal offences. Civil penalties for data breaches range from KES 3 million to KES 5 million. This guide explains what your business must do to be compliant.
      </p>

      <h2>Does the DPA Apply to Your Business?</h2>
      <p>
        The DPA applies to any person or organisation that collects, processes, stores, or shares personal data in Kenya, or that processes data of Kenyan residents from outside the country. There is no minimum size threshold. A one-person consultancy that collects client email addresses is subject to the DPA.
      </p>
      <p>
        "Personal data" is defined broadly to include any information that can be used to identify an individual, directly or indirectly. This includes names, email addresses, phone numbers, physical addresses, ID numbers, IP addresses, location data, and health information.
      </p>

      <h2>Core Obligations Under the DPA</h2>

      <h3>Registration as a Data Controller or Processor</h3>
      <p>
        Businesses that collect or process personal data as part of their core activities must register with the ODPC as data controllers or data processors. Registration is done through the ODPC portal and requires payment of a registration fee. Operating without registration when required is itself an offence.
      </p>

      <h3>Lawful Basis for Processing</h3>
      <p>
        Every time you collect or process personal data, you must have a lawful basis for doing so. The DPA recognises six lawful bases:
      </p>
      <ul>
        <li><strong>Consent:</strong> The individual has given clear, informed, and specific consent to the processing. Consent must be as easy to withdraw as to give.</li>
        <li><strong>Contract:</strong> Processing is necessary to perform a contract with the individual or to take steps at their request before entering a contract.</li>
        <li><strong>Legal obligation:</strong> Processing is required by law, for example KYC obligations under POCAMLA.</li>
        <li><strong>Vital interests:</strong> Processing is necessary to protect the life of the individual.</li>
        <li><strong>Public task:</strong> Processing is necessary for a task in the public interest or in the exercise of official authority.</li>
        <li><strong>Legitimate interests:</strong> Processing is necessary for the legitimate interests of the controller, provided those interests are not overridden by the individual's rights.</li>
      </ul>

      <h3>Privacy Notice</h3>
      <p>
        Every business that collects personal data must provide individuals with a clear privacy notice at the point of collection. This notice must explain who you are, what data you collect, why you collect it, how long you keep it, who you share it with, and what rights the individual has. A privacy notice on your website, supplemented by a brief notice at the point of data collection (e.g., on a sign-up form), is the standard approach.
      </p>

      <h3>Data Subject Rights</h3>
      <p>
        Individuals whose data you hold have rights that you must be able to honour within 21 days of a request:
      </p>
      <ul>
        <li>The right to access a copy of their data.</li>
        <li>The right to correct inaccurate data.</li>
        <li>The right to deletion in certain circumstances.</li>
        <li>The right to object to processing based on legitimate interests.</li>
        <li>The right to data portability (receiving data in a structured, machine-readable format).</li>
      </ul>

      <h3>Data Breach Notification</h3>
      <p>
        If your business suffers a data breach that is likely to result in a risk to individuals, you must notify the ODPC within 72 hours of becoming aware of it. If the breach is likely to result in a high risk to individuals, you must also notify the affected individuals directly without undue delay. Failing to report a notifiable breach is a separate offence.
      </p>

      <h2>Practical Steps to Achieve Compliance</h2>
      <ul>
        <li>Conduct a data audit: map every category of personal data you collect, where it comes from, what you do with it, who you share it with, and how long you keep it.</li>
        <li>Register with the ODPC as a data controller or data processor.</li>
        <li>Draft and publish a Privacy Policy on your website that is specific to your business, not a generic template.</li>
        <li>Review your consent mechanisms: opt-in tick boxes must be unticked by default and must describe specifically what the individual is consenting to.</li>
        <li>Put a Data Processing Agreement in place with any third party that processes personal data on your behalf, such as your cloud storage provider, payroll software, or email marketing platform.</li>
        <li>Train all staff who handle personal data on their obligations under the DPA.</li>
        <li>Create an internal process for handling data subject requests and data breaches.</li>
      </ul>
    </>
  ),

  'reception-services-kenya-smb': (
    <>
      <p>
        There is a version of this story that plays out across thousands of Kenyan businesses every week. A potential client calls to enquire about your services. The call goes unanswered. They do not leave a voicemail. They move on and call your competitor. You never knew the call came in, and the opportunity is gone.
      </p>
      <p>
        Research consistently shows that over 70 percent of callers who reach voicemail do not call back. In a business context where the cost of acquiring a new client can run into tens of thousands of shillings, a missed call is not a minor inconvenience. It is a quantifiable commercial loss.
      </p>

      <h2>Why Small Businesses Miss Calls</h2>
      <p>
        The reasons are predictable and understandable: founders are in meetings, on site, travelling, or simply in the middle of work that cannot be interrupted. Hiring a dedicated receptionist seems like a luxury when the call volume does not justify a full-time salary. So the calls go unanswered, or they go to a personal voicemail with a greeting that mentions only a first name, which compounds the impression of informality.
      </p>

      <h2>What a Virtual Receptionist Actually Does</h2>
      <p>
        A PresenceHQ reception service provides you with a trained, professional receptionist who answers calls in your company name during business hours. The experience from the caller's perspective is identical to calling a company with a full-time front desk.
      </p>
      <p>
        Specifically, the service works as follows:
      </p>
      <ul>
        <li>You provide us with a brief about your business: your company name, the services you offer, frequently asked questions, and any specific instructions for handling calls (for example, "if a client calls about an outstanding invoice, take a message and say the accounts team will call back within two hours").</li>
        <li>All inbound calls to your dedicated business number are answered by a PresenceHQ receptionist with a greeting in your company name.</li>
        <li>The receptionist handles routine enquiries, takes detailed messages, and relays them to you via email or WhatsApp within minutes.</li>
        <li>For calls that require your direct involvement, the receptionist can attempt to transfer the call to your mobile number or take a callback number.</li>
        <li>You receive a daily call log summarising all calls received.</li>
      </ul>

      <h2>The Business Case in Numbers</h2>
      <p>
        If a professional receptionist service costs KES 6,000 per month and it captures even one client enquiry per month that would otherwise have been missed, and that client's lifetime value is KES 50,000, the return on investment is over 700 percent. Most businesses that implement the service report capturing multiple enquiries per month that they would previously have lost.
      </p>
      <p>
        Contrast this with the cost of a full-time receptionist: salary of KES 35,000 to KES 50,000 per month, plus NHIF, NSSF, leave provisions, and replacement costs when they resign. For a small business that does not need a full-time front desk, the virtual option provides 90 percent of the benefit at 10 to 15 percent of the cost.
      </p>

      <h2>Beyond Call Answering: What Else a Receptionist Does for Your Brand</h2>
      <p>
        A professional receptionist does more than answer calls. They are the first human voice a potential client hears. The warmth, competence, and professionalism of that interaction shapes the client's perception of your entire organisation before they have seen your office, your website, or your proposal. A receptionist who answers confidently in your company name, handles the enquiry gracefully, and relays a detailed message creates a stronger impression than a brilliant pitch delivered two days later in response to a voicemail.
      </p>
      <p>
        For businesses that receive physical visitors at a PresenceHQ address, the receptionist also greets and announces visitors, signs for deliveries, and ensures your guests are welcomed appropriately. The experience of being greeted professionally at a staffed reception in a quality building is one of the most effective ways to elevate a client's perception of your business at minimal cost.
      </p>
    </>
  ),
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-navy mb-4">Post not found</h1>
          <Link href="/blog" className="text-gold hover:underline">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const content = articleContent[post.slug]
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex flex-col overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/80" />
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-16 container mx-auto max-w-4xl pt-28">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-widest font-medium transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/15 border border-gold/30 px-3 py-1 rounded-full w-fit mb-5">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mt-8 text-white/60 text-sm">
            <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 72" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full">
            <path d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z" />
          </svg>
        </div>
      </section>

      {/* Article body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          {/* Author strip */}
          <div className="flex items-center gap-4 mb-14 pb-10 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
              <span className="text-navy font-bold text-sm">{post.author.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <p className="font-semibold text-navy text-sm">{post.author}</p>
              <p className="text-dark-gray/50 text-xs">{post.authorRole}, PresenceHQ</p>
            </div>
          </div>

          {/* Content */}
          {content ? (
            <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:text-navy prose-h2:text-2xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-dark-gray/80 prose-li:text-dark-gray/80 prose-a:text-gold">
              {content}
            </div>
          ) : (
            <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:text-navy">
              <p className="text-dark-gray/70 leading-relaxed">{post.excerpt}</p>
              <p className="text-dark-gray/50 text-sm mt-8">Full article coming soon. Check back shortly.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 p-10 bg-navy rounded-2xl text-center">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Ready to get started?</p>
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">
              Establish your professional presence today.
            </h3>
            <p className="text-white/60 text-sm font-light mb-8 max-w-md mx-auto">
              Join hundreds of Kenyan businesses that trust PresenceHQ for their business address, mail handling, and flexible workspace needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-white text-sm font-semibold px-8 py-3 rounded-md hover:bg-gold-600 transition-colors"
            >
              Talk to Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <section className="py-16 bg-light-gray border-t border-gray-100">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl grid sm:grid-cols-2 gap-6">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`}>
                <div className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <ArrowLeft className="w-5 h-5 text-gold mt-0.5 shrink-0 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-dark-gray/40 mb-2">Previous</p>
                    <p className="text-sm font-semibold text-navy leading-snug group-hover:text-gold transition-colors">{prevPost.title}</p>
                  </div>
                </div>
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`}>
                <div className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer sm:flex-row-reverse sm:text-right ml-auto w-full">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-dark-gray/40 mb-2">Next</p>
                    <p className="text-sm font-semibold text-navy leading-snug group-hover:text-gold transition-colors">{nextPost.title}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  )
}
