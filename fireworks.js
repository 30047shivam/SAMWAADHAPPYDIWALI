// Fireworks Effect Script - Pure JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById("fireworks").appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const fireworks = [];

    // Firework particle settings
    function createFirework(x, y) {
        const particles = [];
        for (let i = 0; i < 100; i++) {
            const angle = (Math.PI * 2 * i) / 100;
            const speed = Math.random() * 5 + 2;
            particles.push({
                x: x,
                y: y,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                life: 100
            });
        }
        fireworks.push(...particles);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((particle, i) => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.life -= 1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            if (particle.life <= 0) {
                fireworks.splice(i, 1);
            }
        });

        if (Math.random() < 0.05) {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Adjust canvas size on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
