"""JD 解析工具：从 URL 抓取或清洗文本，输出干净的 JD 文本。"""
import sys
import json
import re


def clean_text(text: str) -> str:
    """清洗 JD 文本：去除多余空白、HTML 残留、统一换行。"""
    # 去除 HTML 标签残留
    text = re.sub(r'<[^>]+>', '', text)
    # 统一换行
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # 合并多个空行为单个
    text = re.sub(r'\n{3,}', '\n\n', text)
    # 去除行首尾空格并合并多余空白
    text = re.sub(r'[ \t]{2,}', ' ', text)
    lines = [line.strip() for line in text.split('\n')]
    text = '\n'.join(lines)
    # 去除首尾空白
    return text.strip()


def fetch_from_url(url: str) -> str:
    """从 URL 抓取页面内容为纯文本。"""
    try:
        import requests
        from bs4 import BeautifulSoup
    except ImportError as e:
        raise ImportError("请先安装依赖: pip install requests beautifulsoup4") from e

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                      'AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/120.0.0.0 Safari/537.36'
    }
    resp = requests.get(url, headers=headers, timeout=15)
    resp.raise_for_status()
    resp.encoding = resp.apparent_encoding or 'utf-8'

    soup = BeautifulSoup(resp.text, 'html.parser')
    # 移除 script/style 标签
    for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
        tag.decompose()

    text = soup.get_text()
    return clean_text(text)


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    if len(sys.argv) < 2:
        print(json.dumps({"error": "用法: python jd_parser.py <url|--text '...'>"}, ensure_ascii=False))
        sys.exit(1)

    arg = sys.argv[1]

    if arg == '--text':
        if len(sys.argv) > 2:
            text = sys.argv[2]
        elif not sys.stdin.isatty():
            text = sys.stdin.read()
        else:
            print(json.dumps({"error": "请提供文本参数或通过管道输入: python jd_parser.py --text 'JD内容'"}, ensure_ascii=False))
            sys.exit(1)
        result = clean_text(text)
    elif arg.startswith('http://') or arg.startswith('https://'):
        try:
            result = fetch_from_url(arg)
        except Exception as e:
            print(json.dumps({"error": f"URL 抓取失败: {str(e)}"}, ensure_ascii=False))
            sys.exit(1)
    else:
        print(json.dumps({"error": "参数必须是 URL 或以 --text 开头"}, ensure_ascii=False))
        sys.exit(1)

    # 输出清洗后的文本（由 skill 进行语义解析）
    print(result)


if __name__ == '__main__':
    main()
