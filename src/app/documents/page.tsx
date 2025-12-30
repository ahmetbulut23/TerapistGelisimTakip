'use client'

import { FileText, Upload, Folder, Download, Trash2, Search, Filter, Plus, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

type Document = {
    id: string
    name: string
    type: string
    category: string
    size: number
    createdAt: string
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadCategory, setUploadCategory] = useState('Form')

    useEffect(() => {
        fetchDocuments()
    }, [])

    async function fetchDocuments() {
        try {
            const res = await fetch('/api/documents')
            if (res.ok) {
                const data = await res.json()
                setDocuments(data)
            }
        } catch (error) {
            console.error('Failed to fetch documents:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Limit file size to 4MB for demo purposes (Base64 storage)
        if (file.size > 4 * 1024 * 1024) {
            alert('Dosya boyutu çok büyük! Lütfen 4MB\'dan küçük dosyalar yükleyin.')
            return
        }

        setUploading(true)
        const reader = new FileReader()
        reader.onload = async (event) => {
            const base64Data = event.target?.result as string

            try {
                const res = await fetch('/api/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        category: uploadCategory,
                        data: base64Data
                    })
                })

                if (res.ok) {
                    fetchDocuments()
                    setIsUploadModalOpen(false)
                } else {
                    alert('Dosya yüklenirken bir hata oluştu.')
                }
            } catch (error) {
                console.error('Upload failed:', error)
                alert('Yükleme başarısız.')
            } finally {
                setUploading(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        }
        reader.readAsDataURL(file)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (!confirm('Bu dosyayı silmek istediğinize emin misiniz?')) return

        try {
            const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setDocuments(documents.filter(d => d.id !== id))
            }
        } catch (error) {
            console.error('Delete failed:', error)
        }
    }

    const handleDownload = async (id: string, name: string) => {
        try {
            const res = await fetch(`/api/documents/${id}`)
            if (res.ok) {
                const doc = await res.json()
                const link = document.createElement('a')
                link.href = doc.data
                link.download = name
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const stats = {
        all: documents.length,
        pdf: documents.filter(d => d.type.includes('pdf')).length,
        form: documents.filter(d => d.category === 'Form').length,
        report: documents.filter(d => d.category === 'Report').length
    }

    return (
        <div className="animate-fade-in relative">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dökümanlar</h1>
                    <p className="text-gray-600">Dosya ve belge yönetimi</p>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="btn btn-primary"
                >
                    <Upload className="w-4 h-4" />
                    Döküman Yükle
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div
                    onClick={() => setSelectedCategory('All')}
                    className={`card p-5 cursor-pointer transition-all ${selectedCategory === 'All' ? 'ring-2 ring-violet-500 bg-violet-50' : 'hover:shadow-lg'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                            <Folder className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Tüm Dosyalar</div>
                            <div className="text-lg font-bold text-gray-900">{stats.all}</div>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setSelectedCategory('Form')}
                    className={`card p-5 cursor-pointer transition-all ${selectedCategory === 'Form' ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:shadow-lg'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Formlar</div>
                            <div className="text-lg font-bold text-gray-900">{stats.form}</div>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setSelectedCategory('Report')}
                    className={`card p-5 cursor-pointer transition-all ${selectedCategory === 'Report' ? 'ring-2 ring-teal-500 bg-teal-50' : 'hover:shadow-lg'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Raporlar</div>
                            <div className="text-lg font-bold text-gray-900">{stats.report}</div>
                        </div>
                    </div>
                </div>

                <div className="card p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">PDF Dosyalar</div>
                            <div className="text-lg font-bold text-gray-900">{stats.pdf}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Dosya ara..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Document List */}
            import {MobileScrollHint} from '@/components/MobileScrollHint'

            {loading ? (
                <div className="card p-12 text-center">
                    <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto"></div>
                </div>
            ) : filteredDocs.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-4 md:hidden">
                        <MobileScrollHint />
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full whitespace-nowrap">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosya Adı</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boyut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredDocs.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type.includes('pdf') ? 'bg-red-50 text-red-600' :
                                                    doc.type.includes('image') ? 'bg-blue-50 text-blue-600' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-gray-900">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="badge badge-secondary">{doc.category}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatSize(doc.size)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(doc.createdAt).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDownload(doc.id, doc.name)}
                                                    className="p-2 hover:bg-violet-50 text-violet-600 rounded-lg transition-colors"
                                                    title="İndir"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(doc.id, e)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="card p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-violet-50 mx-auto mb-4 flex items-center justify-center">
                        <Upload className="w-10 h-10 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz döküman yok</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        {searchQuery ? 'Aramanızla eşleşen dosya bulunamadı.' : 'Başlamak için ilk dosyanızı yükleyin.'}
                    </p>
                    <button onClick={() => setIsUploadModalOpen(true)} className="btn btn-primary">
                        Döküman Yükle
                    </button>
                </div>
            )}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsUploadModalOpen(false)}>
                    <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Dosya Yükle</h2>
                            <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select
                                    className="w-full rounded-xl border-gray-200 focus:ring-violet-500"
                                    value={uploadCategory}
                                    onChange={(e) => setUploadCategory(e.target.value)}
                                >
                                    <option value="Form">Form</option>
                                    <option value="Report">Rapor</option>
                                    <option value="Material">Materyal</option>
                                    <option value="Other">Diğer</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                                />
                                <div className="flex flex-col items-center">
                                    {uploading ? (
                                        <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mb-2"></div>
                                    ) : (
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    )}
                                    <p className="text-sm font-medium text-gray-900">
                                        {uploading ? 'Yükleniyor...' : 'Dosya Seçin veya Sürükleyin'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, Resim (Max 4MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
