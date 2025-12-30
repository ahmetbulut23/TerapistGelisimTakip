import { MoveHorizontal } from 'lucide-react'

export function MobileScrollHint() {
    return (
        <div className="md:hidden flex items-center justify-end gap-2 text-xs text-gray-500 mb-2 px-1">
            <span className="animate-pulse">Sola/Sağa Kaydırınız</span>
            <MoveHorizontal className="w-4 h-4 text-violet-500 animate-pulse" />
        </div>
    )
}
