let cart=JSON.parse(localStorage.getItem("myCartE")) || [];

const products = [
    {productCode: "101", productName: "Samosa", productPrice: 10},
    {productCode: "102", productName: "Pizza", productPrice: 300},
    {productCode: "103", productName: "Pasta", productPrice: 1000},
    {productCode: "104", productName: "Cold-drink", productPrice:50}
];

function getData(val){
    const product = products.filter((data) => data.productCode == val);
    if(product.length<=0){
        window.alert("Invalid Product Code");
        return;
    }
    else{
        productfilterinput.value = product[0].productName;
        productpriceinput.value = product[0].productPrice;
        productqtyinput.focus();
    }
}
function saveCartToLocalStorage() {
    localStorage.setItem("myCartE",JSON.stringify(cart));
}
function renderCartOnReload(){
    cart.forEach(item => {
        const row = tablebody.insertRow();
        row.setAttribute('data-id', item.id);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = item.productName;
        cell2.textContent = item.productPrice;
        cell3.textContent = item.productQuantity;
        cell4.textContent = item.total;
        cell5.innerHTML = `<button class="delete-btn">&#10060;</button>`;
    });
}
function addNewRow(pname,price, qty){

    const row = tablebody.insertRow();

    const uniqueId = Date.now().toString(); 
    row.setAttribute('data-id', uniqueId);


    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = pname;
    cell2.textContent = parseFloat(price);
    cell3.textContent = parseInt(qty);
    cell4.textContent = (parseFloat(price) * parseInt(qty)).toFixed(2);
    cell5.innerHTML = `<button class="delete-btn">&#10060;</button>`;

    const items = {
        id:uniqueId,
        productName: pname,
        productPrice: parseFloat(price),
        productQuantity: parseInt(qty),
        total: (parseFloat(price) * parseInt(qty)).toFixed(2)
    };
    cart.push(items);
    console.log(cart);


}


const productfilterinput = document.getElementById("product-filter");
const productpriceinput = document.getElementById("product-price");
const productqtyinput = document.getElementById("product-qty");
const addtocartbtn = document.getElementById("add-to-cart");
const tablebody = document.getElementById("cart-items-body");
const totalitems = document.getElementById("totalitems");
const subtotal = document.getElementById("subtotal");
const gstax = document.getElementById("gstax");
const grandtotal = document.getElementById("grandtotal");

function billcalculate(){
    let st = 0.0;
    let gst = 0.0;
    totalitems.textContent = cart.length;
    cart.forEach(item => {
        st += parseFloat(item.total) || 0;
    });
    gst = 0.18 * st;
    subtotal.textContent = st.toFixed(2);
    gstax.textContent = gst.toFixed(2);
    grandtotal.textContent = (st + gst).toFixed(2);
}

document.addEventListener("DOMContentLoaded",()=>{
    renderCartOnReload();
    billcalculate();
    productfilterinput.focus();
})


productfilterinput.addEventListener("keydown",(e)=>{
      if(e.key === "Enter" && e.target.value!=="")
        {
            getData(e.target.value);

      }


})

addtocartbtn.addEventListener("click",()=>{
    if(productfilterinput.value==="" || productpriceinput.value==="" || productqtyinput.value==="")
    {
        window.alert("Please fill valid values..");
        return;
    }
    addNewRow(productfilterinput.value,productpriceinput.value,productqtyinput.value);
    saveCartToLocalStorage();
    productfilterinput.value = "";
    productpriceinput.value = "";
    productqtyinput.value = "1";
    productfilterinput.focus();
})

tablebody.addEventListener("click",(event)=>{
    const button = event.target.closest(".delete-btn");
    if(button){
        const row = button.closest("tr");
        const rowId= row.getAttribute('data-id');
        cart = cart.filter(item => item.id !== rowId);
        saveCartToLocalStorage();
        billcalculate();
        console.log(cart);
        row.remove();
    }
})