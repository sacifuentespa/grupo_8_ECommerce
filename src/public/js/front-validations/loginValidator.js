let form = document.querySelector("form");

form.onsubmit = async (e) => {
    e.preventDefault();

    let email = document.querySelector("input[name=email]").value;
    if(  !validator.isEmail(email) ){
        showError("Debes ingresar un email válido");
        return false;
    }

    // Si el email está disponible es porque no está registrado, por lo tanto,
    // debemos indicar al usuario que el email no está registrado:
    let emailAvaible = await isEmailAvaible(email);
    if(emailAvaible.isAvaible){
        showError("El correo que intentas ingresar no está registrado.");
        return false;
    }

    form.submit();
}