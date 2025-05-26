// Topics Data
const topics = {
    quantitative: [
        "Number System", "Percentage", "Profit & Loss", "Ratio & Proportion",
        "Simple & Compound Interest", "Time, Speed, Distance", "Time & Work",
        "Averages", "Partnership", "Mixtures", "HCF & LCM", "Linear Equations",
        "Statistics", "Progressions", "Logarithms", "Permutation & Combination",
        "Probability", "Geometry & Mensuration", "Data Interpretation", "Puzzles"
    ],
    reasoning: [
        "Logical Puzzles", "Seating Arrangements", "Data Arrangements",
        "Spatial Reasoning", "Visual Reasoning", "Coding & Decoding",
        "Blood Relations", "Syllogisms", "Venn Diagrams",
        "Statement Assumption & Conclusion", "Analogies", "Cubes & 3D Shapes",
        "Attention to Detail"
    ],
    verbal: [
        "Reading Comprehension", "Sentence Correction", "Error Identification",
        "Fill in the Blanks", "Synonyms & Antonyms", "Sentence Rearrangement",
        "Paragraph Rearrangement", "Sentence Completion"
    ]
};

// Load saved progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem("tcsNqtProgress");
    return savedProgress ? JSON.parse(savedProgress) : {};
}

// Save progress to localStorage
function saveProgress(progress) {
    localStorage.setItem("tcsNqtProgress", JSON.stringify(progress));
}

// Initialize the tracker
function initTracker() {
    const progress = loadProgress();
    
    // Render each section
    Object.keys(topics).forEach(section => {
        const listElement = document.getElementById(`${section}-list`);
        
        topics[section].forEach(topic => {
            const li = document.createElement("li");
            const statusSelect = document.createElement("select");
            
            // Set current status (default: "Not Started")
            const currentStatus = progress[topic] || "not-started";
            
            // Add options
            ["Not Started", "In Progress", "Done"].forEach(status => {
                const option = document.createElement("option");
                option.value = status.toLowerCase().replace(" ", "-");
                option.textContent = status;
                if (option.value === currentStatus) option.selected = true;
                statusSelect.appendChild(option);
            });
            
            // Update status on change
            statusSelect.addEventListener("change", (e) => {
                progress[topic] = e.target.value;
                saveProgress(progress);
                updateTopicStyle(li, e.target.value);
            });
            
            li.textContent = topic;
            li.appendChild(statusSelect);
            updateTopicStyle(li, currentStatus);
            
            listElement.appendChild(li);
        });
    });
}

// Update topic style based on status
function updateTopicStyle(li, status) {
    li.className = "";
    li.classList.add(status);
}

// Reset all progress
document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all progress?")) {
        localStorage.removeItem("tcsNqtProgress");
        location.reload(); // Refresh to reset UI
    }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", initTracker);