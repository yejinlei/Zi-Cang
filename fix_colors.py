#!/usr/bin/env python3
"""批量修复所有HTML页面的硬编码浅色样式，统一为CSS变量"""
import os, re, glob

WORKDIR = '/home/user/workspace/2425140736829962038/Zi-Cang'

# 需要替换的硬编码浅色 -> CSS变量 映射（深/浅主题自动适配）
REPLACEMENTS = [
    # 深读页 8 部通用
    (r'background:#f0e8cf;', 'background:var(--bg-soft);'),
    (r'background:#efe5cf;', 'background:var(--bg-soft);'),
    (r'background:#e7dcc0;', 'background:var(--bg-soft);'),
    (r'color:#8b3a2f;', 'color:var(--zhu);'),
    (r'color:#6a4a1a;', 'color:var(--gold-deep);'),
    (r'box-shadow:0 2px 6px rgba\(0,0,0,\.12\)', 'box-shadow:0 2px 8px var(--shadow)'),
    (r'box-shadow:0 2px 6px rgba\(139,58,47,\.15\)', 'box-shadow:0 2px 8px rgba(217,74,74,.2)'),
    # 庄子独有
    (r'background:#f5ecf8;border-left:3px solid #b3a6cf;color:#4a3a60', 
     'background:rgba(168,136,200,.1);border-left:3px solid var(--violet);color:#c9b0e5'),
]

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for pattern, repl in REPLACEMENTS:
        content = re.sub(pattern, repl, content)
    
    # 特殊处理 spec.html 的多个浅色
    if path.endswith('spec.html'):
        spec_fixes = [
            ('background:#faf6ec;border:1px solid #e2d8bc;', 'background:var(--card);border:1px solid var(--border);'),
            ('background:#faf6ec', 'background:var(--bg-soft)'),
            ('background:#f0e8cf;', 'background:rgba(212,176,121,.15);'),
            ('color:#6a4a1a', 'color:var(--gold-deep)'),
            ('border:1px solid #e2d8bc', 'border:1px solid var(--border)'),
        ]
        for old, new in spec_fixes:
            content = content.replace(old, new)
    
    # 处理 search.html 的 mark
    if path.endswith('search.html'):
        content = content.replace(
            'mark{background:#ffeb99;color:var(--zhu);',
            'mark{background:rgba(212,176,121,.35);color:var(--gold-bright);'
        )
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

fixed_count = 0
for html in glob.glob(os.path.join(WORKDIR, '*.html')):
    if fix_file(html):
        fixed_count += 1
        print(f'  ✓ {os.path.basename(html)}')

print(f'\n共修复 {fixed_count} 个文件')
