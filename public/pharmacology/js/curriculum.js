/**
 * Nursing Pharmacology — Autonomic Drugs
 * curriculum.js
 *
 * Structure mirrors the D439 curriculum.js format:
 *   CURRICULUM.units   — array of unit objects (sections with markdown content)
 *   CURRICULUM.questions — array of question objects linked to units via unitId
 */

const CURRICULUM = {
  "units": [
    {
      "id": 1,
      "title": "Cholinergics (Parasympathomimetics)",
      "intro": "",
      "sections": [
        {
          "id": "1.1",
          "title": "Autonomic Nervous System Overview",
          "content": "### 1.1 Autonomic Nervous System Overview\n\nThe **autonomic nervous system (ANS)** regulates involuntary functions — heart rate, blood pressure, digestion, glandular secretion, and smooth muscle tone. It has two opposing divisions:\n\n| Division | Also Called | Primary Neurotransmitter | General Effect |\n|---|---|---|---|\n| **Sympathetic** | Adrenergic / \"Fight-or-flight\" | Norepinephrine (NE) | ↑ HR, ↑ BP, bronchodilation, ↓ GI motility |\n| **Parasympathetic** | Cholinergic / \"Rest-and-digest\" | Acetylcholine (ACh) | ↓ HR, ↑ GI motility, bronchoconstriction, ↑ glandular secretions |\n\n**Key anatomical facts:**\n- Both divisions use **two-neuron chains** (preganglionic → postganglionic neuron)\n- Preganglionic neurons of BOTH divisions release **acetylcholine** and act on **nicotinic receptors** at the ganglion\n- Postganglionic parasympathetic neurons release **ACh** → acts on **muscarinic receptors** at target organs\n- Postganglionic sympathetic neurons release **NE** → acts on **adrenergic receptors** at target organs\n\n> 💡 **Exam tip:** Ganglionic transmission (both divisions) = ACh + nicotinic receptor. Parasympathetic end-organ effect = ACh + muscarinic receptor.\n\n---"
        },
        {
          "id": "1.2",
          "title": "Cholinergic Receptors: Muscarinic & Nicotinic",
          "content": "### 1.2 Cholinergic Receptors: Muscarinic & Nicotinic\n\nAcetylcholine binds two major receptor classes:\n\n#### Muscarinic Receptors (M₁–M₅)\nFound on **effector organs** innervated by parasympathetic postganglionic fibers, and in the **CNS**.\n\n| Subtype | Primary Location | Effect When Stimulated |\n|---|---|---|\n| **M₁** | CNS, gastric parietal cells | Cognitive function; ↑ gastric acid |\n| **M₂** | Heart (SA node, AV node) | ↓ Heart rate; ↓ conduction velocity |\n| **M₃** | Smooth muscle, glands, eye | Bronchoconstriction; ↑ secretions; miosis; ↑ GI motility; urination |\n\n#### Nicotinic Receptors (Nₙ and Nₘ)\n\n| Subtype | Location | Effect |\n|---|---|---|\n| **Nₙ (neural)** | Autonomic ganglia (both divisions); adrenal medulla | Ganglionic transmission; epinephrine release |\n| **Nₘ (muscle)** | Neuromuscular junction (skeletal muscle) | Skeletal muscle contraction |\n\n> 💡 **SLUD mnemonic** — muscarinic stimulation causes: **S**alivation, **L**acrimation, **U**rination, **D**efecation. Add: ↓HR, bronchoconstriction, miosis.\n\n---"
        },
        {
          "id": "1.3",
          "title": "Direct-Acting Cholinergic Agonists",
          "content": "### 1.3 Direct-Acting Cholinergic Agonists\n\nThese drugs **bind and activate cholinergic receptors directly** (mimic ACh).\n\n#### Choline Esters\n\n| Drug | Receptor Selectivity | Key Uses | Key Points |\n|---|---|---|---|\n| **Bethanechol** (Urecholine) | Muscarinic only | Urinary retention; post-op/post-partum ileus | NOT broken down by cholinesterase; no nicotinic effects |\n| **Carbachol** | Muscarinic + Nicotinic | Glaucoma (ophthalmic); intraocular miosis during surgery | Resistant to cholinesterase |\n| **Methacholine** | Muscarinic | Bronchial challenge test (diagnose asthma) | Not used therapeutically |\n\n#### Naturally Occurring Alkaloids\n\n| Drug | Source | Key Uses | Key Points |\n|---|---|---|---|\n| **Pilocarpine** | Plant alkaloid | Glaucoma; xerostomia (Sjögren's) | Crosses BBB; topical or systemic |\n| **Muscarine** | Mushrooms | Research/toxicology only | Toxin — not therapeutic |\n\n**Bethanechol contraindications:** Asthma, COPD, peptic ulcer disease, GI/urinary obstruction, bradycardia, hypotension.\n\n> 💡 **Most tested direct-acting cholinergic:** Bethanechol for urinary retention. Assess bowel sounds and bladder before administering.\n\n---"
        },
        {
          "id": "1.4",
          "title": "Indirect-Acting Cholinergics (Anticholinesterases)",
          "content": "### 1.4 Indirect-Acting Cholinergics (Anticholinesterases)\n\nThese drugs **inhibit acetylcholinesterase** (the enzyme that breaks down ACh), allowing ACh to accumulate at synapses. They do NOT bind receptors directly.\n\n#### Reversible Anticholinesterases\n\n| Drug | Key Uses | Notes |\n|---|---|---|\n| **Neostigmine** (Prostigmin) | Myasthenia gravis; reverse NMB; post-op ileus/urinary retention | Does NOT cross BBB; has muscarinic + nicotinic effects |\n| **Pyridostigmine** (Mestinon) | Myasthenia gravis (mainstay) | Does NOT cross BBB; longer acting than neostigmine |\n| **Physostigmine** (Antilirium) | Antidote for anticholinergic toxicity; glaucoma | CROSSES BBB — only cholinesterase inhibitor with CNS access used clinically |\n| **Donepezil** (Aricept) | Alzheimer's disease | Crosses BBB; selective for CNS |\n| **Rivastigmine** (Exelon) | Alzheimer's; Parkinson's dementia | Crosses BBB |\n| **Galantamine** (Razadyne) | Alzheimer's disease | Crosses BBB |\n| **Edrophonium** (Tensilon) | Diagnosis of myasthenia gravis (Tensilon test) | Ultra-short acting |\n\n#### Irreversible Anticholinesterases\n\n| Drug | Uses | Notes |\n|---|---|---|\n| **Echothiophate** | Glaucoma | Long-acting; ophthalmic |\n| **Organophosphates** | Insecticides/nerve agents | Toxic agents — cause life-threatening cholinergic crisis |\n\n**Cholinergic Crisis (excess ACh/organophosphate poisoning):**\nMnemonic — **DUMBELS:** Diarrhea, Urination, Miosis, Bradycardia/Bronchospasm, Emesis, Lacrimation, Salivation\n\n**Treatment of cholinergic crisis:** Atropine (blocks muscarinic effects) + Pralidoxime/2-PAM (reactivates cholinesterase if given early enough)\n\n---"
        },
        {
          "id": "1.5",
          "title": "Therapeutic Uses of Cholinergics",
          "content": "### 1.5 Therapeutic Uses of Cholinergics\n\n| Indication | Drug(s) of Choice | Rationale |\n|---|---|---|\n| **Urinary retention** (non-obstructive) | Bethanechol | Activates M₃ on bladder detrusor → contracts bladder |\n| **Myasthenia gravis** | Pyridostigmine, Neostigmine | Anticholinesterase → ↑ ACh at NMJ → improves skeletal muscle strength |\n| **Alzheimer's disease** | Donepezil, Rivastigmine, Galantamine | Preserve ACh in CNS to slow cognitive decline |\n| **Glaucoma** (open-angle) | Pilocarpine, Carbachol, Echothiophate | Miosis → opens trabecular meshwork → ↓ intraocular pressure |\n| **Glaucoma** (narrow-angle emergency) | Pilocarpine | Pupil constriction relieves angle closure |\n| **Post-op ileus** | Neostigmine, Bethanechol | ↑ GI motility via muscarinic M₃ |\n| **Reverse NMB** | Neostigmine + glycopyrrolate | Glycopyrrolate prevents muscarinic side effects while neostigmine reverses NMB |\n| **Anticholinergic OD antidote** | Physostigmine | Crosses BBB to reverse central and peripheral anticholinergic toxicity |\n| **Sjögren's xerostomia** | Pilocarpine, Cevimeline | Stimulates salivary gland muscarinic receptors |\n\n---"
        },
        {
          "id": "1.6",
          "title": "Adverse Effects & Nursing Implications of Cholinergics",
          "content": "### 1.6 Adverse Effects & Nursing Implications of Cholinergics\n\n#### Muscarinic Adverse Effects (SLUD + CV + Respiratory)\n\n| System | Effect | Clinical Concern |\n|---|---|---|\n| **GI** | Nausea, vomiting, diarrhea, cramping, ↑ salivation | Take bethanechol on empty stomach to reduce nausea |\n| **Cardiovascular** | Bradycardia, hypotension, AV block | Hold if HR <60 or BP <90/60; have atropine at bedside |\n| **Respiratory** | Bronchoconstriction, ↑ secretions | Contraindicated in asthma/COPD |\n| **Urinary** | Urinary urgency | Desired for urinary retention; adverse in other contexts |\n| **Eyes** | Miosis, blurred vision | Counsel on visual changes; caution when driving |\n| **Glands** | Diaphoresis, lacrimation | Monitor for excess secretions |\n\n#### Nursing Priorities for Cholinergic Drugs\n\n1. **Assess** bowel sounds, bladder distension, VS before giving bethanechol\n2. **Have atropine available** as antidote (0.5–1 mg IV/IM) whenever giving systemic cholinergics\n3. **Monitor HR and BP** — bradycardia and hypotension are most dangerous adverse effects\n4. **Teach** patients to rise slowly (orthostatic hypotension risk)\n5. **Bethanechol:** Administer on an empty stomach (1 hour before or 2 hours after meals) to reduce nausea/vomiting\n6. **Contraindications to confirm before giving:** asthma, COPD, GI/urinary obstruction, bradycardia, hypotension, peptic ulcer\n\n#### Myasthenic vs. Cholinergic Crisis (Nurses Must Distinguish!)\n\n| Feature | Myasthenic Crisis | Cholinergic Crisis |\n|---|---|---|\n| **Cause** | Too LITTLE ACh (under-medicated) | Too MUCH ACh (over-medicated) |\n| **Muscle weakness** | Yes | Yes |\n| **Secretions** | Dry | Excessive (DUMBELS) |\n| **Pupils** | Normal/dilated | Miosis |\n| **Tensilon test** | Improves | Worsens |\n| **Treatment** | More cholinergic drug | Atropine; withhold drug |\n\n---"
        }
      ]
    }
  ],
  "questions": [
    {
      "id": 1,
      "title": "Bethanechol — Mechanism & Indication",
      "topic": "Cholinergics",
      "concept": "Direct-Acting Cholinergic Agonists; Bethanechol",
      "unitId": 1,
      "questionText": "A nurse is preparing to administer bethanechol (Urecholine) to a post-operative client. Which statement BEST describes the mechanism of action of this drug?",
      "options": [
        { "id": "1", "text": "It inhibits acetylcholinesterase, preventing the breakdown of acetylcholine at the synapse" },
        { "id": "2", "text": "It binds directly to muscarinic receptors, mimicking the action of acetylcholine" },
        { "id": "3", "text": "It stimulates nicotinic receptors at the neuromuscular junction to increase skeletal muscle tone" },
        { "id": "4", "text": "It blocks adrenergic receptors, allowing parasympathetic tone to predominate" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Inhibition of acetylcholinesterase is the mechanism of **indirect-acting** cholinergic drugs (anticholinesterases) such as neostigmine and pyridostigmine. These drugs increase ACh levels by blocking its breakdown. Bethanechol does NOT work this way — it acts directly on receptors, not on the enzyme.\n\n✅ **Option 2 — Correct:** Bethanechol is a **direct-acting cholinergic agonist** (parasympathomimetic). It binds **directly to muscarinic receptors** (specifically M₃ receptors on the detrusor muscle of the bladder and GI smooth muscle), activating them just as acetylcholine would. Importantly, bethanechol is resistant to breakdown by acetylcholinesterase, giving it a longer duration than ACh itself. It has **no nicotinic activity**, making its effects selective to muscarinic (parasympathetic end-organ) sites.\n\n❌ **Option 3 — Incorrect:** Bethanechol has negligible nicotinic receptor activity. It does not stimulate the neuromuscular junction to increase skeletal muscle tone. Drugs with Nₘ (neuromuscular) nicotinic agonist activity include succinylcholine (depolarizing neuromuscular blocker). Bethanechol's selectivity for muscarinic receptors is clinically significant because it avoids cardiovascular nicotinic ganglionic effects.\n\n❌ **Option 4 — Incorrect:** Bethanechol does not block adrenergic receptors. Drugs that block adrenergic receptors are classified as **antiadrenergics** (e.g., alpha-blockers, beta-blockers). While the net effect of parasympathetic stimulation can appear to oppose sympathetic tone, that is NOT the mechanism of bethanechol.\n\n> 💡 **Key distinction:** Direct-acting cholinergics (bethanechol, pilocarpine) bind receptors. Indirect-acting cholinergics (neostigmine, pyridostigmine) inhibit acetylcholinesterase. Both increase cholinergic tone but by different mechanisms.\n\n---",
      "isSATA": false
    },
    {
      "id": 2,
      "title": "Bethanechol — Contraindications",
      "topic": "Cholinergics",
      "concept": "Bethanechol; Contraindications; Safe Medication Administration",
      "unitId": 1,
      "questionText": "A nurse reviews a client's medical history before administering prescribed bethanechol. Which findings are contraindications to this drug? *(Select all that apply)*",
      "options": [
        { "id": "1", "text": "Moderate persistent asthma" },
        { "id": "2", "text": "Post-operative urinary retention with no urine output for 8 hours" },
        { "id": "3", "text": "Active duodenal ulcer" },
        { "id": "4", "text": "Mechanical bowel obstruction" },
        { "id": "5", "text": "Heart rate of 54 beats per minute" }
      ],
      "correctIds": ["1", "3", "4", "5"],
      "correctAnswerText": "1, 3, 4, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct (contraindication):** Bethanechol stimulates M₃ receptors on bronchial smooth muscle, causing **bronchoconstriction**. In a client with asthma or COPD, this could precipitate a life-threatening bronchospasm. Asthma is a firm contraindication to systemic cholinergics.\n\n❌ **Option 2 — Incorrect (NOT a contraindication — it is the indication):** Post-operative urinary retention without obstruction is the primary clinical indication for bethanechol. The drug contracts the detrusor muscle to promote bladder emptying. Option 2 describes the very scenario bethanechol is intended to treat.\n\n✅ **Option 3 — Correct (contraindication):** Bethanechol increases gastric acid secretion (M₁ effect on parietal cells) and increases GI motility. In a client with a peptic or duodenal ulcer, this can worsen the ulcer and increase the risk of GI bleeding or perforation.\n\n✅ **Option 4 — Correct (contraindication):** If mechanical obstruction is present (bowel obstruction, urinary obstruction due to BPH, stricture), stimulating smooth muscle contraction could cause **rupture** of the bladder or bowel. Bethanechol should only be used for **functional** (non-obstructive) retention.\n\n✅ **Option 5 — Correct (contraindication):** Bethanechol activates M₂ receptors in the heart, causing **bradycardia** and reduced AV conduction. A resting HR of 54 bpm is already bradycardic; administering bethanechol risks life-threatening bradycardia or heart block. The drug is contraindicated in bradycardia and hypotension.\n\n> 💡 **Pre-administration checklist for bethanechol:** Confirm no asthma/COPD, no peptic ulcer, no obstruction (GI or urinary), HR >60, BP within normal limits, bowel sounds present.\n\n---",
      "isSATA": true
    },
    {
      "id": 3,
      "title": "Cholinergic Crisis vs. Myasthenic Crisis",
      "topic": "Cholinergics",
      "concept": "Anticholinesterases; Myasthenia Gravis; Crisis Differentiation",
      "unitId": 1,
      "questionText": "A client with myasthenia gravis taking pyridostigmine develops sudden onset of profound muscle weakness, excessive secretions, miosis, and bradycardia. Which nursing action is the PRIORITY?",
      "options": [
        { "id": "1", "text": "Administer an additional dose of pyridostigmine immediately to overcome the weakness" },
        { "id": "2", "text": "Prepare to administer atropine and withhold the next pyridostigmine dose" },
        { "id": "3", "text": "Perform the Tensilon test to confirm the type of crisis before intervening" },
        { "id": "4", "text": "Elevate the head of the bed and apply supplemental oxygen via nasal cannula" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** This is the most dangerous distractor. The clinical picture — weakness WITH excessive secretions (DUMBELS), miosis, and bradycardia — indicates **cholinergic crisis** (too much ACh from anticholinesterase over-medication). Giving more pyridostigmine would worsen the crisis and could cause respiratory failure and death. Pyridostigmine is the treatment for **myasthenic crisis**, not cholinergic crisis.\n\n✅ **Option 2 — Correct:** The constellation of findings — profound weakness, excessive secretions, miosis, bradycardia — is the hallmark of **cholinergic crisis** caused by over-medication with pyridostigmine. Priority treatment is: (1) **withhold the cholinergic drug** and (2) **administer atropine** (the muscarinic antagonist antidote) to counteract the excessive parasympathetic stimulation. Ventilatory support should be ready.\n\n❌ **Option 3 — Incorrect:** While the Tensilon (edrophonium) test can distinguish crises, it is NOT the priority action in an actively deteriorating client with bradycardia and secretion overload. The clinical presentation here strongly points to cholinergic crisis. Performing a diagnostic test before treating a life-threatening crisis violates the priority principle of \"treat first, confirm second\" in emergencies. Additionally, Tensilon (an anticholinesterase) would worsen a cholinergic crisis.\n\n❌ **Option 4 — Incorrect:** Positioning and supplemental oxygen are supportive measures, not the priority intervention. While oxygen may be needed, it does not address the underlying pharmacological cause. The nurse must recognize and treat the drug-induced crisis.\n\n> 💡 **Crisis differentiation:** Myasthenic crisis = dry, needs MORE drug. Cholinergic crisis = DUMBELS (wet), needs LESS drug + atropine. Both cause weakness — the secretions and vital signs are the key differentiators.\n\n---",
      "isSATA": false
    },
    {
      "id": 4,
      "title": "Indirect-Acting Cholinergic — Alzheimer's Drugs",
      "topic": "Cholinergics",
      "concept": "Anticholinesterases; Alzheimer's Disease; CNS Cholinergics",
      "unitId": 1,
      "questionText": "A nurse is teaching a family member about donepezil (Aricept) prescribed for a client with Alzheimer's disease. Which statement by the family member indicates understanding of how this drug works?",
      "options": [
        { "id": "1", "text": "\"This drug replaces the acetylcholine that the brain can no longer make.\"" },
        { "id": "2", "text": "\"This drug slows the breakdown of acetylcholine so more is available in the brain.\"" },
        { "id": "3", "text": "\"This drug stimulates the brain to produce new memory cells.\"" },
        { "id": "4", "text": "\"This drug blocks the enzyme that destroys dopamine in the brain.\"" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Donepezil does NOT replace acetylcholine. There is no pharmacological agent that directly supplies acetylcholine to the brain. Donepezil works indirectly by preserving existing ACh — it cannot compensate for the severe and progressive loss of cholinergic neurons that characterizes Alzheimer's. This common misconception should be corrected.\n\n✅ **Option 2 — Correct:** Donepezil is a **reversible acetylcholinesterase inhibitor** (anticholinesterase). It inhibits the enzyme acetylcholinesterase in the CNS, slowing the breakdown of acetylcholine at synapses. The resulting increase in synaptic ACh improves cholinergic neurotransmission, which temporarily enhances cognition, memory, and functional ability. It does not stop disease progression.\n\n❌ **Option 3 — Incorrect:** No currently approved drug stimulates neurogenesis (formation of new neurons/memory cells) in Alzheimer's disease. Donepezil improves existing neurotransmission but cannot regenerate lost neurons. Setting this expectation would give the family false hope and is inaccurate.\n\n❌ **Option 4 — Incorrect:** Donepezil targets acetylcholinesterase, not enzymes that metabolize dopamine. Drugs that preserve dopamine (e.g., MAO-B inhibitors like selegiline) are used in Parkinson's disease, a different neurodegenerative disorder. Confusing the neurotransmitters targeted is a common exam pitfall.\n\n> 💡 **The \"4 A's\" of Alzheimer's cholinergic drugs:** Aricept (donepezil), Aricept's cousins (rivastigmine, galantamine), they all inhibit AChE (Acetylcholinesterase), and they cross the BBB (unlike neostigmine/pyridostigmine).\n\n---",
      "isSATA": false
    },
    {
      "id": 5,
      "title": "Pilocarpine — Glaucoma",
      "topic": "Cholinergics",
      "concept": "Direct-Acting Cholinergics; Pilocarpine; Glaucoma; Intraocular Pressure",
      "unitId": 1,
      "questionText": "A client newly diagnosed with open-angle glaucoma is prescribed pilocarpine eye drops. Which expected effects should the nurse include when teaching this client? *(Select all that apply)*",
      "options": [
        { "id": "1", "text": "Pupil constriction (miosis)" },
        { "id": "2", "text": "Temporary blurred vision, especially in low-light conditions" },
        { "id": "3", "text": "Increased intraocular pressure" },
        { "id": "4", "text": "Decreased aqueous humor drainage" },
        { "id": "5", "text": "Spasm of accommodation (difficulty focusing on distant objects)" }
      ],
      "correctIds": ["1", "2", "5"],
      "correctAnswerText": "1, 2, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** Pilocarpine is a direct muscarinic agonist. Stimulation of M₃ receptors on the **iris sphincter** causes pupil constriction (**miosis**). In open-angle glaucoma, miosis mechanically opens the trabecular meshwork, facilitating aqueous humor outflow and reducing intraocular pressure (IOP).\n\n✅ **Option 2 — Correct:** Miosis reduces the amount of light entering the eye, causing dim-light visual impairment. Additionally, pilocarpine causes **spasm of accommodation** (see Option 5), which creates blurred vision. Clients should be warned not to drive at night or in low-light conditions, especially early in therapy.\n\n❌ **Option 3 — Incorrect:** Pilocarpine **decreases** intraocular pressure — it does not increase it. Reduction of IOP is the entire therapeutic goal. Increased IOP is the pathology being treated, not a drug effect.\n\n❌ **Option 4 — Incorrect:** Pilocarpine **increases** aqueous humor drainage through the trabecular meshwork (opened by miosis-induced ciliary muscle contraction). Decreased drainage would worsen glaucoma. This option is the opposite of the drug's therapeutic action.\n\n✅ **Option 5 — Correct:** Muscarinic stimulation causes **ciliary muscle contraction**, fixing the lens in near-focus position (accommodation spasm). This makes distant vision blurry. Clients should be counseled about this effect and reassured that it tends to diminish with continued use as the eye accommodates to the drug.\n\n> 💡 **Pilocarpine mechanism in glaucoma:** M₃ stimulation → ciliary muscle contracts → trabecular meshwork opens → ↑ aqueous outflow → ↓ IOP. The miosis is a side effect of the same receptor activation.\n\n---",
      "isSATA": true
    },
    {
      "id": 6,
      "title": "Neostigmine — Reversing Neuromuscular Blockade",
      "topic": "Cholinergics",
      "concept": "Anticholinesterases; Neostigmine; Neuromuscular Junction; Perioperative Nursing",
      "unitId": 1,
      "questionText": "A post-operative client is given neostigmine to reverse a non-depolarizing neuromuscular blocking agent. The anesthesia provider co-administers glycopyrrolate (Robinul). What is the PRIMARY reason glycopyrrolate is given concurrently with neostigmine?",
      "options": [
        { "id": "1", "text": "To enhance the reversal of neuromuscular blockade at the neuromuscular junction" },
        { "id": "2", "text": "To prevent excessive muscarinic side effects caused by neostigmine" },
        { "id": "3", "text": "To reverse the CNS depression caused by opioid analgesics administered intraoperatively" },
        { "id": "4", "text": "To stimulate nicotinic receptors at autonomic ganglia and restore blood pressure" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Glycopyrrolate does not contribute to reversing neuromuscular blockade. The reversal of NMB is accomplished by neostigmine alone, which inhibits acetylcholinesterase at the neuromuscular junction, allowing ACh to accumulate and displace the blocking agent from nicotinic receptors.\n\n✅ **Option 2 — Correct:** Neostigmine inhibits acetylcholinesterase at ALL cholinergic synapses — including muscarinic (parasympathetic) synapses, not just the neuromuscular junction. This causes excessive muscarinic stimulation: **bradycardia, bronchospasm, increased secretions, GI cramping, and hypotension**. Glycopyrrolate is a **muscarinic antagonist (anticholinergic)** that blocks these unwanted muscarinic effects without affecting the nicotinic NMJ reversal. It is chosen over atropine because it does NOT cross the blood-brain barrier, avoiding CNS anticholinergic effects.\n\n❌ **Option 3 — Incorrect:** Glycopyrrolate has no opioid-reversing activity. Opioid reversal is accomplished with **naloxone** (Narcan), a pure opioid antagonist. This is a classic exam distractor that conflates two separate reversal agents.\n\n❌ **Option 4 — Incorrect:** Glycopyrrolate is an anticholinergic (muscarinic blocker); it does NOT stimulate nicotinic receptors. Its mechanism is antagonism at muscarinic receptors, not stimulation at ganglionic nicotinic receptors. While it may prevent bradycardia (and thus indirectly support blood pressure), its primary purpose is to block muscarinic side effects of neostigmine.\n\n> 💡 **Reversal pair rule:** Neostigmine (anticholinesterase) + Glycopyrrolate (antimuscarinic) always go together. They are sometimes given as the combination product Neostigmine/Glycopyrrolate. Atropine can substitute for glycopyrrolate but crosses the BBB.\n\n---",
      "isSATA": false
    },
    {
      "id": 7,
      "title": "Organophosphate Toxicity — Priority Intervention",
      "topic": "Cholinergics",
      "concept": "Cholinergic Crisis; Organophosphate Poisoning; Antidote; DUMBELS",
      "unitId": 1,
      "questionText": "A farm worker is brought to the emergency department after heavy exposure to an organophosphate insecticide. The nurse assesses: heart rate 42, respirations labored with audible wheezing, pupils pinpoint, profuse diaphoresis and salivation, and the client is incontinent of urine and stool. Which medication should the nurse anticipate administering FIRST?",
      "options": [
        { "id": "1", "text": "Pralidoxime (2-PAM)" },
        { "id": "2", "text": "Atropine sulfate IV" },
        { "id": "3", "text": "Physostigmine IV" },
        { "id": "4", "text": "Epinephrine 1:1000 IM" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Pralidoxime (2-PAM) IS used in organophosphate poisoning — it reactivates the inhibited acetylcholinesterase enzyme if given early (before \"aging\" of the enzyme-organophosphate bond occurs). However, it is the **second-line** agent. **Atropine must be given first** because life-threatening bronchospasm and bradycardia from muscarinic over-stimulation will kill the patient before pralidoxime can act. Pralidoxime does not block muscarinic receptors — it only restores enzyme function.\n\n✅ **Option 2 — Correct:** The clinical picture is classic **DUMBELS** (Diarrhea, Urination, Miosis, Bradycardia/Bronchospasm, Emesis, Lacrimation, Salivation) — massive cholinergic crisis from irreversible organophosphate inhibition of acetylcholinesterase. **Atropine** is the PRIORITY antidote because it is a competitive muscarinic antagonist that directly and rapidly reverses the lethal muscarinic effects (bronchospasm, bradycardia, hypersalivation). Large doses may be required (2–4 mg IV repeated every 5–10 min until secretions dry and bronchospasm resolves). Atropine does NOT address the NMJ nicotinic effects (muscle paralysis), which is why pralidoxime is also given.\n\n❌ **Option 3 — Incorrect:** Physostigmine is a cholinesterase **inhibitor** — it would dramatically **worsen** organophosphate toxicity by adding further cholinesterase inhibition on top of the organophosphate. Physostigmine is the antidote for **anticholinergic** overdose, not cholinergic crisis.\n\n❌ **Option 4 — Incorrect:** Epinephrine 1:1000 IM is the treatment for anaphylaxis. While epinephrine has some bronchodilatory and chronotropic effects that could partially oppose the cholinergic crisis, it is not the appropriate targeted treatment. The bradycardia and bronchospasm here require a muscarinic antagonist, not a catecholamine.\n\n> 💡 **Organophosphate antidotes — order matters:** FIRST give atropine (life-saving, blocks muscarinic effects) → THEN give pralidoxime if given early (regenerates enzyme). Endpoint for atropine: drying of secretions (not heart rate normalization).\n\n---",
      "isSATA": false
    },
    {
      "id": 8,
      "title": "Muscarinic Receptor Subtypes — Clinical Correlation",
      "topic": "Cholinergics",
      "concept": "Muscarinic Receptors; Receptor Pharmacology; Autonomic Physiology",
      "unitId": 1,
      "questionText": "A client develops symptomatic bradycardia after receiving excessive bethanechol. Which receptor subtype is PRIMARILY responsible for this adverse cardiac effect?",
      "options": [
        { "id": "1", "text": "M₁ receptors in the CNS and gastric parietal cells" },
        { "id": "2", "text": "M₂ receptors at the SA and AV nodes of the heart" },
        { "id": "3", "text": "M₃ receptors on vascular smooth muscle and glands" },
        { "id": "4", "text": "Nicotinic Nₙ receptors at autonomic ganglia" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** M₁ receptors are found predominantly in the CNS (involved in cognition) and on gastric parietal cells (stimulate acid secretion). Stimulation of M₁ receptors causes increased gastric acid secretion and CNS effects but is NOT responsible for bradycardia.\n\n✅ **Option 2 — Correct:** **M₂ receptors** are located at the **sinoatrial (SA) node** and **atrioventricular (AV) node** of the heart. Activation of M₂ receptors opens potassium channels (via Gi protein), hyperpolarizing the cells and decreasing the rate of spontaneous depolarization. This produces **negative chronotropy** (↓ HR) and **negative dromotropy** (↓ conduction velocity through AV node). This is the same mechanism by which vagal stimulation slows the heart. Bethanechol, as a non-selective muscarinic agonist, activates M₂ receptors, causing bradycardia and potentially heart block at high doses.\n\n❌ **Option 3 — Incorrect:** M₃ receptors are on smooth muscle (bronchi, GI tract, bladder, uterus, iris) and glands. M₃ stimulation causes bronchoconstriction, increased GI motility, bladder contraction, salivation, and lacrimation. While M₃ activation in blood vessels can cause vasodilation via NO release, M₃ is NOT the primary receptor responsible for cardiac bradycardia.\n\n❌ **Option 4 — Incorrect:** Nicotinic Nₙ receptors at autonomic ganglia are involved in ganglionic transmission — stimulating them increases both sympathetic and parasympathetic output. Bethanechol has negligible nicotinic activity (unlike acetylcholine and carbachol, which do stimulate nicotinic receptors). The cardiac effect of bethanechol is muscarinic, specifically M₂.\n\n> 💡 **Cardiac receptor memory:** M₂ = 2 nodes (SA + AV) → slows the 2 things you'd expect: rate and conduction. M₃ = everything else (smooth muscle, glands, bronchi, bladder).\n\n---",
      "isSATA": false
    }
  ]
};

