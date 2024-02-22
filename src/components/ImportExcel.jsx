import React, { useState } from 'react'

import { RxUpload } from 'react-icons/rx';
import DragAndDropModal from './DragAndDropModal';

export default function ImportExcel() {
    let [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <button
                onClick={() => setIsOpen((previousState) => !previousState)}
                className='px-4 py-3 border text-xs rounded flex items-center gap-1 outline-none focus:ring-2'
            >
                <RxUpload />
                Import.csv
            </button>
            <DragAndDropModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
