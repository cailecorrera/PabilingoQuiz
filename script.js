/*
    MathQuest - Operations & Notation Learning Platform
    Main Application Logic
*/

// ===== State Management =====
let currentChapter = 0;
let currentLevel = 0;
let currentQuestion = 0;
let totalAttempts = 0;
let correctAnswers = 0;
let userProgress = {
    completedLevels: [], // Array of "chapter-level" strings
    currentChapter: 0,
    currentLevel: 0
};

// Matching game state
let matchingState = {
    selectedLeft: null,
    selectedRight: null,
    matches: []
};

// ===== Chapter Data =====
const chapters = [
    {
        id: 0,
        name: "Palaragdagan at Palabawasan",
        icon: "➕",
        description: "Ang buumbilang ay binubuo ng tandang tahas, tandang baling, at awan. Sa pagdaragdag at pagbabawas ng buumbilang, mahalagang tandaan ang mga tanda (+ at −) ng mga bilang.",
        levels: [
            { name: "Pagdaragdag ng mga Buumbilang", desc: "Adding small numbers" },
            { name: "Pagbabawas ng mga Buumbilang", desc: "Subtracting small numbers" },
            { name: "Maramihang Operasyon", desc: "Both addition and subtraction." }
        ]
    },
    {
        id: 1,
        name: "Palaramihan at Palahatian",
        icon: "✖️",
        description: "Ang apat na batayang sakilos ay ang palaragdagan, palabawasan, palaramihan, at palahatian. Sa araling ito, tatalakayin ang palaramihan at palahatian ng integers na may tanda.",
        levels: [
            { name: "Palaramihan", desc: "Times tables practice" },
            { name: "Palahatian", desc: "Dividing numbers" },
            { name: "Maramihang Operasyon", desc: "Both multiply and divide" }
        ]
    },
    {
        id: 2,
        name: "Pinaghalong Batayáng Sakilos",
        icon: "🔢",
        description: "Ang mga buumbilang ay maaaring may tandang tahas o tandang baling. Kapag pinagsama ang palaramihan, palahatian, palaragdagan, at palabawasan sa isang pahayag, kailangang sundin ang tamang pagkasunod-sunod ng operasyon at ang wastong tanda ng bawat bilang.",
        levels: [
            { name: "Dalawang Sakilos", desc: "Two Operations" },
            { name: "Tatlong Sakilos", desc: "Three Operations" },
            { name: "Challenge Mode", desc: "All Four Operations" }
        ]
    },
    {
        id: 3,
        name: "Mga Tumbasan",
        icon: "📝",
        description: "Ang tumbasan ay isang pahayag na nagpapakita na magkapantay ang dalawang panig. Ang layunin sa pagsagot ng mga tumbasan ay hanapin ang halaga ng x na magpapantay sa kaliwang panig at kanang panig ng tumbasan",
        levels: [
            { name: "Tuwiring Tumbasan", desc: "May isang antas lamang" },
            { name: "Tumbasan na may X sa Magkabilang Panig", desc: "Ang pag-eequate ng dalawang ekspresyon" },
            { name: "Quadratic na Tumbasan", desc: "May antas na dalawa" }
        ]
    },
    {
        id: 4,
        name: "Pundasyunal na Panandaan",
        icon: "⚖️",
        description: "Mga Pangunahing Pánandaing Kasiyangaán",
        levels: [
            { name: "Parirami ng Duhakay (Dagup at Kaibhan)", desc: "Ang Simula ng Panandaan" },
            { name: "Talurami ng Duhakay (Dagup at Kaibhan)", desc: "Pangunahing kaalaman sa Panandaan" },
            { name: "Mga Karagdagang Pagsasanay", desc: "Ang Huling Kabanata" },

           
        ]
    }
];

// ===== Mascot Messages =====
const mascotMessages = {
    encouragement: [
        "Kaya mo 'yan, Anak!",
        "Sige lang, marami pang oras",
        "Pag-isipan mo pa!",
        "Tuloy lang!",
        "Malapit ka na talaga!"
    ],
    correct: [
        "May tama ka!",
        "Magaling!",
        "Tumpak!",
        "Ang angas naman niyan!",
        "Ayun oh!"
    ],
    incorrect: [
        "Subukan mo ulit!",
        "Parang mali...",
        "Hmm, isipin mo ulit",
        "Tignan mo ang mga kalkulasyon mo",
        "Konti na lang!"
    ]
};

// ===== DOM Elements =====
const screens = {
    home: document.getElementById('homeScreen'),
    chapters: document.getElementById('chaptersScreen'),
    levels: document.getElementById('levelsScreen'),
    instruction: document.getElementById('instructionScreen'),
    quiz: document.getElementById('quizScreen'),
    complete: document.getElementById('completeScreen'),
    chapterComplete: document.getElementById('chapterCompleteScreen')
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateGlobalProgress();
    renderChapters();
});

// ===== Progress Management =====
function loadProgress() {
    const saved = localStorage.getItem('mathquest_progress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
}

function saveProgress() {
    localStorage.setItem('mathquest_progress', JSON.stringify(userProgress));
}

function resetProgress() {
    if (confirm('Nais mo bang ulitin ang iyong progress? Hindi na ito maaaring bawiin.')) {
        userProgress = {
            completedLevels: [],
            currentChapter: 0,
            currentLevel: 0
        };
        saveProgress();
        updateGlobalProgress();
        renderChapters();
        showScreen('home');
    }
}

function isLevelCompleted(chapter, level) {
    return userProgress.completedLevels.includes(`${chapter}-${level}`);
}

function isLevelUnlocked(chapter, level) {
    // First level of first chapter is always unlocked
    if (chapter === 0 && level === 0) return true;
    
    // Check if previous level is completed
    if (level > 0) {
        return isLevelCompleted(chapter, level - 1);
    }
    
    // First level of a chapter requires all levels of previous chapter
    if (chapter > 0) {
        for (let i = 0; i < 3; i++) {
            if (!isLevelCompleted(chapter - 1, i)) return false;
        }
        return true;
    }
    
    return false;
}

function isChapterUnlocked(chapter) {
    if (chapter === 0) return true;
    // Check if all levels of previous chapter are completed
    for (let i = 0; i < 3; i++) {
        if (!isLevelCompleted(chapter - 1, i)) return false;
    }
    return true;
}

function isChapterCompleted(chapter) {
    for (let i = 0; i < 3; i++) {
        if (!isLevelCompleted(chapter, i)) return false;
    }
    return true;
}

function completeLevel(chapter, level) {
    const levelKey = `${chapter}-${level}`;
    if (!userProgress.completedLevels.includes(levelKey)) {
        userProgress.completedLevels.push(levelKey);
        saveProgress();
        updateGlobalProgress();
    }
}

function updateGlobalProgress() {
    const totalLevels = 15; // 5 chapters × 3 levels
    const completedLevels = userProgress.completedLevels.length;
    const percentage = Math.round((completedLevels / totalLevels) * 100);
    
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${percentage}%`;
}

// ===== Screen Navigation =====
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
    
    // Trigger specific render functions
    if (screenName === 'chapters') {
        renderChapters();
    }
}

// ===== Render Functions =====
function renderChapters() {
    const grid = document.getElementById('chaptersGrid');
    grid.innerHTML = '';
    
    chapters.forEach((chapter, index) => {
        const isUnlocked = isChapterUnlocked(index);
        const isCompleted = isChapterCompleted(index);
        const completedLevels = [0, 1, 2].filter(l => isLevelCompleted(index, l)).length;
        
        const card = document.createElement('div');
        card.className = `chapter-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`;
        card.onclick = () => isUnlocked && selectChapter(index);
        
        card.innerHTML = `
            <div class="chapter-icon">${chapter.icon}</div>
            <span class="chapter-number">Chapter ${index + 1}</span>
            <h3 class="chapter-name">${chapter.name}</h3>
            <div class="chapter-progress">
                <div class="chapter-progress-bar">
                    <div class="chapter-progress-fill" style="width: ${(completedLevels / 3) * 100}%"></div>
                </div>
                <span class="chapter-progress-text">${completedLevels}/3</span>
            </div>
            ${!isUnlocked ? '<span class="chapter-lock">🔒</span>' : ''}
            ${isCompleted ? '<span class="chapter-badge">✓ Complete</span>' : ''}
        `;
        
        grid.appendChild(card);
    });
}

function selectChapter(chapterIndex) {
    currentChapter = chapterIndex;
    const chapter = chapters[chapterIndex];
    
    document.getElementById('chapterTitle').textContent = `Chapter ${chapterIndex + 1}: ${chapter.name}`;
    document.getElementById('chapterDescription').textContent = chapter.description;
    
    renderLevels();
    showScreen('levels');
}

function renderLevels() {
    const grid = document.getElementById('levelsGrid');
    grid.innerHTML = '';
    
    const chapter = chapters[currentChapter];
    
    chapter.levels.forEach((level, index) => {
        const isUnlocked = isLevelUnlocked(currentChapter, index);
        const isCompleted = isLevelCompleted(currentChapter, index);
        const isCurrent = isUnlocked && !isCompleted;
        
        const card = document.createElement('div');
        card.className = `level-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;
        card.onclick = () => isUnlocked && selectLevel(index);
        
        card.innerHTML = `
            <div class="level-number">${isCompleted ? '✓' : index + 1}</div>
            <div class="level-info">
                <h4 class="level-name">${level.name}</h4>
                <p class="level-desc">${level.desc}</p>
            </div>
            <span class="level-status">${!isUnlocked ? '🔒' : isCompleted ? '⭐' : '▶️'}</span>
        `;
        
        grid.appendChild(card);
    });
}

function selectLevel(levelIndex) {
    currentLevel = levelIndex;
    showInstructions();
}

// ===== Instruction Screen =====
function showInstructions() {
    const chapter = chapters[currentChapter];
    const level = chapter.levels[currentLevel];
    const instruction = getInstructionContent(currentChapter, currentLevel);
    
    document.getElementById('instructionTitle').textContent = level.name;
    document.getElementById('speechBubble').innerHTML = `<p>${instruction.greeting}</p>`;
    document.getElementById('instructionText').innerHTML = instruction.content;
    document.getElementById('instructionExamples').innerHTML = instruction.examples;
    
    showScreen('instruction');
}

function getInstructionContent(chapter, level) {
    const instructions = {
        0: { // Addition and Subtraction
            0: {
                greeting: "Mabuhay mga bata! Ako po ay si Ginoong PaBi, ang iyong guro at tuturuan kita sa Pagdaragdag ng Buumbilang!",
                content: `
                    <p><strong>Palaragdagan</strong> ay nangangahulugan ng pagsasama-sama ng mga numero.</p>
                    <p>Kapag nakakita ka ng <strong>+</strong> kailangan mong magdagdag!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">3 + 2</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">5</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">4 + 5</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">9</span>
                    </div>
                `
            },
            1: {
                greeting: "Magaling! Aralin naman natin ngayon ang Palabawasan!",
                content: `
                    <p><strong>Palabawasan</strong> ay nangangahulugan ng pag-alis ng mga numero.</p>
                    <p>Kapag nakakita ka ng <strong>−</strong> kailangan mong magbawas!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">7 - 3</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">4</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">9 - 5</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">4</span>
                    </div>
                `
            },
            2: {
                greeting: "Mahusay! Pagsamahin naman natin ang Palaragdagan at Palabawasan!",
                content: `
                    <p>Makikita mo pareho ang <strong>+</strong> at <strong>−</strong> ngayon.</p>
                    <p>Basahing mabuti para malaman kung alin ang gagamitin!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">5 + 3</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">8</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">8 - 2</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">6</span>
                    </div>
                `
            }
        },
        1: { // Multiplication and Division
            0: {
                greeting: "Oras na para matuto ng Palaramihan!",
                content: `
                    <p><strong>Palaramihan</strong> ay ang mabilis na pagdaragdag ng mga numero.</p>
                    <p>Kapag nakakita ka ng <strong>×</strong> kailangan mong magmultiplika ang mga numero!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">3 × 4</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">12</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">5 × 2</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">10</span>
                    </div>
                `
            },
            1: {
                greeting: "Ngayon, aralin natin ang Palahatian!",
                content: `
                    <p><strong>Palahatian</strong>ay nangangahulugan ng paghahati sa pantay na bahagi.</p>
                    <p>Kapag nakakita ka ng <strong>÷</strong> kailangan mong maghati ng mga numero!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">12 ÷ 3</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">4</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">10 ÷ 2</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">5</span>
                    </div>
                `
            },
            2: {
                greeting: "Ngayon, pagsamahin natin ang Palaramihan at Palahatian!",
                content: `
                    <p>Makikita mo pareho ang <strong>×</strong> at <strong>÷</strong> now.</p>
                    <p>Tingnang mabuti ang mga simbolo!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">4 × 3</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">12</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">15 ÷ 5</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">3</span>
                    </div>
                `
            }
        },
        2: { // Mixed Basic Operations
            0: {
                greeting: "Pagsamahin naman natin ang dalawang sakilos!",
                content: `
                    <p>Mga problema na may <strong>dalawang sakilos</strong>.</p>
                    <p>Tandaan ang iyong mga natutuhan!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">3 + 4 × 2</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">11</span>
                    </div>
                `
            },
            1: {
                greeting: "Ngayon, Tatlong sakilos naman!",
                content: `
                    <p>Mga problema na may <strong>tatlong sakilos</strong>.</p>
                    <p>Maging maingat sa pagsagot!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">2 + 3 × 4 - 5</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">9</span>
                    </div>
                `
            },
            2: {
                greeting: "Pang-huling hamon! Apat na Sakilos!",
                content: `
                    <p>Gagamitin na ang <strong>apat na sakilos</strong>!</p>
                    <p>Tip: Palaramihan at Palahatian muna bago ang Palaragdagan at Palabawasan!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">10 ÷ 2 + 3 × 2 - 1</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">10</span>
                    </div>
                `
            }
        },
        3: { // Fundamental Notation
            0: {
                greeting: "Pag-aralan natin ang Tuwirang Tumbasan!",
                content: `
                    <p>Ang tuwirang tumabasan ay may <strong>x</strong> na ang antas ay isa lamang.</p>
                         `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">3x + 10 = 19</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">Isang Antas</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">4x - 5 = 11</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">Isang Antas</span>
                    </div>
                `
            },
            1: {
                greeting: "Oras na para matutunan ang Tumbasan na may x sa Magkabilang Panig!",
                content: `
                    <p>Ito ang <strong>pag-eequate</strong> ng dalawang ekspresyon.</p>
                    <p>Hakbang:
Ilipat ang x sa isang panig sa pamamagitan ng pagdaragdag o pagbabawas, 
ilipat ang mga constant sa kabilang panig, saka
lutasin ang x
</p>
                `,
                examples: `
                    <h4>Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">2x - 8 = 3x + 9</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">Dalawang x sa Magkabilang Panig</span>
                    </div>
                `
            },
            2: {
                greeting: "Mahusay! Aralin naman natin ngayon ang Quadratic na Tumbasan",
                content: `
                    <p>Ang <strong>dáwaking tumbasan</strong> ay may tumbasan na ang antas ay dalawa.</p>
                    <p>Hakbang:
Bungkagin ang pahayag, 
itumbas sa awan ang bawat salik, at saka
kunin ang mga posibleng halagá ng x
</p>
                `,
                examples: `
                    <h4>Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem"> x² − 5x + 6 = 0</span>
                        <span class="example-arrow">→</span>
                        <span class="example-answer">May Antas na Dalawa</span>
                    </div>
                `
            }
        },
        4: { // Equivalent Expressions
            0: {
                greeting: "Alamin natin ang mga Parirami ng Duhakay!",
                content: `
                    <p>Ito ang simula ng <strong>Panandaan</strong>.</p>
                    <p>Tignan ng mabuti ang mga halimbawa!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">(a + b)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² + 2ab + b²</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">(a - b)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² - 2ab + b²</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">a² - b²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">(a + b)(a - b)</span>
                    </div>
<div class="example-item">
                        <span class="example-problem">(a + b + c)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² + b² + c² + 2ab + 2bc + 2ac</span>
                    </div>
                `
            },
            1: {
                greeting: "Aralin natin ang Talurami ng Duhakay (Dagup at Kaibhan!",
                content: `
                     <p>Ito ang simula ng <strong>Panandaan</strong>.</p>
                    <p>Tignan ng mabuti ang mga halimbawa!</p>

                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">(a + b)³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a³ + 3a²b + 3ab² + b³</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">(a - b)³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a³ - 3a²b + 3ab² - b³</span>
                    </div>
                      <div class="example-item">
                        <span class="example-problem">a³ + b³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer"> (a + b)(a² - ab + b²)</span>
                    </div>
                     <div class="example-item">
                        <span class="example-problem">a³ - b³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">(a - b)(a² + ab + b²)</span>
                    </div>


                `
            },
            2: {
                greeting: "Pandagdag Kaalaman!",
                content: `
                    <p>Gamitin ang <strong>lahat</strong> ng iyong natutuhan.</p>
                    <p>Kaya mo 'yan!</p>
                `,
                examples: `
                    <h4>Mga Halimbawa:</h4>
                    <div class="example-item">
                        <span class="example-problem">(a + b)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² + 2ab + b²</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">(a - b)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² - 2ab + b²</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">a² - b²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">(a + b)(a - b)</span>
                    </div>
<div class="example-item">
                        <span class="example-problem">(a + b + c)²</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a² + b² + c² + 2ab + 2bc + 2ac</span>
                    </div>
                     <div class="example-item">
                        <span class="example-problem">(a + b)³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a³ + 3a²b + 3ab² + b³</span>
                    </div>
                    <div class="example-item">
                        <span class="example-problem">(a - b)³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">a³ - 3a²b + 3ab² - b³</span>
                    </div>
                      <div class="example-item">
                        <span class="example-problem">a³ + b³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer"> (a + b)(a² - ab + b²)</span>
                    </div>
                     <div class="example-item">
                        <span class="example-problem">a³ - b³</span>
                        <span class="example-arrow">=</span>
                        <span class="example-answer">(a - b)(a² + ab + b²)</span>
                    </div>

                `
            }
        }
    };
    
    return instructions[chapter][level];
}

// ===== Quiz Logic =====
function startQuiz() {
    currentQuestion = 0;
    totalAttempts = 0;
    correctAnswers = 0;
    
    // Reset matching state
    matchingState = {
        selectedLeft: null,
        selectedRight: null,
        matches: []
    };
    
    updateQuizHeader();
    loadQuestion();
    showScreen('quiz');
}

function updateQuizHeader() {
    document.getElementById('quizChapterBadge').textContent = `Chapter ${currentChapter + 1}`;
    document.getElementById('quizLevelBadge').textContent = `Level ${currentLevel + 1}`;
    
    const levelQuestions = questions[currentChapter][currentLevel];
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${levelQuestions.length}`;
    
    // Update question dots
    const dotsContainer = document.getElementById('questionDots');
    dotsContainer.innerHTML = '';
    levelQuestions.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = `question-dot ${index < currentQuestion ? 'completed' : ''} ${index === currentQuestion ? 'current' : ''}`;
        dotsContainer.appendChild(dot);
    });
}

function loadQuestion() {
    const levelQuestions = questions[currentChapter][currentLevel];
    const question = levelQuestions[currentQuestion];
    
    // Hide all containers first
    document.getElementById('multipleChoiceContainer').classList.add('hidden');
    document.getElementById('identificationContainer').classList.add('hidden');
    document.getElementById('fillBlanksContainer').classList.add('hidden');
    document.getElementById('matchingContainer').classList.add('hidden');
    document.getElementById('feedbackContainer').classList.add('hidden');
    document.getElementById('nextQuestionBtn').classList.add('hidden');
    
    // Set question text and type badge
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionTypeBadge').textContent = getQuestionTypeLabel(question.type);
    
    // Show appropriate container based on question type
    switch (question.type) {
        case 'multiple-choice':
            renderMultipleChoice(question);
            break;
        case 'identification':
            renderIdentification(question);
            break;
        case 'fill-blank':
            renderFillBlank(question);
            break;
        case 'matching':
            renderMatching(question);
            break;
    }
    
    // Update mascot tip
    updateMascotTip();
    updateQuizHeader();
}

function getQuestionTypeLabel(type) {
    const labels = {
        'multiple-choice': 'Multiple Choice',
        'identification': 'Identification',
        'fill-blank': 'Fill in the Blank',
        'matching': 'Matching Type'
    };
    return labels[type] || type;
}

function renderMultipleChoice(question) {
    const container = document.getElementById('multipleChoiceContainer');
    const grid = document.getElementById('optionsGrid');
    
    container.classList.remove('hidden');
    grid.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span class="option-text">${option}</span>
        `;
        btn.onclick = () => selectMultipleChoice(btn, option, question.answer);
        grid.appendChild(btn);
    });
}

function selectMultipleChoice(btn, selected, correct) {
    totalAttempts++;
    
    const allBtns = document.querySelectorAll('.option-btn');
    
    if (selected === correct) {
        btn.classList.add('correct');
        allBtns.forEach(b => b.classList.add('disabled'));
        showFeedback(true, "Tama ka! Ang galing mo naman! 🎉");
        correctAnswers++;
    } else {
        btn.classList.add('incorrect', 'shake');
        btn.classList.add('disabled');
        showFeedback(false, "Parang mali 'yan... Subukan mo ulit! 💪");
        
        // Re-enable after animation
        setTimeout(() => {
            btn.classList.remove('shake');
        }, 300);
    }
}

function renderIdentification(question) {
    const container = document.getElementById('identificationContainer');
    const input = document.getElementById('identificationInput');
    
    container.classList.remove('hidden');
    input.value = '';
    input.className = 'answer-input';
    input.disabled = false;
    input.focus();
    
    // Store answer for checking
    input.dataset.answer = question.answer;
    
    // Allow Enter key to submit
    input.onkeypress = (e) => {
        if (e.key === 'Enter') {
            checkIdentificationAnswer();
        }
    };
}

function checkIdentificationAnswer() {
    const input = document.getElementById('identificationInput');
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    
    totalAttempts++;
    
    // Allow for some flexibility in answers
    const isCorrect = userAnswer === correctAnswer || 
                      userAnswer === correctAnswer.replace(/\s/g, '') ||
                      parseFloat(userAnswer) === parseFloat(correctAnswer);
    
    if (isCorrect) {
        input.classList.add('correct');
        input.disabled = true;
        showFeedback(true, "Magaling! May tama ka sa'kin! 🌟");
        correctAnswers++;
    } else {
        input.classList.add('incorrect', 'shake');
        showFeedback(false, `Isa pa! Hint: Suriin ang iyong mga kalkulasyon.`);
        
        setTimeout(() => {
            input.classList.remove('incorrect', 'shake');
            input.value = '';
            input.focus();
        }, 1000);
    }
}

function renderFillBlank(question) {
    const container = document.getElementById('fillBlanksContainer');
    const display = document.getElementById('equationDisplay');
    const input = document.getElementById('fillBlankInput');
    
    container.classList.remove('hidden');
    display.innerHTML = question.equation.replace('___', '<span class="blank">?</span>');
    input.value = '';
    input.className = 'answer-input';
    input.disabled = false;
    input.dataset.answer = question.answer;
    input.focus();
    
    input.onkeypress = (e) => {
        if (e.key === 'Enter') {
            checkFillBlankAnswer();
        }
    };
}

function checkFillBlankAnswer() {
    const input = document.getElementById('fillBlankInput');
    const display = document.getElementById('equationDisplay');
    const userAnswer = input.value.trim();
    const correctAnswer = input.dataset.answer;
    
    totalAttempts++;
    
    if (userAnswer === correctAnswer || parseFloat(userAnswer) === parseFloat(correctAnswer)) {
        input.classList.add('correct');
        input.disabled = true;
        
        // Show the answer in the equation
        const question = questions[currentChapter][currentLevel][currentQuestion];
        display.innerHTML = question.equation.replace('___', `<span class="blank" style="color: var(--success); border-color: var(--success)">${correctAnswer}</span>`);
        
        showFeedback(true, "Magaling! Napunan mo ng tama ang patlang! ✨");
        correctAnswers++;
    } else {
        input.classList.add('incorrect', 'shake');
        showFeedback(false, "Hmm, hindi 'yan e. Isipin kung anong numero ang nagpapatotoo sa ekwasyon na ito!");
        
        setTimeout(() => {
            input.classList.remove('incorrect', 'shake');
            input.value = '';
            input.focus();
        }, 1000);
    }
}

function renderMatching(question) {
    const container = document.getElementById('matchingContainer');
    const leftCol = document.getElementById('matchingLeft');
    const rightCol = document.getElementById('matchingRight');
    
    container.classList.remove('hidden');
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';
    
    // Reset matching state
    matchingState = {
        selectedLeft: null,
        selectedRight: null,
        matches: []
    };
    
    // Shuffle both left and right items independently
    const shuffledLeft = [...question.pairs].sort(() => Math.random() - 0.5);
    const shuffledRight = [...question.pairs].sort(() => Math.random() - 0.5);
    
    // Render shuffled left items (problems)
    shuffledLeft.forEach((pair) => {
        const originalIndex = question.pairs.findIndex(p => p.left === pair.left);
        const item = document.createElement('div');
        item.className = 'matching-item';
        item.textContent = pair.left;
        item.dataset.index = originalIndex;
        item.dataset.side = 'left';
        item.onclick = () => selectMatchingItem(item, 'left', originalIndex);
        leftCol.appendChild(item);
    });
    
    // Render shuffled right items (answers)
    shuffledRight.forEach((pair) => {
        const originalIndex = question.pairs.findIndex(p => p.right === pair.right);
        const item = document.createElement('div');
        item.className = 'matching-item';
        item.textContent = pair.right;
        item.dataset.originalIndex = originalIndex;
        item.dataset.side = 'right';
        item.onclick = () => selectMatchingItem(item, 'right', originalIndex);
        rightCol.appendChild(item);
    });
}

function selectMatchingItem(item, side, index) {
    // Don't allow selection of already matched items
    if (item.classList.contains('matched')) return;
    
    // Toggle selection
    if (side === 'left') {
        document.querySelectorAll('#matchingLeft .matching-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        matchingState.selectedLeft = parseInt(index);
    } else {
        document.querySelectorAll('#matchingRight .matching-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        matchingState.selectedRight = parseInt(index);
    }
    
    // Check if both selected - auto-match
    if (matchingState.selectedLeft !== null && matchingState.selectedRight !== null) {
        if (matchingState.selectedLeft === matchingState.selectedRight) {
            // Correct match!
            const leftItem = document.querySelector(`#matchingLeft .matching-item[data-index="${matchingState.selectedLeft}"]`);
            const rightItem = document.querySelector(`#matchingRight .matching-item[data-original-index="${matchingState.selectedRight}"]`);
            
            leftItem.classList.remove('selected');
            leftItem.classList.add('matched');
            rightItem.classList.remove('selected');
            rightItem.classList.add('matched');
            
            matchingState.matches.push(matchingState.selectedLeft);
        } else {
            // Incorrect match
            const leftItem = document.querySelector(`#matchingLeft .matching-item[data-index="${matchingState.selectedLeft}"]`);
            const rightItem = document.querySelector(`#matchingRight .matching-item.selected`);
            
            leftItem.classList.add('incorrect');
            rightItem.classList.add('incorrect');
            
            setTimeout(() => {
                leftItem.classList.remove('selected', 'incorrect');
                rightItem.classList.remove('selected', 'incorrect');
            }, 500);
        }
        
        matchingState.selectedLeft = null;
        matchingState.selectedRight = null;
    }
    
    // Check if all matched
    const question = questions[currentChapter][currentLevel][currentQuestion];
    if (matchingState.matches.length === question.pairs.length) {
        totalAttempts++;
        correctAnswers++;
        showFeedback(true, "Aba, angas naman! Itinugma mo silang lahat nang tama ah! 🎯");
    }
}

function checkMatchingAnswer() {
    const question = questions[currentChapter][currentLevel][currentQuestion];
    
    if (matchingState.matches.length === question.pairs.length) {
        // Already completed via auto-matching
        return;
    }
    
    totalAttempts++;
    showFeedback(false, "Kaya mo 'yan! Pumili ng isang item mula sa bawat column.");
}

function showFeedback(isCorrect, message) {
    const container = document.getElementById('feedbackContainer');
    const icon = document.getElementById('feedbackIcon');
    const text = document.getElementById('feedbackText');
    
    container.classList.remove('hidden', 'success', 'error');
    container.classList.add(isCorrect ? 'success' : 'error');
    icon.textContent = isCorrect ? '✅' : '❌';
    text.textContent = message;
    
    // Update mascot
    const mascot = document.getElementById('quizMascot');
    const tip = document.getElementById('mascotTip');
    
    if (isCorrect) {
        mascot.style.animation = 'celebrate 0.5s ease';
        tip.textContent = mascotMessages.correct[Math.floor(Math.random() * mascotMessages.correct.length)];
        document.getElementById('nextQuestionBtn').classList.remove('hidden');
    } else {
        mascot.style.animation = 'shake 0.3s ease';
        tip.textContent = mascotMessages.incorrect[Math.floor(Math.random() * mascotMessages.incorrect.length)];
    }
    
    setTimeout(() => {
        mascot.style.animation = '';
    }, 500);
}

function updateMascotTip() {
    const tip = document.getElementById('mascotTip');
    tip.textContent = mascotMessages.encouragement[Math.floor(Math.random() * mascotMessages.encouragement.length)];
}

function nextQuestion() {
    const levelQuestions = questions[currentChapter][currentLevel];
    
    if (currentQuestion < levelQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        // Level complete!
        showLevelComplete();
    }
}

function showLevelComplete() {
    completeLevel(currentChapter, currentLevel);
    
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalAttempts').textContent = totalAttempts;
    
    // Check if this was the last level of the chapter
    const isChapterComplete = isChapterCompleted(currentChapter);
    
    if (isChapterComplete && currentChapter < 4) {
        document.getElementById('completeTitle').textContent = 'Tapos na ang Kabanatang ito!';
        document.getElementById('completeMessage').textContent = `Kahanga-hanga! Nakumpleto mo na ang lahat ng antas sa Kabanata ${currentChapter + 1}!`;
        document.getElementById('nextLevelBtn').textContent = 'Susunod na Kabanata →';
    } else if (currentLevel < 2) {
        document.getElementById('completeTitle').textContent = 'Tapos na ang Ikalawang Kabanata!';
        document.getElementById('completeMessage').textContent = 'Mahusay! Handa na para sa susunod na hamon?';
        document.getElementById('nextLevelBtn').textContent = 'Susunod na Kabanata →';
    } else {
        document.getElementById('completeTitle').textContent = 'Pagbati!';
        document.getElementById('completeMessage').textContent = 'Nakumpleto mo na ang lahat ng mga Kabanata! Ikaw ay isang Math Master!';
        document.getElementById('nextLevelBtn').textContent = 'Bumalik sa mga Kabanata';
    }
    
    showScreen('complete');
}

function reviewLevel() {
    startQuiz();
}

function goToNextLevel() {
    if (currentLevel < 2 && !isChapterCompleted(currentChapter)) {
        currentLevel++;
        showInstructions();
    } else if (currentChapter < 4) {
        // Check if chapter is complete, go to next chapter
        if (isChapterCompleted(currentChapter)) {
            currentChapter++;
            currentLevel = 0;
            selectChapter(currentChapter);
        } else {
            currentLevel++;
            showInstructions();
        }
    } else {
        showScreen('chapters');
    }
}
