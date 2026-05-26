'use client'

export default function QRDownloadButton({ svgRef, filename = 'qrcode', size = 256 }) {
  const downloadSVG = () => {
    const svg = svgRef?.current?.querySelector('svg')
    if (!svg) return
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${filename}.svg`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const downloadPNG = () => {
    const svg = svgRef?.current?.querySelector('svg')
    if (!svg) return
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `${filename}.png`
      a.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="flex gap-3">
      <button onClick={downloadSVG} className="btn-primary flex-1 text-sm">
        ↓ Download SVG
      </button>
      <button onClick={downloadPNG} className="btn-secondary flex-1 text-sm">
        ↓ Download PNG
      </button>
    </div>
  )
}
