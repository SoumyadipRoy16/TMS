import { useState } from 'react'
import { EyeIcon as Eye } from 'lucide-react'

export default function EyeIcon({ code }: { code: string }) {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <Eye className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => setModalOpen(true)} />
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Code Submission</h2>
                        <pre className="bg-gray-100 p-4">{code}</pre>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
