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

// Video links for Quantitative topics
const quantitativeVideoLinks = {
    "HCF & LCM": "https://www.youtube.com/watch?v=xyyejJYeILM&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=1&t=8s&pp=iAQB",
    "Percentage": "https://www.youtube.com/watch?v=RWdNhJWwzSs&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=6&pp=iAQB",
    "Mixtures": "https://www.youtube.com/watch?v=OKSJDDAyqP0&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=7&pp=iAQB",
    "Ratio & Proportion": "https://www.youtube.com/watch?v=jfoJBivWlnQ&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=8&pp=iAQB0gcJCd4JAYcqIYzv",
    "Time & Work": "https://www.youtube.com/watch?v=KE7tQf9spPg&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=9&pp=iAQB",
    "Time, Speed, Distance": "https://www.youtube.com/watch?v=jzNxXm5twx4&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=10&pp=iAQB",
    "Profit & Loss": "https://www.youtube.com/watch?v=T2odvmxqi1I&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=11&pp=iAQB",
    "Averages": "https://www.youtube.com/watch?v=rhSxQ4ieAYc&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=12&pp=iAQB",
    "Progressions": "https://www.youtube.com/watch?v=G-gqX4Oo9PA&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=14&pp=iAQB",
    "Statistics": "https://www.youtube.com/watch?v=6Jrb4wEloCQ&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=16&pp=iAQB",
    "Data Interpretation": "https://www.youtube.com/watch?v=fA8cQW-nmIw&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=17&pp=iAQB",
    "Probability": "https://www.youtube.com/watch?v=ximxxERGSUc&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=20&pp=iAQB",
    "Linear Equations": "https://www.youtube.com/watch?v=TV9rQm15sWo&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=23&pp=iAQB",
    "Simple & Compound Interest": "https://www.youtube.com/watch?v=jvRq87ZWzIk&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=24&pp=iAQB",
    "Compound Interest": "https://www.youtube.com/watch?v=PbUZnzncmR4&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=25&pp=iAQB",
    "Partnership": "https://www.youtube.com/watch?v=hn9TKnr8L_8&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=26&pp=iAQB",
    "Logarithms": "https://www.youtube.com/watch?v=w-7mbazOx6o&list=PLpyc33gOcbVBvdfzlSn97a1TlfysSPwm-&index=27&pp=iAQB"
    // Add more if needed
};

// Helper to convert playlist links to normal video links
function getNormalYouTubeLink(url) {
    const match = url.match(/v=([\w-]+)/);
    return match ? `https://www.youtube.com/watch?v=${match[1]}` : url;
}

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
            statusSelect.addEventListener("change", (e) => {
                progress[topic] = e.target.value;
                saveProgress(progress);
                updateTopicStyle(li, e.target.value);
            });
            // Render topic name (with link if available for Quantitative)
            li.textContent = "";
            if (section === "quantitative" && quantitativeVideoLinks[topic]) {
                const a = document.createElement("a");
                a.href = getNormalYouTubeLink(quantitativeVideoLinks[topic]);
                a.textContent = topic;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                li.appendChild(a);
            } else {
                li.textContent = topic;
            }
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