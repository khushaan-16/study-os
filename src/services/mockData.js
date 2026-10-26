// High fidelity initial mock data for StudyOS
export const initialSubjects = [
  {
    id: 'sub-1',
    name: 'Distributed Systems & Cloud Computing',
    code: 'CS 436',
    color: '#6366f1', // Indigo
    icon: 'Server',
    instructor: 'Prof. Marcus Vance',
    room: 'Turing Hall 302',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    credits: 4,
    description: 'Consensus protocols, Raft, Paxos, distributed storage, and cloud microservices.',
    topics: [
      { id: 'top-1', title: 'CAP Theorem & PACELC', completed: true, confidence: 'high' },
      { id: 'top-2', title: 'Raft Consensus Protocol & Leader Election', completed: true, confidence: 'high' },
      { id: 'top-3', title: 'Vector Clocks & Lamport Timestamps', completed: false, confidence: 'medium' },
      { id: 'top-4', title: 'Byzantine Fault Tolerance (BFT)', completed: false, confidence: 'low' },
      { id: 'top-5', title: 'Two-Phase Commit (2PC) & Sagas', completed: false, confidence: 'low' },
    ],
    totalStudyHours: 24.5,
  },
  {
    id: 'sub-2',
    name: 'Machine Learning & Neural Networks',
    code: 'CS 480',
    color: '#8b5cf6', // Violet
    icon: 'Brain',
    instructor: 'Dr. Elena Rostova',
    room: 'Science Complex 410',
    schedule: 'Tue, Thu 02:00 PM - 03:30 PM',
    credits: 4,
    description: 'Deep architectures, backpropagation, transformers, attention mechanisms, and optimization.',
    topics: [
      { id: 'top-6', title: 'Gradient Descent & Adaptive Optimizers (Adam, RMSProp)', completed: true, confidence: 'high' },
      { id: 'top-7', title: 'Convolutional Networks & Residual Connections', completed: true, confidence: 'high' },
      { id: 'top-8', title: 'Transformer Self-Attention & Positional Encodings', completed: false, confidence: 'medium' },
      { id: 'top-9', title: 'Diffusion Models & Latent Spaces', completed: false, confidence: 'low' },
    ],
    totalStudyHours: 32.0,
  },
  {
    id: 'sub-3',
    name: 'Advanced Algorithms & Complexity',
    code: 'CS 341',
    color: '#06b6d4', // Cyan
    icon: 'Binary',
    instructor: 'Prof. David Karger',
    room: 'Math Building 115',
    schedule: 'Mon, Fri 01:00 PM - 02:30 PM',
    credits: 3,
    description: 'NP-Completeness, randomized algorithms, min-cut, dynamic programming, and network flows.',
    topics: [
      { id: 'top-10', title: 'Ford-Fulkerson & Max Flow Min Cut', completed: true, confidence: 'high' },
      { id: 'top-11', title: 'NP-Completeness Reductions (3-SAT to Clique)', completed: true, confidence: 'medium' },
      { id: 'top-12', title: 'Karger’s Randomized Min-Cut', completed: false, confidence: 'low' },
      { id: 'top-13', title: 'Linear Programming & Duality', completed: false, confidence: 'low' },
    ],
    totalStudyHours: 18.5,
  },
  {
    id: 'sub-4',
    name: 'Computer Architecture & GPU Systems',
    code: 'ECE 350',
    color: '#10b981', // Emerald
    icon: 'Cpu',
    instructor: 'Dr. Alan Pierce',
    room: 'Engineering Lab 204',
    schedule: 'Wed, Fri 09:00 AM - 10:30 AM',
    credits: 4,
    description: 'Pipelining, branch prediction, cache coherence (MESI), and SIMD/GPU thread scheduling.',
    topics: [
      { id: 'top-14', title: '5-Stage RISC-V Pipeline Hazards & Forwarding', completed: true, confidence: 'high' },
      { id: 'top-15', title: 'Tomasulo Algorithm & Out-of-Order Execution', completed: false, confidence: 'medium' },
      { id: 'top-16', title: 'MESI & MOESI Cache Coherence', completed: false, confidence: 'low' },
      { id: 'top-17', title: 'CUDA Warp Execution & Memory Coalescing', completed: false, confidence: 'low' },
    ],
    totalStudyHours: 15.0,
  }
];

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Implement Raft Heartbeat & Election Timer in Go',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    priority: 'high',
    status: 'in-progress',
    estimatedMinutes: 120,
    completed: false,
    tags: ['Lab', 'Coding', 'Go'],
    description: 'Handle term updates, candidate voting RPC responses, and leader heartbeat resets.',
  },
  {
    id: 'task-2',
    title: 'Derive Backpropagation Matrix Gradients for Cross-Entropy',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString().split('T')[0],
    priority: 'urgent',
    status: 'todo',
    estimatedMinutes: 60,
    completed: false,
    tags: ['Theory', 'Problem Set'],
    description: 'Show mathematical derivation of dL/dW for softmax output with cross-entropy loss.',
  },
  {
    id: 'task-3',
    title: 'Max Flow Reduction Proof Problem Set 4',
    subjectId: 'sub-3',
    subjectName: 'Advanced Algorithms & Complexity',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    priority: 'medium',
    status: 'todo',
    estimatedMinutes: 90,
    completed: false,
    tags: ['Homework', 'Proof'],
    description: 'Questions 1 to 4 on bipartite matching and vertex disjoint paths.',
  },
  {
    id: 'task-4',
    title: 'Read Tomasulo Algorithm Paper & Trace Hazard Pipeline',
    subjectId: 'sub-4',
    subjectName: 'Computer Architecture & GPU Systems',
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    priority: 'medium',
    status: 'completed',
    estimatedMinutes: 45,
    completed: true,
    tags: ['Reading'],
    description: 'Reservation stations, common data bus (CDB), and register renaming.',
  },
  {
    id: 'task-5',
    title: 'Self-Attention Mechanism Numerical Walkthrough',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    priority: 'high',
    status: 'todo',
    estimatedMinutes: 75,
    completed: false,
    tags: ['Study', 'Transformers'],
    description: 'Step through Q, K, V matrix multiplications and scaled dot-product masking.',
  }
];

export const initialExams = [
  {
    id: 'exam-1',
    title: 'Midterm: Consensus & Distributed Storage',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    date: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    time: '10:00 AM',
    location: 'Turing Hall Aud A',
    weight: '30%',
    targetGrade: 'A',
    prepProgress: 65,
    topicsCovered: [
      'CAP Theorem & PACELC',
      'Raft Consensus Protocol & Leader Election',
      'Vector Clocks & Lamport Timestamps',
      'Byzantine Fault Tolerance (BFT)'
    ],
    notes: 'Formula sheet permitted (1 page double sided). Focus on leader split-brain scenarios.'
  },
  {
    id: 'exam-2',
    title: 'Final Examination: Deep Learning Architectures',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    date: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    time: '02:00 PM',
    location: 'Science Complex Aud 1',
    weight: '40%',
    targetGrade: 'A+',
    prepProgress: 45,
    topicsCovered: [
      'Gradient Descent & Optimizers',
      'CNNs & ResNets',
      'Transformer Attention & Positional Encoding',
      'Diffusion & Generative Modeling'
    ],
    notes: 'Comprehensive exam covering all lectures through week 12.'
  },
  {
    id: 'exam-3',
    title: 'Midterm II: Pipelining & Cache Coherence',
    subjectId: 'sub-4',
    subjectName: 'Computer Architecture & GPU Systems',
    date: new Date(Date.now() + 86400000 * 20).toISOString().split('T')[0],
    time: '09:00 AM',
    location: 'Engineering Hall 101',
    weight: '25%',
    targetGrade: 'A',
    prepProgress: 25,
    topicsCovered: [
      '5-Stage RISC-V Pipeline Hazards',
      'Tomasulo Algorithm',
      'MESI Cache Coherence Protocol'
    ],
    notes: 'Bring engineering calculator.'
  }
];

export const initialStudySessions = [
  {
    id: 'sess-1',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    durationMinutes: 50,
    date: new Date(Date.now() - 86400000 * 0).toISOString(),
    sessionType: 'pomodoro',
    focusRating: 5,
    notes: 'Completed Raft election state machine and RPC request structures.',
  },
  {
    id: 'sess-2',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    durationMinutes: 45,
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    sessionType: 'pomodoro',
    focusRating: 4,
    notes: 'Worked through gradient derivations of multi-head attention.',
  },
  {
    id: 'sess-3',
    subjectId: 'sub-3',
    subjectName: 'Advanced Algorithms & Complexity',
    durationMinutes: 60,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    sessionType: 'deep-work',
    focusRating: 5,
    notes: 'Solved 3 flow network problems using push-relabel method.',
  },
  {
    id: 'sess-4',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    durationMinutes: 75,
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    sessionType: 'deep-work',
    focusRating: 4,
    notes: 'Reviewed Paxos versus Raft trade-offs.',
  },
  {
    id: 'sess-5',
    subjectId: 'sub-4',
    subjectName: 'Computer Architecture & GPU Systems',
    durationMinutes: 35,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    sessionType: 'pomodoro',
    focusRating: 3,
    notes: 'Mapped MESI cache state transitions for 4 cores.',
  },
  {
    id: 'sess-6',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    durationMinutes: 50,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    sessionType: 'pomodoro',
    focusRating: 5,
    notes: 'Trained a toy transformer model on Shakespeare dataset.',
  }
];

export const initialNotes = [
  {
    id: 'note-1',
    title: 'Raft Consensus Protocol: The Key Invariants',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    category: 'Lecture Notes',
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    content: `# Raft Consensus Protocol

## Key Safety Invariants
1. **Election Safety**: At most one leader can be elected in a given term.
2. **Leader Append-Only**: A leader never overwrites or truncates its log; it only appends new entries.
3. **Log Matching Property**: If two logs contain an entry with the same index and term, then the logs are identical in all entries up through the given index.
4. **Leader Completeness**: If a log entry is committed in a given term, then that entry will be present in the logs of the leaders for all higher-number terms.

## States
- **Follower**: Passive, only responds to incoming RPCs from candidates and leaders.
- **Candidate**: Transitions here if election timer expires. Increments term, votes for self, sends RequestVote RPCs.
- **Leader**: Handles client requests and sends periodic heartbeats (empty AppendEntries).`,
    tags: ['Distributed Systems', 'Raft', 'Protocols']
  },
  {
    id: 'note-2',
    title: 'Transformer Architecture & Self-Attention Deep Dive',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    category: 'Summary',
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    content: `# Transformer Self-Attention

## Attention Formula
Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V

## Key Components:
- **Queries (Q)**: What the token is looking for.
- **Keys (K)**: What information the token holds.
- **Values (V)**: The actual representation transferred.
- **Scale factor 1 / sqrt(d_k)**: Prevents dot products from growing excessively large for large dimensions, which would push softmax into regions with vanishingly small gradients.

## Multi-Head Advantage:
Allows the model to jointly attend to information from different representation subspaces at different positions.`,
    tags: ['Machine Learning', 'Transformers', 'Attention']
  },
  {
    id: 'note-3',
    title: 'Max-Flow Min-Cut Theorem Summary',
    subjectId: 'sub-3',
    subjectName: 'Advanced Algorithms & Complexity',
    category: 'Cheat Sheet',
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    content: `# Max-Flow Min-Cut Theorem

In any flow network, the maximum amount of flow passing from the source to the sink is equal to the total capacity of the edges in the minimum cut.

### Conditions for flow f:
1. **Capacity constraint**: 0 <= f(u, v) <= c(u, v)
2. **Skew symmetry**: f(u, v) = -f(v, u)
3. **Flow conservation**: sum of f(u, v) for all v = 0 (except for s and t)

### Algorithms:
- **Ford-Fulkerson**: O(E * max_flow) with augmenting paths.
- **Edmonds-Karp**: O(V * E^2) using BFS for shortest augmenting path.`,
    tags: ['Algorithms', 'Graphs', 'Flow']
  }
];

export const initialResources = [
  {
    id: 'res-1',
    title: 'In Search of an Understandable Consensus Algorithm (Raft Paper)',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    type: 'Paper',
    url: 'https://raft.github.io/raft.pdf',
    author: 'Diego Ongaro and John Ousterhout',
    rating: 5,
    tags: ['Essential', 'PDF', 'Primary Source'],
    notes: 'Read Sections 1-5 very thoroughly for the midterm exam.'
  },
  {
    id: 'res-2',
    title: 'Attention Is All You Need',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    type: 'Paper',
    url: 'https://arxiv.org/abs/1706.03762',
    author: 'Vaswani et al. (Google Brain)',
    rating: 5,
    tags: ['Foundational', 'Transformer'],
    notes: 'Key diagrams: Figure 1 Architecture & Figure 2 Scaled Dot-Product Attention.'
  },
  {
    id: 'res-3',
    title: 'Visualizing Distributed Systems: The Secret Lives of Data',
    subjectId: 'sub-1',
    subjectName: 'Distributed Systems & Cloud Computing',
    type: 'Interactive Guide',
    url: 'http://thesecretlivesofdata.com/raft/',
    author: 'Raft User Group',
    rating: 5,
    tags: ['Visualization', 'Interactive'],
    notes: 'Amazing interactive visualization of election timeouts and split votes.'
  },
  {
    id: 'res-4',
    title: 'Stanford CS231n: Convolutional Neural Networks for Visual Recognition',
    subjectId: 'sub-2',
    subjectName: 'Machine Learning & Neural Networks',
    type: 'Course Notes',
    url: 'https://cs231n.github.io/',
    author: 'Stanford University',
    rating: 5,
    tags: ['Tutorial', 'Reference'],
    notes: 'Best explanation of backprop and computational graphs.'
  }
];
