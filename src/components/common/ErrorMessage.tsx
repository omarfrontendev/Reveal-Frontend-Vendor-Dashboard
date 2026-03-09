import { ShieldAlert } from "lucide-react";

export default function ErrorMessage({ message }) {

    return (
        <div className="w-full max-w-md flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-8 ps-12 shadow-sm">

            {/* Icon */}
            <ShieldAlert className="h-8 w-8 text-red-500" />

            {/* Text */}
            <p className="text-md font-semibold text-red-500">
                {message}
            </p>
        </div>
    )
}