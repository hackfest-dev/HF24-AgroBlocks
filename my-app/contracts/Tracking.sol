// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        require(msg.value == _price && _receiver != address(0), "Invalid payment or receiver address.");
        
        Shipment memory shipment = Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    function startShipment(address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[msg.sender][_index];
        
        require(shipment.receiver == _receiver && shipment.status == ShipmentStatus.PENDING, "Invalid receiver or shipment status.");

        shipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(msg.sender, _receiver, shipment.pickupTime);
    }

    function completeShipment(address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[msg.sender][_index];

        require(shipment.receiver == _receiver && shipment.status == ShipmentStatus.IN_TRANSIT && !shipment.isPaid, "Invalid receiver, shipment status, or already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        payable(msg.sender).transfer(amount);

        shipment.isPaid = true;

        emit ShipmentDelivered(msg.sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(msg.sender, _receiver, amount);
    }

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        Shipment memory shipment = shipments[_sender][_index];
        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

}

     
     
   

