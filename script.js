// Elite Medical Council Data Grid Definition Array (Alternate Male / Female)
const DOCTORS_DATA = [
    { id: "doc1", name: "Dr. Muhammad Taha", spec: "Orthopedic Surgeon", exp: "12 Years", days: "Mon, Wed, Fri", gender: "male" },
    { id: "doc2", name: "Dr. Minahil Sultan Alvi", spec: "Cardiologist", exp: "14 Years", days: "Tue, Thu, Sat", gender: "female" },
    { id: "doc3", name: "Dr. Muhammad Saad", spec: "General Physician", exp: "10 Years", days: "Mon, Tue, Thu", gender: "male" },
    { id: "doc4", name: "Dr. Ayesha Khan", spec: "Gynecologist", exp: "11 Years", days: "Wed, Fri, Sat", gender: "female" },
    { id: "doc5", name: "Dr. Hassan Raza", spec: "ENT Specialist", exp: "9 Years", days: "Tue, Wed, Thu", gender: "male" },
    { id: "doc6", name: "Dr. Fatima Ahmed", spec: "Pediatrician", exp: "13 Years", days: "Mon, Thu, Sat", gender: "female" },
    { id: "doc7", name: "Dr. Ali Hamza", spec: "Ophthalmologist", exp: "8 Years", days: "Mon, Wed, Sat", gender: "male" },
    { id: "doc8", name: "Dr. Mahnoor Ali", spec: "Dermatologist", exp: "7 Years", days: "Tue, Thu, Fri", gender: "female" },
    { id: "doc9", name: "Dr. Usman Tariq", spec: "Gastroenterologist", exp: "15 Years", days: "Wed, Thu, Fri", gender: "male" },
    { id: "doc10", name: "Dr. Zainab Malik", spec: "Neurologist", exp: "16 Years", days: "Mon, Tue, Fri", gender: "female" }
];

document.addEventListener("DOMContentLoaded", () => {
    renderDoctorCards();
    populateDoctorDropdown();
    setupFormEventListener();
    setupPopupDismissal();
});

// Dynamic Client Side Injection Engine for Premium Display Cards
function renderDoctorCards() {
    const grid = document.getElementById("doctorsGrid");
    if (!grid) return;

    grid.innerHTML = DOCTORS_DATA.map(doc => {
        const accentClass = doc.gender === "male" ? "cyan-accent-card" : "purple-accent-card";
        const iconAvatar = doc.gender === "male" ? "fa-user-doctor" : "fa-user-nurse";
        
        return `
            <div class="glass-card doctor-card ${accentClass}">
                <div class="doc-avatar-mock">
                    <i class="fa-solid ${iconAvatar}"></i>
                </div>
                <div class="doc-info">
                    <h3>${doc.name}</h3>
                    <div class="doc-spec">${doc.spec}</div>
                    <div class="doc-meta">
                        <p><i class="fa-solid fa-briefcase"></i> Experience: ${doc.exp}</p>
                        <p><i class="fa-solid fa-clock"></i> Availability: ${doc.days}</p>
                    </div>
                    <a href="#appointment" class="btn btn-secondary btn-sm" onclick="selectDoctorDirectly('${doc.name}')">Book Slot</a>
                </div>
            </div>
        `;
    }).join('');
}

function populateDoctorDropdown() {
    const select = document.getElementById("doctorSelect");
    const specInput = document.getElementById("specialization");
    if (!select) return;

    DOCTORS_DATA.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.name;
        opt.textContent = doc.name;
        select.appendChild(opt);
    });

    // Auto-selection listener logic mapping specs instantly
    select.addEventListener("change", (e) => {
        const found = DOCTORS_DATA.find(d => d.name === e.target.value);
        if (found) specInput.value = found.spec;
    });
}

function selectDoctorDirectly(doctorName) {
    const select = document.getElementById("doctorSelect");
    const specInput = document.getElementById("specialization");
    if (!select) return;

    select.value = doctorName;
    const found = DOCTORS_DATA.find(d => d.name === doctorName);
    if (found) specInput.value = found.spec;
}

// Secured Network Controller Handling Handshake Procedures
function setupFormEventListener() {
    const form = document.getElementById("appointmentForm");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const loader = submitBtn.querySelector(".loader-spinner");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Structural Parameter Isolation
        const formData = {
            fullName: document.getElementById("fullName").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            doctorName: document.getElementById("doctorSelect").value,
            specialization: document.getElementById("specialization").value,
            appointmentDate: document.getElementById("appointmentDate").value,
            appointmentTime: document.getElementById("appointmentTime").value,
            notes: document.getElementById("notes").value.trim()
        };

        // Form Validation Check
        if (!formData.fullName || !formData.phone || !formData.email || !formData.doctorName || !formData.appointmentDate || !formData.appointmentTime) {
            triggerPopup("Validation Error", "All structural tracking fields must be actively verified before handshakes.", false);
            return;
        }

        // Execution States Setup UI Elements
        submitBtn.disabled = true;
        btnText.classList.add("hidden");
        loader.classList.remove("hidden");

        try {
            // Secure API Gateway Transaction Routing 
            const response = await fetch("http://127.0.0.1:5000/api/book-appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.status === 200 && result.status === "success") {
                triggerPopup(
                    "Appointment Successfully Booked",
                    `<p class="p-highlight">Thank you for choosing PulseCare Pro.</p>
                     <p>Your appointment has been successfully scheduled.</p>
                     <p>A confirmation email has been sent to your registered email address.</p>`,
                    true
                );
                form.reset();
                document.getElementById("specialization").value = "";
            } else {
                triggerPopup("Transaction Engine Fault", result.message || "An exception occurred.", false);
            }

        } catch (error) {
            triggerPopup("Network Routing Timeout", "Could not establish a secure pipeline with the Flask Core microservice.", false);
        } finally {
            submitBtn.disabled = false;
            btnText.classList.remove("hidden");
            loader.classList.add("hidden");
        }
    });
}

function triggerPopup(title, bodyHTML, isSuccess) {
    const overlay = document.getElementById("statusPopup");
    const contentBox = overlay.querySelector(".popup-content");
    const titleEl = document.getElementById("popupTitle");
    const bodyEl = document.getElementById("popupBody");
    const icon = document.getElementById("popupIcon");

    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHTML;

    if (isSuccess) {
        contentBox.className = "glass-card popup-content success-popup animate-popup";
        icon.className = "fa-solid fa-circle-check";
    } else {
        contentBox.className = "glass-card popup-content error-popup animate-popup";
        icon.className = "fa-solid fa-triangle-exclamation";
    }

    overlay.classList.remove("hidden");
}

function setupPopupDismissal() {
    const overlay = document.getElementById("statusPopup");
    const btn = document.getElementById("closePopupBtn");
    if (!btn || !overlay) return;

    btn.addEventListener("click", () => overlay.classList.add("hidden"));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.add("hidden");
    });
}