import zipfile
from xml.etree import ElementTree as ET
p = r'D:\新文科\泸溪县文物资料整理.docx'
with zipfile.ZipFile(p) as z:
    root = ET.fromstring(z.read('word/document.xml'))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
texts = []
for pnode in root.findall('.//w:p', ns):
    parts = []
    for t in pnode.findall('.//w:t', ns):
        parts.append(t.text or '')
    s = ''.join(parts).strip()
    if s:
        texts.append(s)
print('TOTAL', len(texts))
for i, line in enumerate(texts[:200], 1):
    print(f'{i}: {line}')
