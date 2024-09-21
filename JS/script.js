const menuBtn = document.getElementById("menu-btn");
const mobileMenuEl = document.getElementById("mobileMenu");
const seatSelectedEl = document.getElementById("selected-seat")
// Selected Seat Count
const totalBookedEl = document.getElementById("total-booked")
// Available Seat 
const availableSeatEl = document.getElementById("available-seat")
// Total Price
const totalPriceEl = document.getElementById("total-price")
// Coupor Field
const couponInputField = document.getElementById("coupon-field")
// Coupon Apply Button
const couponBtnEl = document.getElementById("coupon-btn")
// Remove Default Text No abailable set 
const DefaultTextEl = document.getElementById("default-text")
// Grand Total
const grandTotalEl = document.getElementById("grand-total")
// Phone Number Field
const phoneNumberEl = document.getElementById('phone-number')
// Next Button
const nextButtonEl = document.getElementById('nextButton')
// Modal button cotinue
const btnContinue = document.getElementById('btn-continue');

// Menu icons
menuBtn.addEventListener('click', function () {
    menuBtn.children[0].classList.toggle("hidden")
    const menuCloseBtn = document.getElementById("close-icon");
    menuCloseBtn.classList.toggle("hidden")
    mobileMenuEl.classList.toggle("hidden")
    mobileMenuEl.classList.toggle("flex")
})

let selectedSeat = []
let totalPrice = 0
function handleSelectSeat(event){
    // validation Booked seat not book again
    const value = event.innerText
    if(selectedSeat.includes(value)){
        return alert('Seat Already Booked')

    } else if(selectedSeat.length < 4) {
        
        // Seat Btn active Color
        console.log(event)
        event.classList.add('bg-primary')
        event.classList.add('text-white')

        // All seat push in array
        selectedSeat.push(event.innerText)
        // Selected Seat Count
        totalBookedEl.innerText = selectedSeat.length
        // Available Seat Decrease
        const availableSeatValue = parseFloat(availableSeatEl.innerText);
        const reaminingSeat = availableSeatValue - 1
        availableSeatEl.innerText = reaminingSeat
        
        // Remove Default text (No Seat Booked)
        DefaultTextEl.classList.add('hidden')

        
        // Selected Seat DIsplay
        seatSelectedEl.innerHTML += `
            <li class="text-base font-normal flex justify-between" >
            <span> ${event.innerText} </span>
            <span> Echonomi </span>
            <span> 550 Tk </span>
        
        </li> `;

        // Calculate Total Price
        totalPrice += 550
        totalPriceEl.innerText = totalPrice.toFixed(2)

        // Active Copun Section
        if(selectedSeat.length > 3){
            couponInputField.removeAttribute( 'disabled')
            couponBtnEl.removeAttribute( 'disabled')
        }

        
        

        
    } else{
        alert( 'Maximum Seat Booked')
    }

}

// Coupon Apply Function


document.getElementById('coupon-btn').addEventListener('click', function(){
    const couponInputValue = couponInputField.value
    let couponSave = 0
    

    if(couponInputValue !== 'NEW50' && couponInputValue !== 'Couple 20'){
        alert('Coupon Code is not valid')
        return
    }

    if(couponInputValue === 'NEW50'){
        couponSave = totalPrice * .15
    } else if(couponInputValue === 'Couple 20'){
        couponSave =  totalPrice * .20
    }
    const showCouponPriceEl = document.getElementById('show-coupon-price')
    showCouponPriceEl.innerHTML = `
        <p>Discount:</p>
        <p> 
            <span> - BDT:</span> 
            <span> ${couponSave.toFixed(2)} </span> </p>
    `

    // Grand Total
    const grandTotalValue = totalPrice - couponSave
    grandTotalEl.innerText = grandTotalValue.toFixed(2)


})


// Passenger Details 

phoneNumberEl.addEventListener('input', function(event){
    const inputValue = event.target.value
    
    if(inputValue.length >= 11){
        nextButtonEl.removeAttribute('disabled')
    } 

    
})

document.getElementById('btn-continue').addEventListener('click', function(){
    window.location.reload()
})