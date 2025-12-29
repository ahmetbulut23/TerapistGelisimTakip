```
import Link from 'next/link'
import { User, Calendar, TrendingUp } from 'lucide-react'

type StudentCardProps = {
  student: {
    id: string
    nameSurname: string
    lastSessionDate?: Date | null
    lastScore?: number | null
    lastResult?: string | null
                            : 'Henüz işlem yapılmadı'}
                    </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                    Profili Görüntüle <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </Link>
    )
}
