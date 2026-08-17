import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

p = Path(r'D:\新文科\泸溪县红色题库.docx')
print(f'file_exists={p.exists()} path={p}')
with zipfile.ZipFile(p, 'r') as z:
    names = [n for n in z.namelist() if n.endswith('document.xml')]
    print('document_xmls=', names)
    if not names:
        raise SystemExit('No document.xml found')
    root = ET.fromstring(z.read(names[0]))
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
texts = []
for pnode in root.findall('.//w:p', ns):
    parts = []
    for t in pnode.findall('.//w:t', ns):
        parts.append(t.text or '')
    s = ''.join(parts).strip()
    if s:
        texts.append(s)
print('TOTAL=', len(texts))
for i, line in enumerate(texts, 1):
    print(f'{i}: {line}')
