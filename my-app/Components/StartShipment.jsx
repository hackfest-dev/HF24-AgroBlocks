import React, { useState } from "react";
import { Str1 } from "../Components/index";

const ShippingModal = ({ startModal, setStartModal, startShipment }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });
  const [validationError, setValidationError] = useState({
    receiver: "",
    index: "",
  });
  const [shippingDetails, setShippingDetails] = useState(null);

  const startShipping = () => {
    // Basic validation
    if (!getProduct.receiver.trim()) {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        receiver: "Receiver name is required.",
      }));
      return;
    }

    if (!getProduct.index.trim()) {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        index: "Product ID is required.",
      }));
      return;
    }

    // Simulated shipping details
    const details = {
      producer: "Example Producer",
      pickupTime: "Tomorrow at 10:00 AM",
      customerName: getProduct.receiver,
      address: "123 Example St, City, Country",
      // Add more details as needed
    };

    // Set shipping details and open dialog box
    setShippingDetails(details);
  };

  const closeDialog = () => {
    setShippingDetails(null);
    setStartModal(false);
  };

  return (
    <>
      {startModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setStartModal(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-end">
                <button
                  className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  onClick={() => setStartModal(false)}
                >
                  <Str1 />
                </button>
              </div>
              <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                <h4 className="text-lg font-medium text-gray-800">
                  Start The Shipping
                </h4>

                <form>
                  <div className="relative mt-3">
                    <input
                      type="text"
                      placeholder="Receiver"
                      className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      onChange={(e) => {
                        setGetProduct({
                          ...getProduct,
                          receiver: e.target.value,
                        });
                        setValidationError((prevErrors) => ({
                          ...prevErrors,
                          receiver: "",
                        }));
                      }}
                    />
                    {validationError.receiver && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationError.receiver}
                      </p>
                    )}
                  </div>
                  <div className="relative mt-3">
                    <input
                      type="text"
                      placeholder="Product ID"
                      className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      onChange={(e) => {
                        setGetProduct({
                          ...getProduct,
                          index: e.target.value,
                        });
                        setValidationError((prevErrors) => ({
                          ...prevErrors,
                          index: "",
                        }));
                      }}
                    />
                    {validationError.index && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationError.index}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => startShipping()}
                    className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                  >
                    Get details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialog box for shipping details */}
      {shippingDetails && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-md p-4 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Shipping Details
              </h2>
              <button
                className="absolute top-0 right-0 p-2 m-2 text-gray-400 rounded-full hover:bg-gray-100"
                onClick={closeDialog}
              >
                <Str1 />
              </button>
            </div>
            <div className="mt-4">
              <p>
                <span className="font-semibold">Producer:</span>{" "}
                {shippingDetails.producer}
              </p>
              <p>
                <span className="font-semibold">Pickup Time:</span>{" "}
                {shippingDetails.pickupTime}
              </p>
              <p>
                <span className="font-semibold">Customer Name:</span>{" "}
                {shippingDetails.customerName}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {shippingDetails.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingModal;
