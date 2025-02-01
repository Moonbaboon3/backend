document.addEventListener("DOMContentLoaded", function() {
function cancel_prompt(orderId) {
    if (confirm("Are you sure you want to cancel this order?")) {
        document.getElementById(`cancel-form-${orderId}`).submit();
    }
}
window.cancel_prompt = cancel_prompt;
});