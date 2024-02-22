import React, { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { useDropzone } from "react-dropzone";

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: "150px",
};

export default function DragAndDropModal({ isOpen, setIsOpen }) {
  const [file, setFile] = useState(null);
  const [fileRaw, setFileRaw] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const fileData = dataUrl.split(",")[1];
        setFileRaw(selectedFile);
        setFile(fileData);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const upload = async () => {};

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Import data from your computer
                  </Dialog.Title>
                  <div className="mt-2">
                    <div {...getRootProps()} style={dropzoneStyle}>
                      <input {...getInputProps()} />
                      {file && fileRaw?.name ? (
                        <div>
                          <div>Selected file: {fileRaw.name}</div>
                        </div>
                      ) : (
                        <div>
                          Drag and drop a .csv file here, <br /> or click to
                          select one.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-5">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent font-semibold bg-green-150 text-white px-4 py-2 text-sm font-medium text-blue-900"
                      onClick={closeModal}
                    >
                      Upload File
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
