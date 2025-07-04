```markdown

voices-of-the-magi/
├── public/                         # Frontend UI (Firebase Hosting)
│   ├── index.html                  # Chat UI: star-map, Magi selector, chat window
│   ├── style.css                   # Minimalist, incense-toned aesthetic
│   └── chat.js                     # Chat logic: input handling, Magi selection, gift animations
├── functions/                      # Firebase Cloud Functions backend
│   ├── index.js                    # Entrypoint: routes inputs to Grok, manages journey
│   ├── .env                        # Secrets (xAI API key, Firebase credentials)
│   ├── package.json                # Dependencies (firebase-functions, dotenv, xAI SDK)
│   ├── magi/                       # Grok-driven Magi logic (distinct voices)
│   │   ├── prompts.js              # Specific prompts for each king (Melchior, Caspar, Balthazar)
│   │   ├── melchior.js             # Wisdom, purpose (Gold)
│   │   ├── caspar.js               # Awe, spirituality (Frankincense)
│   │   ├── balthazar.js            # Healing, grief (Myrrh)
│   ├── gifts/                      # Symbolic gift generators
│   │   ├── gold.js                 # Identity, value reflections
│   │   ├── frankincense.js         # Prayerful, awe-inspired responses
│   │   ├── myrrh.js                # Grief, transformation insights
│   ├── journey/                    # Journey tracking
│   │   ├── steps.js                # 12-step Epiphany path
│   │   └── star-guide.js           # Tone-based Magi assignment
│   ├── utils/                      # Helper functions
│   │   ├── firestore.js            # Firestore read/write for journey, chat history
│   │   └── logger.js               # Debug and engagement tracking
├── firebase.json                   # Firebase Hosting & Functions config
├── .firebaserc                     # Firebase project settings
├── .gitignore                      # Ignore .env, node_modules
├── LICENSE                         # MIT license
└── README.md                       # Chatbot overview, setup, vision

```