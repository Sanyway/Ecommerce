'use strict'

const dataBase = [
     {
      id: 1,
      name: 'Levi',
      price: 40.00,
      image: './assets/images/Levi.png',
      quantity: 10
    },
    {
      id: 2,
      name: 'Ring',
      price: 30.00,
      image: './assets/images/Ring.png',
      quantity: 18
    },
    {
      id: 3,
      name: 'Necklace',
      price: 8.00,
      image: './assets/images/Necklace.png',
      quantity: 20
    },
    {
      id: 4,
      name: 'Hoodie',
      price: 25.00,
      image: './assets/images/Hoodie.png',
      quantity: 10
    },
    {
     id: 5,
     name: 'Bracelet',
     price: 5.00,
     image: './assets/images/Bracelet.png',
     quantity: 12
    },
    {
     id: 6,
     name: 'Bag',
     price: 55.00,
     image: './assets/images/Bag.png',
     quantity: 8
    }
    
];

let carrito = [];
const divisa = '$';
const DOMcontainer = document.querySelector('#container1');
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');
const DOMboton = document.querySelector('#boton-1');
const DOMbotonAdd = document.querySelector ('btn-primary')



function renderizarProductos() {
    dataBase.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'cart-1');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = `${info.name} || Stock: ${info.quantity}` ;
        // Imagen
        const miNodoImage = document.createElement('img');
        miNodoImage.classList.add('images');
        miNodoImage.setAttribute('src', info.image);
        // Precio
        const miNodoPrice = document.createElement('p');
        miNodoPrice.classList.add('card-text');
        miNodoPrice.textContent = `Price: ${info.price} ${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.setAttribute('id', 'btn-add')
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos

        miNodoCardBody.appendChild(miNodoImage);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrice);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
   
    carrito.push(evento.target.getAttribute('marcador'))
    
    renderizarCarrito();

}

function renderizarCarrito() {
   
    DOMcarrito.textContent = '';
  
    const carritoSinDuplicados = [...new Set(carrito)];
  
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = dataBase.filter((itemBaseDatos) => {
           
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item'); /*Por definir tex*/
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}${divisa}`;
       

        // Boton de comprar
        const miBotonCompra = document.createElement('button');
        miBotonCompra.classList.add('btn-2', 'btn-vaciar');
        miBotonCompra.textContent = 'X';
        miBotonCompra.dataset.item = item;
        miBotonCompra.addEventListener('click', comprarItemCarrito);
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn-2', 'btn-vaciar');
        miBoton.textContent = 'X';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
       
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
   
    DOMtotal.textContent = calcularTotal();
   
}


function borrarItemCarrito(evento) {
   
    const id = evento.target.dataset.item;
   
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
   
    renderizarCarrito();
}

//Comprar en el carrito


function comprarItemCarrito(evento) {
    
    return window.location.reload(), window.alert('Gracias por su compra');

    }
    
//Calcular precio

function calcularTotal() {
   
    return carrito.reduce((total, item) => {
        
        const miItem = dataBase.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        return total + miItem[0].price;
    }, 0).toFixed(2);
}
//contador carrito
 
var counterVal = 0;
  
  function incrementClick() {
      updateDisplay(++counterVal);
  }
    
function cuentaCarrito(){
    const canasta= document.createElement('div');
    canasta.textContent = counterVal
    canasta.classList.add('canasta')
    canasta.setAttribute("id","canasta-id")
    DOMboton.appendChild(canasta); 
  }  

  cuentaCarrito()


function vaciarCarrito() {
    
    carrito = [];
   
    renderizarCarrito();
}

function mostrar(){
    document.getElementById('img-carrito').style.display ='block';
    document.getElementById('boton-1').style.display ='none'
    document.getElementById('boton-2').style.display ='block'
    document.getElementById('levi-img').style.right ='15%'
    document.getElementById('levi-img').style.transition ='1s'
    document.getElementById('canasta-id').style.display ='none'

   
    
}

function ocultar(){
    document.getElementById('img-carrito').style.display ='none'
    document.getElementById('boton-1').style.display ='block'
    document.getElementById('boton-2').style.display ='none'
    document.getElementById('levi-img').style.right ='10%'
    document.getElementById('levi-img').style.transition ='1s'
    document.getElementById('canasta-id').style.display =''

}




function ocultarAlCargar(){
document.getElementById('img-carrito').style.display ='none'}
// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', comprarItemCarrito);



//Cargar al inicio
renderizarProductos();
renderizarCarrito();
ocultarAlCargar()







