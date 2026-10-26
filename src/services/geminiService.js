// Google Gemini API Integration for StudyOS

const GEMINI_STORAGE_KEY = 'studyos_gemini_key';

export const getGeminiApiKey = () => {
  return localStorage.getItem(GEMINI_STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const setGeminiApiKey = (key) => {
  if (key) {
    localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(GEMINI_STORAGE_KEY);
  }
};

const callGeminiApi = async (prompt, systemInstruction = '') => {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return null; // Will trigger simulated AI engine
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction ? systemInstruction + '\n\n' : ''}${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn('Gemini API call failed:', errData);
      return null;
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.warn('Gemini Network/API error, falling back to simulated engine:', err);
    return null;
  }
};

export const geminiService = {
  // Generate interactive study plan
  async generateStudyPlan({ subjectName, examDate, daysAvailable, hoursPerDay = 3, topics = [], targetGrade = 'A' }) {
    const prompt = `Generate a rigorous, day-by-day academic study plan for the course "${subjectName}".
Exam Date: ${examDate} (${daysAvailable} days remaining).
Daily study capacity: ${hoursPerDay} hours/day.
Target Grade: ${targetGrade}.
Topics to cover: ${topics.length > 0 ? topics.join(', ') : 'Key comprehensive curriculum topics'}.

Respond in JSON format with this exact structure:
{
  "summary": "High-level strategy summary",
  "recommendedDailyHours": ${hoursPerDay},
  "totalSessions": ${Math.max(3, daysAvailable * 2)},
  "days": [
    {
      "dayNumber": 1,
      "date": "Day 1",
      "focus": "Topic name",
      "targetMinutes": 180,
      "sessions": [
        { "title": "Session 1 title", "technique": "Active Recall / Feynman / Problem Solving", "duration": 60, "notes": "Specific subtopics to cover" },
        { "title": "Session 2 title", "technique": "Deep Practice", "duration": 60, "notes": "Exercises to solve" }
      ]
    }
  ],
  "retentionStrategy": "Spaced repetition reminder notes"
}`;

    const rawResponse = await callGeminiApi(prompt, 'You are an elite academic tutor and learning scientist. Always return valid parseable JSON.');
    
    if (rawResponse) {
      try {
        const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
      } catch (e) {
        console.warn('Could not parse JSON from Gemini response, using heuristic plan:', e);
      }
    }

    // High quality intelligent heuristic fallback plan
    const numDays = Math.max(3, Math.min(daysAvailable || 7, 7));
    const dayPlans = [];
    const topicPool = topics.length > 0 ? topics : [
      'Core Theoretical Foundations & Invariants',
      'Algorithmic Implementations & Edge Cases',
      'Mathematical Derivations & State Transitions',
      'Complex Synthesis Problems & Exam Mock',
      'High-Yield Review & Weakness Remediation'
    ];

    for (let i = 1; i <= numDays; i++) {
      const topic = topicPool[(i - 1) % topicPool.length];
      const isReviewDay = i === numDays;
      dayPlans.push({
        dayNumber: i,
        date: `Day ${i} (${i === 1 ? 'Today' : `T+${i - 1}`})`,
        focus: isReviewDay ? 'Comprehensive Timed Mock & Weak Area Drill' : topic,
        targetMinutes: hoursPerDay * 60,
        sessions: [
          {
            title: isReviewDay ? 'Timed Exam Simulation (2 Hours)' : `Deep Theory: ${topic}`,
            technique: isReviewDay ? 'Exam Simulation' : 'Active Recall & First Principles',
            duration: Math.round(hoursPerDay * 30),
            notes: isReviewDay ? 'Solve past year midterm under strict closed-book conditions.' : 'Reconstruct core architectural diagrams and verify state proofs from memory.'
          },
          {
            title: isReviewDay ? 'Error Log Analysis & Rapid Flashcard Sweep' : `Problem Set & Proofs: ${topic}`,
            technique: isReviewDay ? 'Targeted Remediation' : 'Deliberate Practice',
            duration: Math.round(hoursPerDay * 30),
            notes: 'Analyze failure modes, re-derive any missed questions, and consolidate notes.'
          }
        ]
      });
    }

    return {
      summary: `Targeted ${numDays}-day sprint for ${subjectName} targeting a grade of ${targetGrade}. Structured using alternating spaced recall and timed problem synthesis to maximize retention.`,
      recommendedDailyHours: hoursPerDay,
      totalSessions: numDays * 2,
      days: dayPlans,
      retentionStrategy: 'Review yesterday’s error log for 15 minutes before starting any new topic.'
    };
  },

  // Academic Chat Assistance
  async chatWithAI(userMessage, context = {}) {
    const systemPrompt = `You are the StudyOS AI Academic Mentor. You help undergraduate and graduate students master complex STEM and university coursework, prepare for exams, break down difficult proofs, write code, and structure their study habits.
Current student context:
Active subjects: ${context.subjectNames || 'Distributed Systems, Machine Learning, Algorithms'}
Upcoming exams: ${context.upcomingExams || 'Midterm in 6 days'}
Be concise, rigorous, encouraging, and structured. Use markdown formatting with bullet points and clear headings where appropriate.`;

    const response = await callGeminiApi(userMessage, systemPrompt);
    if (response) return response;

    // Simulated academic responses for common questions
    const lower = userMessage.toLowerCase();
    if (lower.includes('raft') || lower.includes('consensus')) {
      return `### Raft Consensus Protocol Breakdown

Raft decomposes distributed consensus into three independent subproblems:

1. **Leader Election**:
   - Heartbeat timeouts trigger an election.
   - Candidates request votes; a candidate needs a majority ($\lfloor n/2 \rfloor + 1$) to become leader.
   - Randomized timers (150ms–300ms) prevent split votes.

2. **Log Replication**:
   - Leader accepts client commands, appends them to its local log, and broadcasts \`AppendEntries\` RPCs.
   - Once a majority of followers acknowledge, the entry is committed and applied to the state machine.

3. **Safety Guarantee**:
   - **Leader Completeness**: If a log entry is committed in a given term, it is guaranteed to be present in the logs of all leaders for higher terms.
   
*Pro Tip for your Midterm*: When tracing Raft logs, always check if the candidate's log is at least as up-to-date as the voter's log (\`term\` first, then \`index\`).`;
    }

    if (lower.includes('transformer') || lower.includes('attention')) {
      return `### Scaled Dot-Product Attention Explained

The core equation of Transformer self-attention is:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

#### Why divide by $\\sqrt{d_k}$?
For large projection dimensions $d_k$, dot products grow large in magnitude, driving the softmax function into regions with extremely small gradients (the vanishing gradient problem). Dividing by $\\sqrt{d_k}$ preserves unit variance when queries and keys are independent zero-mean, unit-variance variables.

#### Computational Complexity:
- Sequence length $N$, hidden dim $D$:
- Time complexity: $\\mathcal{O}(N^2 D)$
- Space complexity for attention matrix: $\\mathcal{O}(N^2)$`;
    }

    if (lower.includes('exam') || lower.includes('study plan') || lower.includes('cram')) {
      return `### High-Efficiency Exam Preparation Strategy

To optimize retention in the days before your exam:

1. **Interleaved Deliberate Practice**:
   - Avoid spending 4 hours exclusively on one topic.
   - Split your block into 45-minute cycles alternating between theory, problem solving, and past exam questions.

2. **The Feynman Technique**:
   - Pick a complex concept (e.g. Paxos vs Raft, Backpropagation derivation).
   - Write down an explanation using zero jargon as if explaining to a sophomore.
   - Identify gaps where your explanation falters, return to reference notes, and fix them.

3. **Active Recall over Passive Rereading**:
   - Looking at highlighted notes creates the illusion of mastery.
   - Always test yourself using flashcards or blank-sheet diagram reconstruction.`;
    }

    return `Here is a structured academic breakdown to help you with that:

1. **Fundamental Concept**: Break down the core theoretical principle behind this question into its atomic parts.
2. **Key Invariant or Theorem**: Identify which governing rules or constraints apply in this scenario.
3. **Common Pitfall**: Students often overlook edge cases or boundary conditions when formulating the solution.
4. **Actionable Next Step**: Try writing out the mathematical proof or drawing the component diagram from scratch without looking at the textbook solution!

Feel free to ask for a deeper step-by-step mathematical derivation or practice problem.`;
  }
};
