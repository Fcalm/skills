"""简历组装工具：将结构化数据按模板格式输出为简历文本。"""
import sys
import json


TEMPLATE = """{name} | {contact}
求职意向：{target}

教育经历

{school} · {edu_degree} · {major}{edu_time}

项目经历

{projects}

实习经历

{internships}

个人优势

{strengths}"""


def format_experience(items: list) -> str:
    """格式化项目/实习经历，每个经历一个块。"""
    if not items:
        return "（无）"

    blocks = []
    for item in items:
        title = item.get('title', item.get('name', ''))
        role = item.get('role', '')
        time_str = item.get('time', '')
        header = title
        if role:
            header += f" | {role}"
        if time_str:
            header += f" | {time_str}"

        lines = [header]
        for point in item.get('points', []):
            lines.append(f"  · {point}")

        blocks.append('\n'.join(lines))

    return '\n\n'.join(blocks)


def format_strengths(skills: list[str], custom: str = '') -> str:
    """格式化个人优势，将技能列表和自定义文本合并。"""
    parts = []
    if skills:
        parts.append('、'.join(skills))
    if custom:
        parts.append(custom)
    return '\n'.join(parts)


def build(data: dict) -> str:
    """主入口：将结构化数据填充到模板中。"""
    contact = data.get('contact', {})
    if not isinstance(contact, dict):
        contact = {}
    contact_parts = []
    for key in ['phone', 'email']:
        val = contact.get(key, '')
        if val:
            contact_parts.append(str(val))
    contact_str = ' | '.join(contact_parts) if contact_parts else '[请填写联系方式]'

    edu = data.get('education', {})
    if not isinstance(edu, dict) or not edu:
        school = '[请填写教育经历]'
        edu_degree = ''
        major = ''
        edu_time = ''
    else:
        school = edu.get('school', '')
        edu_degree = edu.get('degree', '')
        major = edu.get('major', '')
        edu_time = f" · {edu.get('time', '')}" if edu.get('time') else ''

    projects = format_experience(data.get('projects', []))
    internships = format_experience(data.get('internships', []))

    skills = data.get('skills', [])
    if not isinstance(skills, list):
        skills = []
    custom = data.get('custom_sections', {})
    if not isinstance(custom, dict):
        custom = {}
    strengths = format_strengths(
        [str(s) for s in skills],
        custom.get('strengths', '')
    )

    return TEMPLATE.format(
        name=data.get('name', '[请填写姓名]'),
        contact=contact_str,
        target=data.get('target', '[请填写求职意向]'),
        school=school,
        edu_degree=edu_degree,
        major=major,
        edu_time=edu_time,
        projects=projects,
        internships=internships,
        strengths=strengths,
    )


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    # 支持命令行参数或 stdin
    if len(sys.argv) > 1:
        raw = sys.argv[1]
    elif not sys.stdin.isatty():
        raw = sys.stdin.read()
    else:
        print("用法: python resume_builder.py '<json_data>'", file=sys.stderr)
        print("  或: echo '<json_data>' | python resume_builder.py", file=sys.stderr)
        sys.exit(1)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"JSON 解析失败: {e}", file=sys.stderr)
        sys.exit(1)

    result = build(data)
    print(result)


if __name__ == '__main__':
    main()
