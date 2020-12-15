const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const productDiv = document.querySelector("#products .productlist");
const cartItems = document.querySelector(".cart-items")

// Array som allt sparas i
//PRODUCT LIST stringifyed för att local storage sa fungera

let PRODUCT_LIST;
let SHOPPING_CART = [];
let balance = 0;

//För delete och edit knappar 

const DELETE = "delete", EDIT = "edit", ADDTOCART = "addCartBtn";

// Kollar om det finns sparad data i localstorage

PRODUCT_LIST = JSON.parse(localStorage.getItem("PRODUCT_LIST")) || [];
updateUI();


//eventlistener för knappar

productDiv.addEventListener("click", deleteEditCart);
uploadBtn.addEventListener("click" , newProduct);

// Function för att pusha allt till array när uploadknappen är klickad
function newProduct(e){ 
  //e.preventDefault();
  //if statement för att alla fält måste vara ifyllda
if(!addTitle.value || !addInfo.value || !addPrice.value) return;
  // spara allt i PRODUCT_LIST
  //parseInt för att få price till Number
  let product = {
      title : addTitle.value,
      description : addInfo.value,
      price : parseInt(addPrice.value)
  }
  PRODUCT_LIST.push(product);

  updateUI();

  //logra i localstorage 


  clearInput( [addTitle, addInfo, addPrice] );

}

//delete or edit function, kollar efter vilket id som stämmer och väljer parentnode som har knappen

function deleteEditCart(event){
  const targetBtn = event.target;

  const product = targetBtn.parentNode;
  
  if ( targetBtn.id == DELETE ){
    deleteProduct(product);

  }else if(targetBtn.id == EDIT ){
    editProduct(product);
  }else if(targetBtn.id == ADDTOCART ){
    addToCart(product);
  }

}


// delete och edit och addToCart functions


//delete function för att tabort rätt product i arrayen, väljer efter id
function deleteProduct(product){
  PRODUCT_LIST.splice( product.id, 1);

  updateUI();
}

//edit function som gör att man kan ändra alla inputs och tar bort produkten man vill ändra
function editProduct(product){
  let PRODUCT = PRODUCT_LIST[product.id];

  addTitle.value = PRODUCT.title;
  addInfo.value = PRODUCT.description;
  addPrice.value = PRODUCT.price;

  deleteProduct(product);
}

//För att lägga till producter i lokalstorage cart

let cartItem={}

function addToCart(product){
  
  let productTitle = product.querySelector(".product_title");
  let productPrice = product.querySelector(".product_price");
  let productImg = product.querySelector(".product_img");
  
  cartItem.title = productTitle.innerHTML
  cartItem.price = parseInt(productPrice.innerHTML)


  SHOPPING_CART.push(cartItem);

  const localData = localStorage.getItem("cartList");

  const existingData = JSON.parse(localData);

  console.log(existingData)

  const cleanedData = existingData ? existingData.concat(SHOPPING_CART) : SHOPPING_CART ;

  localStorage.setItem("cartList", JSON.stringify(cleanedData)); 


  /* showCart(); */

  location.reload();
  
}


function updateUI(){

  

    //Rensar input fälten i productDiv
    clearElement( [productDiv] ) ;
  
    //kör showproduct function och visar den i productDiv, index för att få id på varje produkt
    PRODUCT_LIST.forEach( (product, index) => {
      showproduct(productDiv, product.title, product.description, product.price, index)
  
    })
  
  
    //sparar product på local storage
    localStorage.setItem("PRODUCT_LIST", JSON.stringify(PRODUCT_LIST));
    
  
  
  }

// Showproduct function
 
function showproduct(div, title, description, price, id){

    const product = `<div id = "${id}" class="product-card">
                        <img class="product_img" src="/images/pic1.jpg" alt="painting">
                        <h2 class="product_title">${title}</h2>
                        <p class="product_description">${description}</p>
                        <p class="product_price">${price}</p>
                        <span>kr</span>
                        <button id="addCartBtn">Lägg till i varukorg</button>
                        <button id="edit">edit</button>
                        <button id="delete">delete</button>
                  
    
    
    
                   </div>`;
  
    // afterbegin för att få senast tillagda product först               
    const position = "afterbegin";
  
    div.insertAdjacentHTML(position, product);
  } 
  

function clearElement(elements){
    elements.forEach ( element => {
      element.innerHTML = "";
  
    })
}
  
  
  
function clearInput(inputs){
    inputs.forEach( input => {
      input.value = "";
    })
}