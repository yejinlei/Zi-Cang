#!/usr/bin/env python3
"""彻底修复所有HTML页面的硬编码颜色，统一使用CSS变量"""
import re, os, glob

WORKDIR = '/home/user/workspace/2425140736829962038/Zi-Cang'

# 颜色替换规则（匹配所有可能的浅色米黄/棕色系）
COLOR_MAP = {
    # 背景 - 米黄/浅棕系列（旧宣纸色）
    '#f0e8cf': 'var(--bg-soft)',
    '#efe5cf': 'var(--bg-soft)',
    '#e7dcc0': 'var(--bg-soft)',
    '#f5ecd7': 'var(--paper)',
    '#faf6ec': 'var(--card)',
    '#faf4e3': 'var(--card)',
    '#faf0e0': 'var(--card)',
    '#ede3c8': 'var(--bg-soft)',
    '#e8dfc8': 'var(--bg-soft)',
    '#f5ecf8': 'rgba(168,136,200,.12)',
    '#fff8e7': 'var(--card)',
    '#fffdf5': 'var(--card)',
    '#faf8f0': 'var(--card)',
    '#f9f5eb': 'var(--card)',
    '#f8f0dd': 'var(--card)',
    '#f7efd9': 'var(--card)',
    '#f0ead6': 'var(--paper)',
    '#ece4d0': 'var(--paper)',
    '#e8dcc0': 'var(--bg-soft)',
    '#f4e9d4': 'var(--paper)',
    '#f9f2e4': 'var(--card)',
    '#f0e6d2': 'var(--bg-soft)',
    '#e2d8bc': 'var(--border)',
    '#d4b896': 'var(--border)',
    # 前景 - 棕红系（旧宣纸文字）
    '#8b3a2f': 'var(--zhu)',
    '#8b2500': 'var(--zhu)',
    '#6b4423': 'var(--ink-3)',
    '#6a4a1a': 'var(--gold-deep)',
    '#5c4033': 'var(--ink-2)',
    '#4a2c18': 'var(--ink)',
    '#2c1810': 'var(--ink)',
    '#3d2817': 'var(--ink)',
    '#8a6d3b': 'var(--gold)',
    '#5c4a2a': 'var(--gold-deep)',
    '#a0522d': 'var(--zhu)',
    '#b3a6cf': 'var(--violet)',
    '#4a3a60': '#c9b0e5',
    '#6b4a8a': 'var(--violet)',
}

def replace_colors_in_css(css_text):
    """把CSS文本里的硬编码颜色替换为变量"""
    result = css_text
    
    # 替换所有颜色（background/color/border/border-color等属性里的）
    for hex_color, var in COLOR_MAP.items():
        # 匹配带或不带分号/空格结尾
        result = result.replace(hex_color, var)
    
    # 特殊处理 rgba 阴影
    result = re.sub(
        r'box-shadow:0\s+2px\s+6px\s+rgba\(0,0,0,\.12\)',
        'box-shadow:0 2px 8px var(--shadow)',
        result
    )
    result = re.sub(
        r'box-shadow:0\s+2px\s+6px\s+rgba\(139,58,47,\.15\)',
        'box-shadow:0 2px 8px rgba(217,74,74,.2)',
        result
    )
    # 边框
    result = result.replace('border:1px solid #e2d8bc;', 'border:1px solid var(--border);')
    result = result.replace('border:1px solid #d4b896;', 'border:1px solid var(--border);')
    
    return result

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    
    # 提取并替换 <style>...</style> 块里的颜色
    def replace_style_block(m):
        return f'<style>\n{replace_colors_in_css(m.group(1))}\n</style>'
    
    content = re.sub(
        r'<style>\s*\n?(.*?)\n?</style>',
        replace_style_block,
        content,
        flags=re.DOTALL
    )
    
    # 处理内联 style="..." 属性
    def replace_inline_style(m):
        return f'style="{replace_colors_in_css(m.group(1))}"'
    
    content = re.sub(
        r'style="([^"]*?)"',
        replace_inline_style,
        content
    )
    
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        # 统计替换后剩余的硬编码浅色
        remaining = len(re.findall(r'#[ef][0-9a-f]{5}', content))
        return True, remaining
    return False, 0

fixed_total = 0
remaining_total = 0
for html in glob.glob(os.path.join(WORKDIR, '*.html')):
    fixed, rem = fix_file(html)
    if fixed:
        fname = os.path.basename(html)
        print(f'  ✓ {fname} (剩余硬编码: {rem})')
        fixed_total += 1
        remaining_total += rem

print(f'\n共处理 {fixed_total} 个文件，剩余硬编码浅色 {remaining_total} 处')
