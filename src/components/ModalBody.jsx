import useResults from "../hooks/useResults";

const ModalBody = () => {
    const { anime } = useResults();
    const { synopsis } = anime;
  return (
    <div id="modal-body" className="flex flex-col gap-[0.75rem]">
        <p className="font-bold text-cyan-700 text-[1.5rem]">Synopsis</p>
        <p 
            id="synopsis"
            className="text-justify max-h-[200px] overflow-y-auto pr-[1rem]"
        >{synopsis}</p>
    </div>
  )
}

export default ModalBody