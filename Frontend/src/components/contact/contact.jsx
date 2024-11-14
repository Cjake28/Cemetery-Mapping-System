import React, { useState } from "react";
import "./ContactComponent.css";
import { FiPhone } from "react-icons/fi";


const ContactComponent = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className="contact-component">
            {/* Floating Button */}
            <button className="contact-button" onClick={toggleModal}>
               <FiPhone style={{color: 'black', height:'50%', width:'50%', margin: 'auto'}}/>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="contact-modal-overlay" onClick={toggleModal}>
                    <div
                        className="contact-modal"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <h2 className="contact-title">Contact Us</h2>
                        <div className="contact-details">
                            <p>Jonathan Botones</p>
                            <p>09500448152</p>
                        </div>
                        <button className="close-button" onClick={toggleModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactComponent;
