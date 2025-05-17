// Handle navbar toggle
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    // Toggle navbar menu
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isNavbarToggle = event.target.closest('#navbar-toggle');
        const isNavbarMenu = event.target.closest('#navbar-menu');
        
        if (!isNavbarToggle && !isNavbarMenu && navbarMenu.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });
    
    // Modal handling
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalClose = document.querySelectorAll('.modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    // Open modal when trigger is clicked
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close navbar menu if open
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            
            // Get the modal ID from data attribute
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                modalOverlay.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when X is clicked
    modalClose.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when overlay is clicked
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                closeModal(modal);
            });
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Function to close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle dark mode class on body
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Apply saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Share functionality
    const shareFacebook = document.getElementById('share-facebook');
    const shareTwitter = document.getElementById('share-twitter');
    const shareEmail = document.getElementById('share-email');
    const copyLinkBtn = document.getElementById('copy-link');
    const shareUrlInput = document.getElementById('share-url');
    
    if (shareFacebook) {
        shareFacebook.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
        });
    }
    
    if (shareTwitter) {
        shareTwitter.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out this amazing Interactive Periodic Table!')}`, '_blank');
        });
    }
    
    if (shareEmail) {
        shareEmail.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `mailto:?subject=${encodeURIComponent('Interactive Periodic Table')}&body=${encodeURIComponent('Check out this amazing Interactive Periodic Table: ' + window.location.href)}`;
        });
    }
    
    if (copyLinkBtn && shareUrlInput) {
        // Update the share URL to current page
        shareUrlInput.value = window.location.href;
        
        copyLinkBtn.addEventListener('click', function() {
            shareUrlInput.select();
            document.execCommand('copy');
            
            // Show copied feedback
            const originalText = copyLinkBtn.textContent;
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyLinkBtn.textContent = originalText;
            }, 2000);
        });
    }
});