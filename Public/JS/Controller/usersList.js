'use strict';

const InputSearch = document.querySelector('.searchBarInput');
InputSearch.addEventListener('input', PrintScreen);

let ListarVeterinarios = [];
let userRol = '';

GetVeterinarios();

async function GetVeterinarios() {
    let result = await GetListarVeterinarios();
    
    if (result != {} && result.resultado == true) {
        ListarVeterinarios = result.ListaVeterinariosBD;
        PrintScreen();
        console.log(result.ListaVeterinariosBD);
    };
};

async function PrintScreen() {


    var tbody = document.querySelector('#modalTable ');
    tbody.innerHTML = '';

    let filter = InputSearch.value.toLowerCase();

    // if (filter === "Administrador") {
    //     filter = 1; 
    // }else if (filter === "Cliente"){
    //     filter = 2; 
    // }else if(filter === "Veterinario"){
    //     filter = 3; 
    // }else{
    //     filter = 4; 
    // }

    for (let i = 0; i < ListarVeterinarios.length; i++) {
            if (ListarVeterinarios[i].Nombre.toLowerCase().includes(filter) || filter === '') {
    
                let fila = tbody.insertRow();
    
                let nombre = fila.insertCell();
                let correo = fila.insertCell();
                let tel = fila.insertCell();
                let rol = fila.insertCell();
                let cellActions = fila.insertCell();

                
            let btnDetails = document.createElement('button');
            btnDetails.innerText = '📋';
            btnDetails.title = 'Details';
            btnDetails.classList.add('btnsTabla');

            btnDetails.onclick = function () {

                let modal = document.querySelector('.modal');

                modal.classList.add('modalShow');
                modal.classList.remove('modalOut');

                var tbodyModal = document.querySelector('#modalTable');
                tbodyModal.innerHTML = '';

                let filaModal = tbodyModal.insertRow();

                let datosGenerales = filaModal.insertCell();
                let datosPropietario = filaModal.insertCell();
                let datosMascota = filaModal.insertCell();
                let datosServicios = filaModal.insertCell();

                datosGenerales.innerHTML =
                    `<b>Entrada:</b><br> ${ListarReservacion[i].DateEntrada}<br><br> <b>Salida:</b><br> ${ListarReservacion[i].DateSalida}`;

                datosPropietario.innerHTML =
                    `<b>Nombre del dueño:</b><br>${ListarReservacion[i].NombrePropietario}<br><br><b>Email:</b><br>${ListarReservacion[i].EmailPropietario}
                    <br><br><b>Teléfono:</b><br>${ListarReservacion[i].Telefono}`;

                datosMascota.innerHTML =
                    `<b>Nombre mascota:</b><br>${ListarReservacion[i].NombreMascota}<br><br><b>Raza:</b><br>${ListarReservacion[i].Raza}
                    <br><br><b>Alimento:</b><br>${ListarReservacion[i].Alimento}`;

                datosServicios.innerHTML = `${ListarReservacion[i].Servicios}`.replaceAll(',', '<br><br>')

                let btnOut = document.querySelector('#btnCerrar');
                btnOut.onclick = function () {
                    modal.classList.add('modalOut')
                    modal.classList.remove('modalShow');
                };

                let btnDelete = document.querySelector('#btnCancelarReserva');
                btnDelete.onclick = function () {
                    deleteFunction()
                    modal.classList.add('modalOut')
                    modal.classList.remove('modalShow');
                };
            };

                if (ListarVeterinarios[i].Rol == 1) {
                    userRol = "Administrador"; 
                }else if (ListarVeterinarios[i].Rol == 2){
                    userRol = "Cliente";
                }else if(ListarVeterinarios[i].Rol == 3){
                    userRol = "Veterinario";
                }else{
                    userRol = "Secretario";
                }

                let divBtns = document.createElement('div');
                divBtns.appendChild(btnDetails);
    
                nombre.innerHTML = ListarVeterinarios[i].Nombre;
                correo.innerHTML = ListarVeterinarios[i].Email;
                tel.innerHTML = ListarVeterinarios[i].Telefono;
                rol.innerHTML = userRol;   

                cellActions.appendChild(divBtns);
            };
    };
};
