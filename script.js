/* =========================
   ABRIR SORPRESA
========================= */

function abrirSorpresa() {

    const sorpresa = document.getElementById("sorpresa");

    if (sorpresa) {

        sorpresa.scrollIntoView({
            behavior: "smooth"
        });

    }

    // Intentar reproducir música
    const musica = document.getElementById("musica");

    if (musica) {

        musica.play()
            .then(() => {

                const boton = document.getElementById("botonMusica");

                if (boton) {
                    boton.textContent = "🔊";
                }

            })
            .catch(() => {

                console.log(
                    "El navegador bloqueó la reproducción automática."
                );

            });

    }

    // En vez de confeti, hacemos una pequeña lluvia de corazones
    lluviaDeCorazones();

}



/* =========================
   CORAZONES
========================= */

function crearCorazon() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 18 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 7000);

}


// Corazones cada cierto tiempo
setInterval(crearCorazon, 900);



/* =========================
   LLUVIA DE CORAZONES
========================= */

function lluviaDeCorazones() {

    for (let i = 0; i < 25; i++) {

        setTimeout(() => {

            crearCorazon();

        }, i * 100);

    }

}



/* =========================
   CONTADOR
========================= */

function actualizarContador() {

    /*
        Cumpleaños:
        16 de septiembre de 2026
        00:00
    */

    const fechaCumpleanos =
        new Date(2026, 8, 16, 0, 0, 0);

    const ahora =
        new Date();

    const diferencia =
        fechaCumpleanos - ahora;


    const contador =
        document.getElementById("contadorNumeros");

    const mensaje =
        document.getElementById("mensajeCumpleanos");


    // Si ya llegó el cumpleaños
    if (diferencia <= 0) {

        if (contador) {
            contador.style.display = "none";
        }

        if (mensaje) {
            mensaje.style.display = "block";
        }

        return;
    }


    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );

    const horas =
        Math.floor(
            diferencia /
            (1000 * 60 * 60)
        ) % 24;

    const minutos =
        Math.floor(
            diferencia /
            (1000 * 60)
        ) % 60;

    const segundos =
        Math.floor(
            diferencia /
            1000
        ) % 60;


    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");


    if (elementoDias) {

        elementoDias.textContent =
            dias.toString().padStart(2, "0");

    }

    if (elementoHoras) {

        elementoHoras.textContent =
            horas.toString().padStart(2, "0");

    }

    if (elementoMinutos) {

        elementoMinutos.textContent =
            minutos.toString().padStart(2, "0");

    }

    if (elementoSegundos) {

        elementoSegundos.textContent =
            segundos.toString().padStart(2, "0");

    }

}


setInterval(
    actualizarContador,
    1000
);

actualizarContador();



/* =========================
   MENSAJE SECRETO
========================= */

function mostrarSecreto() {

    const mensaje =
        document.getElementById("mensajeSecreto");

    if (!mensaje) {
        return;
    }

    mensaje.classList.toggle("visible");


    // Cambiar texto del botón
    const botones =
        document.querySelectorAll(".secreto button");

    if (botones.length > 0) {

        if (mensaje.classList.contains("visible")) {

            botones[0].textContent =
                "❤️ Ya encontraste mi secreto";

        } else {

            botones[0].textContent =
                "💌 Abrir mensaje secreto";

        }

    }

}



/* =========================
   MÚSICA
========================= */

function alternarMusica() {

    const musica =
        document.getElementById("musica");

    const boton =
        document.getElementById("botonMusica");


    if (!musica) {
        return;
    }


    if (musica.paused) {

        musica.play()
            .then(() => {

                if (boton) {
                    boton.textContent = "🔊";
                }

            })
            .catch(() => {

                console.log(
                    "No se pudo reproducir la música."
                );

            });

    } else {

        musica.pause();

        if (boton) {
            boton.textContent = "🔇";
        }

    }

}



/* =========================
   CONFETI
========================= */

function confeti() {

    for (let i = 0; i < 80; i++) {

        const elemento =
            document.createElement("div");

        elemento.innerHTML =
            Math.random() > 0.5
                ? "🎉"
                : "❤️";


        elemento.style.position =
            "fixed";

        elemento.style.left =
            Math.random() * 100 + "vw";

        elemento.style.top =
            "-30px";

        elemento.style.fontSize =
            Math.random() * 20 + 15 + "px";

        elemento.style.zIndex =
            "9999";

        elemento.style.pointerEvents =
            "none";


        document.body.appendChild(elemento);


        const duracion =
            Math.random() * 3 + 2;


        elemento.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)",

                    opacity: 0
                }
            ],

            {
                duration:
                    duracion * 1000,

                easing:
                    "linear"
            }

        );


        setTimeout(() => {

            elemento.remove();

        }, duracion * 1000);

    }

}



/* =========================
   ANIMACIONES AL HACER SCROLL
========================= */

function activarAnimacionesScroll() {

    const elementos =
        document.querySelectorAll(".reveal");


    // Si el navegador no soporta IntersectionObserver
    if (!("IntersectionObserver" in window)) {

        elementos.forEach((elemento) => {

            elemento.classList.add("visible");

        });

        return;
    }


    const observer =
        new IntersectionObserver(

            (entradas) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visible");

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    elementos.forEach((elemento) => {

        observer.observe(elemento);

    });

}


activarAnimacionesScroll();



/* =========================
   MENSAJE DE BIENVENIDA
========================= */

window.addEventListener(
    "load",
    () => {

        console.log(
            "❤️ Página de cumpleaños cargada."
        );

    }
);