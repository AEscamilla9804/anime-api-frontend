import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

const ModalView = ({ section, setAlert }) => {
  return (
    <section 
        id="modal"
        className={`z-50 fixed top-0 left-0 right-0 bottom-0 bg-[#111111bd] flex transition-opacity duration-300 opacity-100`}
    >
        <div 
            id="modal-container"
            className="m-auto w-[80%] md:w-3/4 max-w-[700px] max-h-[90%] bg-gray-200 rounded-[1rem] p-[2rem] flex flex-col gap-[1rem]"
        >
            <ModalHeader />
            <ModalBody />
            <ModalFooter section={ section } setAlert={ setAlert }/>
        </div>
    </section>
  )
}

export default ModalView