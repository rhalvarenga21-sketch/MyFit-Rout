import re, pathlib
text = pathlib.Path('data/exercises.ts').read_text(encoding='utf8')
entries = re.split(r'\{\s*id:', text)[1:]
results=[]
for ent in entries:
    m_id = re.match(r'\s*"([^"]+)"', ent)
    if not m_id: continue
    idval=m_id.group(1)
    enl = re.search(r'\[Language\.EN\]:\s*"([^"]+)"', ent)
    video = re.search(r'videoUrl:\s*"([^"]*)"', ent)
    if video and video.group(1)=="":
        results.append((idval, enl.group(1) if enl else ''))
    if len(results)>=10: break
for idval,en in results:
    print(f"ID: {idval} | EN: {en}")
print('total found', len(results))
