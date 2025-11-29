const modal = document.getElementById('descModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(title, description) {
    // Set title
    modalTitle.textContent = title;

    // Normalize the description: trim, collapse excessive blank lines (3+ -> 2)
    // This prevents huge vertical gaps when users paste long text with many blank lines.
    if (typeof description === 'string') {
        const cleaned = description.trim().replace(/\n{3,}/g, '\n\n');
        modalDesc.textContent = cleaned;
    } else {
        modalDesc.textContent = '';
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Ensure all buttons inside book cards stop propagation to avoid triggering
// the card's onclick navigation. This makes View Description behave like Book 2.
function attachBookButtons() {
    document.querySelectorAll('.book-card button').forEach(btn => {
        // avoid adding multiple listeners
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            // no-op; inline onclick will still run and open the modal
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachBookButtons);
} else {
    attachBookButtons();
}
