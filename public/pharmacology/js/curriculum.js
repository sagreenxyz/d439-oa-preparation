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
    },
    {
      "id": 2,
      "title": "Anticholinergics (Parasympatholytics)",
      "intro": "",
      "sections": [
        {
          "id": "2.1",
          "title": "Mechanism of Anticholinergic Action",
          "content": "### 2.1 Mechanism of Anticholinergic Action\n\n**Anticholinergics** (parasympatholytics or muscarinic antagonists) **competitively block muscarinic receptors**, preventing acetylcholine from binding. They do NOT block nicotinic receptors at usual clinical doses.\n\n| Parameter | Cholinergic Stimulation | Anticholinergic Effect |\n|---|---|---|\n| Heart rate | Decreases (M₂) | **Increases** (tachycardia) |\n| GI motility | Increases | **Decreases** (constipation, ileus) |\n| Salivation | Increases | **Decreases** (dry mouth) |\n| Bronchi | Constricts + ↑ secretions | **Dilates**, ↓ secretions |\n| Pupils | Miosis | **Mydriasis** (dilation) |\n| Bladder | Contracts (voids) | **Relaxes** (urinary retention) |\n| Sweat glands | Increases | **Decreases** (hot, dry skin) |\n| CNS | Variable | Sedation/confusion/delirium |\n\n> 💡 Anticholinergics are the pharmacological **opposite** of cholinergic drugs in every row above.\n\n---"
        },
        {
          "id": "2.2",
          "title": "Key Anticholinergic Drug Prototypes",
          "content": "### 2.2 Key Anticholinergic Drug Prototypes\n\n#### Tertiary Amines (Cross BBB → CNS effects possible)\n\n| Drug | Primary Use | Key Points |\n|---|---|---|\n| **Atropine** | Bradycardia (ACLS); pre-op; organophosphate antidote; ophthalmic | Prototype of the class |\n| **Scopolamine** | Motion sickness; post-op nausea | Transdermal; CNS sedation |\n| **Benztropine** (Cogentin) | Parkinson's; EPS from antipsychotics | Best for tremor/rigidity |\n| **Oxybutynin** (Ditropan) | Overactive bladder | Beers Criteria — avoid in elderly |\n| **Tolterodine** (Detrol) | Overactive bladder | More bladder-selective |\n| **Dicyclomine** (Bentyl) | IBS smooth muscle spasm | GI antispasmodic |\n\n#### Quaternary Ammonium (Do NOT Cross BBB → peripheral only)\n\n| Drug | Primary Use | Key Points |\n|---|---|---|\n| **Glycopyrrolate** (Robinul) | Pre-op secretions; neostigmine co-admin | No CNS effects |\n| **Ipratropium** (Atrovent) | COPD/asthma maintenance | Inhaled; minimal systemic absorption |\n| **Tiotropium** (Spiriva) | COPD long-acting maintenance | Once-daily; superior for COPD |\n| **Trospium** | Overactive bladder | No BBB — preferred in elderly |\n\n---"
        },
        {
          "id": "2.3",
          "title": "Therapeutic Uses of Anticholinergics",
          "content": "### 2.3 Therapeutic Uses of Anticholinergics\n\n| Clinical Indication | Drug(s) | Rationale |\n|---|---|---|\n| **Symptomatic bradycardia** | Atropine | Blocks M₂ at SA/AV nodes → ↑ HR; ACLS first-line |\n| **Pre-operative antisialagogue** | Glycopyrrolate, Atropine | Reduces secretions for airway management |\n| **COPD/Asthma maintenance** | Ipratropium, Tiotropium | Blocks M₃ bronchial smooth muscle → bronchodilation |\n| **Parkinson's disease** | Benztropine, Trihexyphenidyl | Reduces relative cholinergic excess → ↓ tremor/rigidity |\n| **Drug-induced EPS** | Benztropine | Blocks cholinergic excess from dopamine receptor blockade |\n| **Motion sickness** | Scopolamine | Blocks CNS muscarinic receptors in vestibular nuclei |\n| **Overactive bladder** | Oxybutynin, Tolterodine, Trospium | Relaxes detrusor muscle (M₃ blockade) |\n| **GI spasm (IBS)** | Dicyclomine | Reduces GI smooth muscle spasm |\n| **Cycloplegic refraction** | Atropine, Tropicamide | Paralyzes ciliary muscle for ophthalmic exam |\n| **Organophosphate antidote** | Atropine (large doses) | Competes with excess ACh at muscarinic receptors |\n\n---"
        },
        {
          "id": "2.4",
          "title": "Anticholinergic Adverse Effects & Toxidrome",
          "content": "### 2.4 Anticholinergic Adverse Effects & Toxidrome\n\n**Mnemonic:** \"Blind as a bat, dry as a bone, red as a beet, hot as Hades, mad as a hatter, full as a flask, fast as a fiddle\"\n\n| Phrase | Effect | Mechanism |\n|---|---|---|\n| Blind as a bat | Mydriasis, blurred vision, cycloplegia | M₃ block → iris sphincter relaxes |\n| Dry as a bone | Xerostomia, dry skin, ↓ secretions | M₃ block → glands |\n| Red as a beet | Flushing | Cutaneous vasodilation (compensatory for ↓ sweating) |\n| Hot as Hades | Hyperthermia | No sweating → heat accumulation |\n| Mad as a hatter | Confusion, delirium, hallucinations | Central muscarinic blockade (tertiary agents only) |\n| Full as a flask | Urinary retention | M₃ block → detrusor relaxes |\n| Fast as a fiddle | Tachycardia | M₂ block → SA node → ↑ HR |\n\n**Contraindications:** Narrow-angle glaucoma · Urinary retention / BPH · GI obstruction · Myasthenia gravis · Tachycardia\n\n**Antidote for toxidrome:** Physostigmine (crosses BBB — reverses CNS + peripheral effects)\n\n---"
        },
        {
          "id": "2.5",
          "title": "Nursing Implications for Anticholinergics",
          "content": "### 2.5 Nursing Implications for Anticholinergics\n\n#### Pre-administration Checks\n1. Confirm no narrow-angle glaucoma, urinary retention, GI obstruction, myasthenia gravis\n2. Check HR — hold (except when bradycardia is the indication) if HR >100\n3. Review medication list for **additive anticholinergic burden** (diphenhydramine, TCAs, antipsychotics)\n\n#### Monitoring\n- **Urinary output:** Retention risk — expect voiding within 8 hours\n- **Bowel sounds:** Constipation/ileus risk with prolonged use\n- **Mental status:** Delirium risk — especially in elderly using tertiary agents\n- **Heart rate:** Expected tachycardia; may be problematic in cardiac disease\n- **Temperature:** Hyperthermia risk — ensure hydration and cooling in hot environments\n\n#### Patient Teaching\n- Dry mouth: Sugar-free gum, frequent water sips, good oral hygiene\n- Constipation: Fluids, fiber, activity\n- Void before each dose if possible (urinary retention risk)\n- Avoid vigorous exercise in heat — inability to sweat increases heatstroke risk\n- Vision: Blurred near vision and light sensitivity are expected — caution driving\n- Fall risk: Dizziness, confusion, blurred vision → especially in elderly\n\n---"
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
    },

    /* ═══════════════════════════════════════════════
       UNIT 2 — ANTICHOLINERGICS QUESTIONS
    ═══════════════════════════════════════════════ */
    {
      "id": 9,
      "title": "Atropine — Sinus Bradycardia",
      "topic": "Anticholinergics",
      "concept": "Atropine; Muscarinic Antagonist; Bradycardia; ACLS",
      "unitId": 2,
      "questionText": "A client on a telemetry unit develops symptomatic sinus bradycardia with a heart rate of 36 bpm, hypotension, and dizziness. The nurse anticipates which FIRST-LINE pharmacological intervention per ACLS guidelines?",
      "options": [
        { "id": "1", "text": "Epinephrine 1 mg IV push" },
        { "id": "2", "text": "Atropine 0.5 mg IV, repeating every 3–5 minutes to a maximum of 3 mg" },
        { "id": "3", "text": "Metoprolol 5 mg IV slow push" },
        { "id": "4", "text": "Adenosine 6 mg rapid IV push" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Epinephrine 1 mg IV push is used in **cardiac arrest** (pulseless rhythms), not symptomatic bradycardia. In bradycardia with a pulse, epinephrine infusion may be used if atropine fails and transcutaneous pacing is not available, but it is not first-line and 1 mg IV push is the arrest dose.\n\n✅ **Option 2 — Correct:** Per current ACLS guidelines, **atropine 0.5 mg IV** is the **first-line drug** for symptomatic bradycardia. Atropine is a competitive muscarinic antagonist — it blocks M₂ receptors at the SA and AV nodes, removing vagal inhibition and increasing heart rate and AV conduction. The dose is 0.5 mg IV, repeated every 3–5 minutes, to a maximum of **3 mg total**. Doses <0.5 mg can paradoxically worsen bradycardia (central vagal stimulation); always give at least 0.5 mg.\n\n❌ **Option 3 — Incorrect:** Metoprolol is a **beta-blocker** — it would further **decrease** heart rate and worsen bradycardia. Beta-blockers are contraindicated in symptomatic bradycardia.\n\n❌ **Option 4 — Incorrect:** Adenosine slows AV conduction and is used to terminate **supraventricular tachycardias** (SVT). It would dramatically worsen bradycardia and is absolutely contraindicated in this situation.\n\n> 💡 **Atropine minimum dose:** Always ≥0.5 mg. Doses below 0.5 mg can paradoxically cause more bradycardia via a central vagotonic effect on the brainstem. Maximum total dose = 3 mg (beyond this, the vagus is fully blocked and additional atropine is ineffective).\n\n---",
      "isSATA": false
    },
    {
      "id": 10,
      "title": "Anticholinergic Side Effects — SATA",
      "topic": "Anticholinergics",
      "concept": "Muscarinic Antagonists; Adverse Effects; Patient Teaching",
      "unitId": 2,
      "questionText": "A nurse is reviewing the adverse effects of anticholinergic medications with a student nurse. Which effects should the nurse include as expected consequences of muscarinic receptor blockade? *(Select all that apply)*",
      "options": [
        { "id": "1", "text": "Dry mouth and decreased salivation" },
        { "id": "2", "text": "Urinary retention and decreased bladder tone" },
        { "id": "3", "text": "Diarrhea and increased GI motility" },
        { "id": "4", "text": "Blurred vision and photophobia (mydriasis)" },
        { "id": "5", "text": "Tachycardia" },
        { "id": "6", "text": "Increased bronchial secretions" }
      ],
      "correctIds": ["1", "2", "4", "5"],
      "correctAnswerText": "1, 2, 4, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** Anticholinergics block M₃ receptors on salivary glands, reducing saliva production → **dry mouth (xerostomia)**. This is one of the most common and predictable adverse effects. Counsel clients to use sugar-free gum/lozenges and hydration.\n\n✅ **Option 2 — Correct:** Blocking M₃ receptors on the bladder detrusor muscle **reduces bladder contractility** → **urinary retention**. This is particularly problematic in older adults and men with BPH. Anticholinergics are contraindicated in urinary retention.\n\n❌ **Option 3 — Incorrect:** Anticholinergics **decrease** GI motility (block M₃ on GI smooth muscle) → **constipation**, not diarrhea. Diarrhea is a muscarinic (cholinergic) side effect, not an anticholinergic one. Confusion between the two drug classes is a classic exam trap.\n\n✅ **Option 4 — Correct:** Blocking M₃ receptors on the **iris sphincter** prevents pupillary constriction → **mydriasis** (dilated pupils). Mydriasis blocks the ability to focus on near objects (cycloplegia) and makes the eye unable to constrict in bright light → **photophobia and blurred near vision**. Anticholinergics are contraindicated in narrow-angle glaucoma.\n\n✅ **Option 5 — Correct:** Blocking M₂ receptors at the **SA node** removes vagal inhibition → **tachycardia**. This is the therapeutic effect in bradycardia but an adverse effect in other indications.\n\n❌ **Option 6 — Incorrect:** Anticholinergics **decrease** bronchial secretions (block M₃ on mucous glands). This is actually a therapeutic benefit in some contexts (ipratropium for COPD, pre-operative drying of secretions).\n\n> 💡 **Anticholinergic side effect mnemonic:** \"**Blind as a bat, dry as a bone, red as a beet, hot as Hades, mad as a hatter, full as a flask**\" = mydriasis, dry mouth/skin, flushing, hyperthermia, CNS confusion, urinary retention.\n\n---",
      "isSATA": true
    },
    {
      "id": 11,
      "title": "Scopolamine — Motion Sickness Patient Teaching",
      "topic": "Anticholinergics",
      "concept": "Scopolamine; Transdermal Patch; Patient Teaching",
      "unitId": 2,
      "questionText": "A client is prescribed a scopolamine transdermal patch for motion sickness before a cruise. Which instructions should the nurse include in the teaching? *(Select all that apply)*",
      "options": [
        { "id": "1", "text": "Apply the patch behind one ear at least 4 hours before the start of travel" },
        { "id": "2", "text": "Wash hands thoroughly before and after applying the patch" },
        { "id": "3", "text": "Apply the patch to the inner forearm for the most reliable absorption" },
        { "id": "4", "text": "Avoid alcohol and CNS depressants while wearing the patch" },
        { "id": "5", "text": "Report any visual changes or difficulty urinating" }
      ],
      "correctIds": ["1", "2", "4", "5"],
      "correctAnswerText": "1, 2, 4, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** Scopolamine patch is applied **behind the ear** (postauricular skin). It must be applied **at least 4 hours** before travel to allow therapeutic blood levels to build. Applying after nausea begins is ineffective.\n\n✅ **Option 2 — Correct:** Scopolamine can transfer from patch to hands and inadvertently to the eyes — causing **unilateral mydriasis** that can be mistaken for neurological injury. Hand washing before and after application is essential.\n\n❌ **Option 3 — Incorrect:** The scopolamine transdermal patch is applied exclusively **behind the ear** (postauricular area), NOT to the inner forearm. The postauricular site is specifically chosen for its absorption characteristics.\n\n✅ **Option 4 — Correct:** Scopolamine crosses the BBB and causes **CNS depression**. Concurrent alcohol or other CNS depressants **potentiate** this depression, increasing risk of sedation, falls, and respiratory depression.\n\n✅ **Option 5 — Correct:** Anticholinergic adverse effects to monitor: **mydriasis** (blurred vision), **urinary retention**, dry mouth, constipation, and tachycardia. Visual changes and urinary retention are particularly important to report.\n\n> 💡 **Scopolamine patch duration:** One patch lasts **3 days**. Change to fresh postauricular site. Use caution in elderly (anticholinergic burden → confusion, delirium).\n\n---",
      "isSATA": true
    },
    {
      "id": 12,
      "title": "Ipratropium — COPD Understanding",
      "topic": "Anticholinergics",
      "concept": "Ipratropium; Inhaled Anticholinergics; COPD; Bronchodilation",
      "unitId": 2,
      "questionText": "A nurse is teaching a client with COPD about ipratropium (Atrovent) inhaler. Which statement by the client indicates the BEST understanding of this medication?",
      "options": [
        { "id": "1", "text": "\"I should use this inhaler immediately when I feel sudden shortness of breath during an attack.\"" },
        { "id": "2", "text": "\"This medication works by blocking the nerve signals that make my airways constrict.\"" },
        { "id": "3", "text": "\"This medication will make my heart beat faster, which helps me breathe better.\"" },
        { "id": "4", "text": "\"I should rinse my mouth after using this inhaler to prevent fungal infection.\"" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Ipratropium is a **maintenance** bronchodilator, NOT a rescue inhaler. Its onset is 15–30 minutes — too slow for acute bronchospasm. A **short-acting beta₂ agonist** (albuterol) is the rescue inhaler.\n\n✅ **Option 2 — Correct:** Ipratropium is an **inhaled muscarinic (M₃) antagonist**. The parasympathetic nervous system normally causes bronchoconstriction via M₃ receptors. Ipratropium **blocks these receptors** → bronchodilation. The client's statement accurately describes this mechanism.\n\n❌ **Option 3 — Incorrect:** Ipratropium has minimal systemic absorption and does not significantly cause tachycardia. Improved breathing comes from bronchodilation, not tachycardia. Tachycardia is a side effect to monitor, not a mechanism of benefit.\n\n❌ **Option 4 — Incorrect:** Mouth rinsing is important for **inhaled corticosteroids** (to prevent oral candidiasis). Ipratropium is not a corticosteroid. The client may be confusing these medication classes.\n\n> 💡 **Ipratropium vs. albuterol:** Ipratropium = maintenance (blocks M₃ bronchoconstriction). Albuterol = rescue (activates beta₂ bronchodilation). For COPD exacerbations, both may be combined (Combivent).\n\n---",
      "isSATA": false
    },
    {
      "id": 13,
      "title": "Atropine Eye Drops — Narrow-Angle Glaucoma",
      "topic": "Anticholinergics",
      "concept": "Atropine; Ophthalmic; Narrow-Angle Glaucoma; Contraindications",
      "unitId": 2,
      "questionText": "An ophthalmologist orders atropine eye drops for cycloplegic refraction. The nurse notes the client has a history of narrow-angle glaucoma. Which is the PRIORITY nursing action?",
      "options": [
        { "id": "1", "text": "Administer the drops as ordered; ophthalmic atropine is too dilute to affect intraocular pressure" },
        { "id": "2", "text": "Hold the medication and immediately contact the prescriber before administering" },
        { "id": "3", "text": "Apply nasolacrimal duct pressure after instillation to minimize systemic absorption" },
        { "id": "4", "text": "Dilute the atropine drops further with sterile saline before administering" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** This is dangerous. Ophthalmic atropine causes mydriasis, and in narrow-angle glaucoma, mydriasis closes the iridocorneal angle — blocking aqueous drainage and triggering **acute angle-closure glaucoma crisis** with rapidly rising IOP, severe pain, and vision loss.\n\n✅ **Option 2 — Correct:** **Narrow-angle glaucoma** is an **absolute contraindication** to anticholinergic ophthalmic agents. The nurse must **hold the medication** and **contact the prescriber immediately**. Administering this drug could precipitate an acute angle-closure crisis and permanent vision loss.\n\n❌ **Option 3 — Incorrect:** Punctal occlusion reduces **systemic absorption** but does NOT prevent the **local** complication — mydriasis and angle closure. This option addresses the wrong risk.\n\n❌ **Option 4 — Incorrect:** Diluting drops is not an accepted practice and would not eliminate the contraindication. Even diluted atropine can cause mydriasis sufficient to close the narrow angle.\n\n> 💡 **Narrow-angle vs. open-angle glaucoma:** Anticholinergics (mydriasis) are contraindicated in **narrow-angle** glaucoma only. **Open-angle** glaucoma is NOT a contraindication — the trabecular meshwork remains accessible regardless of pupil size.\n\n---",
      "isSATA": false
    },
    {
      "id": 14,
      "title": "Benztropine — Best Use in Parkinson's",
      "topic": "Anticholinergics",
      "concept": "Benztropine; Parkinson's Disease; EPS; Anticholinergics",
      "unitId": 2,
      "questionText": "Benztropine (Cogentin) is prescribed for a client with Parkinson's disease. For which symptom is this drug MOST effective?",
      "options": [
        { "id": "1", "text": "Bradykinesia (slowness of movement)" },
        { "id": "2", "text": "Resting tremor and muscle rigidity" },
        { "id": "3", "text": "Postural instability and frequent falls" },
        { "id": "4", "text": "Cognitive decline and dementia symptoms" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Bradykinesia responds best to **dopaminergic agents** (levodopa/carbidopa). Benztropine has minimal benefit for bradykinesia — this symptom is primarily caused by dopamine deficiency, not cholinergic excess.\n\n✅ **Option 2 — Correct:** In Parkinson's disease, dopaminergic neuron loss creates a **relative excess of acetylcholine** in the basal ganglia, contributing to **resting tremor and rigidity**. Benztropine blocks muscarinic receptors in the CNS, reducing this cholinergic excess and improving **tremor and rigidity**. It is also used for **drug-induced EPS** from antipsychotics (same mechanism).\n\n❌ **Option 3 — Incorrect:** Postural instability relates to non-dopaminergic pathways and does not respond well to anticholinergic therapy.\n\n❌ **Option 4 — Incorrect:** Anticholinergics like benztropine actually **worsen** cognitive function and can precipitate delirium. They are generally avoided in elderly patients with cognitive impairment. Cholinesterase inhibitors (rivastigmine) are used for Parkinson's dementia.\n\n> 💡 **Anticholinergics in Parkinson's and EPS:** Best for tremor and rigidity. NOT for bradykinesia. Avoid in elderly with cognitive impairment.\n\n---",
      "isSATA": false
    },
    {
      "id": 15,
      "title": "Oxybutynin — Beers Criteria Concern",
      "topic": "Anticholinergics",
      "concept": "Oxybutynin; Overactive Bladder; Beers Criteria; Older Adults",
      "unitId": 2,
      "questionText": "A nurse reviews the medication list for a 78-year-old client prescribed oxybutynin (Ditropan) for overactive bladder. Which concern is MOST important to raise with the prescriber?",
      "options": [
        { "id": "1", "text": "Oxybutynin may decrease the frequency of urination below normal levels" },
        { "id": "2", "text": "Oxybutynin crosses the blood-brain barrier and carries high risk of CNS adverse effects in the elderly" },
        { "id": "3", "text": "Oxybutynin is incompatible with most antihypertensive medications" },
        { "id": "4", "text": "Oxybutynin requires dose adjustment only in clients with renal failure" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** While urinary retention is a possible adverse effect, it is not the most critical concern in elderly. The CNS risk outweighs this.\n\n✅ **Option 2 — Correct:** Oxybutynin is on the **AGS Beers Criteria** as a medication to **avoid in older adults**. It is highly **lipid-soluble** and **crosses the BBB** extensively. In elderly clients, CNS muscarinic blockade causes **confusion, memory impairment, delirium, hallucinations, and falls**. Safer alternatives include **mirabegron** (beta₃ agonist) or **trospium** (quaternary ammonium — poor BBB penetration). The nurse should flag this as a Beers Criteria concern.\n\n❌ **Option 3 — Incorrect:** There is no broad pharmacological incompatibility between oxybutynin and antihypertensives. This is not the most important concern.\n\n❌ **Option 4 — Incorrect:** Hepatic impairment is more relevant than renal failure for oxybutynin (CYP3A4 metabolism). But CNS effects in the elderly remain the primary concern.\n\n> 💡 **Beers Criteria anticholinergics to avoid in elderly:** Oxybutynin, diphenhydramine, hydroxyzine, amitriptyline — all increase risk of delirium, falls, and cognitive impairment. Prefer mirabegron for overactive bladder in elderly.\n\n---",
      "isSATA": false
    },
    {
      "id": 16,
      "title": "Anticholinergic Toxidrome — Antidote",
      "topic": "Anticholinergics",
      "concept": "Anticholinergic Toxicity; Physostigmine; Emergency; Toxidrome",
      "unitId": 2,
      "questionText": "An unconscious client presents with: temperature 39.8°C, HR 132, BP 88/52, pupils fixed and dilated, skin flushed, hot and dry, bowel sounds absent, bladder distended. Which medication should the nurse prepare to administer?",
      "options": [
        { "id": "1", "text": "Atropine 2 mg IV" },
        { "id": "2", "text": "Physostigmine IV" },
        { "id": "3", "text": "Naloxone (Narcan) IV" },
        { "id": "4", "text": "Flumazenil IV" }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Atropine is an anticholinergic agent. Administering it here would **worsen** the anticholinergic toxidrome. Atropine is the antidote for **cholinergic** (organophosphate) toxicity, not anticholinergic toxicity.\n\n✅ **Option 2 — Correct:** The clinical picture is the classic **anticholinergic toxidrome** — \"Blind as a bat (mydriasis), dry as a bone (dry flushed skin), red as a beet (flushing), hot as Hades (hyperthermia), mad as a hatter (altered mental status), full as a flask (urinary retention), fast as a fiddle (tachycardia).\" The antidote is **physostigmine** — a reversible acetylcholinesterase inhibitor that **crosses the BBB**, reversing both central and peripheral anticholinergic effects.\n\n❌ **Option 3 — Incorrect:** Naloxone reverses **opioid** toxicity — characterized by miosis (pinpoint pupils), respiratory depression, and decreased consciousness. This client has DILATED pupils and tachycardia — the opposite of opioid toxicity.\n\n❌ **Option 4 — Incorrect:** Flumazenil reverses **benzodiazepine** toxicity (CNS depression, normal pupils) — not anticholinergic toxicity.\n\n> 💡 **Physostigmine** is the ONLY cholinesterase inhibitor that crosses the BBB, making it the specific antidote for anticholinergic toxicity with CNS involvement. It reverses both central (delirium) and peripheral (urinary retention, tachycardia, mydriasis) effects.\n\n---",
      "isSATA": false
    }
  ]
};

