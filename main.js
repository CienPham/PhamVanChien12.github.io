// Loader animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');
    const loadingText = document.querySelector('.loader-text');
    
    let width = 0;
    const interval = setInterval(function() {
        width += Math.random() * 10;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(function() {
                loader.style.opacity = 0;
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
        progress.style.width = width + '%';
        loadingText.textContent = 'Đang tải... ' + Math.floor(width) + '%';
    }, 200);
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', function() {
    navbar.classList.toggle('active');
    if (navbar.classList.contains('active')) {
        menuBtn.innerHTML = '✕';
    } else {
        menuBtn.innerHTML = '☰';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
        menuBtn.innerHTML = '☰';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show an alert
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        contactForm.reset();
    });
}

// 3D Scene with Three.js
let scene, camera, renderer, objects = [];

function initThree() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    const container = document.getElementById('canvas-container');
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Add 3D objects
    addObjects();
    
    // Position camera
    camera.position.z = 5;
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

function addObjects() {
    // Create geometric objects to represent 3D work
    
    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2563eb, // Primary blue color
        metalness: 0.3,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0, 0);
    scene.add(cube);
    objects.push({ mesh: cube, rotationSpeed: 0.01 });
    
    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x38bdf8, // Accent blue
        metalness: 0.3,
        roughness: 0.4
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
    objects.push({ mesh: sphere, rotationSpeed: 0.01 });
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e40af, // Secondary blue
        metalness: 0.3,
        roughness: 0.4
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, 0, 0);
    scene.add(torus);
    objects.push({ mesh: torus, rotationSpeed: 0.01 });
    
    // Create some random small cubes for background effect
    for (let i = 0; i < 50; i++) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() > 0.5 ? 0x2563eb : 0x38bdf8,
            metalness: 0.3,
            roughness: 0.4
        });
        const smallCube = new THREE.Mesh(geometry, material);
        
        // Position randomly in background
        smallCube.position.x = (Math.random() - 0.5) * 15;
        smallCube.position.y = (Math.random() - 0.5) * 10;
        smallCube.position.z = -5 - Math.random() * 10;
        
        scene.add(smallCube);
        objects.push({ 
            mesh: smallCube, 
            rotationSpeed: 0.005 + Math.random() * 0.01,
            floatingSpeed: 0.001 + Math.random() * 0.005,
            floatingDirection: Math.random() * Math.PI * 2,
            floatingDistance: 0.1 + Math.random() * 0.3
        });
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate all objects
    objects.forEach(obj => {
        obj.mesh.rotation.x += obj.rotationSpeed;
        obj.mesh.rotation.y += obj.rotationSpeed;
        
        // Add floating animation for small background cubes
        if (obj.floatingSpeed) {
            obj.mesh.position.y += Math.sin(Date.now() * obj.floatingSpeed) * 0.01;
            obj.mesh.position.x += Math.cos(Date.now() * obj.floatingSpeed + obj.floatingDirection) * 0.01;
        }
    });
    
    renderer.render(scene, camera);
}

// Initialize Three.js scene when page loads
window.addEventListener('load', initThree);

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .about-img');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('show');
        }
    });
}

// Add fade-in animation styles
const style = document.createElement('style');
style.textContent = `
    .service-card, .portfolio-item, .about-content, .about-img {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);