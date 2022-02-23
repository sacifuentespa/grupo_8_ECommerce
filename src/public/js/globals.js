function showError(errorMessage){

    Swal.fire({
        title: '¡Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })

}

async function isEmailAvaible( email ){
  
  const response = await fetch('/is-email-avaible', {
    method: 'POST',
    body: JSON.stringify({email}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();

}