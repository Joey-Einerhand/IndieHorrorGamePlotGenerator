const wordContainers = {};

// To prevent text from wrapping, we need to calculate the width of the longest string
// and set the width of the container to that value. This will prevent the text from wrapping
function calculateWidthOfLongestString(strings, wordContainerId) {
    const tempSpan = document.createElement('span');

    wordContainers[wordContainerId] = strings;
    // Apply font styles similar to what's in the CSS
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!!!! Edit this to match your CSS !!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    tempSpan.style.font = '18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    tempSpan.style.visibility = 'hidden'; // Hide the element

    document.body.appendChild(tempSpan);

    let maxWidth = 0;
    strings.forEach(text => {
        tempSpan.textContent = text;
        const width = tempSpan.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, width);
    });

    document.body.removeChild(tempSpan);
    return maxWidth;
}

// This function will spin through the words in the array and display them one at a time
// in the given container. the container will be animated to fade in and out.
function wordSpin(words, wordContainerId) {
    let currentIndex = 0;
    let isPaused = false;

    const maxWidth = calculateWidthOfLongestString(words, wordContainerId);
    const wordContainer = document.getElementById(wordContainerId);
    let currentWordElement = document.createElement('span');
    let nextWordElement = document.createElement('span');

    currentWordElement.style.minWidth = `${maxWidth}px`;
    nextWordElement.style.minWidth = `${maxWidth}px`;

    wordContainer.appendChild(currentWordElement);
    wordContainer.appendChild(nextWordElement);

    // Generate unique animation names
    const fadeInAnimation = `fadeIn-${wordContainerId}`;
    const fadeOutAnimation = `fadeOut-${wordContainerId}`;

    // Update the dynamically created CSS rules
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes ${fadeInAnimation} {
            from { opacity: 0; transform: translateY(-50%); }
            to { opacity: 1; transform: translateY(21%); }
        }
        @keyframes ${fadeOutAnimation} {
            from { opacity: 1; transform: translateY(21%); }
            to { opacity: 0; transform: translateY(71%); }
        }
        #${wordContainerId} span {
            position: absolute;
            width: auto; /* Adjust width based on content */
            min-width: ${maxWidth}px; /* Set minimum width */
            opacity: 0;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        #${wordContainerId} {
            margin-right: ${maxWidth}px; /* prevent wordContainers from overlapping
        }
    `;
    document.head.appendChild(styleSheet);

    function updateWord() {
        if (isPaused) return;
    
        // Select a random index from the words array
        currentIndex = Math.floor(Math.random() * words.length);
    
        nextWordElement.textContent = words[currentIndex];
        nextWordElement.style.animationName = fadeInAnimation;
        currentWordElement.style.animationName = fadeOutAnimation;
    
        [currentWordElement, nextWordElement] = [nextWordElement, currentWordElement];
    }

    function toggleAnimation() {
        isPaused = !isPaused;
        if (!isPaused) {
            updateWord();
        }
    }

    function pauseAnimations() {
        isPaused = true;
    }

    function unpauseAnimations() {
        isPaused = false;
    }

    document.getElementById('randomizeButton').addEventListener('click', () => {
        unpauseAnimations();
        updateWord();
        pauseAnimations();
    });

    document.getElementById('shuffle').addEventListener('click', () => {
        unpauseAnimations();
        updateWord();
    });

    currentWordElement.addEventListener('animationend', () => {
        updateWord();
    });



    currentWordElement.addEventListener('click', toggleAnimation);
    nextWordElement.addEventListener('click', toggleAnimation);

    currentWordElement.textContent = words[words.length - 1];
    updateWord();
}

// example:
// the game takes place in a $abandoned $hospital 
// where $evil_scientists $experiment on $children to $create_sentient_toys
// You want to $find $their $dogs 
// but in order to do that must $rescue $9 $gnomes
// and $blow_up $the_evil_guy's $head,
// In the end, $the_player turns out to be $a_toy after all!
const locationAdjectives = [
    "haunted", "abandoned", "creepy", "overgrown", 
    "fog-shrouded", "gothic", "sinister", "decrepit", 
    "eerie", "cursed", "desolate", "shadowy"
];

const locations = [
    "hospital", "laboratory", "toy store", "village", 
    "mansion", "cemetery", "asylum", "forest", 
    "cabin", "underground facility", "ancient ruins", "abandoned town"
];

const antagonists = [
    "evil scientists", "monsters", "mutants", "ghosts", 
    "serial killers", "vampires", "zombies", "demonic entities", 
    "cursed souls", "alien creatures", "psychopaths", "witches"
];

const antagonistVerb = [
    "experiment on", "torture", "kill", "haunt", 
    "possess", "chase", "terrorize", "stalk", 
    "ensnare", "trap", "curse", "transform"
];

const victims = [
    "children", "teenagers", "adults", "senior citizens", 
    "pets", "animals", "mothers", "war criminals", 
    "weaboos", "tourists", "locals", "intruders", 
    "explorers", "scientists"
];

const motivations = [
    "create sentient toys.", "develop the ultimate soldier.", 
    "achieve immortality.", "open a portal to another dimension.", 
    "revive the dead.", "unleash a curse.", "gain supernatural powers.", 
    "conduct forbidden experiments."
];

const goals = [
    "find", "kill", "rescue", "find out who murdered", 
    "escape from", "uncover the truth about", 
    "solve the mystery of"
];

const possessives = [
    "their", "the antagonist's", "the victim's", 
    "the cursed", "the haunted", "the abandoned", "the forsaken", "your"
];

const possessions = [
    "dogs", "children", "toys", "life", "brother", "sister", 
    "mother", "father", "wife", "husband", "soul", "body", 
    "memories", "ancient artifact", "secret diary", "lost relic"
];

const obstacles = [
    "rescue", "kill", "find", "repair", "fight", "explore", 
    "clear", "solve", "navigate", "survive", "decode", "unlock", "survive"
];

const numbers = [
    "1", "3", "5", "6", "7", "9", "11", "13", "666", "20", "100"
];

const obstacleObjects = [
    "gnomes", "dolls", "toys", "ghosts", "monsters", "mutants", 
    "serial killers", "evil scientists", "war criminals", "evil boyfriends", 
    "notes on trees", "puzzles", "diesel generators", "floors", "keys", 
    "secret passages", "hidden rooms", "traps", "clues", "cursed objects", "nights"
];

const actions = [
    "win", "blow up", "escape", "survive", "kill", "cleanse", 
    "exorcize", "investigate", "confront", "reveal", "banish", "seal away"
];

const antagonistPossessive = [
    "the evil guy's", "the evil scientist's", "the monster's", "the mutant's", 
    "the serial killer's", "the ghost's", "the war criminal's", "the evil boyfriend's", 
    "the girl's", "the boy's", "the children's", "the player's", "the vampire's", 
    "the zombie's", "the demon's"
];

const antagonistPossessions = [
    "soul.", "wife.", "husband.", "children.", "toys.", "pets.", "body.", "soul.", 
    "memories.", "heart.", "trail.", "laboratory.", "dungeon.", "trap.", "Space station.", 
    "ship.", "crypt.", "tomb.", "castle.", "forest."
];

const thing = [
    "you", "the antagonist", "your wife", "your husband", "your children", 
    "the demons", "the entity", "the mystery", "the nightmare", "the legend"
];

const twist = [
    "a monster", "the antagonist's family", "your father", "an illusion", 
    "a misunderstanding", "a plot for revenge", "a tragic mistake", "a scientific breakthrough", 
    "an ancient prophecy", "a doppelganger", "an accident"
];
wordSpin(locations, 'location');
wordSpin(antagonists, 'antagonist');
wordSpin(antagonistVerb, 'antagonistVerb');
wordSpin(victims, 'victim');
wordSpin(motivations, 'motivation');
wordSpin(goals, 'goal');
wordSpin(possessives, 'possessive');
wordSpin(possessions, 'possession');
wordSpin(obstacles, 'obstacle');
wordSpin(numbers, 'number');
wordSpin(obstacleObjects, 'obstacleObject');
wordSpin(actions, 'action');
wordSpin(antagonistPossessive, 'antagonistPossessive');
wordSpin(antagonistPossessions, 'antagonistPossession');
wordSpin(thing, 'thing');
wordSpin(twist, 'twist');
