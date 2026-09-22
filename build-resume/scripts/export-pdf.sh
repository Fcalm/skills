#!/usr/bin/env bash
# 用无头 Edge/Chrome 把简历 HTML 导出为 PDF，并报告页数
# 用法: export-pdf.sh <html路径> [pdf输出路径]
set -euo pipefail

HTML="$1"
PDF="${2:-${HTML%.*}.pdf}"

for CAND in "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
            "/c/Program Files/Microsoft/Edge/Application/msedge.exe" \
            "/c/Program Files/Google/Chrome/Application/chrome.exe" \
            "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"; do
  if [ -f "$CAND" ]; then BROWSER="$CAND"; break; fi
done
[ -n "${BROWSER:-}" ] || { echo "错误：未找到 Edge 或 Chrome"; exit 1; }

# 转成 Windows 路径和 file:// URL
HTML_WIN=$(cygpath -w "$HTML")
PDF_WIN=$(cygpath -w "$PDF")
HTML_URL="file:///$(cygpath -m "$HTML")"

"$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF_WIN" "$HTML_URL" 2>/dev/null | grep -i "written" || true

if [ ! -f "$PDF" ]; then echo "错误：PDF 未生成"; exit 1; fi

python - "$PDF" <<'EOF'
import sys
pdf = sys.argv[1]
try:
    from pypdf import PdfReader
except ImportError:
    from PyPDF2 import PdfReader
n = len(PdfReader(pdf).pages)
print(f"pages: {n}" + ("  [OK 一页]" if n == 1 else "  [警告：超过一页，请下调 @media print 的 font-size/line-height 后重试]"))
EOF
