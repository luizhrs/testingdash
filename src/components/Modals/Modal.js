import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const modal = (props) => {

    return (
        <div>
            <Modal isOpen={props.isOpen} className={props.classType}>
                <ModalHeader >{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>                    
                    <Button color="secondary" onClick={props.cancelled} >Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default modal