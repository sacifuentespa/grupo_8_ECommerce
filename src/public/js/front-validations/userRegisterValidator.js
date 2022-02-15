let form = document.querySelector("form");

form.onsubmit = async (e) => {

    //evitamos el envío de datos al backend para validar los datos y luego sí enviarlos.
    e.preventDefault();

    let userName = document.querySelector("input[name=name]").value;
    if(!userName  || userName.length < 2){
        showError("El nombre es requerido y debe tener mínimo 2 caracteres");
        return false;
    }

    let lastName = document.querySelector("input[name=lastName]").value;
    if(!lastName  || lastName.length < 2){
        showError("El apellido es requerido y debe tener mínimo 2 caracteres");
        return false;
    }

    let email = document.querySelector("input[name=email]").value;
    if(  !validator.isEmail(email) ){
        showError("Debes ingresar un correo válido");
        return false;
    }

    let canUseEmail = await isEmailAvaible(email);
    if(!canUseEmail){
        showError("Este correo ya ha sido registrado");
        return false;
    }

    let password = document.querySelector("input[name=password]").value;
    if( !validator.isStrongPassword(password) ){
        showError("La contraseña debe tener al menos 8 caracteres y entre ellos al menos una letra mayúscula, una minúscula, un número y un caracter especial.");
        return false;
    }

    let confirmPassword = document.querySelector("input[name=confirmPassword]").value;
    if( confirmPassword !=  password ){
        showError("Las contraseñas no coinciden");
        return false;
    }

    form.submit();
}
