/* ========================================== */
/*            NAVIGATION DOCK LOGIC           */
/* ========================================== */

const fanNav = document.getElementById('fanNav');
const fanToggle = document.getElementById('fanToggle');

let lastScrollY = window.scrollY;

// Open fan by default on load
fanNav.classList.add('open');

// Manual Toggle on Button Click
fanToggle.addEventListener('click', () => {
    fanNav.classList.toggle('open');
});

// Scroll Detection logic
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Threshold check so small micro-scrolls don't trigger state flips
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling Down -> Close Fan
        fanNav.classList.remove('open');
    } else if (currentScrollY < lastScrollY) {
        // Scrolling Up -> Open Fan
        fanNav.classList.add('open');
    }   
    lastScrollY = currentScrollY;
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section, header#home');
const navLinks = document.querySelectorAll('.fan-menu li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ========================================== */
/*            AI ASSISTANT LOGIC              */
/* ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const aiToggleBtn = document.getElementById("aiToggleBtn");
    const aiCloseBtn = document.getElementById("aiCloseBtn");
    const aiChatBox = document.getElementById("aiChatBox");
    const aiChatForm = document.getElementById("aiChatForm");
    const aiInput = document.getElementById("aiInput");
    const aiChatBody = document.getElementById("aiChatBody");
    const chips = document.querySelectorAll(".chip");

    // Portfolio Knowledge Base
    const knowledgeBase = {
        about: "John Michael San Agustin is an Information Systems Specialist and Web Developer. He is a Cum Laude graduate with expertise in Oracle NetSuite administration, web development, and systems analysis.",
        skills: "John Michael specializes in HTML5, CSS3, JavaScript, PHP, MySQL, Oracle NetSuite ERP, WordPress, and Role-Based Access Control (RBAC).",
        education: "He graduated Cum Laude with a BS in Information Systems from Dr. Filemon C. Aguilar Memorial College of Las Piñas (DFCAMCLP - Batch Salikhaya)!",
        graduataed: "He graduated Cum Laude with a BS in Information Systems from Dr. Filemon C. Aguilar Memorial College of Las Piñas (DFCAMCLP - Batch Salikhaya)!",
        experience: "His experience includes being a NetSuite & WordPress Administrator OJT at Top Creamery, a Customer Service Rep at Alorica Philippines, and a Service Crew member at McDonald's.",
        projects: "His featured projects include the 'Smart Grade Monitoring System' (built with PHP, MySQL, Hostinger, RBAC) and his interactive modern web portfolio.",
        certificates: "He completed 'IT Customer Support Basics' and is currently taking 'Cyber Threat Monitoring Level 1'.",
        contact: "You can email him at jmsanagustin.work@gmail.com, call +63 938-565-0062, or visit his LinkedIn profile!",
        status: "Yes! John Michael is actively available for full-time web development, systems analysis, and IT administration roles."
    };

    // Toggle Chat Window
    aiToggleBtn.addEventListener("click", () => aiChatBox.classList.toggle("active"));
    aiCloseBtn.addEventListener("click", () => aiChatBox.classList.remove("active"));

    // Handle Quick Chips
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            const prompt = chip.getAttribute("data-prompt");
            sendMessage(prompt);
        });
    });

    // Handle Form Submit
    aiChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = aiInput.value.trim();
        if (message) {
            sendMessage(message);
            aiInput.value = "";
        }
    });

    function sendMessage(text) {
        // Append User Message
        appendMessage(text, "user-message");

        // Simulate AI Thinking & Typing
        setTimeout(() => {
            const reply = getAIResponse(text);
            appendMessage(reply, "ai-message");
        }, 500);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", className);
        msgDiv.innerHTML = `<p>${text}</p>`;
        aiChatBody.appendChild(msgDiv);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

 // Advanced Response Logic
    function getAIResponse(input) {
        const lower = input.toLowerCase().trim();

        // 1. Math expressions (e.g., "1+1", "25 * 4")
        const mathMatch = lower.match(/^(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)$/);
        if (mathMatch) {
            const num1 = parseFloat(mathMatch[1]);
            const op = mathMatch[3];
            const num2 = parseFloat(mathMatch[4]);
            let res;
            if (op === '+') res = num1 + num2;
            else if (op === '-') res = num1 - num2;
            else if (op === '*') res = num1 * num2;
            else if (op === '/') res = num2 !== 0 ? (num1 / num2).toFixed(2) : "Cannot divide by zero";
            return `The result is <strong>${res}</strong>! 🧮`;
        }

        // 2. Real-Time Clock & Time
        if (lower.includes("time") || lower.includes("clock")) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `The current time is <strong>${timeString}</strong> ⏰`;
        }

        // 3. Real-Time Date
        if (lower.includes("date") || lower.includes("today") || lower.includes("day is it")) {
            const now = new Date();
            const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            return `Today is <strong>${dateString}</strong> 📅`;
        }

        // 4. Location & Address
        if (lower.includes("location") || lower.includes("where") || lower.includes("live") || lower.includes("based") || lower.includes("address") || lower.includes("city")) {
            return "John Michael is based in <strong>Las Piñas, Metro Manila, Philippines</strong> 📍. He is open to local, hybrid, or remote web development & IT roles!";
        }

        // 5. Greetings
        if (lower.match(/^(hi|hello|hey|kamusta|greetings|good day|good morning|good afternoon|good evening)/)) {
            return "Hello! 👋 How can I help you today? You can ask me about John Michael's skills, NetSuite background, location, current time, or contact info!";
        }

        // 6. Identity & Personal Bio
        if (lower.includes("who is") || lower.includes("who are you") || lower.includes("about john") || lower.includes("background") || lower.includes("personal")) {
            return `${knowledgeBase.about}<br><br>📍 <strong>Location:</strong> Las Piñas, Metro Manila, Philippines<br>🎓 <strong>Education:</strong> BS Information Systems (Cum Laude, DFCAMCLP - Batch Salikhaya)`;
        }

        // 7. Skills & Tech Stack
        if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech") || lower.includes("code") || lower.includes("netsuite")) {
            return knowledgeBase.skills;
        }

        // 8. Education & College
        if (lower.includes("education") || lower.includes("degree") || lower.includes("school") || lower.includes("college") || lower.includes("dfcamclp") || lower.includes("salikhaya") || lower.includes("cum laude")) {
            return knowledgeBase.education;
        }

        // 9. Work Experience
        if (lower.includes("experience") || lower.includes("work") || lower.includes("job") || lower.includes("alorica") || lower.includes("creamery") || lower.includes("mcdonald")) {
            return knowledgeBase.experience;
        }

        // 10. Projects
        if (lower.includes("project") || lower.includes("smart grade") || lower.includes("portfolio")) {
            return knowledgeBase.projects;
        }

        // 11. Certificates & Courses
        if (lower.includes("certificate") || lower.includes("cert") || lower.includes("course") || lower.includes("cyber")) {
            return knowledgeBase.certificates;
        }

        // 12. Direct Contact Info
        if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("number") || lower.includes("linkedin") || lower.includes("reach") || lower.includes("hire") || lower.includes("available")) {
            return `Get in touch with John Michael directly:<br><br>
            📧 <strong>Email:</strong> <a href="mailto:jmsanagustin.work@gmail.com" style="color: #38bdf8; text-decoration: underline;">jmsanagustin.work@gmail.com</a><br>
            📞 <strong>Phone:</strong> <a href="tel:+639385650062" style="color: #38bdf8; text-decoration: underline;">+63 938-565-0062</a><br>
            🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/john-michael-san-agustin-b906b51b9" target="_blank" style="color: #38bdf8; text-decoration: underline;">LinkedIn Profile</a>`;
        }

        // 13. Fallback Contact Prompt
        return `I don't have that specific information on hand, but you can reach out to John Michael directly:<br><br>
        📧 <strong>Email:</strong> <a href="mailto:jmsanagustin.work@gmail.com" style="color: #38bdf8; text-decoration: underline;">jmsanagustin.work@gmail.com</a><br>
        📞 <strong>Phone:</strong> <a href="tel:+639385650062" style="color: #38bdf8; text-decoration: underline;">+63 938-565-0062</a><br>
        🔗 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/john-michael-san-agustin-b906b51b9" target="_blank" style="color: #38bdf8; text-decoration: underline;">LinkedIn Profile</a>`;
    }
});