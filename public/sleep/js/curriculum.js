/**
 * Sleep — Nursing Exam Review
 * curriculum.js
 *
 * Structure mirrors the pharmacology curriculum.js format:
 *   CURRICULUM.units   — array of unit objects (sections with markdown content)
 *   CURRICULUM.questions — array of question objects linked to units via unitId
 */

const CURRICULUM = {
  "units": [
    {
      "id": 1,
      "title": "Sleep Physiology & Architecture",
      "intro": "",
      "sections": [
        {
          "id": "1.1",
          "title": "Why Sleep Matters",
          "content": "### 1.1 Why Sleep Matters\n\nSleep is an **essential physiological need** — not a luxury. During sleep the body:\n\n- Restores immune function\n- Consolidates memory and learning\n- Repairs tissue and releases growth hormone\n- Regulates mood, metabolism, and cardiovascular function\n\nAdults typically require **7–9 hours** per night. Older adults often require slightly less (6–7 hours) but still need restorative sleep.\n\n#### Consequences of Sleep Deprivation\n\n| System | Effect |\n|---|---|\n| **Cognitive** | Impaired attention, memory, decision-making |\n| **Cardiovascular** | ↑ hypertension, cardiac arrhythmia risk |\n| **Immune** | ↓ resistance to infection |\n| **Endocrine** | ↑ cortisol, ↑ ghrelin (appetite), ↓ leptin |\n| **Psychological** | Irritability, depression, anxiety |\n\n---"
        },
        {
          "id": "1.2",
          "title": "Sleep Architecture: NREM and REM",
          "content": "### 1.2 Sleep Architecture: NREM and REM\n\nSleep alternates in **90-minute cycles** between NREM and REM phases.\n\n#### NREM Sleep (Non-Rapid Eye Movement)\n\n| Stage | Name | Characteristics |\n|---|---|---|\n| **N1** | Light sleep | Transition from wake; easily aroused; 5% of total sleep |\n| **N2** | Baseline sleep | Sleep spindles and K-complexes on EEG; most of total sleep |\n| **N3** | Deep/Slow-wave | Hardest to arouse; growth hormone released; tissue repair |\n\n#### REM Sleep (Rapid Eye Movement)\n- Occurs ~90 min after sleep onset; lengthens with each cycle\n- Vivid dreaming, emotional processing, memory consolidation\n- Muscle atonia (prevents acting out dreams)\n- Brain activity resembles wakefulness\n\n#### Clinical Relevance\n- **ICU/hospital environment** disrupts NREM Stage N3 and REM → non-restorative sleep\n- Many sedatives (benzodiazepines, alcohol) suppress REM sleep\n- Older adults have less N3 sleep and more frequent awakenings\n\n---"
        },
        {
          "id": "1.3",
          "title": "Circadian Rhythm & Sleep Regulation",
          "content": "### 1.3 Circadian Rhythm & Sleep Regulation\n\nThe body's internal clock — the **circadian rhythm** — is a ~24-hour biological cycle regulated by the **suprachiasmatic nucleus (SCN)** in the hypothalamus.\n\n#### Key Regulators\n\n| Factor | Role |\n|---|---|\n| **Light** | Primary zeitgeber (time-giver); light suppresses melatonin → promotes wakefulness |\n| **Melatonin** | Released by pineal gland in darkness; promotes sleepiness |\n| **Adenosine** | Builds up during wakefulness; drives sleep pressure (\"sleep debt\") |\n| **Cortisol** | Peaks in early morning; promotes arousal |\n\n#### Nursing Implications\n- Dim lights in patient rooms in the evening to support melatonin release\n- Screen time (blue light) before bed suppresses melatonin → delays sleep onset\n- Jet lag and shift work disrupt the circadian clock\n\n---"
        },
        {
          "id": "1.4",
          "title": "Age-Related Sleep Changes",
          "content": "### 1.4 Age-Related Sleep Changes\n\nSleep architecture changes significantly across the lifespan.\n\n| Age Group | Sleep Pattern |\n|---|---|\n| **Newborn** | 16–18 hrs/day; 50% REM; multiple sleep-wake cycles |\n| **Toddler** | 12–14 hrs/day; daytime napping |\n| **School-age** | 10–12 hrs/day |\n| **Adolescent** | 9–10 hrs recommended; often sleep-deprived; circadian shift → later sleep onset |\n| **Adult** | 7–9 hrs; decreasing N3 with age |\n| **Older adult** | 6–7 hrs; less N3; more awakenings; earlier bedtime/wake time |\n\n#### Older Adult Sleep Concerns\n- **Nocturia** — most common cause of awakenings in older adults\n- Increased sensitivity to environmental disruption\n- Higher rates of insomnia, sleep apnea, and restless leg syndrome\n- Medications (diuretics, beta-blockers, steroids) commonly disrupt sleep\n\n> 💡 **NCLEX tip:** Older adults have normal sleep changes (less deep sleep, more awakenings). These are physiological — not disease — unless they impair daytime function.\n\n---"
        }
      ]
    },
    {
      "id": 2,
      "title": "Sleep Disorders",
      "intro": "",
      "sections": [
        {
          "id": "2.1",
          "title": "Insomnia",
          "content": "### 2.1 Insomnia\n\n**Insomnia** is the most common sleep disorder — difficulty falling asleep, staying asleep, or non-restorative sleep despite adequate opportunity.\n\n#### Classification\n\n| Type | Duration | Characteristics |\n|---|---|---|\n| **Acute/transient** | <3 months | Triggered by identifiable stressor |\n| **Chronic** | ≥3 months, ≥3 nights/week | Requires systematic assessment and treatment |\n\n#### Common Causes\n\n- **Psychological:** Anxiety, depression, stress, PTSD\n- **Medical:** Pain, GERD, nocturia, respiratory conditions\n- **Medications:** Steroids, diuretics, stimulants, some antidepressants\n- **Behavioral:** Poor sleep hygiene, irregular schedule, caffeine/alcohol use\n- **Environmental:** Noise, light, temperature, unfamiliar setting\n\n#### First-Line Treatment: CBT-I\n\n**Cognitive Behavioral Therapy for Insomnia (CBT-I)** is the gold-standard, first-line treatment for chronic insomnia (superior to medications long-term):\n\n- Sleep restriction therapy\n- Stimulus control (bed = sleep only)\n- Relaxation training\n- Cognitive restructuring (addressing sleep-related anxiety)\n- Sleep hygiene education\n\n#### Pharmacological Options (second-line)\n\n| Drug Class | Examples | Notes |\n|---|---|---|\n| **Non-benzodiazepine hypnotics** (Z-drugs) | Zolpidem (Ambien), eszopiclone, zaleplon | GABA-A agonists; risk of dependence; sleepwalking |\n| **Melatonin receptor agonist** | Ramelteon | Safest option; no dependence risk; targets circadian rhythm |\n| **Orexin receptor antagonist** | Suvorexant (Belsomra) | Blocks wake-promoting orexin; newer class |\n| **Sedating antidepressants** | Trazodone, doxepin (low dose) | Off-label but widely used |\n| **Benzodiazepines** | Temazepam, triazolam | Not recommended long-term; dependence, next-day sedation |\n\n> ⚠️ **Avoid** in older adults: benzodiazepines and Z-drugs increase fall risk, next-day cognitive impairment, and paradoxical excitation (Beers Criteria).\n\n---"
        },
        {
          "id": "2.2",
          "title": "Obstructive Sleep Apnea (OSA)",
          "content": "### 2.2 Obstructive Sleep Apnea (OSA)\n\n**Obstructive sleep apnea (OSA)** is repetitive collapse of the upper airway during sleep → **apneic episodes** → oxygen desaturation → arousal.\n\n#### Risk Factors\n\n| Category | Factors |\n|---|---|\n| **Anatomical** | Large tongue, elongated soft palate, crowded oropharynx, retrognathia |\n| **Physical** | Obesity (BMI ≥35), large neck circumference (>17\" men, >16\" women), male sex |\n| **Medical** | Hypertension, hypothyroidism, acromegaly, Down syndrome |\n| **Lifestyle** | Alcohol use, sedative/hypnotic medications, supine sleeping position |\n\n**Highest-risk profile:** Male sex + obesity (BMI ≥35) + hypertension\n\n#### Clinical Manifestations\n\n- **Nighttime:** Loud snoring, witnessed apneas, gasping/choking arousals, nocturia, diaphoresis\n- **Daytime:** Excessive daytime sleepiness (EDS), morning headache, cognitive impairment, irritability\n\n#### Diagnosis\n- **Polysomnography (sleep study)** — gold standard\n- **Apnea-Hypopnea Index (AHI):** Mild = 5–14/hr; Moderate = 15–29/hr; Severe ≥ 30/hr\n- Home sleep testing: acceptable alternative for uncomplicated OSA\n\n#### Complications of Untreated OSA\n- Hypertension (bidirectional relationship — OSA both causes and worsens HTN)\n- Cardiac arrhythmias (especially atrial fibrillation)\n- Type 2 diabetes (metabolic dysfunction)\n- Pulmonary hypertension\n- Motor vehicle accidents (daytime somnolence)\n\n---"
        },
        {
          "id": "2.3",
          "title": "CPAP Therapy for OSA",
          "content": "### 2.3 CPAP Therapy for OSA\n\n**Continuous Positive Airway Pressure (CPAP)** is the first-line treatment for moderate-to-severe OSA.\n\n#### Mechanism\nCPAP delivers a **continuous pressurized airstream** through a mask (nasal, full-face, or nasal pillow) → acts as a **pneumatic splint** → keeps the upper airway open throughout sleep → prevents apneic collapse.\n\n#### Critical Patient Teaching Points\n\n| Teaching Point | Rationale |\n|---|---|\n| **Use EVERY night, indefinitely** | CPAP manages OSA — it does NOT cure it. Stopping causes immediate return of apnea. |\n| \"Feeling better\" ≠ stop CPAP | Symptoms improve because CPAP prevents apnea — NOT because OSA is resolved |\n| **Clean equipment regularly** | Daily rinse; weekly soap wash of mask, tubing, humidifier — prevents respiratory infection |\n| **Humidifier reduces irritation** | Heated humidification decreases nasal dryness and improves adherence |\n| **Report mask leak or discomfort** | Poor fit → air leak → ineffective therapy; many mask types/sizes available |\n\n**⚠️ CRITICAL — Incorrect CPAP understanding:**\n> *\"Once I start feeling better, I can stop using my CPAP.\"*\n> → This requires IMMEDIATE correction. CPAP treats symptoms only. Stopping = return of OSA.\n\n#### Alternative/Adjunctive Treatments\n\n| Treatment | Indication |\n|---|---|\n| **Oral appliance** (mandibular advancement) | Mild-moderate OSA; CPAP intolerant |\n| **Positional therapy** | OSA worse in supine position |\n| **Weight loss** | Reduces OSA severity in obese patients |\n| **Uvulopalatopharyngoplasty (UPPP)** | Surgical option for selected patients |\n| **Hypoglossal nerve stimulation** | Inspire device; moderate-severe OSA; CPAP intolerant |\n\n---"
        },
        {
          "id": "2.4",
          "title": "Other Sleep Disorders",
          "content": "### 2.4 Other Sleep Disorders\n\n#### Narcolepsy\n- **Excessive daytime sleepiness** with sudden irresistible sleep attacks\n- **Cataplexy** (sudden muscle weakness triggered by emotion) — pathognomonic for Type 1 narcolepsy\n- Caused by loss of **orexin (hypocretin)-producing** neurons in hypothalamus\n- **Treatment:** Sodium oxybate (Xyrem), modafinil, amphetamine-class stimulants\n\n#### Restless Legs Syndrome (RLS)\n- Uncomfortable urge to move legs at rest, especially in the evening\n- **Relieved by movement** (walking, stretching)\n- Associated with **iron deficiency**, renal failure, pregnancy, Parkinson's disease\n- **Treatment:** Iron supplementation if deficient; dopamine agonists (pramipexole, ropinirole)\n\n#### Parasomnias\n\n| Disorder | Phase | Features |\n|---|---|---|\n| **Sleepwalking** | NREM N3 | Complex motor behaviors during sleep; no memory |\n| **Night terrors** | NREM N3 | Intense fear, screaming; no dream recall; common in children |\n| **REM Sleep Behavior Disorder (RBD)** | REM | Acts out dreams (muscle atonia lost); injury risk; early marker of Parkinson's |\n| **Nightmare disorder** | REM | Distressing dreams; full recall upon waking |\n\n#### Central Sleep Apnea\n- Brain fails to send proper signals to breathing muscles\n- Not caused by airway obstruction\n- Associated with heart failure, opioid use, high altitude\n- **Cheyne-Stokes respirations** — crescendo-decrescendo breathing pattern with central apnea episodes; seen in advanced heart failure\n\n---"
        }
      ]
    },
    {
      "id": 3,
      "title": "Hospital Sleep & Nursing Interventions",
      "intro": "",
      "sections": [
        {
          "id": "3.1",
          "title": "Hospital Sleep Disruptors",
          "content": "### 3.1 Hospital Sleep Disruptors\n\nHospitalized patients are at high risk for sleep deprivation. The hospital environment is fundamentally disrupting to normal sleep.\n\n#### Major Disruptors\n\n| Category | Specific Factors |\n|---|---|\n| **Environmental** | Noise (alarms, staff, equipment), artificial lighting 24/7, unfamiliar environment |\n| **Clinical** | Frequent vital signs, procedures, blood draws, medication administration |\n| **Medications** | Steroids (stimulating), diuretics (nocturia), vasopressors, beta-blockers |\n| **Physiological** | Pain, dyspnea, nausea, nocturia, immobility |\n| **Psychological** | Anxiety, fear, disorientation, loss of normal routines |\n\n#### Effects of Hospital Sleep Deprivation\n- Impaired immune response → ↑ infection risk\n- Increased pain perception\n- Delirium (particularly in older adults — \"sundowning\")\n- Longer hospital stays, higher complication rates\n- Impaired wound healing\n\n> 💡 **Key concept:** Sleep deprivation in hospitalized patients is largely **preventable** through systematic nursing interventions.\n\n---"
        },
        {
          "id": "3.2",
          "title": "Evidence-Based Sleep Promotion Interventions",
          "content": "### 3.2 Evidence-Based Sleep Promotion Interventions\n\nNurses play a critical role in promoting restorative sleep for hospitalized patients.\n\n#### ✅ Appropriate (Evidence-Based) Interventions\n\n| Intervention | Rationale |\n|---|---|\n| **Back massage before bedtime** | Stimulates parasympathetic nervous system; reduces muscle tension; promotes relaxation |\n| **Reduce environmental noise; dim lights** | Supports circadian rhythm; removes major sleep disruptors |\n| **Schedule diuretics earlier in the day** | Prevents nocturia (nighttime voiding that fragments sleep) |\n| **Manage pain before bedtime** | Pain activates sympathetic nervous system; prevents transition to deep sleep |\n| **Cluster nursing activities** | Groups necessary care tasks to minimize sleep interruptions |\n| **Provide warm bath/shower before bed** | Body temperature drop after warmth promotes sleep onset |\n| **Maintain consistent bedtime routine** | Reinforces circadian cues |\n| **Minimize overhead announcements at night** | Reduces environmental noise |\n| **Ear plugs / eye masks** | Simple, effective in ICU and noisy environments |\n\n#### ❌ Inappropriate Interventions\n\n| Intervention | Why Incorrect |\n|---|---|\n| **Encourage TV until falling asleep** | Blue light suppresses melatonin; stimulating content delays sleep onset |\n| **Wake every 2 hours for routine checks** | Frequent awakenings cause non-restorative sleep; cluster care instead |\n| **Administer diuretics in the evening** | Increases nocturia; fragments sleep |\n\n---"
        },
        {
          "id": "3.3",
          "title": "Special Populations: Older Adults in Hospital",
          "content": "### 3.3 Special Populations: Older Adults in Hospital\n\nOlder adults are especially vulnerable to hospital sleep disruption due to:\n\n- **Baseline sleep changes** (less N3, more awakenings, earlier chronotype)\n- **Multiple comorbidities** creating more physiological disruptors\n- **Polypharmacy** — many medications disrupt sleep\n- **Delirium risk** — sleep deprivation is a major contributing factor to hospital-acquired delirium\n\n#### Sundowning\n- Increased confusion, agitation, and disorientation **in the late afternoon/evening**\n- Seen in patients with dementia or delirium\n- Sleep deprivation worsens sundowning\n\n#### Nursing Strategies for Older Hospitalized Patients\n\n1. Orient frequently to time, place, and purpose of care\n2. Keep overhead lights low in the evening\n3. Maintain daytime activity to promote nighttime sleep drive\n4. Avoid sedating medications that fragment sleep architecture\n5. Minimize urinary catheter use (reduces nocturia from catheter discomfort)\n6. Place familiar objects near the patient\n7. Allow patients to wear hearing aids and glasses — reduces sensory disorientation\n\n#### Realistic Goal Setting\n- **Appropriate goal:** Client will be free from injury during hospitalization\n- **Inappropriate goal:** Client will sleep 8 hours per night (unrealistic in hospital)\n- **Inappropriate goal:** Client will remain oriented ×3 at all times (not achievable with delirium)\n\n---"
        },
        {
          "id": "3.4",
          "title": "OSA Management in the Hospitalized Patient",
          "content": "### 3.4 OSA Management in the Hospitalized Patient\n\nPatients with known OSA who are hospitalized require special consideration.\n\n#### Key Nursing Actions\n\n| Action | Rationale |\n|---|---|\n| **Bring personal CPAP from home** | Hospital equipment may differ; familiar mask/settings improve compliance |\n| **Apply CPAP during all sleep periods** | Hospitalized patients may nap; OSA occurs during any sleep |\n| **Positioning:** Semi-Fowler's or lateral | Reduces airway collapse; improves oxygenation |\n| **Pulse oximetry monitoring post-op** | Opioids + anesthesia + OSA = high risk for respiratory depression |\n| **Avoid supine positioning when possible** | Gravity worsens airway collapse |\n| **Ensure CPAP settings are preserved** | Do not change prescribed pressure without provider order |\n\n#### Perioperative Considerations\n- Patients with OSA have **higher risk of post-operative respiratory complications**\n- Screen all pre-op patients using **STOP-BANG questionnaire**\n- Post-operative opioids increase respiratory depression risk\n- Continuous monitoring is recommended in the immediate post-op period\n\n**STOP-BANG Screening Tool:**\n- **S**noring, **T**iredness/daytime sleepiness, **O**bserved apneas, **P**ressure (HTN)\n- **B**MI >35, **A**ge >50, **N**eck circumference large, **G**ender (male)\n- ≥3 positive responses = high OSA risk\n\n---"
        }
      ]
    },
    {
      "id": 4,
      "title": "Sleep Assessment & Patient Education",
      "intro": "",
      "sections": [
        {
          "id": "4.1",
          "title": "Sleep Assessment",
          "content": "### 4.1 Sleep Assessment\n\nA thorough sleep assessment is the foundation of evidence-based sleep care.\n\n#### Key Assessment Components\n\n| Component | Assessment Questions |\n|---|---|\n| **Sleep history** | What is your usual bedtime? How long to fall asleep? |\n| **Bedtime routine** | What activities do you do before bed? |\n| **Sleep quality** | Do you feel rested when you wake? How many times do you wake? |\n| **Sleep quantity** | How many hours do you typically sleep? |\n| **Daytime function** | Do you feel sleepy during the day? Do you nap? |\n| **Sleep disruptors** | Snoring, witnessed apneas? Pain, nocturia, anxiety? |\n| **Medications** | Review all medications for sleep-disrupting effects |\n| **Caffeine/alcohol/substances** | Amount and timing |\n\n#### Best Opening Question for Chronic Insomnia\n**\"Describe your bedtime routine to me.\"**\n\nThis single question is the most comprehensive and clinically productive opening for a chronic insomnia assessment because it reveals:\n- Bedtime and wake time consistency\n- Pre-sleep activities (screens, exercise, alcohol, caffeine)\n- Environmental factors\n- Psychological factors (worry, racing thoughts)\n- Sleep hygiene deficits that are the targets of CBT-I\n\n> ❌ Less useful opening questions:\n> - \"How often do you dream?\" — dreaming does not identify the cause of insomnia\n> - \"Have you changed your diet?\" — too narrow; only one potential factor\n> - \"How many hours do you sleep on weekends?\" — one data point; misses the full picture\n\n---"
        },
        {
          "id": "4.2",
          "title": "Sleep Hygiene Education",
          "content": "### 4.2 Sleep Hygiene Education\n\nSleep hygiene refers to behaviors and environmental practices that promote consistent, restful sleep.\n\n#### Core Sleep Hygiene Principles\n\n| Principle | Specific Guidance |\n|---|---|\n| **Consistent schedule** | Go to bed and wake at the same time every day — including weekends |\n| **Bed = sleep only** | Avoid TV, phones, eating, or working in bed |\n| **Limit screen time** | No blue-light screens 1 hour before bed |\n| **Caffeine cutoff** | No caffeine after noon (or 2 pm at latest) |\n| **Avoid alcohol near bedtime** | Alcohol induces sleep but fragments later sleep and suppresses REM |\n| **Cool, dark, quiet room** | Optimal environment: 65–68°F, blackout curtains, white noise if needed |\n| **Exercise regularly** | Morning or afternoon; avoid vigorous exercise within 2–3 hours of bed |\n| **Relaxation rituals** | Warm bath, light reading, gentle stretching, meditation |\n| **Limit naps** | If needed, limit to 20 minutes before 3 pm |\n| **If unable to sleep in 20 min** | Get up and do a quiet, non-stimulating activity until sleepy |\n\n---"
        },
        {
          "id": "4.3",
          "title": "Medications That Affect Sleep",
          "content": "### 4.3 Medications That Affect Sleep\n\nMany common medications significantly affect sleep quality.\n\n#### Medications That DISRUPT Sleep\n\n| Medication | Effect on Sleep |\n|---|---|\n| **Corticosteroids** (prednisone) | Stimulating; cause insomnia and frequent awakening |\n| **Diuretics** (furosemide) | Nocturia; awakenings to void |\n| **Beta-blockers** (propranolol) | Suppress REM; nightmares; insomnia |\n| **Stimulants** (methylphenidate) | Delay sleep onset |\n| **Decongestants** (pseudoephedrine) | CNS stimulation |\n| **SSRIs/SNRIs** | May cause insomnia, especially when started |\n| **Thyroid hormone** | Stimulating if over-replaced |\n| **Alcohol** | Suppresses REM; causes early awakening |\n| **Caffeine** | Adenosine antagonist; delays sleep onset |\n\n#### Medications That PROMOTE Sleep (therapeutic)\n\n| Medication | Mechanism | Notes |\n|---|---|\n| **Zolpidem** | GABA-A agonist | Short-term only; avoid in older adults |\n| **Ramelteon** | Melatonin receptor agonist | Safest long-term; no dependence |\n| **Trazodone** | Sedating antidepressant | Commonly used off-label for insomnia |\n| **Melatonin** | Circadian rhythm regulation | OTC; most useful for circadian disruption |\n\n#### Nursing Implications\n1. **Review the medication list** for sleep-disrupting drugs\n2. **Schedule diuretics** in the morning or early afternoon\n3. **Administer stimulating medications** (steroids) early in the day\n4. **Educate** patients about caffeine and alcohol effects on sleep\n\n---"
        },
        {
          "id": "4.4",
          "title": "CPAP Patient Education Essentials",
          "content": "### 4.4 CPAP Patient Education Essentials\n\nPatient education about CPAP is a high-yield nursing exam topic.\n\n#### Must-Know Teaching Points\n\n✅ **CPAP manages OSA — it does NOT cure it**\n- The therapy controls symptoms while in use\n- Stopping CPAP = immediate return of apneic episodes\n- Must be used every night, indefinitely\n\n✅ **When to use CPAP**\n- Every night during all sleep periods (including naps)\n- Even when feeling well — feeling better is because CPAP is working, not a sign to stop\n\n✅ **Equipment care**\n- Rinse mask, tubing, and humidifier chamber daily with warm water\n- Wash weekly with mild soap\n- Replace filters monthly\n- Replace mask every 3–6 months (or as prescribed)\n\n✅ **Troubleshooting**\n- Mask leak → try different size/style; use CPAP chin strap if mouth breathing\n- Nasal dryness → use heated humidifier; nasal saline rinse\n- Difficulty tolerating pressure → report to provider; pressure titration or BiPAP may be needed\n\n#### ❌ Incorrect Understandings That Require Correction\n\n| Incorrect Statement | Correct Teaching |\n|---|---|\n| \"I feel better so I don't need CPAP anymore\" | CPAP manages, not cures OSA — must continue indefinitely |\n| \"I only need CPAP when my snoring is bad\" | OSA occurs silently too; CPAP needed every night |\n| \"I'll skip CPAP when I travel\" | Travel CPAP units are available; compliance must be maintained |\n\n---"
        }
      ]
    }
  ],

  "questions": [

    /* ═══════════════════════════════════════════════
       UNIT 1 — SLEEP PHYSIOLOGY QUESTIONS
    ═══════════════════════════════════════════════ */
    {
      "id": 1,
      "title": "Sleep Stages — NREM vs REM",
      "topic": "Sleep Physiology",
      "concept": "Sleep Architecture; NREM; REM; Sleep Cycles",
      "unitId": 1,
      "questionText": "A nurse is teaching a client about healthy sleep. Which statement by the nurse accurately describes REM sleep?",
      "options": [
        {
          "id": "1",
          "text": "REM sleep is when the body performs the most physical tissue repair and growth hormone release"
        },
        {
          "id": "2",
          "text": "REM sleep is characterized by muscle atonia, vivid dreaming, and brain activity similar to wakefulness"
        },
        {
          "id": "3",
          "text": "REM sleep is the lightest stage of sleep and is most easily disrupted"
        },
        {
          "id": "4",
          "text": "REM sleep occurs predominantly in the first hours of the sleep cycle and decreases as the night progresses"
        }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Physical tissue repair and growth hormone release occur predominantly during **NREM Stage N3** (deep/slow-wave sleep), not REM sleep. N3 is the most physically restorative stage, while REM is more associated with cognitive and emotional restoration.\n\n✅ **Option 2 — Correct:** REM sleep is characterized by **rapid eye movements**, **muscle atonia** (paralysis of voluntary muscles — preventing acting out of dreams), **vivid dreaming**, and **brain electrical activity resembling wakefulness**. This stage is critical for memory consolidation, emotional processing, and learning. Loss of REM sleep impairs cognitive function and mood regulation.\n\n❌ **Option 3 — Incorrect:** The lightest stage of sleep is **NREM Stage N1**, where the person is transitioning from wakefulness and can be easily aroused. REM sleep can also be disrupted but is not defined as the lightest stage.\n\n❌ **Option 4 — Incorrect:** REM sleep **increases** as the night progresses — early sleep cycles have shorter REM periods, while later cycles (in the second half of the night) have longer REM periods. NREM N3 predominates in the first third of the night. This is why early morning is when most vivid dreaming occurs.\n\n> 💡 **Memory aid:** REM = brain is active (like awake), body is paralyzed (atonia). NREM N3 = body repairs (growth hormone), brain is quiet (slow waves).\n\n---",
      "isSATA": false
    },
    {
      "id": 2,
      "title": "Circadian Rhythm — Melatonin & Light",
      "topic": "Sleep Physiology",
      "concept": "Circadian Rhythm; Melatonin; Blue Light; Sleep Onset",
      "unitId": 1,
      "questionText": "A nurse is educating a client about factors affecting sleep onset. Which statement by the nurse is most accurate regarding the role of light and melatonin?",
      "options": [
        {
          "id": "1",
          "text": "Exposure to bright light in the evening increases melatonin production and promotes faster sleep onset"
        },
        {
          "id": "2",
          "text": "Blue light from screens before bedtime suppresses melatonin production, delaying sleep onset"
        },
        {
          "id": "3",
          "text": "Melatonin is produced by the hypothalamus in response to physical activity"
        },
        {
          "id": "4",
          "text": "Melatonin levels remain constant throughout the 24-hour cycle"
        }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** Bright light in the evening **suppresses** melatonin production — it does NOT increase it. Light is the primary signal that tells the brain it is daytime. Evening light exposure delays the circadian clock and prevents the normal melatonin rise that signals the body to prepare for sleep.\n\n✅ **Option 2 — Correct:** Blue-wavelength light from screens (phones, tablets, computers, televisions) is particularly effective at suppressing melatonin production via the intrinsically photosensitive retinal ganglion cells. Screen use within 1–2 hours of bedtime delays melatonin onset, delays sleep onset, and reduces sleep quality. This is why screen avoidance before bed is a core sleep hygiene recommendation.\n\n❌ **Option 3 — Incorrect:** Melatonin is produced by the **pineal gland** (not hypothalamus) in response to **darkness** (not physical activity). The suprachiasmatic nucleus in the hypothalamus regulates the timing, but melatonin synthesis itself occurs in the pineal gland.\n\n❌ **Option 4 — Incorrect:** Melatonin levels are highly variable throughout the 24-hour cycle. They begin rising in the early evening as light decreases, peak between 2–4 AM, and fall sharply in the early morning as daylight exposure increases.\n\n> 💡 **Clinical application:** Nurses should dim patient room lights in the evening and discourage screen use before sleep to support natural melatonin production and circadian sleep cues.\n\n---",
      "isSATA": false
    },

    /* ═══════════════════════════════════════════════
       UNIT 2 — SLEEP DISORDERS QUESTIONS
    ═══════════════════════════════════════════════ */
    {
      "id": 3,
      "title": "OSA — Highest Risk Client",
      "topic": "Sleep Disorders",
      "concept": "OSA; Risk Factors; Patient Profile",
      "unitId": 2,
      "questionText": "Which client is at highest risk for obstructive sleep apnea?",
      "options": [
        {
          "id": "A",
          "text": "Female with anemia and asthma"
        },
        {
          "id": "B",
          "text": "Male with BMI of 38 and hypertension"
        },
        {
          "id": "C",
          "text": "Female smoker with chronic sinusitis"
        },
        {
          "id": "D",
          "text": "Male with type 1 diabetes"
        }
      ],
      "correctIds": ["B"],
      "correctAnswerText": "B",
      "explanation": "**Rationales:**\n\n❌ **A — Incorrect:** Anemia and asthma are not established risk factors for OSA. Female sex is also a lower-risk demographic for OSA (post-menopausal women have increased risk, but females overall have lower OSA prevalence than males). This client has no major OSA risk factors.\n\n✅ **B — Correct:** This client has **three major OSA risk factors**: male sex, obesity (BMI 38 — well above the ≥35 high-risk threshold), and hypertension (OSA is both a cause and consequence of hypertension — the two conditions are strongly bidirectionally linked). Additional risk factors for OSA include: large neck circumference (>17 inches in men, >16 inches in women), middle age, craniofacial abnormalities, crowded oropharynx, and alcohol use. This client's profile represents the highest-risk category.\n\n❌ **C — Incorrect:** Smoking and chronic sinusitis both cause upper respiratory inflammation and nasal congestion that can worsen pre-existing OSA, but they are not primary OSA risk factors in the absence of other major predictors. Female sex again reduces the baseline risk. This client does not carry the highest-risk profile.\n\n❌ **D — Incorrect:** Type 1 diabetes is not a primary risk factor for OSA. Some metabolic conditions (type 2 diabetes, metabolic syndrome) are associated with OSA, but type 1 diabetes does not share the same pathophysiological links. Male sex increases this client's baseline risk compared to females, but without obesity or hypertension, this client's overall risk is lower than option B.\n\n> 💡 **OSA highest-risk triad:** Male sex + BMI ≥35 + hypertension. Neck circumference >17\" in men and >16\" in women is also a high-risk indicator.\n\n---",
      "isSATA": false
    },
    {
      "id": 4,
      "title": "CPAP Teaching — Identifying Incorrect Understanding",
      "topic": "Sleep Disorders",
      "concept": "CPAP; OSA; Patient Teaching; Identifying Incorrect Understanding",
      "unitId": 2,
      "questionText": "A nurse provides teaching about CPAP therapy to a client with newly diagnosed obstructive sleep apnea. Which statement by the client indicates a need for further teaching?",
      "options": [
        {
          "id": "1",
          "text": "\"I should wear the CPAP mask every night while I sleep.\""
        },
        {
          "id": "2",
          "text": "\"The CPAP machine keeps my airway open by delivering pressurized air.\""
        },
        {
          "id": "3",
          "text": "\"Once I start feeling better, I can stop using my CPAP since I'll be cured.\""
        },
        {
          "id": "4",
          "text": "\"I need to clean my mask and tubing regularly to prevent infection.\""
        }
      ],
      "correctIds": ["3"],
      "correctAnswerText": "3",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Correct understanding (no teaching needed):** Daily, every-night use of CPAP while sleeping is exactly what is required. CPAP is only effective when worn consistently. Intermittent use — skipping nights, removing the mask during the night — allows apneic episodes to recur and eliminates the therapeutic benefit. This statement reflects correct understanding.\n\n❌ **Option 2 — Correct understanding (no teaching needed):** This accurately describes the mechanism of CPAP therapy. Obstructive sleep apnea occurs because the soft tissues of the upper airway collapse during sleep, blocking airflow. CPAP delivers a continuous stream of pressurized air that acts as a pneumatic splint, keeping the airway open throughout sleep. This statement reflects accurate patient understanding.\n\n✅ **Option 3 — Incorrect understanding (requires further teaching):** This statement reflects a critical and common misconception about CPAP therapy. CPAP **manages** OSA — it does not **cure** it. When CPAP is used, apneic episodes are prevented and the patient sleeps better, feels more rested, and experiences fewer symptoms. However, the underlying anatomical and physiological factors that cause airway collapse during sleep (obesity, tongue and palate anatomy, muscle tone) remain unchanged. Stopping CPAP will immediately cause the return of sleep apnea, oxygen desaturation, fragmented sleep, and all associated risks (hypertension, cardiac arrhythmias, daytime somnolence). CPAP must be used every night, indefinitely, unless an underlying reversible cause (such as obesity) is addressed through treatment.\n\n❌ **Option 4 — Correct understanding (no teaching needed):** Regular cleaning of the CPAP mask, headgear, and tubing is essential to prevent the accumulation of bacteria, mold, and mineral deposits from humidified air. This reduces the risk of respiratory tract infections and skin irritation. Daily rinsing with warm water and weekly washing with mild soap are standard recommendations. This statement reflects correct understanding.\n\n> 💡 **Key principle:** CPAP is a management strategy, not a cure. \"Feeling better\" is the expected therapeutic response — not a signal to stop therapy. Always reinforce indefinite, nightly use.\n\n---",
      "isSATA": false
    },
    {
      "id": 5,
      "title": "Insomnia — First-Line Treatment",
      "topic": "Sleep Disorders",
      "concept": "Chronic Insomnia; CBT-I; Treatment Priority; Non-Pharmacological",
      "unitId": 2,
      "questionText": "A client reports chronic insomnia for 6 months. Which intervention should the nurse recommend as the first-line treatment?",
      "options": [
        {
          "id": "1",
          "text": "Prescribe zolpidem (Ambien) 5 mg at bedtime for 3 months"
        },
        {
          "id": "2",
          "text": "Refer the client to Cognitive Behavioral Therapy for Insomnia (CBT-I)"
        },
        {
          "id": "3",
          "text": "Recommend drinking a glass of wine before bed to help relax"
        },
        {
          "id": "4",
          "text": "Suggest taking a long afternoon nap to compensate for nighttime sleep loss"
        }
      ],
      "correctIds": ["2"],
      "correctAnswerText": "2",
      "explanation": "**Rationales:**\n\n❌ **Option 1 — Incorrect:** While zolpidem and other hypnotics have a role in short-term insomnia management, **pharmacological therapy is NOT the first-line treatment for chronic insomnia**. Zolpidem carries risks including dependence, tolerance, rebound insomnia, sleepwalking, and next-day cognitive impairment. In older adults, it is on the Beers Criteria list as potentially inappropriate. Medications are considered after non-pharmacological interventions have been trialed.\n\n✅ **Option 2 — Correct:** **Cognitive Behavioral Therapy for Insomnia (CBT-I)** is the gold-standard, first-line treatment for chronic insomnia according to major clinical guidelines (American Academy of Sleep Medicine). CBT-I is superior to medications in long-term outcomes and produces durable improvement without the risks of dependence or tolerance. It includes sleep restriction therapy, stimulus control, relaxation training, cognitive restructuring, and sleep hygiene education.\n\n❌ **Option 3 — Incorrect:** Alcohol is a sleep disruptor. While it may initially induce drowsiness, it suppresses REM sleep, causes early awakening (typically 3–4 hours after sleep onset as blood alcohol levels fall), and leads to fragmented, non-restorative sleep. Recommending alcohol for insomnia is clinically inappropriate and could contribute to alcohol dependence.\n\n❌ **Option 4 — Incorrect:** Long afternoon naps reduce \"sleep pressure\" (adenosine build-up), making it harder to fall asleep at night and perpetuating the insomnia cycle. Sleep restriction — actually limiting time in bed to consolidate sleep — is a core CBT-I technique. Compensatory napping worsens chronic insomnia.\n\n> 💡 **CBT-I vs. medications for insomnia:** CBT-I = first-line, durable, no dependence risk. Pharmacotherapy = second-line, short-term, significant adverse effects. Both can be combined initially if needed.\n\n---",
      "isSATA": false
    },

    /* ═══════════════════════════════════════════════
       UNIT 3 — HOSPITAL SLEEP QUESTIONS
    ═══════════════════════════════════════════════ */
    {
      "id": 6,
      "title": "Restorative Sleep Interventions — SATA",
      "topic": "Hospital Sleep",
      "concept": "Sleep Promotion; Hospitalized Older Adults; Evidence-Based Interventions",
      "unitId": 3,
      "questionText": "A nurse is planning care to promote restorative sleep for a hospitalized older adult. Which actions are appropriate? *(Select all that apply)*",
      "options": [
        {
          "id": "1",
          "text": "Provide a back massage before bedtime"
        },
        {
          "id": "2",
          "text": "Encourage the client to watch television until falling asleep"
        },
        {
          "id": "3",
          "text": "Reduce environmental noise and dim lights in the evening"
        },
        {
          "id": "4",
          "text": "Avoid administering diuretics late in the evening"
        },
        {
          "id": "5",
          "text": "Manage pain before bedtime"
        },
        {
          "id": "6",
          "text": "Wake the client every 2 hours for orientation checks and skin integrity assessment"
        }
      ],
      "correctIds": ["1", "3", "4", "5"],
      "correctAnswerText": "1, 3, 4, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** A back massage before bedtime promotes relaxation by stimulating the parasympathetic nervous system, reducing muscle tension, and facilitating the transition to sleep. It is a well-supported non-pharmacological nursing intervention for sleep promotion and is particularly beneficial for hospitalized patients who may have difficulty relaxing in an unfamiliar environment.\n\n❌ **Option 2 — Incorrect:** Encouraging television use until the client falls asleep is counterproductive. The blue light emitted by screens suppresses melatonin production, and the stimulating content of television keeps the brain cognitively active. Both of these effects delay sleep onset. Evidence consistently shows that screen time near bedtime disrupts sleep quality. *Note: This is a commonly held misconception — many people believe TV helps them fall asleep, when in reality it delays and fragments sleep.*\n\n✅ **Option 3 — Correct:** The hospital environment is a major disruptor of sleep — noise from alarms, staff conversations, and equipment, combined with artificial lighting, suppresses the natural sleep-wake cycle. Reducing environmental noise and dimming lights in the evening helps restore the environmental cues that signal the body to prepare for sleep (circadian rhythm support). This is one of the most impactful nursing interventions for improving hospital sleep quality.\n\n✅ **Option 4 — Correct:** Diuretics increase urine output. When administered late in the evening, they cause nocturia — the client must awaken to void, fragmenting sleep. Scheduling diuretics earlier in the day (typically morning or early afternoon) reduces nighttime voiding episodes without compromising the therapeutic effect of the medication.\n\n✅ **Option 5 — Correct:** Unmanaged pain is one of the most common and significant barriers to sleep in hospitalized patients. Pain activates the sympathetic nervous system and makes it physically impossible to relax into deep sleep. Proactively assessing and managing pain before bedtime — rather than waiting for the patient to request medication — is essential for promoting sleep.\n\n❌ **Option 6 — Incorrect:** Waking a client every 2 hours for orientation checks and skin integrity assessment is a clinical intervention for specific high-risk patients (e.g., patients with altered mental status or high pressure injury risk), not a routine sleep promotion strategy. Frequent nighttime awakenings are themselves a major cause of non-restorative sleep in hospitalized patients. If a patient requires 2-hourly assessments for clinical reasons, nursing staff should cluster these checks efficiently to minimize disruption, not add them as a sleep promotion measure.\n\n> 💡 **Sleep promotion mnemonic — CALM:** **C**luster care, **A**void stimulants (TV, light), **L**ights/noise reduction, **M**assage + medication timing.\n\n---",
      "isSATA": true
    },
    {
      "id": 7,
      "title": "Confused Client — Appropriate Care Goal",
      "topic": "Hospital Sleep",
      "concept": "Goal Setting; Realistic and Achievable Goals; Confused Patient; Delirium",
      "unitId": 3,
      "questionText": "A nurse is developing a care plan for a confused, hospitalized client who has significant sleep-wake cycle disruption. Which goal is most appropriate?",
      "options": [
        {
          "id": "A",
          "text": "Client will sleep 8 hours per night"
        },
        {
          "id": "B",
          "text": "Client will remain oriented ×3 at all times"
        },
        {
          "id": "C",
          "text": "Client will be free from injury during hospitalization"
        },
        {
          "id": "D",
          "text": "Client will ambulate independently by discharge"
        }
      ],
      "correctIds": ["C"],
      "correctAnswerText": "C",
      "explanation": "**Rationales:**\n\n❌ **A — Incorrect:** Guaranteeing 8 hours of uninterrupted sleep for a hospitalized patient — particularly one who is confused and may have altered sleep-wake cycles — is not realistic. Hospital environments are inherently disruptive (noise, procedures, vital sign checks, medication schedules), and confusion itself often involves sleep-wake cycle disturbance (sundowning, delirium). This goal is not achievable and sets both the patient and the care team up for failure.\n\n❌ **B — Incorrect:** \"Oriented ×3 at all times\" is not a realistic goal for a client who is **currently confused**. Confusion may be caused by delirium, dementia, metabolic disturbance, or other conditions that are not immediately correctable. Demanding full orientation at all times as a care goal is inappropriate because: (1) it may not be achievable given the underlying cause; (2) \"at all times\" creates an impossibly constant standard; (3) failure to meet this goal does not mean the care plan failed — it may simply reflect the natural course of the condition.\n\n✅ **C — Correct:** \"Free from injury during hospitalization\" is the most **realistic, achievable, and appropriate** goal for a confused client. It focuses on the primary safety concern — confusion creates high fall and injury risk — and is actionable through specific, measurable nursing interventions (low bed, non-skid footwear, fall alarm, bed in lowest position, 1:1 supervision, environment modification). This goal can be evaluated objectively (did the patient sustain an injury?) and drives a clear prevention-focused plan of care.\n\n❌ **D — Incorrect:** Independent ambulation as a goal for a confused client without fall risk assessment or interventional support is unsafe. A confused patient attempting to ambulate independently is at high risk for falls. If ambulation is clinically appropriate, the goal should specify safe assisted ambulation with nursing support — not independent ambulation, which would require intact cognition, stable gait, and the ability to call for help when needed.\n\n> 💡 **Realistic goal-setting principle:** Goals must be **SMART** — Specific, Measurable, Achievable, Realistic, Time-bound. For a confused patient, safety (injury prevention) is always the priority and the most achievable goal.\n\n---",
      "isSATA": false
    },

    /* ═══════════════════════════════════════════════
       UNIT 4 — SLEEP ASSESSMENT QUESTIONS
    ═══════════════════════════════════════════════ */
    {
      "id": 8,
      "title": "Chronic Insomnia — Best Assessment Question",
      "topic": "Sleep Assessment",
      "concept": "Sleep Assessment; Insomnia History; Sleep Hygiene Evaluation",
      "unitId": 4,
      "questionText": "A client with chronic insomnia presents for evaluation. Which assessment question is most appropriate to ask first?",
      "options": [
        {
          "id": "A",
          "text": "\"How often do you have dreams?\""
        },
        {
          "id": "B",
          "text": "\"Have you made any changes to your diet recently?\""
        },
        {
          "id": "C",
          "text": "\"Can you describe your typical bedtime routine?\""
        },
        {
          "id": "D",
          "text": "\"How many hours do you sleep on weekends?\""
        }
      ],
      "correctIds": ["C"],
      "correctAnswerText": "C",
      "explanation": "**Rationales:**\n\n❌ **A — Incorrect:** Frequency of dreaming provides minimal actionable clinical information for a patient with chronic insomnia. Dreaming occurs during REM sleep — patients who report dreaming may be sleeping, but the presence or absence of dreams does not identify the cause of insomnia or guide treatment. This question does not help the nurse assess sleep hygiene, behavioral factors, or underlying causes.\n\n❌ **B — Incorrect:** Dietary changes may have some relevance to sleep (caffeine content, large late-night meals), but \"have you changed your diet recently?\" is too vague and narrow to serve as the best opening assessment question. It focuses on a single potential contributing factor rather than opening a comprehensive assessment of sleep patterns and behaviors.\n\n✅ **C — Correct:** Assessing the client's **bedtime routine** is the most comprehensive and clinically productive initial question for a chronic insomnia evaluation. It opens the conversation to explore: What time does the patient go to bed and attempt sleep? What activities precede bedtime (screen time, exercise, alcohol, caffeine)? Is the environment conducive to sleep? Does the patient associate the bed with wakefulness rather than sleep? Are there psychological factors (worry, racing thoughts) at bedtime? This single question provides a framework for identifying modifiable sleep hygiene factors that are the targets of evidence-based insomnia treatment (CBT-I — Cognitive Behavioral Therapy for Insomnia).\n\n❌ **D — Incorrect:** Weekend sleep duration provides only a narrow data point. Many insomnia patients sleep differently on weekends due to variable schedules, and weekend \"catch-up sleep\" can itself perpetuate insomnia by disrupting the circadian rhythm. While weekend vs. weekday sleep comparison may be useful supplementary information, it is not the most informative opening question — it provides one data point rather than opening a holistic assessment of sleep habits.\n\n> 💡 **Best insomnia assessment opener:** \"Describe your bedtime routine\" or \"Walk me through what happens from dinner until you fall asleep\" — opens the full picture of sleep hygiene, behaviors, environment, and psychology.\n\n---",
      "isSATA": false
    },
    {
      "id": 9,
      "title": "Sleep Hygiene Teaching — SATA",
      "topic": "Sleep Assessment",
      "concept": "Sleep Hygiene; Patient Education; Insomnia Prevention",
      "unitId": 4,
      "questionText": "A nurse is providing sleep hygiene education to a client with difficulty sleeping. Which recommendations should the nurse include? *(Select all that apply)*",
      "options": [
        {
          "id": "1",
          "text": "Go to bed and wake at the same time every day, including weekends"
        },
        {
          "id": "2",
          "text": "Drink a glass of wine at bedtime to help initiate sleep"
        },
        {
          "id": "3",
          "text": "Avoid screen use for at least 1 hour before bedtime"
        },
        {
          "id": "4",
          "text": "Use the bed only for sleeping, not for watching TV or working"
        },
        {
          "id": "5",
          "text": "Take a 2-hour nap each afternoon to compensate for nighttime sleep loss"
        },
        {
          "id": "6",
          "text": "Avoid caffeine in the afternoon and evening hours"
        }
      ],
      "correctIds": ["1", "3", "4", "6"],
      "correctAnswerText": "1, 3, 4, 6",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** A consistent sleep-wake schedule is the most important single sleep hygiene intervention. Regular timing anchors the circadian clock, builds sleep pressure (adenosine accumulation) at the appropriate time, and promotes consolidated, restorative sleep. Varying the schedule even on weekends disrupts circadian timing.\n\n❌ **Option 2 — Incorrect:** Alcohol induces initial drowsiness but is a significant sleep disruptor. As alcohol is metabolized (typically 3–4 hours after ingestion), it causes rebound arousal, suppresses REM sleep, and leads to fragmented, non-restorative sleep with early awakening. Regular alcohol use for sleep leads to tolerance and worsening insomnia over time.\n\n✅ **Option 3 — Correct:** Screen use before bed exposes the eyes to blue-wavelength light, which potently suppresses melatonin release and delays circadian sleep onset. Avoiding screens for 60–90 minutes before sleep is a core evidence-based sleep hygiene recommendation.\n\n✅ **Option 4 — Correct:** Stimulus control is a key CBT-I technique. Using the bed only for sleep (and sexual activity) prevents the bed from becoming a conditioned stimulus for wakefulness. If a client lies awake in bed frequently, the brain associates the bed with alertness rather than sleepiness — worsening insomnia.\n\n❌ **Option 5 — Incorrect:** Long naps (especially 2 hours) reduce sleep pressure (adenosine drive), making it more difficult to fall asleep at the normal bedtime and perpetuating the nighttime insomnia. If napping is needed, it should be limited to 20–30 minutes and completed before 3 PM.\n\n✅ **Option 6 — Correct:** Caffeine blocks adenosine receptors, preventing the build-up of sleep pressure. Caffeine has a half-life of approximately 5–7 hours. Consuming caffeine in the afternoon or evening delays sleep onset and reduces sleep quality even when the person does not feel \"wired.\"\n\n> 💡 **Sleep hygiene core four:** Consistent schedule + No screens before bed + Bed = sleep only + No afternoon/evening caffeine.\n\n---",
      "isSATA": true
    },
    {
      "id": 10,
      "title": "Medications That Disrupt Sleep",
      "topic": "Sleep Assessment",
      "concept": "Medications; Sleep Disruption; Nocturia; Diuretics; Steroids",
      "unitId": 4,
      "questionText": "A nurse is reviewing the medication list of a client who reports difficulty sleeping. Which medications are most likely contributing to the client's sleep disruption? *(Select all that apply)*",
      "options": [
        {
          "id": "1",
          "text": "Furosemide (Lasix) administered at 8 PM"
        },
        {
          "id": "2",
          "text": "Prednisone administered at 8 PM"
        },
        {
          "id": "3",
          "text": "Ramelteon (Rozerem) administered at 9 PM"
        },
        {
          "id": "4",
          "text": "Metformin administered with dinner"
        },
        {
          "id": "5",
          "text": "Pseudoephedrine administered at 7 PM"
        }
      ],
      "correctIds": ["1", "2", "5"],
      "correctAnswerText": "1, 2, 5",
      "explanation": "**Rationales:**\n\n✅ **Option 1 — Correct:** Furosemide (Lasix) is a loop diuretic that significantly increases urine output. When administered in the evening, it causes **nocturia** — the client must awaken to void, fragmenting sleep and preventing restorative sleep stages. Diuretics should be scheduled in the morning or early afternoon whenever possible.\n\n✅ **Option 2 — Correct:** Corticosteroids such as prednisone have a stimulating effect on the central nervous system. Evening administration is strongly associated with **insomnia, difficulty falling asleep, and frequent awakenings**. When clinically feasible, corticosteroids should be administered in the morning (and with food) to minimize sleep disruption.\n\n❌ **Option 3 — Incorrect:** Ramelteon is a **melatonin receptor agonist** (MT1/MT2 agonist) used specifically to treat insomnia and circadian rhythm disorders. It **promotes** sleep onset and is one of the safest hypnotics available (no dependence, no next-day impairment at standard doses). Its evening administration is intentional and therapeutic.\n\n❌ **Option 4 — Incorrect:** Metformin does not have CNS stimulating effects and does not cause sleep disruption. Its most common adverse effects are gastrointestinal (nausea, diarrhea), which can potentially affect sleep if severe, but it is not a recognized sleep-disrupting medication.\n\n✅ **Option 5 — Correct:** Pseudoephedrine is an alpha-adrenergic decongestant with significant CNS stimulating properties. Evening administration causes **difficulty falling asleep, reduced sleep duration, and increased awakenings**. Clients should be advised to take decongestants in the morning and to avoid evening use.\n\n> 💡 **Sleep-disrupting medication triad:** **D**iuretics (nocturia) + **S**teroids (stimulating) + **S**timulants/decongestants (CNS activation). Schedule these early in the day when possible.\n\n---",
      "isSATA": true
    }
  ]
};
