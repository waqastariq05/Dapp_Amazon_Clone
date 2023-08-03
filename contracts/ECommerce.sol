// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract ECommerce {
    struct Product {
        uint id;
        string name;
        string desc;
        string imageUrl;
        uint cateId;
        uint quantity;
        uint256 cost;
        uint rating;
    }

    struct Category {
        uint id;
        string name;
    }

    struct Order {
        uint256 time;
        address buyer;
        string buyerAdd;
        string name;
        string desc;
        string imageUrl;
        uint cateId;
        uint quantity;
        uint256 cost;
    }

    Product[] products;
    Category[] categories;
    Order[] orderList;

    mapping(address => uint) public orderCount;
    mapping(address => mapping(uint => Order)) public orders;

    address public admin;

    event Buy(address buyer, uint256 orderId, uint256 itemId);

    constructor() {
        admin = msg.sender;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "Not Admin");
        _;
    }

    // ==================== PRODUCT ==============================
    function addProduct(
        uint _id,
        string calldata _name,
        string calldata _desc,
        string calldata _imageUrl,
        uint _cateId,
        uint _quantity,
        uint256 _cost,
        uint _rating
    ) external isAdmin {
        products.push(
            Product(
                _id,
                _name,
                _desc,
                _imageUrl,
                _cateId,
                _quantity,
                _cost,
                _rating
            )
        );
    }

    function updateProduct(
        uint _id,
        string calldata _name,
        string calldata _desc,
        string calldata _imageUrl,
        uint _cateId,
        uint _quantity,
        uint256 _cost,
        uint _rating
    ) external isAdmin {
        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                products[i] = Product(
                    _id,
                    _name,
                    _desc,
                    _imageUrl,
                    _cateId,
                    _quantity,
                    _cost,
                    _rating
                );
            }
        }
    }

    function DeleteProduct(uint _id) external isAdmin {
        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                delete products[i];
            }
        }
    }

    function getProduct() public view returns (Product[] memory) {
        return products;
    }

    // ==================== CATEGORY ==============================
    function addCategory(uint _id, string calldata _name) external isAdmin {
        categories.push(Category(_id, _name));
    }

    function updateCategory(uint _id, string calldata _name) external isAdmin {
        for (uint i = 0; i < categories.length; i++) {
            if (categories[i].id == _id) {
                categories[i] = Category(_id, _name);
            }
        }
    }

    function getCategory() public view returns (Category[] memory) {
        return categories;
    }

    // ==================== BUY PRODUCT ==============================
    function buyProduct(
        uint _id,
        uint qut,
        string calldata _buyerAdd
    ) external payable {
        Product memory product;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                product = products[i];
            }
        }
        require(product.quantity >= qut, "Not enough item");
        Order memory order = Order(
            block.timestamp,
            msg.sender,
            _buyerAdd,
            product.name,
            product.desc,
            product.imageUrl,
            product.cateId,
            qut,
            product.cost * qut
        );
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        for (uint i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                products[i].quantity = product.quantity - qut;
            }
        }

        orderList.push(order);

        emit Buy(msg.sender, orderCount[msg.sender], product.id);
    }

    // ==================== ORDER LIST ==============================
    function getOrderList() public view returns (Order[] memory) {
        return orderList;
    }

    // ==================== WITHDRAW BALANCE ==============================
    function withdraw() external isAdmin {
        (bool success, ) = admin.call{value: address(this).balance}("");
        require(success);
    }
}
