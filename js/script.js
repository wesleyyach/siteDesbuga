// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.backgroundColor = 'rgba(17, 24, 39, 0.95)'; // Cor escura com transparência
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // Cor clara com transparência
        }
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = ''; // Volta para a cor padrão definida no CSS
        navbar.style.boxShadow = 'none';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Exemplo de feedback para o usuário
        alert('Obrigado pelo contato! Retornaremos em breve.');
        this.reset();
    });
}

// Animação de entrada para os cards de serviço
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.servico-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Tema
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    
    // Atualiza o ícone
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
});

// Menu Mobile
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
menuToggle.setAttribute('aria-label', 'Abrir menu');

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

// Adiciona o botão do menu apenas em telas pequenas
function updateMenuButton() {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            navbar.insertBefore(menuToggle, navLinks);
        }
    } else {
        const existingButton = document.querySelector('.menu-toggle');
        if (existingButton) {
            existingButton.remove();
        }
        navLinks.classList.remove('active');
    }
}

// Inicializa o botão do menu
updateMenuButton();

// Atualiza quando a janela é redimensionada
window.addEventListener('resize', updateMenuButton);

// Toggle do menu mobile
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
});

// Destaca o item ativo do menu
function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        
        // Verifica se o link corresponde ao caminho atual
        if (link.getAttribute('href') === currentPath || 
            link.getAttribute('href') === currentHash ||
            (currentHash && link.getAttribute('href').endsWith(currentHash))) {
            link.classList.add('active');
        }
    });
}

// Atualiza o item ativo quando a página carrega ou quando o hash muda
window.addEventListener('load', setActiveMenuItem);
window.addEventListener('hashchange', setActiveMenuItem);

// Efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 