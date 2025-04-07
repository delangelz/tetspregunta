document.addEventListener("DOMContentLoaded", () => {
    // Este evento asegura que todo el DOM esté cargado antes de que el script se ejecute.

    // Validación de los nombres: solo permite letras y espacios
    document.getElementById("jugador1Nombre").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Bloquea caracteres no permitidos
    });

    document.getElementById("jugador2Nombre").addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Bloquea caracteres no permitidos
    });

    // Arrays de preguntas para el Jugador 1 y el Jugador 2
    let preguntasJugador1 = [
        { pregunta: "¿Cuántos jugadores tiene un equipo de fútbol?", respuesta: "11" },
        { pregunta: "¿Cuál es la duración de un partido de fútbol profesional?", respuesta: "90" },
        { pregunta: "¿Quién ganó el mundial de 2018?", respuesta: "Francia" },
        { pregunta: "¿Qué jugador tiene 7 Copas del Rey?", respuesta: "Lionel Messi" },
        { pregunta: "¿Cuántas veces ganó el Balón de Oro Ronaldinho?", respuesta: "1" },
        { pregunta: "¿Quién tiene más Copas del Rey, Barcelona o Real Madrid?", respuesta: "Barcelona" },
        { pregunta: "¿Cuál fue el ganador en la mayor goleada del clásico español del siglo 21?", respuesta: "Barcelona" },
        { pregunta: "¿Qué jugador tiene más goles en la historia de los clásicos?", respuesta: "Lionel Messi" },
        { pregunta: "¿Quién ganó el mundial de 2018?", respuesta: "Francia" }
    ];

    let preguntasJugador2 = [
        { pregunta: "¿Qué país ha ganado más Copas del Mundo?", respuesta: "Brasil" },
        { pregunta: "¿Qué jugador es conocido como 'La Pulga'?", respuesta: "Messi" },
        { pregunta: "¿Quién ganó el primer Mundial del mundo?", respuesta: "Uruguay" },
        { pregunta: "¿En qué equipo empezó su carrera Cristiano Ronaldo?", respuesta: "Sporting" },
        { pregunta: "¿Cuál es el número de camiseta que identificaba a Zinedine Zidane?", respuesta: "5" },
        { pregunta: "¿Cuántas veces Marcelo ganó la Champions?", respuesta: "5" },
        { pregunta: "¿Quién ganó el Mundial de 2010?", respuesta: "España" },
        { pregunta: "¿Qué equipo ha ganado más veces El Clásico?", respuesta: "Real Madrid" },
        { pregunta: "¿Qué entrenador del Barça tuvo una racha de 5 clásicos sin perder?", respuesta: "Pep Guardiola" }
    ];

    // Información de cada jugador
    let jugador1 = { 
        nombre: "",
        puntaje: 0,
        respuestasCorrectas: 0,
        respuestasIncorrectas: 0,
        preguntasTotales: preguntasJugador1.length
    };

    let jugador2 = { 
        nombre: "",
        puntaje: 0,
        respuestasCorrectas: 0,
        respuestasIncorrectas: 0,
        preguntasTotales: preguntasJugador2.length
    };

    let turno = 0; // Controla de quién es el turno

    // Botón "Iniciar Juego"
    document.getElementById("iniciar").onclick = () => {
        jugador1.nombre = document.getElementById("jugador1Nombre").value.trim();
        jugador2.nombre = document.getElementById("jugador2Nombre").value.trim();

        if (!jugador1.nombre || !jugador2.nombre) {
            alert("Por favor, ingrese nombres válidos para ambos jugadores.");
            return;
        }

        document.getElementById("formularioInicial").style.display = "none";
        document.getElementById("juego").style.display = "block";

        jugar(); // Comienza el juego
    };

    // Función principal del juego
    function jugar() {
        let jugadorActual = turno % 2 === 0 ? jugador1 : jugador2;
        let preguntasDisponibles = turno % 2 === 0 ? preguntasJugador1 : preguntasJugador2;

        if (preguntasDisponibles.length === 0) {
            mostrarResultados();
            return;
        }

        let preguntaActual = preguntasDisponibles.shift();
        document.getElementById("turno").innerText = `Turno de ${jugadorActual.nombre}`;
        document.getElementById("pregunta").innerText = preguntaActual.pregunta;

        actualizarEstadisticas();

        document.getElementById("enviar").onclick = () => {
            let respuestaUsuario = document.getElementById("respuesta").value.trim();

            if (respuestaUsuario.toLowerCase() === preguntaActual.respuesta.toLowerCase()) {
                jugadorActual.puntaje += 10;
                jugadorActual.respuestasCorrectas++;
            } else {
                jugadorActual.respuestasIncorrectas++;
            }

            turno++;
            document.getElementById("respuesta").value = "";
            jugar();
        };
    }

    // Función para actualizar las estadísticas
    function actualizarEstadisticas() {
        let porcentaje1 = ((jugador1.respuestasCorrectas / jugador1.preguntasTotales) * 100).toFixed(2);
        let promedioPuntaje1 = (jugador1.puntaje / jugador1.respuestasCorrectas || 0).toFixed(2);

        let porcentaje2 = ((jugador2.respuestasCorrectas / jugador2.preguntasTotales) * 100).toFixed(2);
        let promedioPuntaje2 = (jugador2.puntaje / jugador2.respuestasCorrectas || 0).toFixed(2);

        document.getElementById("estadoJugador").innerHTML = `
            <p><strong>${jugador1.nombre}</strong> - Puntaje: ${jugador1.puntaje} | Correctas: ${jugador1.respuestasCorrectas} |
            Incorrectas: ${jugador1.respuestasIncorrectas} | Porcentaje: ${porcentaje1}% | Promedio: ${promedioPuntaje1}</p>
            <p><strong>${jugador2.nombre}</strong> - Puntaje: ${jugador2.puntaje} | Correctas: ${jugador2.respuestasCorrectas} |
            Incorrectas: ${jugador2.respuestasIncorrectas} | Porcentaje: ${porcentaje2}% | Promedio: ${promedioPuntaje2}</p>
        `;
    }

    // Función para mostrar resultados finales
    function mostrarResultados() {
        document.getElementById("juego").style.display = "none";
        document.getElementById("resultados").style.display = "block";

        let porcentaje1 = ((jugador1.respuestasCorrectas / jugador1.preguntasTotales) * 100).toFixed(2);
        let porcentaje2 = ((jugador2.respuestasCorrectas / jugador2.preguntasTotales) * 100).toFixed(2);

        document.getElementById("resultados").innerHTML = `
            <h2>Resultados Finales</h2>
            <p><strong>${jugador1.nombre}</strong>: Puntaje: ${jugador1.puntaje}, Correctas: ${jugador1.respuestasCorrectas}, 
            Incorrectas: ${jugador1.respuestasIncorrectas}, Porcentaje: ${porcentaje1}%</p>
            <p><strong>${jugador2.nombre}</strong>: Puntaje: ${jugador2.puntaje}, Correctas: ${jugador2.respuestasCorrectas}, 
            Incorrectas: ${jugador2.respuestasIncorrectas}, Porcentaje: ${porcentaje2}%</p>
        `;
    }
});
