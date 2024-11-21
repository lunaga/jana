    // Cuando el formulario se envía
    document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevenir recarga de página

        // Obtenemos los datos del formulario
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData); // Convierte los datos del formulario a un objeto JSON

        try {
            // Enviamos los datos al servidor usando fetch
            const response = await fetch("http://localhost:3000/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indicamos que enviamos JSON
                },
                body: JSON.stringify(data), // Enviamos los datos como JSON
            });

            if (response.ok) {
                alert("Mensaje enviado correctamente.");
                e.target.reset(); // Limpiar el formulario después de enviar
            } else {
                alert("Hubo un error al enviar el mensaje.");
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor. Intenta más tarde.");
        }
    });