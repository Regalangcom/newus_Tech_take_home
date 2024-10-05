import { FC, ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode /* artinya children bisa menerima banyak tipe termasuk null guys */;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  return (
    <div
      className={`fixed inset-0 bg-gray-100  bg-opacity-15 transition-opacity ${
        props.open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-11/12 max-w-md transition-transform ${
          props.open ? "scale-100" : "scale-95"
        }`}
      >
        <div className="border-b p-4">
          <h1 className="text-xl font-semibold">Information Modal</h1>
        </div>
        <div className="p-4">{props.children}</div>
        <div className="p-4 flex justify-end">
          <button
            type="button"
            className="bg-purple-600 text-white  rounded-lg px-4 py-2 hover:bg-purple-700 transition duration-200"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
