//evitamos el envío de datos al backend, con el fin de validarlos y luego sí enviarlos
let form = document.querySelector(".formProductUpload");

form.onsubmit = async (e) => {
    e.preventDefault();
    console.log('wola')

    let productName = document.querySelector("input[name=productName]").value;
    if(!productName  || productName.length < 5){
        showError("El nombre es requerido y debe tener mínimo 3 caracteres");
        return false;
    }

    let productDescriptionUpload = document.querySelector("input[name=productDescriptionUpload]").value;
    if(!productDescriptionUpload || productDescriptionUpload.length < 20){
        showError("Una descripción debe tener al menos 20 caracteres");
        return false;
    }
    form.submit();
}

