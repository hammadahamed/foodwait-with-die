


(function () {

    let db = {
        recepies: [
            "Pepper-Grill",
            "Garlic-Grill",
            "Hyderabadi-Grill",
            "Tandoori",
            "Hyderabadi-Tabndoori",
            "Chicken-Briyani",
            "Mutton-Briyani",
            "Veg-Pizza",
            "Chicken-Pizza",
            "Mushroom-Pizza",
            "Panneer-Butter-Pizza",
            "French-Fries",
            "Chicken-Soup",
            "Mutton-Soup",
            "Pepper-Chicken",
            "Bucket-Chicken",
            "Chicken-Balls"
        ],
        recepieDetails: {
            "Pepper-Grill": { prepTime: "15", price: "300" },
            "Garlic-Grill": { prepTime: "12", price: "320" },
            "Hyderabadi-Grill": { prepTime: "15", price: "370" },
            "Tandoori": { prepTime: "10", price: "300" },
            "Hyderabadi-Tabndoori": { prepTime: "12", price: "350" },
            "Chicken-Briyani": { prepTime: "2", price: "100" },
            "Mutton-Briyani": { prepTime: "2", price: "120" },
            "Veg-Pizza": { prepTime: "10", price: "180" },
            "Chicken-Pizza": { prepTime: "15", price: "250" },
            "Mushroom-Pizza": { prepTime: "15", price: "200" },
            "Panneer-Butter-Pizza": { prepTime: "20", price: "220" },
            "French-Fries": { prepTime: "5", price: "100" },
            "Chicken-Soup": { prepTime: "5", price: "40" },
            "Mutton-Soup": { prepTime: "5", price: "60" },
            "Pepper-Chicken": { prepTime: "8", price: "150" },
            "Bucket-Chicken": { prepTime: "8", price: "195" },
            "Chicken-Balls": { prepTime: "2", price: "185" }
        }
    }

    let orderList = {};
    let recepies = db.recepies;
    let detials = db.recepieDetails;
    let parser = new DOMParser()
    let selectedItem = null;


    let menuContainer = document.querySelector("#menu-container");
    let orderContainer = document.querySelector("#order-container");
    let clearOrders = document.querySelector("#clear-orders");
    let billUI = document.querySelector("#bill");


    for (let i of recepies) {
        let name, price, prepTime;
        name = i;
        price = detials[i].price;
        prepTime = detials[i].prepTime;

        // POPULATING THE MENU
        let item = `<div id="${name}" class="recepie-card" draggable="true">
                       <div id="card-img"> 
                       </div>
                       <div id="card-info"> 
                            <p class="item-name">${name.split("-").join(" ")}</p>
                            <div class="item-section">
                                <p class="price-title">Price</p>
                                <p class="item-price right-item" s>₹ ${price}</p>
                             </div>
                             <div class="item-section">
                                <p class="prepTime-title">ETA</p>
                                <p class="item-prepTime right-item"> ${prepTime} mins</p>
                             </div>
                       </div>
                    </div>`;
        // ISERTING RECEPIE CARDS INTO THE UI
        item = parser.parseFromString(item, 'text/html').body.firstChild;
        menuContainer.appendChild(item);
        let recepieCard = document.querySelectorAll(".recepie-card");

        // DRAGGABLE REALATED EVENT LISTENERS
        recepieCard.forEach((node) => {

            node.addEventListener("dragstart", (e) => {
                node.classList.add("dragging");
            });

            node.addEventListener("dragend", (e) => {
                node.classList.remove("dragging");
            });

        });

        // ORDER CONTAINER DRAGOVER
        orderContainer.addEventListener("dragenter", (e) => {
            e.preventDefault();
            orderContainer.classList.add("drop-active");
            selectedItem = document.querySelector(".dragging").id;
        });
        orderContainer.addEventListener("dragover", (e) => {
            orderContainer.classList.add("drop-active");
            e.preventDefault();
        });
        orderContainer.addEventListener("dragleave", (e) => {
            e.preventDefault();
            orderContainer.classList.remove("drop-active");
        });

        // UTIL FUNCTION
        function removeOrdersFromUI() {
            // REMOVING THE EXISTING ITEMS
            let childs = [...orderContainer.children];
            childs.forEach((n) => {
                n.remove()
            })
        }
        //  ---------------------- ADDING THE ORDERS FROM DROP -------------------------
        function addOrder(e) {
            e.stopImmediatePropagation();
            // console.log("dropped", e);
            orderContainer.classList.remove("drop-active");
            let item = detials[selectedItem];

            // INGRESSING INTO THE ORDERLIST
            if (orderList[selectedItem] != undefined) {
                orderList[selectedItem].count += 1;
                orderList[selectedItem].price = detials[selectedItem].price * orderList[selectedItem].count;
            }
            else {
                orderList[selectedItem] = {
                    name: selectedItem,
                    price: item.price,
                    prepTime: item.prepTime,
                    count: 1
                }
            }

            removeOrdersFromUI();

            let bill = 0
            // PUSHING ITEMS INTO THE ORDER LIST UI
            for (let k of Object.keys(orderList)) {
                let item = orderList[k];

                // BILL CALC
                bill += parseInt(item.price);

                let orderedItem = `<div class="order-wrap">
                                    <div style="justify-content: start">
                                        <p class="item-name">${item.name.split("-").join(" ")}</p>
                                    </div>
                                    <div>
                                        <p>${item.count}</p>
                                    </div>
                                    <div >
                                        <p>₹ ${item.price}</p>
                                    </div>
                                </div>`;

                // REPOPULATING THE ORDERS UI
                orderedItem = parser.parseFromString(orderedItem, 'text/html').body.firstChild;
                orderContainer.appendChild(orderedItem);
            }

            // PUSHING BILL TO UI
            billUI.innerHTML = "₹" + bill;
        }
        orderContainer.addEventListener("drop", addOrder);
        clearOrders.addEventListener("click", () => {
            removeOrdersFromUI();
            orderList = {};
            billUI.innerHTML = "₹ 0";
        })
    }
})();
