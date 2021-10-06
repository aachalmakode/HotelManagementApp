class OrderDetails {
    itemName;
    itemQuantity;
    itemPrice;
    totalAmount;

    constructor(itemName, itemQuantity, itemPrice, totalAmount) {
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
        this.itemPrice = itemPrice;
        this.totalAmount = totalAmount;
    }

    get getItemName() {
        return this.itemName;
    }

    set setItemName(value) {
        this.itemName = value;
    }

    get getItemQuantity() {
        return this.itemQuantity;
    }

    set setItemQuantity(value) {
        this.itemQuantity = value;
    }

    get getItemPrice() {
        return this.itemPrice;
    }

    set setItemPrice(value) {
        this.itemPrice = value;
    }

    get getTotalAmount() {
        return this.totalAmount;
    }

    set setTotalAmount(value) {
        this.totalAmount = value;
    }
}

exports.OrderDetails = OrderDetails; 