
/* ==========================================
   MINIMU 🎀
   Interactividad y mundos mágicos
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DE LA PÁGINA
    const body = document.body;
    const themeButtons = document.querySelectorAll(".theme-btn");
    const magicScene = document.getElementById("magicScene");
    const sceneEmoji = document.getElementById("sceneEmoji");
    const sceneTitle = document.getElementById("sceneTitle");
    const sceneDescription = document.getElementById("sceneDescription");
    const sceneDecoration = document.getElementById("sceneDecoration");
    const magicEffects = document.getElementById("magicEffects");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    // CONFIGURACIÓN DE LOS SEIS MUNDOS
    const themes = {
        rainbow: {
            emoji: "🌈🧸✨",
            title: "¡Un mundo lleno de colores!",
            description:
                "En MINIMU, cada pequeño detalle está lleno de amor, ternura y magia.",
            decorations: ["🌈", "⭐", "🦋", "☁️", "💖"],
            particles: ["✨", "💖", "⭐", "🌸", "🌈"],
            effect: "sparkle"
        },

        dark: {
            emoji: "🌙⭐🧸",
            title: "Una noche mágica",
            description:
                "Descubre un cielo de estrellas, luces brillantes y fuegos artificiales de colores.",
            decorations: ["🌙", "⭐", "✨", "🌌", "💫"],
            particles: ["✨", "⭐", "💫", "🎆", "🌟"],
            effect: "firework"
        },

        rain: {
            emoji: "🌧️☂️🧸",
            title: "Un día de lluvia",
            description:
                "Las gotitas bailan en el cielo mientras MINIMU llena el día de color.",
            decorations: ["☁️", "🌧️", "☂️", "💧", "🌈"],
            particles: ["💧", "💦", "💧", "🌧️"],
            effect: "rain"
        },

        snow: {
            emoji: "⛄❄️🧸",
            title: "El reino de la nieve",
            description:
                "Copos mágicos y muñecos de nieve convierten este mundo en un lugar encantador.",
            decorations: ["❄️", "⛄", "☃️", "❄️", "🌨️"],
            particles: ["❄️", "❅", "❆", "❄️", "✨"],
            effect: "snow"
        },

        autumn: {
            emoji: "🍂🧸🍁",
            title: "La magia del otoño",
            description:
                "Hojas de colores vuelan suavemente en este cálido mundo otoñal.",
            decorations: ["🍁", "🍂", "🌰", "🍃", "🧡"],
            particles: ["🍂", "🍁", "🍃", "🍂"],
            effect: "leaves"
        },

        spring: {
            emoji: "🌷🦋🐻",
            title: "¡Llegó la primavera!",
            description:
                "Flores, mariposas y pajaritos llenan MINIMU de alegría y dulzura.",
            decorations: ["🌷", "🌼", "🦋", "🐦", "🌸"],
            particles: ["🌸", "🌼", "🦋", "🌷", "🐦"],
            effect: "flowers"
        }
    };

    let activeTheme = "rainbow";
    let particleTimer = null;

    // CAMBIAR EL MUNDO
    function changeTheme(name) {
        const theme = themes[name];

        if (!theme) return;

        activeTheme = name;

        // Cambiar las clases de color del sitio.
        Object.keys(themes).forEach(themeName => {
            body.classList.remove(`theme-${themeName}`);
        });

        body.classList.add(`theme-${name}`);

        // Actualizar los botones seleccionados.
        themeButtons.forEach(button => {
            const selected = button.dataset.theme === name;

            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        // Cambiar los textos y emojis de la escena.
        if (sceneEmoji) {
            sceneEmoji.textContent = theme.emoji;
        }

        if (sceneTitle) {
            sceneTitle.textContent = theme.title;
        }

        if (sceneDescription) {
            sceneDescription.textContent = theme.description;
        }

        // Crear las decoraciones flotantes.
        if (sceneDecoration) {
            sceneDecoration.replaceChildren();

            theme.decorations.forEach((emoji, index) => {
                const decoration = document.createElement("span");

                decoration.textContent = emoji;
                decoration.style.animationDelay = `${index * 0.3}s`;

                sceneDecoration.appendChild(decoration);
            });
        }

        startParticles();
    }

    // Conectar los seis botones.
    themeButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeTheme(button.dataset.theme);
        });
    });

    // CREAR PARTÍCULAS ANIMADAS
    function startParticles() {
        if (particleTimer !== null) {
            clearInterval(particleTimer);
            particleTimer = null;
        }

        if (!magicEffects) return;

        magicEffects.replaceChildren();

        // Respetar la preferencia de reducir movimiento.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        particleTimer = setInterval(() => {
            if (magicEffects.childElementCount >= 24) return;

            createParticle();
        }, activeTheme === "dark" ? 240 : 320);
    }

    function createParticle() {
        const theme = themes[activeTheme];

        if (!theme || !magicEffects) return;

        const particle = document.createElement("span");

        particle.className = "magic-particle";
        particle.textContent =
            theme.particles[Math.floor(Math.random() * theme.particles.length)];

        const left = Math.random() * 100;
        const size = 14 + Math.random() * 18;
        const duration = 3 + Math.random() * 3;

        particle.style.setProperty("--left", `${left}%`);
        particle.style.setProperty("--size", `${size}px`);
        particle.style.setProperty("--duration", `${duration}s`);

        // Los fuegos artificiales aparecen en distintos puntos.
        if (theme.effect === "firework") {
            particle.style.top = `${10 + Math.random() * 65}%`;
            particle.style.left = `${5 + Math.random() * 90}%`;
            particle.style.animationName = "sparkle";
            particle.style.animationDuration = `${1 + Math.random()}s`;
        }

        // La lluvia cae como pequeñas gotas.
        if (theme.effect === "rain") {
            particle.style.fontSize = `${12 + Math.random() * 10}px`;
        }

        magicEffects.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        }, { once: true });
    }

    // AURORAS Y DESTELLOS AL TOCAR LA ESCENA
    function createMagicBurst(clientX, clientY) {
        if (!magicScene || !magicEffects) return;

        const rect = magicScene.getBoundingClientRect();

        // El efecto solo aparece dentro del recuadro mágico.
        if (
            clientX < rect.left ||
            clientX > rect.right ||
            clientY < rect.top ||
            clientY > rect.bottom
        ) {
            return;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const colors = [
            "#ff45c8",
            "#8d5cff",
            "#39caff",
            "#ffdd55",
            "#62efba",
            "#ffffff"
        ];

        // Crear un grupo de destellos.
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement("span");

            spark.className = "magic-particle";
            spark.textContent = ["✨", "💖", "⭐", "💫"][
                Math.floor(Math.random() * 4)
            ];

            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.color = colors[
                Math.floor(Math.random() * colors.length)
            ];
            spark.style.setProperty("--size", `${15 + Math.random() * 20}px`);
            spark.style.animationName = "sparkle";
            spark.style.animationDuration = "1.3s";

            magicEffects.appendChild(spark);

            spark.addEventListener("animationend", () => {
                spark.remove();
            }, { once: true });
        }

        // Añadir un brillo de color al fondo.
        magicScene.animate(
            [
                { filter: "brightness(1)" },
                { filter: "brightness(1.15) saturate(1.25)" },
                { filter: "brightness(1)" }
            ],
            {
                duration: 650,
                easing: "ease-out"
            }
        );
    }

    if (magicScene) {
        magicScene.addEventListener("click", event => {
            createMagicBurst(event.clientX, event.clientY);
        });
    }

    // MENÚ DESPLEGABLE PARA CELULARES
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Cerrar el menú al seleccionar una página.
        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
                menuToggle.textContent = "☰";
            });
        });

        // Cerrar el menú al cambiar a una pantalla grande.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });
    }

    // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // VALIDACIÓN BÁSICA DE FORMULARIOS DE CONTACTO
    document.querySelectorAll(".contact-form").forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            let message = form.querySelector(".form-message");

            if (!message) {
                message = document.createElement("p");
                message.className = "form-message success";
                message.setAttribute("role", "status");
                form.appendChild(message);
            }

            message.textContent =
                "¡Gracias por escribir a MINIMU! Los datos son válidos. Para recibir tu mensaje, conecta el formulario a un servicio de envío.";
        });
    });

    // ACTIVAR EL MUNDO ARCOÍRIS AL INICIAR.
    changeTheme("rainbow");

});

