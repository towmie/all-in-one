import AddCoinForm from "./AddCoinForm";

import Modal from "../../ui/Modal";

function AddCoin({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <AddCoinForm onCloseModal={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCoin;
