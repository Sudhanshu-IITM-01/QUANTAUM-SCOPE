
export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    topic: "Qubits",
    question: "What is the basic unit of quantum information?",
    options: ["Pixel", "Qubit", "Byte", "Classical bit"],
    correctAnswer: 1,
    explanation:
      "A qubit is the basic unit of quantum information. It can exist in a quantum superposition of basis states.",
  },
  {
    id: 2,
    topic: "Superposition",
    question: "What does a Hadamard gate do to the state |0⟩?",
    options: [
      "Always changes it to |1⟩",
      "Deletes the qubit",
      "Creates an equal superposition of |0⟩ and |1⟩",
      "Measures the qubit",
    ],
    correctAnswer: 2,
    explanation:
      "The Hadamard gate transforms |0⟩ into (|0⟩ + |1⟩)/√2, an equal superposition.",
  },
  {
    id: 3,
    topic: "Quantum Gates",
    question: "What does the Pauli-X gate do to |0⟩?",
    options: [
      "Changes it to |1⟩",
      "Leaves it unchanged",
      "Measures its probability",
      "Turns it into two qubits",
    ],
    correctAnswer: 0,
    explanation:
      "The Pauli-X gate flips the computational basis states: X|0⟩ = |1⟩ and X|1⟩ = |0⟩.",
  },
  {
    id: 4,
    topic: "Measurement",
    question: "Measuring a qubit in the state |0⟩ in the computational basis gives which result?",
    options: ["Always 1", "Always 0", "50% chance of 1", "No result"],
    correctAnswer: 1,
    explanation:
      "The state |0⟩ produces measurement outcome 0 with probability 100% in the computational basis.",
  },
  {
    id: 5,
    topic: "Entanglement",
    question: "What is quantum entanglement?",
    options: [
      "A type of computer memory",
      "A way to cool a computer",
      "A relationship where a joint quantum state cannot be described as independent states",
      "A classical sorting method",
    ],
    correctAnswer: 2,
    explanation:
      "Entangled systems have a joint quantum state that cannot be described as a product of independent states.",
  },
  {
    id: 6,
    topic: "Algorithms",
    question: "Which quantum algorithm is known for searching an unstructured database?",
    options: [
      "Grover's algorithm",
      "Binary search",
      "Bubble sort",
      "Dijkstra's algorithm",
    ],
    correctAnswer: 0,
    explanation:
      "Grover's algorithm uses amplitude amplification to search an unstructured collection with roughly O(√N) oracle queries.",
  },
  {
    id: 7,
    topic: "Quantum Gates",
    question: "Which gate is commonly used to change the phase of the |1⟩ component?",
    options: ["Pauli-X", "Pauli-Z", "Hadamard only", "Measurement gate"],
    correctAnswer: 1,
    explanation:
      "The Pauli-Z gate leaves |0⟩ unchanged and multiplies |1⟩ by −1.",
  },
  {
    id: 8,
    topic: "Quantum Fourier Transform",
    question: "The Quantum Fourier Transform is a building block of which famous algorithm?",
    options: [
      "Bubble sort",
      "Shor's factoring algorithm",
      "Classical binary search",
      "Linear regression",
    ],
    correctAnswer: 1,
    explanation:
      "The Quantum Fourier Transform plays an important role in Shor's algorithm for integer factorization.",
  },
  {
    id: 9,
    topic: "Quantum Computing",
    question: "Are quantum computers faster than classical computers for every problem?",
    options: [
      "Yes, always",
      "Only for games",
      "No, their advantages apply to particular problems",
      "They cannot process information",
    ],
    correctAnswer: 2,
    explanation:
      "Quantum computers may provide speedups for certain tasks, but they are not automatically faster for all computations.",
  },
  {
    id: 10,
    topic: "Teleportation",
    question: "Quantum teleportation transfers what?",
    options: [
      "Physical matter instantly",
      "An unknown quantum state using entanglement and classical communication",
      "Information faster than light",
      "A complete computer",
    ],
    correctAnswer: 1,
    explanation:
      "Quantum teleportation transfers a quantum state using shared entanglement, a measurement and classical communication. It does not teleport matter or allow faster-than-light communication.",
  },
];
