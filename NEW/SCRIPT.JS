document.addEventListener('DOMContentLoaded', function() {
    // Data
    let pagesRemaining = 20;
    let pagesUsed = 0;

    // Elements
    const pagesUsedDisplay = document.getElementById('pagesUsed');
    const pagesRemainingDisplay = document.getElementById('pagesRemaining');
    const noteForm = document.getElementById('noteForm');
    const notesContainer = document.getElementById('notesContainer');
    const addNoteSection = document.querySelector('.add-note');
    const paymentSection = document.getElementById('paymentSection');
    const simulateGameWinBtn = document.getElementById('simulateGameWinBtn');
    
    // Login/Signup Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // --- Authentication Logic (Mock) ---
    function showDashboard() {
        loginSection.style.display = 'none';
        signupSection.style.display = 'none';
        dashboard.style.display = 'block';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    }

    loginForm.addEventListener('submit', (e) => { e.preventDefault(); showDashboard(); });
    signupForm.addEventListener('submit', (e) => { e.preventDefault(); showDashboard(); });
    
    logoutBtn.addEventListener('click', () => {
        dashboard.style.display = 'none';
        loginSection.style.display = 'block';
        loginBtn.style.display = 'inline-block';
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    });
    
    loginBtn.addEventListener('click', () => {
        loginSection.style.display = 'block';
        signupSection.style.display = 'none';
    });
    
    signupBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
    });

    // --- Note & Payment Logic ---

    function updateUI() {
        pagesUsedDisplay.textContent = pagesUsed;
        pagesRemainingDisplay.textContent = pagesRemaining;

        // LOGIC: If pages are 0, hide add note section and show payment section
        if (pagesRemaining <= 0) {
            addNoteSection.style.display = 'none';
            paymentSection.style.display = 'block';
        } else {
            addNoteSection.style.display = 'block';
            paymentSection.style.display = 'none';
        }
    }

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (pagesRemaining > 0) {
            const noteName = document.getElementById('noteName').value;
            const noteLink = document.getElementById('noteLink').value;

            // Create Note Element
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${noteName}</strong>
                <a href="${noteLink}" target="_blank" style="color: var(--primary);">Open</a>
            `;
            notesContainer.appendChild(li);

            // Update Counters
            pagesUsed++;
            pagesRemaining--;
            
            // Clear inputs
            document.getElementById('noteName').value = '';
            document.getElementById('noteLink').value = '';

            updateUI();
        }
    });

    simulateGameWinBtn.addEventListener('click', function() {
        // Open YouTube Channel
        window.open("https://www.youtube.com/@xarivo_ff", "_blank");

        // Simulate Subscription
        alert("Channel Opened! Subscribe to XARIVO FF to get 100 Pages.");
        pagesRemaining += 100;
        updateUI();
    });

    // Initialize
    updateUI();
});